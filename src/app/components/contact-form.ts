import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RevealDirective } from '../core/reveal.directive';
import { ContactService } from '../core/contact.service';

type Feedback = { message: string; type: 'success' | 'error' | '' };

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RevealDirective],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  readonly contact = inject(ContactService);

  // Field values (template-driven via ngModel)
  name = '';
  email = '';
  topic = 'Career & course guidance';
  message = '';

  // Per-field invalid flags + form-level feedback
  readonly invalidName = signal(false);
  readonly invalidEmail = signal(false);
  readonly invalidMessage = signal(false);
  readonly feedback = signal<Feedback>({ message: '', type: '' });

  readonly topics = [
    'Career & course guidance',
    'University selection',
    'Application support',
    'Study-abroad guidance',
    'Business-path mentoring',
    'Something else',
  ];

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  validateName(): boolean {
    const ok = this.name.trim().length > 0;
    this.invalidName.set(!ok);
    return ok;
  }

  validateEmail(): boolean {
    const value = this.email.trim();
    const ok = value.length > 0 && this.isValidEmail(value);
    this.invalidEmail.set(!ok);
    return ok;
  }

  validateMessage(): boolean {
    const ok = this.message.trim().length > 0;
    this.invalidMessage.set(!ok);
    return ok;
  }

  onSubmit(): void {
    const validName = this.validateName();
    const validEmail = this.validateEmail();
    const validMessage = this.validateMessage();

    if (!validName || !validEmail || !validMessage) {
      this.feedback.set({ message: 'Please complete the highlighted fields below.', type: 'error' });
      const firstInvalid =
        (!validName && 'fullName') || (!validEmail && 'emailAddress') || (!validMessage && 'messageBody') || '';
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    const name = this.name.trim();
    const email = this.email.trim();
    const message = this.message.trim();
    const divider = '──────────────────────────────';

    const subject = `Enquiry:: Personal Portfolio - ${name}`;
    const body =
      `Hello Laxmi,\n\n` +
      `You have a new message from your portfolio website.\n\n` +
      `${divider}\n` +
      `  Name   :  ${name}\n` +
      `  Email  :  ${email}\n` +
      `  Topic  :  ${this.topic}\n` +
      `${divider}\n\n` +
      `Message\n` +
      `${message}\n\n` +
      `${divider}\n` +
      `Sent from laxmisubedi.com.np\n`;

    window.location.href = this.contact.buildMailto(subject, body);
    this.feedback.set({
      message: `Thanks, ${name.split(' ')[0]}. Your email app is opening - just press send.`,
      type: 'success',
    });
  }
}
