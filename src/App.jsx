import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/Guitar_db'
import './App.css'


function App() {

  const initialCart = () => {
    // Se obtiene el carrito del localStorage
    const localStorageCart = localStorage.getItem('cart')
    // Si el localStorage no tiene nada, se devuelve un array vacío
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  const MAX_ITEM = 5
  const MIN_ITEM = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    // Verifica si el item ya está en el carrito
    const itemExists  = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) { // Este lemento ya existe en el carrito
      if(cart[itemExists].quantity >= MAX_ITEM) return // Si la cantidad es mayor a 5, no se agrega más
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity += 1 // Se incrementa la cantidad
      setCart(updatedCart)
    } else {
      item.quantity = 1 // Si no existe, se le asigna una cantidad de 1
      setCart([...cart, item])
    }

    // Guardar en localStorage
    saveCart()
  } 

  // Elimina un item del carrito
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id) )
  }

  // Aummenta la cantidad de un item en el carrito
  function increaseQuantity(id) {
    const updatedCart = cart.map(item => { 
      if(item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1 
        }
      }
      return item 
     })
     setCart(updatedCart)
  }

  // Disminuye la cantidad de un item en el carrito
  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Limpia el carrito
  function cleanCart() {
    setCart([])
  }


  

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />


      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
