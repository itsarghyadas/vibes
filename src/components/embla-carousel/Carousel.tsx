import React from "react";
import EmblaCarousel from "../embla-carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "./embla.css";

const testimonialData = [
  {
    id: 1,
    text: "This is the best service I have ever used!",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    text: "Amazing experience, highly recommend!",
    image:
      "https://images.pexels.com/photos/19765972/pexels-photo-19765972/free-photo-of-antelope-on-meadow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 3,
    text: "A wonderful journey from start to finish.",
    image:
      "https://images.pexels.com/photos/10097726/pexels-photo-10097726.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 4,
    text: "Exceptional quality and customer service.",
    image:
      "https://images.pexels.com/photos/11946567/pexels-photo-11946567.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 5,
    text: "I will definitely be coming back!",
    image:
      "https://images.pexels.com/photos/15871352/pexels-photo-15871352/free-photo-of-stork-flies-above-grass.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 6,
    text: "Top-notch service and friendly staff.",
    image:
      "https://images.pexels.com/photos/15247550/pexels-photo-15247550/free-photo-of-standing-antelope-on-meadow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: 7,
    text: "Top-notch service and friendly staff.",
    image:
      "https://images.pexels.com/photos/15247550/pexels-photo-15247550/free-photo-of-standing-antelope-on-meadow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: "center" };

const EmblaCarouselShow: React.FC = () => {
  const slides = testimonialData.map((testimonial) => (
    <div
      key={testimonial.id}
      className="w-full h-full flex relative rounded-lg"
    >
      <img
        src={testimonial.image}
        alt="testimonial"
        className="absolute w-full h-full top-0 left-0 rounded-lg"
      />
      <div className="w-full h-full p-5 backdrop-blur-sm flex flex-col md:flex-row gap-x-10 items-end justify-end md:justify-between border-2 border-neutral-200/10 rounded-lg">
        <div className="flex flex-col w-full">
          <h2 className="text-xl text-balance max-w-[15rem] mx-0 font-bold mb-2 text-white text-center md:text-left">
            {testimonial.text}
          </h2>
          <p className="text-neutral-300 text-balance text-sm text-center md:text-left">
            This is a description for card {testimonial.id}.
          </p>
        </div>
        <button className="text-white border shrink-0 w-full md:w-fit px-4 py-2 rounded-full mt-4 hover:bg-white hover:text-neutral-9000 transition-colors">
          Read more
        </button>
      </div>
    </div>
  ));

  return (
    <section className="bg-neutral-900">
      <div className="max-w-5xl [-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] mx-auto min-h-screen overflow-hidden p-5 flex items-center justify-center w-full">
        <EmblaCarousel
          slides={slides}
          options={OPTIONS}
          className="rounded-lg w-full min-h-[20rem] h-full"
        />
      </div>
    </section>
  );
};

export default EmblaCarouselShow;
