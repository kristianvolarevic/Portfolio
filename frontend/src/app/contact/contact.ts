import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../contact-service';

declare var bootstrap: any;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  isLoading: boolean = false;

  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('errorModal') errorModal!: ElementRef;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      subject: [''],
      message: [''],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      alert('Fill all fields marked with *');
      return;
    }

    this.isLoading = true;

    this.contactService.sendFormData(this.contactForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.contactForm.reset();

        const modal = new bootstrap.Modal(this.successModal.nativeElement);
        modal.show();
      },
      error: (err) => {
        this.isLoading = false;

        const modal = new bootstrap.Modal(this.errorModal.nativeElement);
        modal.show();
      },
    });
  }
}
