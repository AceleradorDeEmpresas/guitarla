import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/Guitar_db.jsx'
export const useCart  = () => {
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
        if(itemExists >= 0) { // Este elemento ya existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEM) return // Si la cantidad es mayor a 5, no se agrega más
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity += 1 // Se incrementa la cantidad
            setCart(updatedCart)
        } else {
            item.quantity = 1 // Si no existe, se le asigna una cantidad de 1
            setCart([...cart, item])
        }
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


    // State derivado 
    // Que es un state derivado?
    // Un state derivado es un estado que se calcula a partir de otros estados o props
    // En este caso, isEmpty es un estado derivado que se calcula a partir del estado cart
    // Se usa para determinar si el carrito está vacío o no
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    // En esa funcion se usa el operador de cortocircuito && para evitar que se ejecute la segunda parte si la primera es falsa
    // En este caso, si cart.length es 0, no se ejecuta la segunda parte y se devuelve true
    // Si cart.length es mayor que 0, se ejecuta la segunda parte y se devuelve false
    // Se usa para determinar si el carrito tiene productos o no
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}



