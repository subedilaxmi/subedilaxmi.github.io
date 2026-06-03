import { Injectable } from '@angular/core';

import { SITE_CONTENT } from './content';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly profile = SITE_CONTENT.profile;

  /** Joined at runtime so the address isn't sitting in the markup as plain text. */
  readonly email = `${this.profile.emailUser || 'contact.laxmisubedi'}@${this.profile.emailDomain || 'example.com'}`;

  /** Display-only masked address (e.g. "***@gmail.com"). The real address is
   *  never shown - it's only used inside the mailto link. */
  readonly maskedEmail = `***@${this.profile.emailDomain || 'example.com'}`;

  buildMailto(subject?: string, body?: string): string {
    const query: string[] = [];
    if (subject) query.push('subject=' + encodeURIComponent(subject));
    if (body) query.push('body=' + encodeURIComponent(body));
    return 'mailto:' + this.email + (query.length ? '?' + query.join('&') : '');
  }
}
