import { Shopify } from "@shopify/shopify-api";
import shopify from "./shopify.js"

const UPDATE_PRODUCT_MUTATION = `
mutation updateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        descriptionHtml
        title
        variants (first: 10) {
          edges {
            node {
              id
              price
            }
          }
        }
      }
    }
  }
`;

export default async function productUpdater(
  session,
  { id, description, title, variants }
) {
  const client = new shopify.api.clients.Graphql({session});

  try {
    await client.query({
      data: {
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          input: {
            id,
            descriptionHtml: description,
            title,
            variants,
          },
        },
      },
    });
  } catch (error) {
  console.log("Product-Updater Error",error)
  }
}