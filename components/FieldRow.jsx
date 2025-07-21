import React from "react";
import { Input, Select, Button } from "antd";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

function FieldRow({ control, fieldPath, remove }) {
  const type = useWatch({ control, name: `${fieldPath}.type` });

  const { fields, append, remove: removeNested } = useFieldArray({
    control,
    name: `${fieldPath}.fields`
  });

  return (
    <div className="field-row">
      <div className="field-inline">
        <Controller
          control={control}
          name={`${fieldPath}.name`}
          render={({ field }) => (
            <Input {...field} placeholder="Field Name" size="small" />
          )}
        />
        <Controller
          control={control}
          name={`${fieldPath}.type`}
          render={({ field }) => (
            <Select {...field} size="small" style={{ width: 100 }}>
              <Option value="String">String</Option>
              <Option value="Number">Number</Option>
              <Option value="Nested">Nested</Option>
            </Select>
          )}
        />
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={remove}
        />
      </div>

      {type === "Nested" && (
        <div className="nested-block">
          {fields.map((nestedField, i) => (
            <FieldRow
              key={nestedField.id}
              control={control}
              fieldPath={`${fieldPath}.fields.${i}`}
              remove={() => removeNested(i)}
            />
          ))}
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() =>
              append({ name: "", type: "String", fields: [] })
            }
            style={{ marginTop: 8 }}
          >
            Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
}

export default FieldRow;
