import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

const base_url=environment.base


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Cliente[]>(`${base_url}/cliente`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  add(cliente: Cliente){
    let token = sessionStorage.getItem("token");
    return this.http.post<Cliente[]>(`${base_url}/cliente`,cliente,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  edit(cliente: Cliente){
    let token = sessionStorage.getItem("token");
    return this.http.put<Cliente[]>(`${base_url}/cliente`,cliente,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  delete(id: number ){
    let token = sessionStorage.getItem("token");
    return this.http.delete<Cliente[]>(`${base_url}/cliente/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  
}
