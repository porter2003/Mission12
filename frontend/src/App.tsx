import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';

function App() {


  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<BooksPage/>}/>
      <Route path="/books" element={<BooksPage/>}/>
      <Route path="/donate/:bookName" element={<DonatePage/>}/>
      
      </Routes>
    </Router>
 
    </>
  )
}

export default App
