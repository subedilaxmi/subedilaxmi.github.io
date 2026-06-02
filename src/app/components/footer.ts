import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContactService } from '../core/contact.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  readonly contact = inject(ContactService);
  readonly year = new Date().getFullYear();
}
