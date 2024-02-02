import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import video from "../public/aolockvid.mp4";
import Carrousel from "../components/Carrousel";

function HomePage() {
  const allProductData = useLoaderData();

  return (
    <div>
      <div className="video-container">
        <video
          controls
          className="video"
          preload="none"
          autoPlay
          playsInline
          muted
          loop
        >
          <source src={video} type="video/mp4" className="video" />
          <source src={video} type="video/webm" className="video" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Carrousel products={allProductData} />
      <div className="winter">
        <Link to="/products/season/winter">
          <img
            src="https://d12oh2gzettinl.cloudfront.net/instagram-story/posts/neoncityracingteam/418524106_18301898956120118_5643698922623944691_n.jpg"
            alt="Winter"
          />
          <h2>Winter 2024</h2>
          <h3>Shop now</h3>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
