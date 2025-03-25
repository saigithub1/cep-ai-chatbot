import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',

})
export class ChatbotService {
  private apiUrl = 'http://localhost:8081/search.'; // Replace with your AI backend URL

  constructor(private http: HttpClient) { }

  sendMessage1(message: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, {
      "query": "Show me properties near Main St"});
  }

  getResponse(): Observable<Message> {
    return this.http.get<Message>(this.apiUrl);
  }
}