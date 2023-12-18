import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {
  private apiUrl = "https://api.victorsanmartin.com/feriados/en.json"

  constructor(private http: HttpClient) { }


  getFeriados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
