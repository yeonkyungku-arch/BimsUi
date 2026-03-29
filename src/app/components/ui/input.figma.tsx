import figma from "@figma/code-connect";
import { Input } from "./input";

/**
 * Figma Code Connect for Input component.
 *
 * To link this to the actual Figma node:
 * 1. Open the Figma file: https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI
 * 2. Right-click the Input component → "Copy link to selection"
 * 3. Replace the node-id in the URL below with the actual node ID
 */
figma.connect(
  Input,
  "https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI?node-id=REPLACE_WITH_INPUT_NODE_ID",
  {
    props: {
      placeholder: figma.string("Placeholder"),
      disabled: figma.boolean("Disabled"),
      type: figma.enum("Type", {
        Text: "text",
        Password: "password",
        Email: "email",
        Number: "number",
        Search: "search",
      }),
    },
    example: ({ placeholder, disabled, type }) => (
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    ),
  },
);
