import React, { useEffect, useState } from "react";
import "./vestaboard.css";

type VestabaordProps = {
  beginStr: string;
  endStr: string;
  speed?: number;
  rows: number;
  columns: number;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
};

type Character = {
  prevChar: string;
  nextChar: string;
  className: string;
  flipClass: string;
  flipToggle: boolean;
  speed: number;
};
type Row = Character[];
type State = Row[];
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 !@#$()-+&=;:'\"%,.".split("");

const getState = (
  text: string,
  rows: number,
  columns: number,
  verticalAlign: "top" | "middle" | "bottom",
  align: "left" | "center" | "right"
): State => {
  const words = text.toUpperCase().split(/\s+/);
  const state: State = Array(rows)
    .fill(null)
    .map(() =>
      Array(columns).fill({
        prevChar: " ",
        nextChar: " ",
        className: "",
        flipClass: "",
        flipToggle: false,
        speed: 0.15,
      })
    );

  const startRow =
    verticalAlign === "top"
      ? 0
      : verticalAlign === "bottom"
      ? Math.max(0, rows - words.length)
      : Math.max(0, Math.floor((rows - words.length) / 2));

  words.forEach((word, index) => {
    const rowIndex = startRow + index;
    if (rowIndex < rows) {
      let startCol = 0;
      if (align === "right") {
        startCol = Math.max(0, columns - word.length);
      } else if (align === "center") {
        startCol = Math.max(0, Math.floor((columns - word.length) / 2));
      }

      for (let j = 0; j < word.length; j++) {
        if (startCol + j < columns) {
          const char = word[j];
          state[rowIndex][startCol + j] = {
            prevChar: char,
            nextChar: char,
            className: "",
            flipClass: "",
            flipToggle: false,
            speed: 0.15,
          };
        }
      }
    }
  });

  return state;
};

const calculateNextState = (
  prev: State,
  endStr: string,
  rows: number,
  columns: number,
  verticalAlign: "top" | "middle" | "bottom",
  align: "left" | "center" | "right"
): State => {
  const endState = getState(endStr, rows, columns, verticalAlign, align);

  return prev.map((row, rowIndex) =>
    row.map((character, colIndex) => {
      const targetChar = endState[rowIndex][colIndex].nextChar;

      const nextChar =
        targetChar === " "
          ? " "
          : character.nextChar === targetChar
          ? targetChar
          : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      const className = nextChar === targetChar ? "final" : "";
      const flipClass = nextChar !== character.nextChar ? "flip" : "";
      const flipToggle = !character.flipToggle;
      return {
        prevChar: character.nextChar,
        nextChar,
        className,
        flipClass,
        flipToggle,
        speed: 0.15,
      };
    })
  );
};

const Vestabaord: React.FC<VestabaordProps> = ({
  beginStr,
  endStr,
  speed = 0.17,
  rows,
  columns,
  align = "left",
  verticalAlign = "top",
}) => {
  const [state, setState] = useState<State>(
    getState(beginStr, rows, columns, verticalAlign, align).map(
      (row) => row.map((char) => ({ ...char, speed })) // Initialize speed in state
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prevState) => {
        const newState = calculateNextState(
          prevState,
          endStr,
          rows,
          columns,
          verticalAlign,
          align
        ).map(
          (row) => row.map((char) => ({ ...char, speed })) // Update speed in new state
        );
        const endState = getState(endStr, rows, columns, verticalAlign, align);
        if (
          newState.flat().every((char, idx) => {
            return char.nextChar === endState.flat()[idx].nextChar;
          })
        ) {
          clearInterval(interval);
          return newState.map((row) =>
            row.map((char) => ({
              ...char,
              prevChar: char.nextChar,
              flipClass: "",
              flipToggle: false,
            }))
          );
        }
        return newState;
      });
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [speed, endStr, rows, columns, verticalAlign, align]);

  useEffect(() => {
    setState(
      getState(beginStr, rows, columns, verticalAlign, align).map((row) =>
        row.map((char) => ({ ...char, speed }))
      )
    );
  }, [beginStr, rows, columns, verticalAlign, align, speed]);

  return (
    <div className="max-w-5xl mx-auto animated-div shadow-[10px_10px_10px_10px_rgba(0,0,0,0.45)] bg-neutral-900/50 backdrop-blur border-[20px] border-neutral-950/80 p-5 rounded-lg">
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "10px",
        }}
      >
        {state.flat().map((character, index) => (
          <div
            key={`${index}-${character.flipToggle}`}
            className="relative min-w-[55px] h-20 leading-[80px] text-4xl text-center text-[#d3d3d3] shadow-[inset_2px_2px_2px_2px_rgba(0,0,0,0.5)] rounded-md"
          >
            <div className="top relative h-10 w-full rounded-t-md overflow-hidden z-0 shadow-[inset_2px_2px_2px_2px_rgba(0,0,0,0.5)] rounded-md">
              {character.prevChar}
            </div>

            <div
              className={`bottom relative h-20 w-full -mt-10 rounded-md -z-[1] bg-[#1a1a1a] bg-[linear-gradient(rgba(0,0,0,0),_#1a1a1a)] origin-center shadow-[inset_2px_2px_2px_2px_rgba(0,0,0,0.8)] ${
                character.flipClass === "flip" ? "flip1" : ""
              }`}
              style={{ animationDuration: `${character.speed}s` }}
            >
              {character.prevChar}
            </div>

            <div
              className={`nextHalf relative h-10 w-full -mt-20 overflow-hidden rounded-t-md z-[2] bg-[#1a1a1a] bg-[linear-gradient(#1a1a1a,_rgba(0,0,0,0));] origin-bottom shadow-[inset_2px_2px_2px_2px_rgba(0,0,0,0.8)] ${
                character.flipClass === "flip" ? "flip2" : ""
              }`}
              style={{ animationDuration: `${character.speed}s` }}
            >
              {character.nextChar}
            </div>

            <div className="nextFull relative h-20 w-full bg-[#1a1a1a] -mt-10 rounded-md -z-[3]">
              {character.nextChar}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vestabaord;
