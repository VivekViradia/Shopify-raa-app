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
import { ProductList } from "../components/ProductList";

export default function HomePage() {
  const { data, isLoading, refetch, isRefetching } = useAppQuery({
    url: "/api/products",
  });

  if (data) {
    console.log("Data:", data);
  }

  return (
    <Page title="DashBoard">
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ProductList data={data} isLoading={ isLoading} isRefetching={isRefetching} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
