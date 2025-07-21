export const generateSchema = (fields = []) => {
  const schema = {};
  fields.forEach((field) => {
    if (!field.name) return;
    if (field.type === "Nested") {
      schema[field.name] = generateSchema(field.fields || []);
    } else {
      schema[field.name] = field.type.toLowerCase();
    }
  });
  return schema;
};

