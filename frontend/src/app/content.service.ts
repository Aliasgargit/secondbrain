import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private API_URL = 'http://localhost:3000/api/v1/content';

  constructor(private http: HttpClient) {}

  getContent() {
    return this.http.get(this.API_URL);
  }

  addContent(data: any) {
    return this.http.post(this.API_URL, data);
  }

  deleteContent(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
