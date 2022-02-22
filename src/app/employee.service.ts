import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Libro } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/v1/libros";

  public paises(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/api/v1/` + 'paginalibros?' + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(`${this.baseURL}`);
  }

  createEmployee(libro: Libro): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, libro);
  }

  getEmployeeById(id: number): Observable<Libro> {
    return this.httpClient.get<Libro>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Libro): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
