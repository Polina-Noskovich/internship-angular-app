import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BooksStateModel, Book } from './books.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { GetBooks, AddBook, DeleteBook } from './books.actions';

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    books: [],
    isLoading: false,
  },
})
@Injectable()
export class BooksState {
  private readonly booksUrl = 'assets/data.json';

  constructor(private readonly http: HttpClient) {}

  @Action(GetBooks)
  getBooks(ctx: StateContext<BooksStateModel>) {
    if (ctx.getState().books.length > 0) {
      return;
    }
    ctx.patchState({ isLoading: true });

    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap((loadedBooks) => {
        ctx.patchState({
          books: loadedBooks,
          isLoading: false,
        });
      })
    );
  }

  @Action(AddBook)
  addBook(ctx: StateContext<BooksStateModel>, action: AddBook) {
    const state = ctx.getState();
    const updatedBooks = [...state.books, action.payload];

    ctx.patchState({ books: updatedBooks });
  }

  @Action(DeleteBook)
  deleteBook(ctx: StateContext<BooksStateModel>, action: DeleteBook) {
    const state = ctx.getState();
    const filteredBooks = state.books.filter((book) => book.id !== action.payload);

    ctx.patchState({
      books: filteredBooks,
    });
  }
}
