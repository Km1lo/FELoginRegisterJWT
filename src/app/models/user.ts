export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public dni: number,
        public nombres: string,
        public apellidos: string,
        public direccion: string,
        public telefono?: number // ? indica que es opcional
    ) {}
}

  
  
