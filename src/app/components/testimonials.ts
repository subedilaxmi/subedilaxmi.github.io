import { Component } from '@angular/core';

import { RevealDirective } from '../core/reveal.directive';
import { SITE_CONTENT, Testimonial } from '../core/content';

@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective],
  templateUrl: './testimonials.html',
})
export class Testimonials {
  readonly testimonials: Testimonial[] = SITE_CONTENT.testimonials;
}
