export class TipoCreditoDTO {
    constructor(
        public tasaNum: number,
        public tasaText: string,
        public cuotas: number,
        public capitalizacion: number
    ) {}
}
