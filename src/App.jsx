import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Articles from './pages/Articles'
import Checkout from './pages/Checkout'
import { createContext, useState } from 'react'
import Success from './pages/Success'
import Failure from './pages/Failure'

const CustomerContext = createContext(null);
export const CustomerCtx = () => CustomerContext;
const CartContext = createContext(null);
export const CartCtx = () => CartContext;

function App() {
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState(null);

  const loadCart = (cart) => {
      if (cart)
          fetch(`${import.meta.env.VITE_API_URL}/api/v1/cart/${cart.id}`)
              .then(res => res.json())
              .then(data => setCart(data));
      else
        setCart(null);
  };

  return (
    <CustomerContext.Provider value={customer}>
      <CartContext.Provider value={cart}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Articles setCustomer={setCustomer} loadCart={loadCart} />
            } />
            <Route path='/checkout/success' element={<Success/>}/>
            <Route path='/checkout/failure' element={<Failure/>}/>
            <Route path='/checkout' element={
              <Checkout setCustomer={setCustomer} loadCart={loadCart} />
            } />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </CustomerContext.Provider>
  )
}

export default App
