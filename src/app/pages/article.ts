import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { ContactService } from '../core/contact.service';
import { SITE_CONTENT } from '../core/content';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.html',
})
export class Article {
  private readonly route = inject(ActivatedRoute);
  private readonly contact = inject(ContactService);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  private readonly slug = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  // A `canMatch` guard guarantees the slug resolves to a real article here.
  readonly article = computed(() => {
    const slug = this.slug()?.get('slug');
    return SITE_CONTENT.articles.find((a) => a.slug === slug);
  });

  readonly metaLine = computed(() => {
    const a = this.article();
    if (!a) return '';
    return (a.readMins ? a.readMins + ' min read' : '') + (a.tag ? '  ·  ' + a.tag : '');
  });

  readonly emailHref = computed(() => {
    const a = this.article();
    if (!a) return this.contact.buildMailto();
    return this.contact.buildMailto(
      'About your article: ' + a.title,
      'Hi Laxmi,\n\nI just read "' + a.title + '" and wanted to ask…\n',
    );
  });

  constructor() {
    effect(() => {
      const a = this.article();
      if (a) {
        this.titleService.setTitle(a.title + ' - Laxmi Subedi');
        if (a.excerpt) this.meta.updateTag({ name: 'description', content: a.excerpt });
      }
      window.scrollTo({ top: 0 });
    });
  }
}
