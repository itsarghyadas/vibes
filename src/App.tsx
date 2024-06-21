import { Route, Routes } from "react-router-dom";
import SplitFlapShow from "./components/vestabaord/splitflapshow";
import Carousel from "./components/carousel/carousel";
import EmblaCarouselShow from "./components/embla-carousel/Carousel";
import Homepage from "./components/homepage/homepage";

export default function App() {
  return (
    <Routes>
      <Route path="/vestaboard" element={<SplitFlapShow />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/embla-carousel" element={<EmblaCarouselShow />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}
