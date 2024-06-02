import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type WordPosition = {
  word: string;
  row: number;
  column: number;
};

type SplitFlipAnimationProps = {
  beginStr: string;
  endStr: string;
  speed?: number;
  rows: number;
  columns: number;
  wordPositions: WordPosition[];
};

const SplitFlipAnimation: React.FC<SplitFlipAnimationProps> = ({
  beginStr,
  endStr,
  speed = 0.17,
  rows,
  columns,
  wordPositions,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalFlaps = rows * columns;
    const beginStrArray = beginStr
      .toUpperCase()
      .padEnd(totalFlaps, " ")
      .split("");
    const endStrArray = Array(totalFlaps).fill(" ");

    wordPositions.forEach(({ word, row, column }) => {
      word.split("").forEach((char, index) => {
        const position = row * columns + column + index;
        if (position < totalFlaps) {
          endStrArray[position] = char.toUpperCase();
        }
      });
    });

    let html = "";
    for (let x = 0; x < totalFlaps; x++) {
      html +=
        '<div class="splitflap"><div class="top"></div><div class="bottom"></div><div class="nextHalf"></div><div class="nextFull"></div></div>';
    }
    if (divRef.current) {
      divRef.current.innerHTML = html;
    }

    const a1 = divRef.current?.querySelectorAll<HTMLElement>(".top");
    const a2 = divRef.current?.querySelectorAll<HTMLElement>(".bottom");
    const b1 = divRef.current?.querySelectorAll<HTMLElement>(".nextFull");
    const b2 = divRef.current?.querySelectorAll<HTMLElement>(".nextHalf");
    if (a1 && a2 && b1 && b2) {
      for (let x = 0; x < a1.length; x++) {
        a2[x].style.animationDuration = `${speed}s`;
        b2[x].style.animationDuration = `${speed}s`;
      }
    }

    const char = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      " ",
      "!",
      "@",
      "#",
      "$",
      "(",
      ")",
      "-",
      "+",
      "&",
      "=",
      ";",
      ":",
      "'",
      '"',
      "%",
      ",",
      ".",
    ];
    const strCount: number[] = [];
    const flag: boolean[] = [];
    for (let x = 0; x < totalFlaps; x++) {
      strCount[x] = Math.floor(Math.random() * char.length); // Initialize with random character index
      flag[x] = false;
    }
    let flag2 = true;

    const flipInterval = setInterval(() => {
      if (a1 && a2 && b1 && b2) {
        for (let x = 0; x < totalFlaps; x++) {
          if (endStrArray[x] !== " ") {
            // Only flip if the target character is not a space
            if (b1[x].innerHTML === endStrArray[x])
              dontFlipIt(x, a1, a2, b1, b2, char, strCount, flag);
            else flipIt(x, a1, a2, b1, b2, char, strCount);
            if (flag.every((e) => e) && flag2) {
              flag2 = false;
              changeDestination(beginStrArray, endStrArray, flag);
            }
          } else {
            // Reset the background color for empty boxes
            a2[x].style.backgroundColor = "#1a1a1a";
            b2[x].style.backgroundColor = "#1a1a1a";
          }
        }
      }
    }, speed * 1000);

    function flipIt(
      x: number,
      a1: NodeListOf<HTMLElement>,
      a2: NodeListOf<HTMLElement>,
      b1: NodeListOf<HTMLElement>,
      b2: NodeListOf<HTMLElement>,
      char: string[],
      strCount: number[]
    ) {
      a1[x].innerHTML =
        char[strCount[x] === 0 ? char.length - 1 : strCount[x] - 1];
      a2[x].innerHTML =
        char[strCount[x] === 0 ? char.length - 1 : strCount[x] - 1];
      b1[x].innerHTML = char[strCount[x]];
      b2[x].innerHTML = char[strCount[x]];
      a2[x].classList.remove("flip1");
      void a2[x].offsetWidth; // Trigger reflow
      a2[x].classList.add("flip1");
      b2[x].classList.remove("flip2");
      void b2[x].offsetWidth; // Trigger reflow
      b2[x].classList.add("flip2");
      if (strCount[x] > char.length - 2) strCount[x] = 0;
      else strCount[x]++;
    }

    function dontFlipIt(
      x: number,
      a1: NodeListOf<HTMLElement>,
      a2: NodeListOf<HTMLElement>,
      b1: NodeListOf<HTMLElement>,
      b2: NodeListOf<HTMLElement>,
      char: string[],
      strCount: number[],
      flag: boolean[]
    ) {
      flag[x] = true;
      a2[x].classList.remove("flip2");
      a2[x].style.backgroundColor = "#1a1a1a"; // Adjusted
      b2[x].style.backgroundColor = "#1a1a1a"; // Adjusted
      a1[x].innerHTML =
        char[strCount[x] === 0 ? char.length - 1 : strCount[x] - 1];
      a2[x].innerHTML =
        char[strCount[x] === 0 ? char.length - 1 : strCount[x] - 1];
    }

    function changeDestination(
      beginStr: string[],
      endStr: string[],
      flag: boolean[]
    ) {
      setTimeout(() => {
        flag.fill(false);

        const tempArr = endStr.slice();
        endStr = beginStr.slice();
        beginStr = tempArr.slice();
      }, 3000);
    }
    return () => {
      clearInterval(flipInterval);
    };
  }, [beginStr, endStr, speed, rows, columns, wordPositions]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        translate: "0 4rem",
        transform: "perspective(500px) rotateX(10deg)",
      }}
      animate={{
        opacity: 1,
        translate: 0,
        transform: "perspective(500px) rotateX(0deg)",
      }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: "easeInOut",
        easings: "cubic-bezier(.8,0,.2,1)",
      }}
      className="shadow-[10px_10px_10px_10px_rgba(0,0,0,0.45)] bg-neutral-900/50 backdrop-blur border-[20px] border-neutral-950/80 p-5 rounded-lg flex flex-col items-center justify-center"
    >
      <div
        className="center flex flex-wrap items-center justify-start"
        ref={divRef}
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "10px",
        }}
      ></div>
    </motion.div>
  );
};

export default SplitFlipAnimation;
