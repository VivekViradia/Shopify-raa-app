import { Card,Stack, FormLayout, TextField } from "@shopify/polaris";

export const ProductCard = () => {
  return (
    <Card
      sectioned
      primaryFooterAction={{
        content: "Update Product",
        onAction: () => console.log("Update Products"),
          }}
          secondaryFooterActions={[{content:"View in Admin", onAction:()=>console.log("View Admin")}]}
      >
          <Stack spacing="exterloose">
              <Stack.Item>
                  <img src="..\assets\home-trophy.png" alt=""/>
              </Stack.Item>
              <Stack.Item fill>
                  <FormLayout>
                      <TextField label="Product Title">
                          
                      </TextField>
                      <TextField multiline={4} label="Product Description">
                          
                      </TextField>
                  </FormLayout>
              </Stack.Item>
        </Stack>
    </Card>
  );
};
