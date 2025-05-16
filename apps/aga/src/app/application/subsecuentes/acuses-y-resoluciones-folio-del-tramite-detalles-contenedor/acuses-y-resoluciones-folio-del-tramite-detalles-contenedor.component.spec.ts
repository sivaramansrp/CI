import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent } from './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component';

describe('AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent', () => {
  let component: AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent;
  let fixture: ComponentFixture<AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
