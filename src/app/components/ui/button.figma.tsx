import figma from "@figma/code-connect";
import { Button } from "./button";

/**
 * Figma Code Connect for Button component.
 *
 * To link this to the actual Figma node:
 * 1. Open the Figma file: https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI
 * 2. Right-click the Button component → "Copy link to selection"
 * 3. Replace the node-id in the URL below with the actual node ID
 */
figma.connect(
  Button,
  "https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI?node-id=REPLACE_WITH_BUTTON_NODE_ID",
  {
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Destructive: "destructive",
        Outline: "outline",
        Secondary: "secondary",
        Ghost: "ghost",
        Link: "link",
      }),
      size: figma.enum("Size", {
        Default: "default",
        Small: "sm",
        Large: "lg",
        Icon: "icon",
      }),
      label: figma.string("Label"),
      disabled: figma.boolean("Disabled"),
    },
    example: ({ variant, size, label, disabled }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {label}
      </Button>
    ),
  },
);
