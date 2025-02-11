import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let solicitudService: SolicitudPantallasService;
  
  beforeEach(async () => {
    const solicitudServiceMock = {
      getData: jasmine.createSpy('getData').and.returnValue(of({
        dSolicitud: [],
        hSolicitud: [],
        hCarroFerrocarril: [],
        hTabla: [],
        hHistorialinspeccion: [],
        dHistorialInspecciones: [],
        carrosDeFerrocarrilPager: []
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: solicitudServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudPantallasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on initialization', () => {
    expect(component.form).toBeDefined();
  });
  
  it('should call cargarDatosIniciales on ngOnInit', () => {
    spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(component.cargarDatosIniciales).toHaveBeenCalled();
  });
  
  it('should create the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.form).toBeDefined();
  });

  it('should handle transporteSeleccionado event', () => {
    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBeTrue();

    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBeFalse();
  });
  
  it('should load initial data in loadInitialData', () => {
    const mockData = {
      dSolicitud: [{ fechaCreacion: 'FechaCreacion_01', mercancia: 'Solicitud 1', cantidad: 'Cantidad_01', proovedor: 'Proovedor_01' }],
      hSolicitud: ['Solicitud 1'],
      hCarroFerrocarril: ['Carro 1'],
      hTabla: ['Tabla 1'],
      hHistorialinspeccion: ['Inspeccion 1'],
      dHistorialInspecciones: [{ 
        numeroPartidaMercancia: '123', 
        fraccionArancelaria: '456', 
        nico: '789', 
        cantidadUmt: '100', 
        cantidadInspeccion: '50', 
        saldoPendiente: '50', 
        fechaInspeccionString: '2023-01-01' 
      }],
      carrosDeFerrocarrilPager: [{ 
        idInspeccionFisica: 1, 
        numeroAutorizacion: '123', 
        numeroPartidaMercancia: '456', 
        numeroTotalCarros: 10 
      }]
    };
  
    spyOn(solicitudService, 'getData').and.returnValue(of(mockData));
    component.cargarDatosIniciales();
    expect(component.hHistorialinspeccion).toEqual(mockData.hHistorialinspeccion);
    expect(component.dHistorialInspecciones).toEqual(mockData.dHistorialInspecciones);
    expect(component.dCarrosDeFerrocarril).toEqual(mockData.carrosDeFerrocarrilPager);
    expect(component.hCarroFerrocarril).toEqual(mockData.hCarroFerrocarril);
    expect(component.hSolicitud).toEqual(mockData.hSolicitud);
    expect(component.dSolicitud).toEqual(mockData.dSolicitud);
  });
  
  it('should set mostrarSeccion when onTransporteSeleccionado is called', () => {
    component.onTransporteSeleccionado(true);
    expect(component.mostrarSeccion).toBeTrue();
    component.onTransporteSeleccionado(false);
    expect(component.mostrarSeccion).toBeFalse();
  });  
});
