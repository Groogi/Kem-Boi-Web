import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ padding: '20px' }}>
      <h1>Join the Kem Boi Family</h1>
      <p>Enter your details to register</p>
      
      <input type="email" placeholder="Email Address" />
      <br /><br />
      <input type="password" placeholder="Password" />
      <br /><br />
      <button>Sign Up</button>
    </div>
    </>
  )
}

export default App
