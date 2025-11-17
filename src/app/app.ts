import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'book-app';

  constructor(private readonly router: Router) {}
  
  protected navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
