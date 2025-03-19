import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorComponent } from './contenedor.component';
import { provideHttpClient } from '@angular/common/http';

describe('ContenedorComponent', () => {
  let component: ContenedorComponent;
  let fixture: ComponentFixture<ContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
