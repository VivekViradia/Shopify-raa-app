// import { Shopify } from "@shopify/shopify-api";
import shopify from "./shopify";


const FETCH_PRODUCTS_QUERY = `{
    products(first:10){
      edges{
        node{
          id
          title
        }
      }
    }
    }`

export default async function fetchProducts(session) {
  const client = new shopify.client.Graphql(
    session?.shop,
    session?.accessToken
    );
    const res = await client.query({
        data: {
            query:FETCH_PRODUCTS_QUERY
        }
    })
    return res
}