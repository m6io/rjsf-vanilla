import "./App.css";
import VanillaRJSFForm from "@/components/rjsf";
import validator from "@rjsf/validator-ajv8";
import schema from "./schema.json";

function App() {
  return (
    <main
      style={{
        height: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      <h1>Vanilla RJSF Components</h1>
      <div
        style={{
          padding: 20,
        }}
      >
        <VanillaRJSFForm
          noHtml5Validate
          schema={schema}
          validator={validator}
          uiSchema={{
            personalInfo: {
              creditScore: {
                "ui:widget": "range",
              },
            },
            address: {
              mainAddress: {
                "ui:widget": "radio",
              },
            },
          }}
        />
      </div>
    </main>
  );
}

export default App;
