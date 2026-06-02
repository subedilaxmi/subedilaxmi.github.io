import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  template: `
    <a href="#" class="back-to-top" [class.show]="show()" (click)="toTop($event)" aria-label="Back to top">
      <i class="bi bi-arrow-up"></i>
    </a>
  `,
})
export class BackToTop {
  readonly show = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.show.set(window.scrollY > 500);
  }

  toTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
