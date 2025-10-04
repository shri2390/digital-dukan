import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DigitalDukanApp from './digital_dukan_react_tailwind_single_file_preview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DigitalDukanApp />
    </>
  )
}

export default App
