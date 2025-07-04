import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosComponent } from './SolicitudDatos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosTabComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let mockSolicitudPantallasService: any;

  const mockData = {
    hHistorialinspeccion: ['col1', 'col2'],
    dHistorialInspecciones: [{ id: 1 }],
    dCarrosDeFerrocarril: [{ id: 2 }],
    hCarroFerrocarril: ['header1'],
    hSolicitud: ['sol1'],
    dSolicitud: [{ id: 3 }],
    hMerchandise: ['merc1'],
    dMercancia: [{ id: 4 }],
    medioDeTransporte: { id: 5 }
  };

  beforeEach(async () => {
    mockSolicitudPantallasService = {
      getData: jest.fn().mockReturnValue(of(mockData))
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SolicitudDatosTabComponent,
        DatosDelTramiteARealizarComponent,
        ResponsableInspeccionEnPuntoComponent,
        MedioTransporteComponent,
        SolicitudDatosComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: mockSolicitudPantallasService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form as FormGroup', () => {
    expect(component.form).toBeDefined();
    expect(component.form instanceof Object).toBeTruthy();
  });

  it('should call cargarDatosIniciales on ngOnInit', () => {
    const spy = jest.spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set data properties after cargarDatosIniciales', () => {
    component.cargarDatosIniciales();
    expect(component.hHistorialinspeccion).toEqual(mockData.hHistorialinspeccion);
    expect(component.dHistorialInspecciones).toEqual(mockData.dHistorialInspecciones);
    expect(component.dCarrosDeFerrocarril).toEqual(mockData.dCarrosDeFerrocarril);
    expect(component.hCarroFerrocarril).toEqual(mockData.hCarroFerrocarril);
    expect(component.hSolicitud).toEqual(mockData.hSolicitud);
    expect(component.dSolicitud).toEqual(mockData.dSolicitud);
    expect(component.hMercanciaTabla).toEqual(mockData.hMerchandise);
    expect(component.dMercanciaBody).toEqual(mockData.dMercancia);
    expect(component.mediodetransporte).toEqual(mockData.medioDeTransporte);
  });

  it('should unsubscribe destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have initial empty arrays for table data', () => {
    expect(component.tableData.tableBody).toEqual([]);
    expect(component.tableData.tableHeader).toEqual([]);
  });

  it('should have initial empty arrays for headers and data', () => {
    expect(component.hMercanciaTabla).toEqual([]);
    expect(component.dMercanciaBody).toEqual([]);
    expect(component.hSolicitud).toEqual([]);
    expect(component.dSolicitud).toEqual([]);
    expect(component.hCarroFerrocarril).toEqual([]);
    expect(component.dCarrosDeFerrocarril).toEqual([]);
    expect(component.hHistorialinspeccion).toEqual([]);
    expect(component.dHistorialInspecciones).toEqual([]);
  });
});