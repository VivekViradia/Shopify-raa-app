// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import Shopify from "@shopify/shopify-api";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import fetchProducts from "./fetch-products.js";
import productUpdater from "./product-updater.js";

// @ts-ignore
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  // @ts-ignore
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

//-----------------------------------------

app.get('/api/products', async (req, res) => {
  const session = res.locals.shopify.session
  // const client = new shopify.api.clients.Graphql({session})
  console.log("Session",session)
  
  // const Query_Fetch_Product = `{
  //   products(first:10){
  //     edges{
  //       node{
  //         id
  //         title
  //       }
  //     }
  //   }
  // }`
  
  // const data = await client.query({
  //   data:Query_Fetch_Product
  // })

  const products = await fetchProducts(session)

  res.status(200).send({products})
})
//--------------------------------------------

app.post("/api/products/update", async (_req, res) => {
  const session = res.locals.shopify.session
  let status = 200;
  let error = null;
console.log(_req.body)
  try {
    await productUpdater(session, _req.body);
  } catch (e) {
    console.log(`Failed to process products/update: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});



//-----------------------------
app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

//---------------------------------------------
app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});



app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
