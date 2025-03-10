import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Datos140201Component } from './datos-140201.component';

describe('Datos140201Component', () => {
  let component: Datos140201Component;
  let fixture: ComponentFixture<Datos140201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos140201Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos140201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
