import { useState, useEffect } from "react";
import Vestabaord from "./vestaboard";

type WordPosition = {
  word: string;
  row: number;
  column: number;
};

interface Props {
  columns?: number;
  rows?: number;
  text?: string;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  speed?: number;
}

export default function VestaboardShow({
  columns: initialColumns = 12,
  rows: initialRows = 6,
  text: initialEndStr = "I AM A ROBOT",
  align: initialAlign = "right",
  verticalAlign: initialVerticalAlign = "top",
  speed: initialSpeed = 0.15,
}: Props) {
  const initialBeginStr = "HELLO";
  const initialWordPositions: WordPosition[] = [
    { word: initialBeginStr, row: 0, column: 0 },
    { word: "", row: 1, column: 2 },
    { word: "", row: 2, column: 4 },
    { word: "", row: 3, column: 5 },
  ];

  const [beginStr, setBeginStr] = useState(initialBeginStr);
  const [endStr, setEndStr] = useState(initialEndStr);
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [speed, setSpeed] = useState(initialSpeed);
  const [align, setAlign] = useState(initialAlign);
  const [verticalAlign, setVerticalAlign] = useState(initialVerticalAlign);
  const [, setWordPositions] = useState<WordPosition[]>(initialWordPositions);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const words = endStr.split(" ");
    setWordPositions((prevWordPositions) => {
      const newWordPositions = words.map((word, index) => ({
        word,
        row: prevWordPositions[index]?.row ?? index,
        column: prevWordPositions[index]?.column ?? 0,
      }));
      return newWordPositions;
    });
    setRows((prevRows) => Math.max(prevRows, words.length));
  }, [endStr, resetKey]);

  const resetAnimation = () => {
    setBeginStr(initialBeginStr);
    setEndStr(initialEndStr);
    setRows(initialRows);
    setColumns(initialColumns);
    setSpeed(initialSpeed);
    setAlign(initialAlign);
    setVerticalAlign(initialVerticalAlign);
    setWordPositions(initialWordPositions);
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="splitflip-body flex flex-col items-center justify-center min-h-screen h-full space-y-4 pb-20">
      <div className="gap-y-2 my-10 max-w-4xl mx-auto flex flex-wrap items-center gap-x-10 border rounded-lg border-neutral-500 p-5 font-space">
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Begin String</label>
          <input
            type="text"
            value={beginStr}
            onChange={(e) => setBeginStr(e.target.value)}
            placeholder="Begin String"
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">End String</label>
          <input
            type="text"
            value={endStr}
            onChange={(e) => setEndStr(e.target.value)}
            placeholder="End String"
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Rows</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            placeholder="Rows"
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Columns</label>
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            placeholder="Columns"
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Speed</label>
          <input
            type="number"
            value={speed}
            step="0.01"
            onChange={(e) => setSpeed(Number(e.target.value))}
            placeholder="Speed"
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Align</label>
          <select
            value={align}
            onChange={(e) =>
              setAlign(e.target.value as "left" | "center" | "right")
            }
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="text-neutral-500/50">Vertical Align</label>
          <select
            value={verticalAlign}
            onChange={(e) =>
              setVerticalAlign(e.target.value as "top" | "middle" | "bottom")
            }
            className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
        <button
          onClick={resetAnimation}
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded"
        >
          Reset Animation
        </button>
      </div>

      <Vestabaord
        beginStr={beginStr}
        endStr={endStr}
        speed={speed}
        rows={rows}
        columns={columns}
        align={align}
        verticalAlign={verticalAlign}
      />
    </div>
  );
}
