import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoCredito } from '../models/tipocredito';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipocreditoService {
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<TipoCredito[]>(`${base_url}/tipocredito`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  add(tipocredito: TipoCredito){
    let token = sessionStorage.getItem("token");
    return this.http.post<TipoCredito[]>(`${base_url}/tipocredito`,tipocredito,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  edit(tipocredito: TipoCredito){
    let token = sessionStorage.getItem("token");
    return this.http.put<TipoCredito[]>(`${base_url}/tipocredito`,tipocredito,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  delete(id: number ){
    let token = sessionStorage.getItem("token");
    return this.http.delete<TipoCredito[]>(`${base_url}/tipocredito/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
