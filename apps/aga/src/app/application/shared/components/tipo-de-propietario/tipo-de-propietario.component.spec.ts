import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoDePropietarioComponent } from './tipo-de-propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TipoDePropietarioComponent', () => {
  let component: TipoDePropietarioComponent;
  let fixture: ComponentFixture<TipoDePropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Add any necessary imports or providers here
      imports: [ReactiveFormsModule],
      declarations: [TipoDePropietarioComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(TipoDePropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
