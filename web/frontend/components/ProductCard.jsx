import { Card, Stack, FormLayout, TextField } from "@shopify/polaris";

export const ProductCard = (props) => {
  return (
    <Card
      sectioned
      primaryFooterAction={{
        content: "Update Product",
        onAction: () => console.log("Update Products"),
      }}
      secondaryFooterActions={[
        { content: "View in Admin", onAction: () => console.log("View Admin") },
      ]}
    >
      <Stack spacing="exterloose">
        <Stack.Item>
          <img src={props.image} alt="" width="250" />
        </Stack.Item>
        <Stack.Item fill>
          <FormLayout>
            <TextField label="Product Title" value={props.title}></TextField>
            <TextField
              multiline={4}
              label="Product Description"
              value={props.description}
            ></TextField>
            {props.variants && props.variants[0].price && (
              <TextField
                label="Product Price"
                value={props.variants[0].price}
              ></TextField>
            )}
          </FormLayout>
        </Stack.Item>
      </Stack>
    </Card>
  );
};
