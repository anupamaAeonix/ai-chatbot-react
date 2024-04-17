import React from "react";
// index
import { HomePage } from "./components/pages";
// non index
// import CustomCard from "./components/shared/customCard/CustomCard";

const App = () => {
  return (
    <div className="app-main-container" id="app-main-container">
      <HomePage />
      {/* <CustomCard /> */}
    </div>
  );
};

export default App;
