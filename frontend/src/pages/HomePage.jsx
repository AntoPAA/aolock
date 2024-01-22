import React from "react";
import video from "../public/aolockvid.mp4";

function HomePage() {
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
    </div>
  );
}

export default HomePage;
