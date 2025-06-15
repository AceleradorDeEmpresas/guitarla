import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Al operador ! en TypeScript se le llama "non-null assertion operator" y se utiliza para indicar al compilador que una expresión no será nula o indefinida en tiempo de ejecución.