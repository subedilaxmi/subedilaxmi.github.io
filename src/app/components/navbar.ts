import { Component, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar implements OnDestroy {
  readonly theme = inject(ThemeService);

  readonly scrolled = signal(false);
  readonly drawerOpen = signal(false);
  readonly activeId = signal<string>('');

  readonly sections = ['about', 'business', 'counseling', 'insights'];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
    this.spy();
  }

  /** Highlight the nav link for the section in view (only matches on the home page). */
  private spy(): void {
    const offset = window.scrollY + 90;
    let current = '';
    for (const id of this.sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= offset) current = id;
    }
    this.activeId.set(current);
  }

  openNav(): void {
    this.drawerOpen.set(true);
    document.body.classList.add('nav-open');
  }

  closeNav(): void {
    this.drawerOpen.set(false);
    document.body.classList.remove('nav-open');
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeNav();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('nav-open');
  }
}
