import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from '../../store/books/books.model';
import { Store } from '@ngxs/store';
import { GetBooks } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './page-detail.html',
  styleUrl: './page-detail.scss',
})
export class PageDetail implements OnInit {
  protected book$!: Observable<Book | undefined>;
  protected pageNumber$!: Observable<number>;

  @ViewChild('pageCanvas') private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());

    this.pageNumber$ = this.route.paramMap.pipe(
      map(params => Number(params.get('pageNumber')))
    );

    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.store.select(BooksSelectors.getBookById(bookId));
      })
    );
  }

  public ngAfterViewInit(): void {
    this.drawPageLines();
  }

  private drawPageLines(): void {
    if (!this.canvasRef?.nativeElement) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
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
