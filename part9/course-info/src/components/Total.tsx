import React from "react";
import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;