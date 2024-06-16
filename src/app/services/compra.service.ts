import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Compra } from '../models/compra';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Compra[]>(`${base_url}/compra`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  registrarCompra(compra: any){
    let token = sessionStorage.getItem("token");
    return this.http.post<any[]>(`${base_url}/compra/registrar`,compra,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  edit(compra: Compra){
    let token = sessionStorage.getItem("token");
    return this.http.put<Compra[]>(`${base_url}/compra`,compra,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  delete(id: number ){
    let token = sessionStorage.getItem("token");
    return this.http.delete<Compra[]>(`${base_url}/compra/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
