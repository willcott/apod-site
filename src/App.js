import React from "react";
import "./App.css";
import HeroImage from "./HeroImage";
import PastImages from "./PastImages";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Astronomy Picture of the Day</h1>
        <HeroImage></HeroImage>
        <h2>Past Images</h2>
        <PastImages pastImageCount={10}></PastImages>
      </header>
    </div>
  );
}

export default App;
