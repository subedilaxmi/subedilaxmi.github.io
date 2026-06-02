import { Component } from '@angular/core';

import { Insights } from '../components/insights';
import { Testimonials } from '../components/testimonials';
import { ContactForm } from '../components/contact-form';
import { RevealDirective } from '../core/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [Insights, Testimonials, ContactForm, RevealDirective],
  templateUrl: './home.html',
})
export class Home {}
