import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Salle} from "../models/salle.model";

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  constructor(public http:HttpClient) {
  }
  public getAllSalles():Observable<Salle[]>{
   return   this.http.get<Salle[]>("http://localhost:8000/api/salles/getAllSalles")
  }
  public createSalle(salle:Salle):Observable<any>{
    return  this.http.post("http://localhost:8000/api/salles/createSalle",salle);
  }
  public updateSalle(salle:Salle):Observable<any>{
    return  this.http.put(`http://localhost:8000/api/salles/updateSalle/${salle.id}`,salle);
  }

  public deleteSalle(id:string):Observable<any>{
    return  this.http.delete(`http://localhost:8000/api/salles/deleteSalle/${id}`);
  }


}
