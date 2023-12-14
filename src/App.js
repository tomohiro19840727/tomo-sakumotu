import React, { useState } from 'react';

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState('黒大豆');
  const [area, setArea] = useState('');
  const [results, setResults] = useState({});
  const [useFertilizer, setUseFertilizer] = useState(false);

  const cropYieldMultiplier = {
    黒大豆: 49100, //1俵 6000円 (35000 + 8100 + 6000) 

    春麦: 89500, // 1俵 2800円 (35000 + 8100 + (3俵(2800円 + 6000円）✖️ 3 = 26400) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

   
    秋小麦:88900,  // 1俵 2000円 (35000 + 8100 + (4俵(1800円 + 6000円）✖️ 4 = 25800) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    飼料用米: 104140,//85000(収量) + 15000(省力化) + 3900(町) + (8俵単価30円 = 240円)

    新市場ゆめぴりか: 145000,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 6俵（単価10000円）

    新市場ななつぼし: 148000,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7俵（単価9000円）

    蕎麦: 52720,//20000 + 面積払い13000円 + 数量払い１俵16720円 + 単価1俵3000円  

    食用米ゆめぴりか: 72000,//6俵,単価12000円

    食用米ななつぼし: 77000,  //7俵 単価11000円
    
  };

  const cropYieldMultiplier2 = {
    黒大豆: 31428, //1俵 15000円 (35000 + 8100 + 15000) 
    // 肥料代17672円（豆持1号 40kg7590円 + コラーゲン有機30kg4102円 + FK有機40kg5980円 ）

    春麦: 68950, // 1俵 2800円 (35000 + 8100 + (3俵(2800円 + 6000円）✖️ 4 = 35200) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円
    // 肥料代20550円（有機酸カルシウム60kg3450円 + 有機複合3号100kg17100円）

    秋小麦:79870,  // 1俵 2000円 (35000 + 8100 + (4俵(1800円 + 6000円）✖️ 6 = 48000) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円
     // 肥料代9030円（有機32号60kg9030円）

    飼料用米: 88735,//85000(収量) + 15000(省力化) + 3900(町) + (8俵単価30円 = 240円)
    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    新市場ゆめぴりか: 129595,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 6俵（単価10000円）
    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    新市場ななつぼし: 132595,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7俵（単価9000円）
    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    蕎麦: 52720,//20000 + 面積払い13000円 + 数量払い１俵16720円 + 単価1俵3000円  

    食用米ゆめぴりか: 53310,//6俵,単価12000円
    //肥料代18690円（ケイサンぼかし3号20kg3090円 + PKM有機9号382 70kg12880円 + 三洋有機10kg1265円 + 有機リンカル化成31 10kg1455円）

    食用米ななつぼし: 58310,  //7俵 単価11000円
    //肥料代18690円（ケイサンぼかし3号20kg3090円 + PKM有機9号382 70kg12880円 + 三洋有機10kg1265円 + 有機リンカル化成31 10kg1455円）

  };

  const toggleFertilizer = () => {
    setUseFertilizer(!useFertilizer);
  };

  const calculateYield = () => {
    const selectedMultiplier = useFertilizer ? cropYieldMultiplier2[selectedCrop] : cropYieldMultiplier[selectedCrop];

    if (selectedMultiplier) {
      const calculatedYield = area * selectedMultiplier;
      setResults({ ...results, [selectedCrop]: calculatedYield });
      setArea(''); // フィールドをクリア
      setArea({ ...area, area}  );
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
    <>
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-10 mt-10">作物収量量最適</h1>
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
     <button
        onClick={toggleFertilizer}
        className=" bg-orange-300 text-3xl mb-10 mt-10"
      >
        {useFertilizer ? '肥料代を含む' : '肥料代を引く'}
      </button>

    <div className="flex flex-col ml-4">
        {/* <h2 className="text-2xl font-semibold">選択された作物の数値:</h2>
        {Object.entries(useFertilizer ? cropYieldMultiplier2[selectedCrop] : cropYieldMultiplier[selectedCrop]).map(([key, value]) => (
          <p key={key} className=''>
            {key}: {value}
          </p>
        ))} */}

        <h2 className="text-2xl font-semibold mt-4">計算された数値:</h2>
        {Object.entries(results).map(([crop, value]) => (
          <p key={crop}>
            {crop}: {value} 円
          </p>
        ))}
      </div>
    </div>
      </>
  );
};

export default App;
