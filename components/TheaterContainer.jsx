"use client";

import { useState } from "react";
import SlideMenu from "./SlideMenu";
import TheaterCard from "./TheaterCard";

export default function TheaterContainer({ data }) {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    setOpen((open) => !open);
  }

  return (
    <>
      <TheaterCard data={data} onToggle={handleToggle} />

      <SlideMenu data={data} toggle={open} onToggle={handleToggle} />
    </>
  );
}
