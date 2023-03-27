import { Card, Layout, Spinner } from "@shopify/polaris";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@shopify/polaris";

export const ProductList = ({ data, isLoading, IsReftching }) => {
  if (isLoading || IsReftching) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout>
      {data?.products.length ? (
        data.products.map((product) => (
          <Layout.Section>
            <ProductCard {...product}></ProductCard>
          </Layout.Section>
        ))
      ) : (
        <Layout.Section>
          <Card>
            <EmptyState
              heading="No Products Found"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                          >
                              <p>Add Products using the card above</p>
            </EmptyState>
          </Card>
        </Layout.Section>
      )}
    </Layout>
  );
};
