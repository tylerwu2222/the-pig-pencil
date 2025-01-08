"use client";

// import SectionTemplate from "../SectionTemplate/SectionTemplate";
import CollaboratorSectionTemplate from "../SectionTemplate/CollaboratorSection/CollaboratorSectionTemplate";
import React from "react";
import { Suspense } from "react";

const Collaborators = () => {
  return (
    <Suspense>
      <CollaboratorSectionTemplate />
    </Suspense>
  );
};

export default Collaborators;
