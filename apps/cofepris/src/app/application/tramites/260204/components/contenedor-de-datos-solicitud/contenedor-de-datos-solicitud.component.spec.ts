import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorDeDatosSolicitudComponent } from './contenedor-de-datos-solicitud.component';

describe('ContenedorDeDatosSolicitudComponent', () => {
  let component: ContenedorDeDatosSolicitudComponent;
  let fixture: ComponentFixture<ContenedorDeDatosSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenedorDeDatosSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenedorDeDatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
