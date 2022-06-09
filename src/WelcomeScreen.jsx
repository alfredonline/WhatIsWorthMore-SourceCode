import React from "react";

function WelcomeScreen(props) {
  const bg =
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  return (
    <div
      className="WelcomeScreen"
      style={{
        backgroundImage: "url(" + bg + ")",
      }}
    >
      <div className="filter"></div>
      <div className="welcomeStyles">
        <div className="welcomeText">WhatIsWorthMore?💸</div>
        <div className="welcomeButton" onClick={() => props.userpassestogame()}>
          <i class="fa-solid fa-play"></i>
          <span>Play Game</span>
        </div>
        <div className="GHButton">
          <i class="fa-brands fa-github"></i> <span>View Spaghetti Code</span>
        </div>
        <div className="SocialButton">
          <i class="fa-brands fa-twitter"></i>
          <a
            href="https://twitter.com/AlfredWebDev"
            target="_blank"
            rel="noopener"
            style={{textDecoration: "none", color: "#fff"}}
          >
            View Creator's Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
