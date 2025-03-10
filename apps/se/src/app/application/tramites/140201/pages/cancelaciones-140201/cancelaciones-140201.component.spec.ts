import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cancelaciones140201Component } from './cancelaciones-140201.component';

describe('Cancelaciones140201Component', () => {
  let component: Cancelaciones140201Component;
  let fixture: ComponentFixture<Cancelaciones140201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cancelaciones140201Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Cancelaciones140201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
