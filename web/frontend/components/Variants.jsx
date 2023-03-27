import { Card, IndexTable, TextField } from "@shopify/polaris";

export const Variants = ({ variants }) => {
  return (
    <Card sectioned title="Variants">
      <IndexTable
        itemCount={variants.length}
        resourceName={{ singular: "variant", plural: "variants" }}
        heading={[{ title: "Variants" }, { title: "Price" }]}
        selectable={false}
      >
        {variants.maps((variant, index) => (
          <IndexTable.Row key={index}>
            <IndexTable.Cell>
              <TextField
                value={variant.title}
                disabled
                readOnly
                label="Variant"
                labelHidden
              />
            </IndexTable.Cell>
            <IndexTable.Cell>
              <TextField
                value={variant.price}
                label="Price"
                labelHidden
              />
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </Card>
  );
};
