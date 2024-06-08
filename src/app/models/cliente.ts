import { User } from "./user";

export class Cliente {
    constructor(
        public id: number,
        public limite_credito?: number,
        public fecha_pago_mensual?: number,
        public user?: User // ? indica que es opcional
    ) {}
}