import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  styleUrl: './app.scss'
})
export class App {
  constructor(private readonly router: Router) {}
  
  protected navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
