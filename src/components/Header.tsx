import type { CartItem, Guitar } from "../types/"

type HeaderProps = {
    cart: CartItem[]
    removeFromCart: (id: Guitar['id']) => void
    decreaseQuantity: (id: Guitar['id']) => void
    increaseQuantity: (id: Guitar['id']) => void
    cleanCart: () => void
    isEmpty: boolean
    cartTotal: number
}

import { useCart } from "../hooks/useCart"


export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart, isEmpty, cartTotal} : HeaderProps ) {
    // El header es un componente que se encarga de mostrar el carrito de compras


    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart?.map(item => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <img className="img-fluid" 
                                                                src={`/img/${item.image}.jpg`}
                                                                alt="imagen guitarra" 
                                                            />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td className="fw-bold">
                                                            ${item.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(item.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {item.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(item.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}.00</span></p>
                                        <button className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={() => cleanCart()}
                                        >Vaciar Carrito
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}