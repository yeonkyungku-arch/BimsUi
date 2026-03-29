import figma from "@figma/code-connect";
import { StatusCard } from "./StatusCard";

/**
 * Figma Code Connect for StatusCard component.
 *
 * To link this to the actual Figma node:
 * 1. Open the Figma file: https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI
 * 2. Right-click the StatusCard component → "Copy link to selection"
 * 3. Replace the node-id in the URL below with the actual node ID
 */
figma.connect(
  StatusCard,
  "https://www.figma.com/design/udvm9EWTthsAAOTweBJ7ld/BIMS-Web-UI?node-id=REPLACE_WITH_STATUSCARD_NODE_ID",
  {
    props: {
      type: figma.enum("Type", {
        전체: "전체",
        정상: "정상",
        주의: "주의",
        위험: "위험",
        오프라인: "오프라인",
        재배터리: "재배터리",
        "활성 알람": "활성 알람",
      }),
      count: figma.number("Count"),
      isActive: figma.boolean("Active"),
    },
    example: ({ type, count, isActive }) => (
      <StatusCard type={type} count={count} isActive={isActive} />
    ),
  },
);
