import { Route, Routes } from "react-router-dom";
import SplitFlapShow from "./components/vestabaord/splitflapshow";
import Carousel from "./components/carousel/carousel";

export default function App() {
  return (
    <Routes>
      <Route path="/splitflap" element={<SplitFlapShow />} />
      <Route path="/carousel" element={<Carousel />} />
    </Routes>
  );
}
