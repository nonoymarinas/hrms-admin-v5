import { routes } from './app.routes';
import { Component, inject, signal } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('HRMS Management System v5.0');
  private router = inject(Router);
  loading = inject(LoadingService);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // 👇 SIMULATED DELAY
        setTimeout(() => {
          this.loading.hide();
        }, 1500); // 1.5 seconds
      }
    });
  }
}
