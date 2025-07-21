import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "antd";
import FieldRow from "./FieldRow";
import { generateSchema } from "../utils/jsonUtils";
import "./SchemaBuilder.css";

function SchemaBuilder() {
  const { control } = useForm({ defaultValues: { fields: [] } });
  const { fields, append, remove } = useFieldArray({ control, name: "fields" });
  const watchedFields = useWatch({ control, name: "fields" });
  const [json, setJson] = useState({});

  useEffect(() => {
    setJson(generateSchema(watchedFields || []));
  }, [watchedFields]);

  return (
    <div className="schema-container">
      <div className="builder-pane">
        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            control={control}
            fieldPath={`fields.${index}`}
            remove={() => remove(index)}
          />
        ))}
        <Button
          type="primary"
          onClick={() => append({ name: "", type: "String", fields: [] })}
          style={{ marginTop: "1rem" }}
        >
          Add Field
        </Button>
      </div>
      <div className="preview-pane">
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SchemaBuilder;
