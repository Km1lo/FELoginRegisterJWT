import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistmovimientoDTO } from '../models/histmovimientoDTO';

const base_url = environment.base; // Asegúrate de tener la variable de entorno environment.base configurada correctamente

@Injectable({
  providedIn: 'root'
})
export class HistMovimientoService {
  private histMovimientoUrl = `${base_url}/hist-movimiento`; // URL base para el servicio HistMovimiento

  constructor(private http: HttpClient) {}

  getAllHistMovimientos(): Observable<HistmovimientoDTO[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<HistmovimientoDTO[]>(`${this.histMovimientoUrl}/listar`, { headers });
  }

  getHistorialById(id: number){
      let token = sessionStorage.getItem("token");
      return this.http.get<HistmovimientoDTO[]>(`${this.histMovimientoUrl}/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
  }
  listHistorial(){
    let token = sessionStorage.getItem("token");
    return this.http.get<HistmovimientoDTO[]>(`${this.histMovimientoUrl}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }


}

