import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  getUserProfile(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${id}`);
  }

  updateUserProfile(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${id}`, user);
  }

  deleteUserProfile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profile/${id}`);
  }

  uploadProfilePhoto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile/profile-photo-upload`, formData);
  }

  getUsersCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/count`);
  }
}
