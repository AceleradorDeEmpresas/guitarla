import { useMemo } from 'react'
export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, cleanCart}) {
    // El header es un componente que se encarga de mostrar el carrito de compras

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