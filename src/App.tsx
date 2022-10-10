import React from 'react'
import {Routes, Route} from 'react-router-dom'
import BooksPage from './pages/BooksPagae'
import DeeatilBookPage from './pages/DeeatilBookPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<BooksPage/>}/>
      <Route path=':id' element={<DeeatilBookPage/>} />
    </Routes>
  )
}

export default App