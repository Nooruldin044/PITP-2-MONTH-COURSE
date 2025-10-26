import { useState } from 'react'
import './App.css'
import UserCard from './components/UserCard'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React + Vite</h1>
      
      {/* Counter Component */}
      <Counter />
      
      {/* UserCard Component */}
      <UserCard 
        name="Noor Ul Din"
        email="Nooruldin@example.com"
        age={28}
        role="Developer"
      />
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
    </>
  )
}

export default App