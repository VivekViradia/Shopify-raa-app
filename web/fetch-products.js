// import { Shopify } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const FETCH_PRODUCTS_QUERY = `{
  products(first: 10, reverse: true) {
    edges {
      node {
        id
        description
        title
        legacyResourceId
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              price
              title
            }
          }
        }
      }
    }
  }
}`;

export default async function fetchProducts(session) {
  if (session) {
    const client = new shopify.api.clients.Graphql({session});
    const res = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
      },
    });
    return res;
  }
}
