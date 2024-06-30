import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passWordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZacbdefghijklmnopqrstuvwxyz"
    if (numAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "~!@#$%^&*-_+=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  const copyPassword = useCallback(() => {
    passWordRef.current?.select();
    passWordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 bg-indigo-500 mt-7'>
        <h1 className='text-3xl text-center text-white mb-6'>Password Generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4 bg-white'>
          <input type="text" value={password} className='outline-none w-full py-2 px-4 text-gray-700' placeholder='password' ref={passWordRef} readOnly />
          <button onClick={copyPassword} className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none'>Copy</button>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className='w-full'
            />
            <span className='ml-4 text-gray-200'>Length: {length}</span>
          </div>
          <div className='flex items-center text-gray-200'>
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              onChange={() => {
                setNumAllow((prev) => !prev)
              }}
              className='cursor-pointer mr-2 border-gray-300 rounded text-blue-500 focus:ring-blue-500'
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center text-gray-200'>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id='characterInput'
              onChange={() => {
                setCharAllow((prev) => !prev)
              }}
              className='cursor-pointer mr-2 border-gray-300 rounded text-blue-500 focus:ring-blue-500'
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App