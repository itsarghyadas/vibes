import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const EmblaCarouselShow: React.FC = () => (
  <div className="bg-neutral-800 min-h-screen overflow-hidden p-5 flex items-center justify-center w-full">
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </div>
);

export default EmblaCarouselShow;
