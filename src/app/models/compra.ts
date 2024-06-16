import { Cliente } from "./cliente";
import { TipoCredito } from "./tipocredito";
import { DetalleCompra } from "./detallacompra";

export class Compra {
    constructor(
        public id: number,
        public fecha: Date,
        public monto_total: string,
        public cliente: Cliente, // ? indica que es opcional
        public tipoCredito: TipoCredito, // ? indica que es opcional
        public detallesCompra: DetalleCompra[] // Añadido para mantener los detalles de compra
    ) {}
}
