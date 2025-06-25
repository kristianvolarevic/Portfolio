import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../contact-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      subject: [''],
      message: [''],
    });
  }

  onSubmit() {
    this.contactService.sendFormData(this.contactForm.value).subscribe({
      next: (res) => alert('Message sent'),
      error: (err) => alert('Error sending message'),
    });
  }
}
