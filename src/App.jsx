import React, { useRef } from 'react'

import './App.css'

import About from './components/about/About'
import Contact from './components/Contact/Contact'
import Heading from './components/heading/Heading'
import Menu from './components/menu/Menu'
import Projects from './components/projects/Projects'
import Stack from './components/Stack/Stack'
import ThemeColorProvider from './context/ThemeColorContext'

function App () {
  const containerRef = useRef(null)

  return (
    <ThemeColorProvider>
      <Menu />
      <div ref={containerRef}>
        <Heading />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </div>
    </ThemeColorProvider>

  )
}

export default App
