
import { TipoCreditoDTO } from './tipoCreditoDTO'; // Import the TipoCreditoDTO type
import { DetalleCompraDTO } from './detalleCompraDTO'; // Import the DetalleCompraDTO type

export class CompraDTO {
    constructor(
        public clienteId: number,
        public tipoCredito: TipoCreditoDTO,
        public detallesCompra: DetalleCompraDTO[]
    ) {}
}
