import figma from "@figma/code-connect";
import { Badge } from "./badge";

/**
 * Figma Code Connect for Badge component.
 *
 * To link this to the actual Figma node:
 * 1. Open the Figma file: https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI
 * 2. Right-click the Badge component → "Copy link to selection"
 * 3. Replace the node-id in the URL below with the actual node ID
 */
figma.connect(
  Badge,
  "https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI?node-id=REPLACE_WITH_BADGE_NODE_ID",
  {
    props: {
      variant: figma.enum("Variant", {
        Default: "default",
        Secondary: "secondary",
        Destructive: "destructive",
        Outline: "outline",
      }),
      label: figma.string("Label"),
    },
    example: ({ variant, label }) => (
      <Badge variant={variant}>{label}</Badge>
    ),
  },
);
