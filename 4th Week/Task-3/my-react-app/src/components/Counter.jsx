import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter">
      <h2 style={{color: 'black'}}>Counter Component</h2>
      <p style={{color: 'black'}}>Current count: {count}</p>
      <div className="button-group">
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

export default Counter