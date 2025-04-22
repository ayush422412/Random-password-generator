import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1698618/pexels-photo-1698618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", // Replace with your actual image
      }}
    >
      <div className="w-full max-w-md shadow-lg rounded-2xl px-6 py-6 text-orange-500 bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-600">
        <h1 className="text-white text-center text-3xl font-bold mb-6">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-lg text-black"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 transition-all"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="lengthRange" className="mr-2 font-medium">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              id="lengthRange"
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full ml-4 cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="font-medium">Include Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="font-medium">Include Symbols</label>
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

