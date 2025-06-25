import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendFormData(formData: any) {
    return this.http.post(
      'https://portfolio-itzv.onrender.com/send-email',
      formData
    );
  }
}
