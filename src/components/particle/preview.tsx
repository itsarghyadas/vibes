import { useState } from "react";
import ParticlePreview from "./particle";

export default function ParticleShowcase() {
  const [particleProps, setParticleProps] = useState({
    amount: 500,
    minSpeed: 5,
    maxSpeed: 25,
    color: "#f19fd875",
    minSize: 1,
    maxSize: 3,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticleProps((prev) => ({
      ...prev,
      [name]: name === "color" ? value : Number(value),
    }));
  };
  return (
    <div className="flex flex-col gap-y-10 bg-neutral-900 py-20">
      <ParticlePreview
        amount={particleProps.amount}
        minSpeed={particleProps.minSpeed}
        maxSpeed={particleProps.maxSpeed}
        color={particleProps.color}
        minSize={particleProps.minSize}
        maxSize={particleProps.maxSize}
      />
      <div className="bg-neutral-800 border p-4 rounded-lg max-w-2xl mx-auto">
        <h3 className="text-white mb-2">Particle Controls</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-white">
            Amount:
            <input
              type="number"
              name="amount"
              value={particleProps.amount}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
          <label className="text-white">
            Min Speed:
            <input
              type="number"
              name="minSpeed"
              value={particleProps.minSpeed}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
          <label className="text-white">
            Max Speed:
            <input
              type="number"
              name="maxSpeed"
              value={particleProps.maxSpeed}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
          <label className="text-white">
            Color:
            <input
              type="color"
              name="color"
              value={particleProps.color}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
          <label className="text-white">
            Min Size:
            <input
              type="number"
              name="minSize"
              value={particleProps.minSize}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
          <label className="text-white">
            Max Size:
            <input
              type="number"
              name="maxSize"
              value={particleProps.maxSize}
              onChange={handleInputChange}
              className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
