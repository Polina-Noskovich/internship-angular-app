import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BooksStateModel, Book } from './books-state.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { GetBooks, AddBook, DeleteBook } from './books.actions';
import { append, patch } from '@ngxs/store/operators';

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
  public addBook({ setState }: StateContext<BooksStateModel>, { payload }: AddBook) {
    setState(patch({ books: append([payload]) }))
  }

  @Action(DeleteBook)
  public deleteBook({ getState, patchState }: StateContext<BooksStateModel>, { payload }: DeleteBook) {
    const filteredBooks = getState().books.filter((book) => book.id !== payload);

    patchState({ books: filteredBooks });
  }
}
