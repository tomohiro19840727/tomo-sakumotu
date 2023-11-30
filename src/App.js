import React, { useState } from 'react';

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState('黒大豆');
  const [area, setArea] = useState('');
  const [results, setResults] = useState({});
  const cropYieldMultiplier = {
    黒大豆: 58100, //1俵 15000円 (35000 + 8100 + 15000) 
    春麦:98300, // 1俵 2800円 (35000 + 8100 + (4俵(2800円 + 6000円）✖️ 4 = 35200) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円
    秋小麦:111100,  // 1俵 2000円 (35000 + 8100 + (6俵(1800円 + 6000円）✖️ 6 = 48000) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    飼料用米: 104140,//85000(収量) + 15000(省力化) + 3900(町) + (8俵単価30円 = 240円)
    新市場: 145000,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 6俵（単価10000円）
    蕎麦: 52720,//20000 + 面積払い13000円 + 数量払い１俵16720円 + 単価1俵3000円  
    食用米ゆめぴりか: 72000,//6俵,単価12000円
    食用米ななつぼし: 71500,  //6.5俵 単価11000円
  
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
    const totalWithAdditionalAmount = totalYield + 77000; // Add 77,000 yen
  return totalWithAdditionalAmount;
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
