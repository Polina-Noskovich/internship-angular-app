import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { GetBooks } from './store/books/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private readonly router: Router, private readonly store: Store) {
    this.store.dispatch(new GetBooks());
  }
  
  protected navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
