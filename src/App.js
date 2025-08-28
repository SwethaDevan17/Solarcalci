import React, { useState } from "react";

function App() {
  const [readings, setReadings] = useState(Array(6).fill("")); // 6 months
  const [results, setResults] = useState(null);

  const handleChange = (index, value) => {
    const newReadings = [...readings];
    newReadings[index] = value;
    setReadings(newReadings);
  };

  const calculate = () => {
    const numericReadings = readings.map(r => parseFloat(r) || 0);
    const total = numericReadings.reduce((sum, val) => sum + val, 0);
    const average = total / 6;

    // Next month prediction: same as average
    const prediction = average;

    // Solar sizing logic
    const dailyConsumption = average / 30; // kWh per day
    const panelVoltage = 45; // Reference Vmp of typical solar panel
    const panelPower = 300; // Assume each panel is 300W
    const systemVoltage = 230; // Household supply voltage in V

    const requiredPower = dailyConsumption * 1000; // Wh per day

    // Fixed assumption: average 5 peak sun hours/day
    const peakSunHours = 5;
    const panelOutputPerDay = panelPower * peakSunHours;
    const panelsNeeded = Math.ceil(requiredPower / panelOutputPerDay);

    setResults({
      average: average.toFixed(2),
      prediction: prediction.toFixed(2),
      dailyConsumption: dailyConsumption.toFixed(2),
      requiredPower: requiredPower.toFixed(0),
      panelsNeeded,
      panelVoltage,
      systemVoltage,
      peakSunHours
    });
  };

  return (
    <div className="container">
      <h1>Solar Calculator</h1>
      <p>Enter your electricity consumption (kWh) for the last 6 months:</p>

      <div className="inputs">
        {readings.map((val, idx) => (
          <input
            key={idx}
            type="number"
            value={val}
            placeholder={`Month ${idx + 1}`}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
        ))}
      </div>

      <button onClick={calculate}>Calculate</button>

      {results && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Average Monthly Consumption:</strong> {results.average} kWh</p>
          <p><strong>Predicted Next Month:</strong> {results.prediction} kWh</p>
          <p><strong>Daily Average Consumption:</strong> {results.dailyConsumption} kWh/day</p>
          <p><strong>Required Power (per day):</strong> {results.requiredPower} Wh</p>
          <p><strong>Estimated Panels Needed:</strong> {results.panelsNeeded}</p>
          <p><strong>Panel Voltage (Vmp):</strong> {results.panelVoltage} V</p>
          <p><strong>House System Voltage:</strong> {results.systemVoltage} V</p>
          <p><strong>Assumed Peak Sun Hours:</strong> {results.peakSunHours} hrs/day</p>
        </div>
      )}
    </div>
  );
}

export default App;
