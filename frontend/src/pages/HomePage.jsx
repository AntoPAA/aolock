import React from "react";
import { useLoaderData } from "react-router-dom";
import video from "../public/aolockvid.mp4";
import Carrousel from "../components/Carrousel";

function HomePage() {
  const allProductData = useLoaderData();

  return (
    <div>
      HomePage
      <div className="video-container">
        <video className="video" preload="none" autoPlay playsInline muted loop>
          <source src={video} type="video/mp4" />
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Carrousel products={allProductData} />
    </div>
  );
}

export default HomePage;
