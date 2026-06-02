import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { BackToTop } from './components/back-to-top';

/**
 * App shell: renders the navbar, page (via <router-outlet>), footer and
 * back-to-top once for every route — identical chrome on every page.
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Navbar, Footer, BackToTop],
  templateUrl: './layout.html',
})
export class Layout {}
