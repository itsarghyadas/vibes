import { useRef, useState, useEffect } from "react";
import "./carousel.css";
import GlowContainer from "../glow-container";

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
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    text: "A wonderful journey from start to finish.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    text: "Exceptional quality and customer service.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    text: "I will definitely be coming back!",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    text: "Top-notch service and friendly staff.",
    image:
      "https://images.pexels.com/photos/26077133/pexels-photo-26077133/free-photo-of-herd-of-antelopes-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function Carousel() {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 6;

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll(".card")[index];
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        setCurrentIndex(index);
      }
    }
  };

  useEffect(() => {
    scrollToIndex(0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative max-w-4xl overflow-hidden mask-container">
        <ul
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            padding: "50px calc(50% - 128px)",
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <li key={testimonial.id}>
              <article className="mx-4 ">
                <GlowContainer>
                  <div
                    className={`relative card h-[200px] w-[300px] md:w-[350px] rounded-xl shadow-md flex-shrink-0 transition-all duration-300 ${
                      currentIndex === index ? "active" : "inactive"
                    }`}
                    style={{
                      scrollSnapAlign: "center",
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt="testimonial"
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                    />
                    <div className="w-full h-full p-5 backdrop-blur-sm flex items-start justify-end border-2 border-neutral-200 rounded-xl flex-col">
                      <h2 className="text-xl text-balance font-bold mb-2 text-white">
                        {testimonial.text}
                      </h2>
                      <p className="text-neutral-300 text-balance text-sm text-left">
                        This is a description for card {testimonial.id}.
                      </p>
                    </div>
                  </div>
                </GlowContainer>
              </article>
            </li>
          ))}
        </ul>
        <div className="flex justify-center ">
          {Array.from({ length: totalCards }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${
                currentIndex === index
                  ? "bg-gray-200 scale-105 "
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}