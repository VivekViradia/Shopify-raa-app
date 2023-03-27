import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({ content: "5 products created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  // // Fetching Product Data
  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/api/products");
  //   setIsLoading(false);
  //   // console.log("Before JASON", await response.json())
  //   const data = await response.json()
  //   const product_data = data.products.body.data.products.edges
  //   console.log("DATTAAAAAA",product_data)
  // };

  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Populate 5 Products",
          onAction: handlePopulate,
          loading: isLoading,
        }}
        secondaryFooterActions={[
          {
            content: "View All Products",
            onAction: () => navigate({ name: "Product" }, { target: "new" }),
          },
        ]}
      >
        <TextContainer spacing="loose">
         <p>Use this nifty tool to create and update products</p>
        </TextContainer>
      </Card>
    </>
  );
}
