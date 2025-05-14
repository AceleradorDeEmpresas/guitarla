import { useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/Guitar_db'
import './App.css'


function App() {

  const [data] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item){
    // Verifica si el item ya está en el carrito
    const itemExists  = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) { // Este lemento ya existe en el carrito
      console.log('El item ya está en el carrito')
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity += 1 // Se incrementa la cantidad
      setCart(updatedCart)
    } else {
      item.quantity = 1 // Si no existe, se le asigna una cantidad de 1
      setCart([...cart, item])
    }
  } 


  return (
    <>
      <Header
        cart={cart}
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
