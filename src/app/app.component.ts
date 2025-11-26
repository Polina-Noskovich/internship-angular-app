import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { GetBooks } from './store/books/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router, private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }
  
  protected navigateToBooks(): void {
    this.router.navigate(['/books']);
  }
}
