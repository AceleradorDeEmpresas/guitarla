import type { Guitar } from "../types/";
// Type separados para el componente
type GuitarProps = {
    guitar:Guitar, 
    addToCart: (item: Guitar) => void, 
    setCart: (item: any) => void 
}

export default function Guitar({guitar, setCart, addToCart} : GuitarProps) {
    
    const {name, image, description, price } = guitar
    const handleClick = (id) => {
        setCart(guitar)
    }

    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    {/* 
                        Se usa una arrow function () => handleClick(guitar) en vez de solo handleClick(guitar) porque:
                        1. Si usáramos handleClick(guitar) directamente, la función se ejecutaría inmediatamente al renderizar
                           el componente, sin esperar al click del botón
                        2. La arrow function actúa como un wrapper que espera a que ocurra el evento click
                        3. Solo cuando el usuario hace click, la arrow function ejecutará handleClick con el parámetro guitar
                    */}
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(guitar)}
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>
    )
}