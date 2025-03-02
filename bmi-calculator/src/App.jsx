import React, { useState } from "react";

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  const calcBmi = (event) => {
    event.preventDefault();
    if (weight === 0 || height === 0) {
      alert("Please enter valid weight and height");
      return;
    } else {
      const bmiValue = (weight / (height * height)) * 703;
      setBmi(bmiValue.toFixed(2));

      if (bmiValue < 18.5) {
        setMessage("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setMessage("Healthy");
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setMessage("Overweight");
      } else {
        setMessage("Obese");
      }
    }
  };

  const reload = () => {
    setWeight(0);
    setHeight(0);
    setBmi("");
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          BMI Calculator
        </h2>
        <form onSubmit={calcBmi} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (lbs)
            </label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              type="number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height (in)
            </label>
            <input
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              className="w-full text-black rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              type="number"
            />
          </div>

          <div className="flex gap-4">
            <button
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Calculate BMI
            </button>
            <button
              className="w-full rounded-lg border-2 border-indigo-600 px-4 py-2 font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={reload}
              type="button"
            >
              Reset
            </button>
          </div>
        </form>

        {bmi && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Your BMI is: {bmi}
            </h3>
            <p
              className={`mt-2 text-lg font-medium ${
                message === "Healthy" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
