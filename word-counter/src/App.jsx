import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [text,setText] = useState("");
  const [characterCount,setCharacterCount] = useState(0);
  const [wordCount,setWordCount] = useState(0);
  const [sentenceCount,setSentenceCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setText(text);
    setCharacterCount(text.length);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setSentenceCount(text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length);
  }

  const handleReset = () => {
    setText("");
    setCharacterCount(0);
    setWordCount(0);
    setSentenceCount(0);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Text Analyzer
        </h1>
        
        <div className="flex gap-8">
          {/* Text Input Section */}
          <div className="w-1/2">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Type or paste your text here..."
              className="w-full h-80 p-4 border rounded-lg shadow-sm focus:ring-4 focus:ring-blue-400 focus:border-blue-500 resize-none transition-all duration-300"
            />
          </div>
  
          <div className="w-1/2">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md h-80 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-gray-700">Results</h2>
  
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Characters:</span>
                  <span className="text-2xl font-bold text-blue-600">{characterCount}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Words:</span>
                  <span className="text-2xl font-bold text-blue-600">{wordCount}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Sentences:</span>
                  <span className="text-2xl font-bold text-blue-600">{sentenceCount}</span>
                </div>
              </div>
  
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 text-white bg-blue-400 rounded-lg hover:bg-red-500 hover:text- cursor-pointer transition-colors shadow-md"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default App;
