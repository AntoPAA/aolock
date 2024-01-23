import React from "react";
import { useLoaderData } from "react-router-dom";
import Season from "../components/Season";

function SeasonPage() {
  const allProductData = useLoaderData();

  return (
    <div>
      <Season products={allProductData} />
    </div>
  );
}

export default SeasonPage;
