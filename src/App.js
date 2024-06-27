import React from "react";
import SketchDemo from "./components/SketchDemo";
// import MidArea from "./components/MidArea";
// import PreviewArea from "./components/PreviewArea";
// import Sidebar from "./components/Sidebar";
const MidArea = React.lazy(() => import("./components/MidArea"));
const PreviewArea = React.lazy(() => import("./components/PreviewArea"));
const Sidebar = React.lazy(() => import("./components/Sidebar"));

export default function App() {
  return (
    <>
      <SketchDemo />
    </>
  );
}
