import React, { useState } from 'react'
import './App.css'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './global/Home'
import Introduction from './global/Introduction'
import Statistics from './global/Statistics'
import Explanation from './global/Explanation'
import SubjectsSlide from './global/SubjectsSlide'

import { GlassBall } from './components'

function App() {

  const [currentPage, setCurrentPage] = useState("introduction")

  return (
    <>
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
      {currentPage === "explanation" && (
        <motion.div
          key="explanation"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
        >
          <Explanation setPage={setCurrentPage} />
        </motion.div>
      )}
      {currentPage === "subjects-slide" && (
        <motion.div
          key="subjects"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5 }}
        >
          <SubjectsSlide setPage={setCurrentPage} />
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
    {currentPage !== "home" && (
      <>
        <GlassBall x={-100} y={-100} radius={300} from={'#ff7ecb'} to={'#6a00f4'} />
        <GlassBall x={-100} y={-100} rev={true} radius={300} from={'#ff7ecb'} to={'#6a00f4'} />
      </>
    )}
    </>
  )
}

export default App
