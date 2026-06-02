import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RevealDirective } from '../core/reveal.directive';
import { SITE_CONTENT, Article } from '../core/content';

const ARTICLES_PER_PAGE = 6;

@Component({
  selector: 'app-insights',
  imports: [RouterLink, RevealDirective],
  templateUrl: './insights.html',
})
export class Insights {
  private readonly articles: Article[] = SITE_CONTENT.articles;

  readonly currentPage = signal(1);

  readonly totalPages = computed(() =>
    Math.ceil(this.articles.length / ARTICLES_PER_PAGE) || 1,
  );

  readonly pageArticles = computed(() => {
    const start = (this.currentPage() - 1) * ARTICLES_PER_PAGE;
    return this.articles.slice(start, start + ARTICLES_PER_PAGE);
  });

  /** [1, 2, 3, ...] for the numbered buttons. */
  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  showPage(page: number, fromClick: boolean): void {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(clamped);

    if (fromClick) {
      document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
