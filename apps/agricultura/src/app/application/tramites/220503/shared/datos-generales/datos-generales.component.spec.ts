import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RevisionService } from '../../services/revision.service';
import { ValidacionesFormularioService, Catalogo, CatalogosSelect, ConsultaioQuery, CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let revisionServiceMock: any;
  let validacionesServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    revisionServiceMock = {
      getAduanaIngreso: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, descripcion: 'Aduana 1' }] })),
      getOficianaInspeccion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 2, descripcion: 'Oficina 1' }] })),
      getPuntoInspeccion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 3, descripcion: 'Punto 1' }] })),
      getEstablecimiento: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 4, descripcion: 'Establecimiento 1' }] })),
      getRegimenDestinaran: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 5, descripcion: 'Regimen 1' }] })),
      getMovilizacionNacional: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 6, descripcion: 'Movilizacion 1' }] })),
      getPuntoVerificacion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 7, descripcion: 'Punto Verificacion 1' }] })),
      getEmpresaTransportista: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 8, descripcion: 'Empresa 1' }] })),
      getDatosDelaSolicitud: jest.fn().mockReturnValue(of({
        foliodel: 'FOLIO123',
        claveUCON: 'UCON123',
        establecimientoTIF: 'TIF123',
        nombre: 'NOMBRE',
        numeroguia: 'GUIA123',
        transporte: 'CAMION',
        nombreEmpresa: 'EMPRESA',
      })),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    storeMock = {
      setFoliodel: jest.fn(),
      setClaveUCON: jest.fn(),
      setEstablecimientoTIF: jest.fn(),
      setNombre: jest.fn(),
      setNumeroguia: jest.fn(),
      setTransporte: jest.fn(),
      setNombreEmpresa: jest.fn(),
      setAduanaIngreso: jest.fn(),
      setOficinaInspeccion: jest.fn(),
      setPuntoInspeccion: jest.fn(),
      setRegimen: jest.fn(),
      setMovilizacion: jest.fn(),
      setPunto: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        foliodel: 'FOLIO123',
        aduanaIngreso: 1,
        oficinaInspeccion: 2,
        puntoInspeccion: 3,
        claveUCON: 'UCON123',
        establecimientoTIF: 'TIF123',
        nombre: 'NOMBRE',
        numeroguia: 'GUIA123',
        regimen: 5,
        movilizacion: 6,
        transporte: 'CAMION',
        punto: 7,
        nombreEmpresa: 'EMPRESA',
      }),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosGeneralesComponent, CommonModule, CatalogoSelectComponent, ReactiveFormsModule, InputRadioComponent,TituloComponent, HttpClientTestingModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: revisionServiceMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: Solicitud220503Store, useValue: storeMock },
        { provide: Solicitud220503Query, useValue: queryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values', () => {
    component.inicializarFormulario();
    expect(component.forma).toBeDefined();
    expect(component.forma.get('foliodel')?.value).toBeUndefined(); // fetchapago is undefined in mock
    expect(component.forma.get('aduanaIngreso')?.value).toBe(1);
    expect(component.forma.get('oficinaInspeccion')?.value).toBe(2);
    expect(component.forma.get('puntoInspeccion')?.value).toBe(3);
    expect(component.forma.get('claveUCON')?.value).toBe('UCON123');
    expect(component.forma.get('establecimientoTIF')?.value).toBe('TIF123');
    expect(component.forma.get('nombre')?.value).toBe('NOMBRE');
    expect(component.forma.get('numeroguia')?.value).toBe('GUIA123');
    expect(component.forma.get('regimen')?.value).toBe(5);
    expect(component.forma.get('movilizacion')?.value).toBe(6);
    expect(component.forma.get('transporte')?.value).toBe('CAMION');
    expect(component.forma.get('punto')?.value).toBe(7);
    expect(component.forma.get('nombreEmpresa')?.value).toBe('EMPRESA');
  });

  it('should toggle colapsable property', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
  });

  it('should rotate rows correctly', () => {
    const initialIndex = component.currentIndex;
    component.rotateRow(1);
    expect(component.currentIndex).toBe((initialIndex + 1 + component.rows.length) % component.rows.length);
    component.rotateRow(-1);
    expect(component.currentIndex).toBe(initialIndex);
  });

  it('should call store methods on seleccionar methods', () => {
    const catalogo: Catalogo = { id: 99, descripcion: 'Test' } as Catalogo;
    component.seleccionarAduanaIngreso(catalogo);
    expect(storeMock.setAduanaIngreso).toHaveBeenCalledWith(99);

    component.seleccionarOficianaInspeccion(catalogo);
    expect(storeMock.setOficinaInspeccion).toHaveBeenCalledWith(99);

    component.seleccionarPuntoInspeccion(catalogo);
    expect(storeMock.setPuntoInspeccion).toHaveBeenCalledWith(99);

    component.seleccionarRegimen(catalogo);
    expect(storeMock.setRegimen).toHaveBeenCalledWith(99);

    component.seleccionarMovilizacionNacional(catalogo);
    expect(storeMock.setMovilizacion).toHaveBeenCalledWith(99);

    component.seleccionarPuntoVerificacion(catalogo);
    expect(storeMock.setPunto).toHaveBeenCalledWith(99);
  });

  it('should call isValid from ValidacionesFormularioService', () => {
    const form = new FormBuilder().group({ test: [] });
    const result = component.isValid(form, 'test');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'test');
    expect(result).toBe(true);
  });

  it('should set aduanaIngreso on getAduanaIngreso', () => {
    component.getAduanaIngreso();
    expect(revisionServiceMock.getAduanaIngreso).toHaveBeenCalled();
    expect(component.aduanaIngreso.labelNombre).toBe('Aduana de ingreso');
    expect(component.aduanaIngreso.catalogos.length).toBeGreaterThan(0);
  });

  it('should set oficianaInspeccion on getOficianaInspeccion', () => {
    component.getOficianaInspeccion();
    expect(revisionServiceMock.getOficianaInspeccion).toHaveBeenCalled();
    expect(component.oficianaInspeccion.labelNombre).toBe('Oficina de Inspección de Sanidad Agropecuaria');
    expect(component.oficianaInspeccion.catalogos.length).toBeGreaterThan(0);
  });

  it('should set puntoInspeccion on getPuntoInspeccion', () => {
    component.getPuntoInspeccion();
    expect(revisionServiceMock.getPuntoInspeccion).toHaveBeenCalled();
    expect(component.puntoInspeccion.labelNombre).toBe('Punto de inspección');
    expect(component.puntoInspeccion.catalogos.length).toBeGreaterThan(0);
  });

  it('should set establecimiento on getEstablecimiento', () => {
    component.getEstablecimiento();
    expect(revisionServiceMock.getEstablecimiento).toHaveBeenCalled();
    expect(component.establecimiento.labelNombre).toBe('Establecimiento TIF');
    expect(component.establecimiento.catalogos.length).toBeGreaterThan(0);
  });

  it('should set regimenDestinaran on getRegimenDestinaran', () => {
    component.getRegimenDestinaran();
    expect(revisionServiceMock.getRegimenDestinaran).toHaveBeenCalled();
    expect(component.regimenDestinaran.labelNombre).toBe('Régimen al que se destinarán las mercancías');
    expect(component.regimenDestinaran.catalogos.length).toBeGreaterThan(0);
  });

  it('should set movilizacionNacional on getMovilizacionNacional', () => {
    component.getMovilizacionNacional();
    expect(revisionServiceMock.getMovilizacionNacional).toHaveBeenCalled();
    expect(component.movilizacionNacional.labelNombre).toBe('Datos para movilización nacional');
    expect(component.movilizacionNacional.catalogos.length).toBeGreaterThan(0);
  });

  it('should set puntoVerificacion on getPuntoVerificacion', () => {
    component.getPuntoVerificacion();
    expect(revisionServiceMock.getPuntoVerificacion).toHaveBeenCalled();
    expect(component.puntoVerificacion.labelNombre).toBe('Punto de verificación federal');
    expect(component.puntoVerificacion.catalogos.length).toBeGreaterThan(0);
  });

  it('should set empresaTransportista on getEmpresaTransportista', () => {
    component.getEmpresaTransportista();
    expect(revisionServiceMock.getEmpresaTransportista).toHaveBeenCalled();
    expect(component.empresaTransportista.labelNombre).toBe('Nombre de la empresa transportista');
    expect(component.empresaTransportista.catalogos.length).toBeGreaterThan(0);
  });

  it('should call store setters in actualizarDatosDelaSolicitud', () => {
    component.actualizarDatosDelaSolicitud();
    expect(revisionServiceMock.getDatosDelaSolicitud).toHaveBeenCalled();
    expect(storeMock.setFoliodel).toHaveBeenCalledWith('FOLIO123');
    expect(storeMock.setClaveUCON).toHaveBeenCalledWith('UCON123');
    expect(storeMock.setEstablecimientoTIF).toHaveBeenCalledWith('TIF123');
    expect(storeMock.setNombre).toHaveBeenCalledWith('NOMBRE');
    expect(storeMock.setNumeroguia).toHaveBeenCalledWith('GUIA123');
    expect(storeMock.setTransporte).toHaveBeenCalledWith('CAMION');
    expect(storeMock.setNombreEmpresa).toHaveBeenCalledWith('EMPRESA');
  });

  it('should disable or enable form in guardarDatosFormulario', () => {
    component.forma = new FormBuilder().group({ test: [] });
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.forma.disabled).toBe(true);

    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.forma.enabled).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'next');
    const spy2 = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});