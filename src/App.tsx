import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import SplitFlapShow from "./components/splitflap/splitflapshow";
import VestaboardShow from "./components/vestabaord/vestaboardshow";
import Carousel from "./components/carousel/carousel";
import EmblaCarouselShow from "./components/embla-carousel/Carousel";
import NavAnimate from "./components/navigation/navanimate";
import NavMenuShow from "./components/navigation/navmenushow";

export default function App() {
  return (
    <Routes>
      <Route path="/splitflap" element={<SplitFlapShow />} />
      <Route path="/vestaboard" element={<VestaboardShow />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/embla-carousel" element={<EmblaCarouselShow />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/navanimate" element={<NavAnimate />} />
      <Route path="/navmenu" element={<NavMenuShow />} />
    </Routes>
  );
}
