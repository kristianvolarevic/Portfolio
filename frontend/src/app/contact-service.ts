import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendFormData(formData: any) {
    return this.http.post('http://localhost:3000/send-email', formData);
  }
}
