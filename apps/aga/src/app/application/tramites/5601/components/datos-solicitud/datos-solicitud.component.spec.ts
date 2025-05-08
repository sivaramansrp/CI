import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

const ESTADO_INICIAL = {
  tieneCertificacion: false,
  certificacionEmpresa: '',
  otraCertificacion: '',
  aduana: '01',
  seccionAduanera: '02',
  tipoOperacion: 'Exportación',
  fechaOperacion: '2025-05-01',
  motivoDespachoDomicilio: 'Razón válida',
  observaciones: 'Ninguna',
  especificacionesMercancia: 'Especificación',
  descripcionMercancia: 'Descripción',
  tipoMoneda: 'MXN',
  valorMercancia: '1000',
  esquemasControlSeguridad: 'Control A',
  distanciaRutaTiempos: '5 horas',
  direccion: 'Calle Falsa 123',
  telefono: '5551234567',
  distanciaAduana: '15 km',
  referencias: 'Cerca del parque'
};

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mockStore: Partial<Tramite5601Store>;
  let mockQuery: Partial<Tramite5601Query>;

  beforeEach(async () => {
    mockStore = {
      setTipoOperacion: jest.fn()
    };

    mockQuery = {
      selectCertificacion$: of(ESTADO_INICIAL)
    };

    await TestBed.configureTestingModule({
      imports: [DatosSolicitudComponent, ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        { provide: Tramite5601Store, useValue: mockStore },
        { provide: Tramite5601Query, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all forms with query state', () => {
    expect(component.formulario.get('aduana')?.value).toBe('01');
    expect(component.formularioMercancia.get('tipoMoneda')?.value).toBe('MXN');
    expect(component.formularioLogistica.get('distanciaRutaTiempos')?.value).toBe('5 horas');
    expect(component.formularioUbicacionMercancia.get('telefono')?.value).toBe('5551234567');
  });

  it('should set mostrarFechaOperacion to true and call store method on alCambiarTipoOperacion', () => {
    component.alCambiarTipoOperacion();
    expect(component.mostrarFechaOperacion).toBe(true);
    expect(mockStore.setTipoOperacion).toHaveBeenCalledWith('Exportación');
  });
});
