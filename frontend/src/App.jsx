import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyNavbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Home from './components/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <MyNavbar/>
    </div>
    <div>
      <Home/>
    </div>
    <div>
      <Footer/>
    </div>
    </>
    )
}

export default App
