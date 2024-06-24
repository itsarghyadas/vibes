import React, { useEffect, useRef } from "react";
import "./splitflap.css";

type SplitFlipAnimationProps = {
  beginStr: string;
  endStr: string;
  speed?: number;
  rows: number;
  columns: number;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
};

const SplitFlipAnimation: React.FC<SplitFlipAnimationProps> = ({
  beginStr,
  endStr,
  speed = 0.17,
  rows,
  columns,
  align = "left",
  verticalAlign = "top",
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalFlaps = rows * columns;
    const beginStrArray = beginStr
      .toUpperCase()
      .padEnd(totalFlaps, " ")
      .split("");
    const endStrArray = Array(totalFlaps).fill(" ");

    const calculateWordPositions = () => {
      const positions: { word: string; row: number; column: number }[] = [];
      const words = endStr.split(" ");
      let startRow = 0;

      switch (verticalAlign) {
        case "middle":
          startRow = Math.floor((rows - words.length) / 2);
          break;
        case "bottom":
          startRow = rows - words.length;
          break;
        default:
          startRow = 0;
      }

      words.forEach((word, index) => {
        let col = 0;
        switch (align) {
          case "center":
            col = Math.floor((columns - word.length) / 2);
            break;
          case "right":
            col = columns - word.length;
            break;
          default:
            col = 0;
        }

        positions.push({ word, row: startRow + index, column: col });
      });

      return positions;
    };

    const wordPositions = calculateWordPositions();

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
      _b1: NodeListOf<HTMLElement>,
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
  }, [beginStr, endStr, speed, rows, columns, align, verticalAlign]);

  const getAlignmentStyle = () => {
    let justifyContent;
    let alignItems;

    switch (align) {
      case "center":
        justifyContent = "center";
        break;
      case "right":
        justifyContent = "flex-end";
        break;
      default:
        justifyContent = "flex-start";
    }

    switch (verticalAlign) {
      case "middle":
        alignItems = "center";
        break;
      case "bottom":
        alignItems = "flex-end";
        break;
      default:
        alignItems = "flex-start";
    }

    return { justifyContent, alignItems };
  };

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.classList.add("show");
    }
  }, []);

  return (
    <div className="animated-div shadow-[10px_10px_10px_10px_rgba(0,0,0,0.45)] bg-neutral-900/50 backdrop-blur border-[20px] border-neutral-950/80 p-5 rounded-lg flex flex-col items-center justify-center">
      <div
        className=" flex flex-wrap items-center justify-start"
        ref={divRef}
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "10px",
          ...getAlignmentStyle(),
        }}
      ></div>
    </div>
  );
};

export default SplitFlipAnimation;
