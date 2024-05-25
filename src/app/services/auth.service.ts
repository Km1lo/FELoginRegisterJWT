import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtRequest } from '../models/jwt-request';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loginAuth(request: JwtRequest) {
    return this.http.post(base_url+"/auth/login", request);
  }
  registerAuth(request: User) {
    return this.http.post(base_url+"/auth/register", request);
  }
  
  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;

  }
  showRole() {
    let token = sessionStorage.getItem("token");
    
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token as string);
  
      // Verificar si 'decodedToken.role' existe antes de acceder a 'authority'
      return decodedToken.role?.[0]?.authority || null;
    }
    return null;
  }


}
