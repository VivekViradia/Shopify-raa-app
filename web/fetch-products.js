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

const formatGqlResponse = (res) => {
  const edges = res?.body?.data?.products?.edges || [];

  if (!edges.length) return [];

  return edges.map(({ node }) => ({
    id: node.id,
    legacyId: node.legacyResourceId,
    title: node.title,
    description: node.description,
    image:
      node.images.edges[0]?.node?.url ||
      "https://res.cloudinary.com/dci7ukl75/image/upload/v1668205411/defff_uhx4wz.png", // add empty image link here
    variants: node.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: node.price,
    })),
  }));
};
export default async function fetchProducts(session) {
  if (session) {
    const client = new shopify.api.clients.Graphql({ session });
    try {
      const res = await client.query({
      data: {
        query: FETCH_PRODUCTS_QUERY,
      },
    });
    return formatGqlResponse(res);
      
    } catch (error) {
      console.log("ERROR in GraphQL", error)
    }
    
  }
}
