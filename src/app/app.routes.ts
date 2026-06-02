import { Routes, CanMatchFn, UrlSegment } from '@angular/router';

import { Layout } from './layout';
import { Home } from './pages/home';
import { Article } from './pages/article';
import { NotFound } from './pages/not-found';
import { SITE_CONTENT } from './core/content';

/** Only match the article route when the slug refers to a real article;
 *  otherwise the router falls through to the wildcard 404. */
const articleExists: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const slug = segments[1]?.path;
  return SITE_CONTENT.articles.some((a) => a.slug === slug);
};

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: Home,
        title: 'Laxmi Subedi - Medical Student & Education Counselor',
      },
      {
        path: 'insights/:slug',
        component: Article,
        canMatch: [articleExists],
        title: 'Article - Laxmi Subedi',
      },
      {
        path: '**',
        component: NotFound,
        title: 'Page not found - Laxmi Subedi',
      },
    ],
  },
];
