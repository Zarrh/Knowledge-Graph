import React, { useState } from 'react'
import './App.css'
import { AnimatePresence, motion } from 'framer-motion'
// import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './global/Home'
import Introduction from './global/Introduction'
import Statistics from './global/Statistics'

function App() {

  const [currentPage, setCurrentPage] = useState("introduction")

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     {/* <Route path="/about" element={<About />} /> */}
    //     {/* Catch-all for 404s */}
    //     {/* <Route path="*" element={<NotFound />} /> */}
    //   </Routes>
    // </Router>
    <AnimatePresence mode="wait">
      {currentPage === "introduction" && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
        >
          <Introduction setPage={setCurrentPage} />
        </motion.div>
      )}
      {currentPage === "statistics" && (
        <motion.div
          key="stats"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
        >
          <Statistics setPage={setCurrentPage} />
        </motion.div>
      )}
      {currentPage === "home" && (
        <motion.div
          key="home"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <Home />
        </motion.div>
      )}
    </AnimatePresence>      
  )
}

export default App
