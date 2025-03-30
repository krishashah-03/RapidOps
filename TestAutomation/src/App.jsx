import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomForm from './pages/CustomForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomForm />
    </>
  )
}

export default App
