import React, { useState } from 'react';

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState('黒大豆');
  const [area, setArea] = useState('');
  const [results, setResults] = useState({});
  const cropYieldMultiplier = {
    黒大豆: 53000,
    春麦:93000,
    秋小麦:123000,
    とうもろこし: 45000,
    飼料用米: 85000,
    新市場: 143000,
    蕎麦: 20000,
    加工用米: 55000,
    食用米: 78000
  };

  const calculateYield = () => {
    const selectedMultiplier = cropYieldMultiplier[selectedCrop];
    if (selectedMultiplier) {
      const calculatedYield = area * selectedMultiplier;
      setResults({ ...results, [selectedCrop]: calculatedYield });
      setArea(''); // フィールドをクリア
    } else {
      setResults({ ...results, [selectedCrop]: '選択した作物に対する収穫量係数が見つかりません' });
    }
  };

  const calculateTotalYield = () => {
    const totalYield = Object.values(results).reduce((total, yieldValue) => total + yieldValue, 0);
    return totalYield;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-10 mt-10">作物収穫量計算アプリ</h1>
      <div className="mb-10">
        <label className="block text-3xl font-medium">作物の種類:</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="block w-full p-2 border rounded-md"
        >
          {Object.keys(cropYieldMultiplier).map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">面積 (㎡):</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="block w-full p-2 border rounded-md"
        />
      </div>
      <button onClick={calculateYield} className="bg-blue-500 text-white p-2 rounded-md">
        計算
      </button>
      {results[selectedCrop] && (
        <p className="mt-4">
          {selectedCrop}:  {results[selectedCrop]} 円
        </p>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">合計金額:</h2>
        <p className="text-xl">{calculateTotalYield()} 円</p>
      </div>
    </div>
  );
};

export default App;
