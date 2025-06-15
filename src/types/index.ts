export type Guitar = {
    id: number;
    name: string;
    image:string;
    description: string;
    price: number;
}

// Este un tipo heredado de Guitar 
export type CartItem = Guitar & {
    // cantidad es agregada al tipo Guitar
    quantity: number;
}


// Esta sintaxis se le conoce como lookup types
// export type GuitarId = Guitar['id'];

// Otra forma de heredar de un tipo es usando la palabra clave 'extends' 
// export interface CartItem extends Guitar {
//     quantity: number;
// }

// Utility types sirve para crear tipos a partir de otros tipos
// export type CartItem = Pick <Guitar, 'id' | 'name' | 'price'>  & {
//     quantity: number;
// }

// Utility Omit omitir propiedades de un tipo
// export type CartItemOmit = Omit<Guitar, 'image' | 'description'> 