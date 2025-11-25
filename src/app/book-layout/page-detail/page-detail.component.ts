import { Component, ElementRef, viewChild, effect, Signal, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Book } from '../../store/books/books-state.model';
import { Store } from '@ngxs/store';
import { BooksSelectors } from '../../store/books/books.selectors';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.scss',
})
export class PageDetailComponent implements OnInit {
  protected book!: Signal<Book | undefined>;
  protected pageNumber!: Signal<number | undefined>;

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('pageCanvas');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly injector: Injector
  ) {
    effect(() => {
      this.drawPageLines();
    })
  }

  public ngOnInit(): void {
    const paramMap$ = this.route.paramMap;

    this.pageNumber = toSignal(
      paramMap$.pipe(map(params => Number(params.get('pageNumber')))), { injector: this.injector }
    );

    this.book = toSignal(
      paramMap$.pipe(
        switchMap(params => {
          const bookId = Number(params.get('bookId'));
          return this.store.select<Book | undefined>(BooksSelectors.bookById(bookId));
        })
      ), { injector: this.injector }
    );
  }

  private drawPageLines(): void {
    const canvasEl = this.canvasRef();

    if (!canvasEl) { return; }

    const canvas = canvasEl.nativeElement;
    const context = canvas.getContext('2d'); 

    if (context) {
      const width = canvas.width;
      const height = canvas.height;
      const cellSize = 30; 

      context.clearRect(0, 0, width, height);
      context.beginPath();

      context.strokeStyle = '#e0e0e0'; 
      context.lineWidth = 1;

      for (let y = cellSize; y < height; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }

      for (let x = cellSize; x < width; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }

      context.stroke();
    }
  }
}
