import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages } from './pages';

describe('Pages', () => {
  let component: Pages;
  let fixture: ComponentFixture<Pages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
