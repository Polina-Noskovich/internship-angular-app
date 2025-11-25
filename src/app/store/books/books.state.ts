import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BooksStateModel, Book } from './books-state.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { GetBooks, AddBook, DeleteBook } from './books.actions';

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    books: []
  },
})
@Injectable()
export class BooksState {
  private readonly booksUrl = 'assets/data.json';

  constructor(private readonly http: HttpClient) {}

  @Action(GetBooks)
  public getBooks({ getState, setState }: StateContext<BooksStateModel>) {
    if (getState().books.length) {
      return;
    }

    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap((loadedBooks) => {
        setState({ books: loadedBooks });
      })
    );
  }

  @Action(AddBook)
  public addBook({ getState, patchState }: StateContext<BooksStateModel>, { payload }: AddBook) {
    const state = getState();
    const updatedBooks = [...state.books, payload];
    
    patchState({ books: updatedBooks });
  }

  @Action(DeleteBook)
  public deleteBook({ getState, patchState }: StateContext<BooksStateModel>, { payload }: DeleteBook) {
    const state = getState();
    const filteredBooks = state.books.filter((book) => book.id !== payload);

    patchState({ books: filteredBooks });
  }
}
