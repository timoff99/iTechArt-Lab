import React from "react";

import { HorizontalCard } from "../HorizontalCard";

export const RecipesCard = ({ openRecipe, ...props }) => {
  return <HorizontalCard {...props} openRecipe={openRecipe} sizes="sm" place={"no-rates"} />;
};
