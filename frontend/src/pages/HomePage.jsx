import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import video from "../public/aolockvid.mp4";
import Carrousel from "../components/Carrousel";
import "./HomePage.css";
import clothing from "../public/clothing.png";

function HomePage() {
  const allProductData = useLoaderData();

  return (
    <div>
      <div className="video-container">
        <video className="video" preload="none" autoPlay playsInline muted loop>
          <source src={video} type="video/mp4" className="video" />
          <source src={video} type="video/webm" className="video" />
          Your browser does not support the video tag.
        </video>
        <img src={clothing} alt="" className="img-home" />
      </div>
      <Carrousel products={allProductData} />
      <div className="winter">
        <Link to="/products/season/winter" className="winter-button">
          <img
            className="winter-img"
            src="https://d12oh2gzettinl.cloudfront.net/instagram-story/posts/neoncityracingteam/418524106_18301898956120118_5643698922623944691_n.jpg"
            alt="Winter"
          />
          <h2 className="winter-button">Winter 2024</h2>
          <h3 className="winter-button">Shop now</h3>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
