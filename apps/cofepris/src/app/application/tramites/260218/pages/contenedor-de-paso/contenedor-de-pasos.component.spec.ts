import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorDePasosComponent } from './contenedor-de-pasos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ContenedorDePasosComponent', () => {

  let component: ContenedorDePasosComponent;
  let fixture: ComponentFixture<ContenedorDePasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock params if needed
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // Mock paramMap if needed
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorDePasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
