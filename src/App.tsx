import { useState, useEffect } from "react";
import SplitFlipAnimation from "./components/splitflap";

type WordPosition = {
  word: string;
  row: number;
  column: number;
};

export default function App() {
  const initialBeginStr = "HELLO";
  const initialEndStr = "I AM A ROBOT";
  const initialRows = 4;
  const initialColumns = 12;
  const initialSpeed = 0.15;
  const initialWordPositions = [
    { word: initialBeginStr, row: 0, column: 0 },
    { word: "", row: 1, column: 2 },
    { word: "", row: 2, column: 4 },
    { word: "", row: 3, column: 5 },
  ];

  const [beginStr, setBeginStr] = useState(initialBeginStr);
  const [endStr, setEndStr] = useState(initialEndStr);
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [speed, setSpeed] = useState(initialSpeed); // Add state for speed
  const [wordPositions, setWordPositions] =
    useState<WordPosition[]>(initialWordPositions);
  const [resetKey, setResetKey] = useState(0);

  const generateWordPositions = (
    endStr: string,
    positions: { row: number; column: number }[]
  ) => {
    const words = endStr.split(" ");
    return positions.map((pos, index) => ({
      word: words[index] || "",
      row: index, // Set row to the index of the word
      column: pos.column,
    }));
  };

  useEffect(() => {
    const words = endStr.split(" ");
    const newWordPositions = words.map((word, index) => ({
      word,
      row: index, // Set row to the index of the word
      column: wordPositions[index]?.column ?? 0,
    }));

    for (let i = wordPositions.length; i < words.length; i++) {
      newWordPositions[i] = { word: words[i], row: i, column: 0 };
    }

    setWordPositions(newWordPositions);
    setRows(Math.max(rows, words.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endStr, resetKey]);

  const handleWordPositionChange = (
    index: number,
    field: "row" | "column",
    value: number
  ) => {
    const newWordPositions = [...wordPositions];
    newWordPositions[index][field] = value - 1;
    setWordPositions(generateWordPositions(endStr, newWordPositions));
  };

  const resetAnimation = () => {
    setBeginStr(initialBeginStr);
    setEndStr(initialEndStr);
    setRows(initialRows);
    setColumns(initialColumns);
    setSpeed(initialSpeed); // Reset speed
    setWordPositions(initialWordPositions);
    setResetKey((prevKey) => prevKey + 1); // Change the key to force re-mount
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full space-y-4 pb-20">
      <div className="gap-y-2 my-10 flex flex-col border rounded-lg border-neutral-500 p-5 font-space">
        <label className="text-neutral-500/50">Begin String</label>
        <input
          type="text"
          value={beginStr}
          onChange={(e) => setBeginStr(e.target.value)}
          placeholder="Begin String"
          className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <label className="text-neutral-500/50">End String</label>
        <input
          type="text"
          value={endStr}
          onChange={(e) => setEndStr(e.target.value)}
          placeholder="End String"
          className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <label className="text-neutral-500/50">Rows</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          placeholder="Rows"
          className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <label className="text-neutral-500/50">Columns</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          placeholder="Columns"
          className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <label className="text-neutral-500/50">Speed</label>
        <input
          type="number"
          value={speed}
          step="0.01"
          onChange={(e) => setSpeed(Number(e.target.value))}
          placeholder="Speed"
          className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
        />
        <label className="text-neutral-500/50">Word Positions</label>
        {wordPositions.map((pos, index) => (
          <div key={index} className="flex space-x-2">
            <div className="flex flex-col gap-y-1">
              <label className="text-neutral-500/50">Row</label>
              <input
                type="number"
                value={pos.row + 1}
                onChange={(e) =>
                  handleWordPositionChange(index, "row", Number(e.target.value))
                }
                placeholder="Row"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-neutral-500/50">Column</label>
              <input
                type="number"
                value={pos.column + 1}
                onChange={(e) =>
                  handleWordPositionChange(
                    index,
                    "column",
                    Number(e.target.value)
                  )
                }
                placeholder="Column"
                className="rounded text-sm bg-neutral-800 h-10 p-2 text-white ring-2 ring-neutral-500/50 placeholder:text-neutral-500/50 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:outline-none"
              />
            </div>
          </div>
        ))}
        <button
          onClick={resetAnimation}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
        >
          Reset Animation
        </button>
      </div>
      <SplitFlipAnimation
        key={resetKey}
        beginStr={beginStr}
        endStr={endStr}
        rows={rows}
        columns={columns}
        wordPositions={wordPositions}
        speed={speed}
      />
    </div>
  );
}
