import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../util";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p key={part.name}> {part.name} {part.exerciseCount} {part.description}</p>
    case "Using props to pass data":
      return <p key={part.name}> {part.name} {part.exerciseCount} {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p key={part.name}> {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
    case "State handling":
      return <p key={part.name}> {part.name} {part.exerciseCount} {part.description} {part.anotherAttribute}</p>
    default:
      return assertNever(part);
  }
};

export default Part;