import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductCard, ProductsCard } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {
  const { data, isLoading, refetch, isRefetching } = useAppQuery({ url: "/api/products" });
  
  if (data) {
     console.log("Data:",data)
  }
 

  return (
    <Page title="DashBoard">
      
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ProductCard {...data?.products[0]} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}





