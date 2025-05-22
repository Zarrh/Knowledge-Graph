import React, { useState } from 'react'
import './App.css'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './global/Home'
import Introduction from './global/Introduction'
import Statistics from './global/Statistics'

function App() {

  const [currentPage, setCurrentPage] = useState("introduction")

  return (
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
