
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Navbar from './pages/Navbar'
function App() {
  

  return (
    <div>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
