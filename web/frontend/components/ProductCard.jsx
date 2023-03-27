import { Card, Stack, FormLayout, TextField, Button } from "@shopify/polaris";
import { useState } from "react";

export const ProductCard = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.variants[0].price);

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
            <TextField
              label="Product Title"
              value={title}
              onChange={setTitle}
            ></TextField>
            <TextField
              multiline={4}
              label="Product Description"
              value={description}
              onChange={setDescription}
            ></TextField>
            <Button>Show Variants</Button>
          </FormLayout>
        </Stack.Item>
      </Stack>
    </Card>
  );
};
