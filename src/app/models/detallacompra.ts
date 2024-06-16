import { Compra } from "./compra";
import { Producto } from "./producto";

export class DetalleCompra {
    constructor(
        public id: number,
        public compra: Compra,
        public producto: Producto,
        public cantidad: number,
        public precioUnitario: number,
        public subtotal : number
    ) {}
}