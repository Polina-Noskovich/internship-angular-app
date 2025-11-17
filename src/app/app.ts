import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  public title = 'book-app';

  constructor(private router: Router) {}
  navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
