import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetail } from './page-detail';

describe('PageDetail', () => {
  let component: PageDetail;
  let fixture: ComponentFixture<PageDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
