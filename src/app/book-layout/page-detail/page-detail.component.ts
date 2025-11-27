import { Component, ElementRef, viewChild, effect, Signal, inject, computed } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../../store/books/books-state.model';
import { Store } from '@ngxs/store';
import { BooksSelectors } from '../../store/books/books.selectors';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-detail',
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.scss',
})
export class PageDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  private readonly params: Signal<ParamMap | undefined> = toSignal(this.route.paramMap);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('pageCanvas');

  protected readonly pageNumber: Signal<number> = computed(() => {
    return Number(this.params()?.get('pageNumber') ?? 0);
  });

  protected readonly book: Signal<Book | undefined> = computed(() => {
    const bookId = Number(this.params()?.get('bookId'));
    return this.store.selectSignal(BooksSelectors.bookById(bookId))();
  });

  public ngAfterViewInit(): void {
    this.drawPageLines();
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
