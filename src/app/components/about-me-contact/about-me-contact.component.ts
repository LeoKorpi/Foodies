import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-me-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './about-me-contact.component.html',
  styleUrl: './about-me-contact.component.css',
})
export class AboutMeContactComponent {
  messageSent: boolean = false;

  contactForm = new FormGroup({
    sender: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl(''),
  });

  onSubmit() {
    if (this.contactForm.invalid)
      return alert('All fields must be filled in before sending your message!');

    const contactSubmission = {
      sender: this.contactForm.value.sender,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      content: this.contactForm.value.content,
    };
    console.warn('Someone has contacted you! ', contactSubmission);
    this.messageSent = true;
  }
}
