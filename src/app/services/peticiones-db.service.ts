import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PeticionesDBService {

  constructor(
    private http:HttpClient
  ) { }

  postCodigoClass(body:any){
    return this.http.post('https://localhost:8000/alumnos/lista',body);
  }

}
