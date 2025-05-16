import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent } from './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent', () => {
  let component: AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent;
  let fixture: ComponentFixture<AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default properties', () => {
    expect(component.tramite).toBe(301);
    expect(component.indice).toBe(1);
    expect(component.procedureRegresorUrl).toBe('/subsecuentes');
  });

  it('should call selectTramite and set tramite', () => {
    const tramiteId = 123;
    component.selectTramite(tramiteId);
    expect(component.tramite).toBe(tramiteId);
  });
});
