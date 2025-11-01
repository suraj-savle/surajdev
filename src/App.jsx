import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects.jsx'
import Navbar from './components/Navigation/Navbar.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'


const App = () => {
  return (
    <div className='min-h-screen bg-background px-4 md:px-20 hide-scrollbar '>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App