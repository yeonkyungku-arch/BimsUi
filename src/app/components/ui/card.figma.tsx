import figma from "@figma/code-connect";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

/**
 * Figma Code Connect for Card component.
 *
 * To link this to the actual Figma node:
 * 1. Open the Figma file: https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI
 * 2. Right-click the Card component → "Copy link to selection"
 * 3. Replace the node-id in the URL below with the actual node ID
 */
figma.connect(
  Card,
  "https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI?node-id=REPLACE_WITH_CARD_NODE_ID",
  {
    props: {
      title: figma.string("Title"),
      description: figma.string("Description"),
    },
    example: ({ title, description }) => (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Card content goes here */}
        </CardContent>
        <CardFooter>
          {/* Card footer goes here */}
        </CardFooter>
      </Card>
    ),
  },
);
