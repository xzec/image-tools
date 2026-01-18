import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import './App.css'
import { Activity, useState } from 'react'
import Counter from './Counter'
import { fileSystemData } from './data'
import { Tree } from './Tree'

function App() {
  const [view, setView] = useState<'counter' | 'tree'>('counter')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={() => setView((prev) => (prev === 'counter' ? 'tree' : 'counter'))}>
        Show {view === 'counter' ? 'Tree' : 'Counter'}
      </button>
      <div className="card">
        <Activity mode={view === 'counter' ? 'visible' : 'hidden'}>
          <h2>Counter</h2>
          <Counter />
        </Activity>
        <Activity mode={view === 'tree' ? 'visible' : 'hidden'}>
          <h2>File System Tree</h2>
          <Tree data={fileSystemData} />
        </Activity>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
