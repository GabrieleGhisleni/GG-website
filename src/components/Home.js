import React from "react";
import HomeHeader from "./HomeHeader";
import HomeDescription from "./HomeDescription";
import HomeTech from "./HomeTech";

export const Home = () => {
  return (
    <React.Fragment>
      <HomeHeader />
      <HomeDescription />
      <HomeTech />
    </React.Fragment>
  );
};
