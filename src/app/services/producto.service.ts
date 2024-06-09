import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Producto[]>(`${base_url}/producto`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  add(cliente: Producto){
    let token = sessionStorage.getItem("token");
    return this.http.post<Producto[]>(`${base_url}/producto`,cliente,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  edit(cliente: Producto){
    let token = sessionStorage.getItem("token");
    return this.http.put<Producto[]>(`${base_url}/producto`,cliente,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  delete(id: number ){
    let token = sessionStorage.getItem("token");
    return this.http.delete<Producto[]>(`${base_url}/producto/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
