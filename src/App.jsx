import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css'; // Pastikan ini adalah file CSS yang sudah diatur untuk Tailwind

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <header className="flex gap-8 mb-8">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-32 h-32 transition-transform transform hover:scale-110" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-32 h-32 transition-transform transform hover:scale-110" alt="React logo" />
        </a>
      </header>
      <main className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-700">Vite + React</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-gray-700">
            Edit <code className="bg-gray-200 p-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="mt-6 text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  );
}

export default App;
