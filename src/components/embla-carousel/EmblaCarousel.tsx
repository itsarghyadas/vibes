import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

// Custom hook for dot button functionality from embla
type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

// DotButton component
type DotButtonPropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

const TWEEN_SCALE_FACTOR_BASE = 0.12;
const TWEEN_OPACITY_FACTOR_BASE = 0.05;
const TWEEN_GLOW_OPACITY_FACTOR_BASE = 0.55;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

// Main EmblaCarousel component
type EmblaCarouselPropType = {
  className?: string;
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<EmblaCarouselPropType> = (props) => {
  const { slides, options, className } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenScaleFactor = useRef(0);
  const tweenOpacityFactor = useRef(0);
  const tweenGlowOpacityFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenScaleFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenScaleFactor.current =
      TWEEN_SCALE_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const setTweenOpacityFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenOpacityFactor.current =
      TWEEN_OPACITY_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const setTweenGlowOpacityFactor = useCallback(
    (emblaApi: EmblaCarouselType) => {
      tweenGlowOpacityFactor.current =
        TWEEN_GLOW_OPACITY_FACTOR_BASE * emblaApi.scrollSnapList().length;
    },
    []
  );

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue =
            1 - Math.abs(diffToTarget * tweenScaleFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue =
            1 - Math.abs(diffToTarget * tweenOpacityFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  const tweenGlowOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";
      const threshold = 0.1; // Adjust this value to control the threshold

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const distance = Math.abs(diffToTarget);
          const glowOpacity = numberWithinRange(
            1 - distance / threshold,
            0,
            1
          ).toString();
          emblaApi
            .slideNodes()
            // eslint-disable-next-line no-unexpected-multiline
            [slideIndex].style.setProperty("--glow-opacity", glowOpacity);
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenScaleFactor(emblaApi);
    setTweenOpacityFactor(emblaApi);
    setTweenGlowOpacityFactor(emblaApi);
    tweenScale(emblaApi);
    tweenOpacity(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenScaleFactor)
      .on("reInit", setTweenOpacityFactor)
      .on("reInit", setTweenGlowOpacityFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity)
      .on("reInit", tweenGlowOpacity)
      .on("scroll", tweenGlowOpacity)
      .on("slideFocus", tweenGlowOpacity);
  }, [
    emblaApi,
    setTweenNodes,
    setTweenScaleFactor,
    setTweenOpacityFactor,
    setTweenGlowOpacityFactor,
    tweenScale,
    tweenOpacity,
    tweenGlowOpacity,
  ]);

  return (
    <div className="embla my-20">
      <div className="embla__viewport py-20" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div
              className="embla__slide max-[350px]:[flex:0_0_18rem] [flex:0_0_20rem] md:[flex:0_0_45rem] [touch-action:pan-y_pinch-zoom] [backface-visibility:hidden] flex "
              key={index}
            >
              <div
                className={`embla__slide__number w-full [backface-visibility:hidden] flex items-center justify-center h-full relative before:absolute before:inset-3 before:-z-20 before:rounded-full before:bg-purple-500/50 before:blur-2xl lg:before:inset-4 lg:before:blur-3xl before:transition-opacity before:opacity-[--glow-opacity] ${
                  className || ""
                }`}
              >
                <div className="h-full w-full">
                  <div className="group relative z-0 h-full w-full overflow-hidden rounded-xl p-[1px] ring-1 ring-purple-300/15">
                    <div className="rounded-xl bg-purple-900/10 p-2 w-full h-full">
                      <div className="overflow-hidden rounded-xl h-full w-full">
                        {slide}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        <div className="flex items-center justify-center gap-3">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
