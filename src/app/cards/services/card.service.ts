import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/posts`);
  }
}
