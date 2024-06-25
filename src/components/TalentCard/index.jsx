import * as React from "react";
import Item from "./item";

export default function TalentCard({ talentDetails }) {
  return (
    <>
      {talentDetails.map((talent, key) => (
        <Item talent={talent} key={key} />
      ))}
    </>
  );
}
