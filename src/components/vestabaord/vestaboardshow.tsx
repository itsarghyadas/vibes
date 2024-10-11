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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="splitflip-body flex flex-col items-center justify-center min-h-screen h-full space-y-4 pb-20 relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-4 right-4 bg-orange-500 text-sm font-bold text-white py-2 px-4 rounded z-10"
      >
        {isMenuOpen ? "Close Options" : "Open Options"}
      </button>

      {isMenuOpen && (
        <div className="fixed bottom-16 right-4 bg-neutral-800 border border-neutral-500 rounded-lg p-5 shadow-lg z-10 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="gap-y-2 flex flex-col items-start gap-x-10 font-semibold">
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Begin String</label>
              <input
                type="text"
                value={beginStr}
                onChange={(e) => setBeginStr(e.target.value)}
                placeholder="Begin String"
                className="rounded text-sm placeholder:text-xs bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">End String</label>
              <input
                type="text"
                value={endStr}
                onChange={(e) => setEndStr(e.target.value)}
                placeholder="End String"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Rows</label>
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                placeholder="Rows"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Columns</label>
              <input
                type="number"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                placeholder="Columns"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Speed</label>
              <input
                type="number"
                value={speed}
                step="0.01"
                onChange={(e) => setSpeed(Number(e.target.value))}
                placeholder="Speed"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Align</label>
              <select
                value={align}
                onChange={(e) =>
                  setAlign(e.target.value as "left" | "center" | "right")
                }
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-neutral-500 text-sm">Vertical Align</label>
              <select
                value={verticalAlign}
                onChange={(e) =>
                  setVerticalAlign(
                    e.target.value as "top" | "middle" | "bottom"
                  )
                }
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none w-full"
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            <button
              onClick={resetAnimation}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded w-full"
            >
              Reset Animation
            </button>
          </div>
        </div>
      )}

      <Vestabaord
        key={resetKey}
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
