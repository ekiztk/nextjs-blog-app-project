"use client";

import { ProgressBar } from "react-loader-spinner";

export default function Spinner() {
  return (
    <ProgressBar
      height={"80"}
      width={"80"}
      ariaLabel="Common Loader"
      borderColor="#F4442E"
      barColor="#51E5FF"
      wrapperStyle={{ display: "block", margin: "auto" }}
    />
  );
}
