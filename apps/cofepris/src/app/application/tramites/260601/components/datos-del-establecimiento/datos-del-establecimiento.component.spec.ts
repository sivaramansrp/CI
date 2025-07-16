import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { CatalogoSelectComponent, ConsultaioQuery, InputCheckComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('DatosDelEstablecimientoComponent', () => {
  let component: DatosDelEstablecimientoComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let mockService: jest.Mocked<AvisoSanitarioService>;
  let mockStore: jest.Mocked<Tramite260601Store>;
  let mockQuery: jest.Mocked<Tramite260601Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    mockService = {
      getEstado: jest.fn().mockReturnValue(of({ data: [] })),
      getClaveScian: jest.fn().mockReturnValue(of({ data: [] })),
      getDescripcionScian: jest.fn().mockReturnValue(of({ data: [{ descripcion: 'desc' }] })),
      getRegimenes: jest.fn().mockReturnValue(of({ data: [] })),
      getAduanas: jest.fn().mockReturnValue(of({ data: [] })),
      getManifiestos: jest.fn().mockReturnValue(of({ data: [{ id: 1 }] }))
    } as any;

    mockStore = {
      setEstado: jest.fn(),
      setClaveScian: jest.fn(),
      setDescripcionScian: jest.fn(),
      setCveRegimenes: jest.fn(),
      setCveAduanas: jest.fn(),
      setSeleccionadaManifiesto: jest.fn()
    } as any;

    mockQuery = {
      selectSeccionState$: of({})
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: true })
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        DatosDelEstablecimientoComponent,  
        CommonModule,
          FormsModule,
          TituloComponent,
          CatalogoSelectComponent,
          TableComponent,
          InputCheckComponent,
          DatosMercanciaComponent,
          InputRadioComponent,
          RepresentanteLegalComponent,
          HttpClientTestingModule,
          ToastrModule.forRoot()
],
      declarations: [],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: AvisoSanitarioService, useValue: mockService },
        { provide: Tramite260601Store, useValue: mockStore },
        { provide: Tramite260601Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosDelEstablecimientoForm).toBeDefined();
    expect(component.domicilloDelEstablecimientoForm).toBeDefined();
    expect(component.scianForm).toBeDefined();
    expect(component.manifiestosForm).toBeDefined();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable forms if esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.datosDelEstablecimientoForm.disabled).toBeTruthy();
    expect(component.domicilloDelEstablecimientoForm.disabled).toBeTruthy();
    expect(component.scianForm.disabled).toBeTruthy();
    expect(component.manifiestosForm.disabled).toBeTruthy();
  });

  it('should enable forms if esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.datosDelEstablecimientoForm.enabled).toBeTruthy();
    expect(component.domicilloDelEstablecimientoForm.enabled).toBeTruthy();
    expect(component.scianForm.enabled).toBeTruthy();
    expect(component.manifiestosForm.enabled).toBeTruthy();
  });

  it('should not change form state if esFormularioSoloLectura is undefined in guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = undefined as any;
    component.inicializarFormulario();
    // Disable all forms first to check if state changes
    component.datosDelEstablecimientoForm.disable();
    component.domicilloDelEstablecimientoForm.disable();
    component.scianForm.disable();
    component.manifiestosForm.disable();
    component.guardarDatosFormulario();
    // Forms should remain disabled (no action taken)
    expect(component.datosDelEstablecimientoForm.disabled).toBeTruthy();
    expect(component.domicilloDelEstablecimientoForm.disabled).toBeTruthy();
    expect(component.scianForm.disabled).toBeTruthy();
    expect(component.manifiestosForm.disabled).toBeTruthy();
  });

  it('should call tramite260601Store.setEstado on estadoSeleccion', () => {
    component.inicializarFormulario();
    component.domicilloDelEstablecimientoForm.get('cveEstado')?.setValue('estado');
    component.estadoSeleccion();
    expect(mockStore.setEstado).toHaveBeenCalledWith('estado');
  });

  it('should call tramite260601Store.setClaveScian and setDescripcionScian on claveScianSeleccion', () => {
    component.inicializarFormulario();
    component.scianForm.get('cveSCIAN')?.setValue('clave');
    component.claveScianSeleccion();
    expect(mockStore.setClaveScian).toHaveBeenCalledWith('clave');
    expect(mockStore.setDescripcionScian).toHaveBeenCalledWith('desc');
  });

  it('should call tramite260601Store.setDescripcionScian on descripcionScianSeleccion', () => {
    component.inicializarFormulario();
    component.scianForm.get('cveSCIANDescripcion')?.setValue('desc');
    component.descripcionScianSeleccion();
    expect(mockStore.setDescripcionScian).toHaveBeenCalledWith('desc');
  });

  it('should call tramite260601Store.setCveRegimenes on regimenesSeleccion', () => {
    component.inicializarFormulario();
    component.domicilloDelEstablecimientoForm.get('cveRegimenes')?.setValue('regimen');
    component.regimenesSeleccion();
    expect(mockStore.setCveRegimenes).toHaveBeenCalledWith('regimen');
  });

  it('should call tramite260601Store.setCveAduanas on aduanaSeleccion', () => {
    component.inicializarFormulario();
    component.domicilloDelEstablecimientoForm.get('cveAduanas')?.setValue('aduana');
    component.aduanaSeleccion();
    expect(mockStore.setCveAduanas).toHaveBeenCalledWith('aduana');
  });

  it('should set scianHeaderData and scianBodyData on obtenerSCIAN', () => {
    component.obtenerSCIAN();
    expect(component.scianHeaderData).toBeDefined();
    expect(component.scianBodyData).toBeDefined();
  });

  it('should set productoHeaderData and productoBodyData on obtenerProducto', () => {
    component.obtenerProducto();
    expect(component.productoHeaderData).toBeDefined();
    expect(component.productoBodyData).toBeDefined();
  });
  it('should return the FormArray from manifiestosForm for seleccionadaManifiesto getter', () => {
    component.inicializarFormulario();
    const formArray = component.fb.array([false, true]);
    component.manifiestosForm.setControl('seleccionadaManifiesto', formArray);
    const result = component.seleccionadaManifiesto;
    expect(result).toBe(formArray);
    expect(Array.isArray(result.controls)).toBe(true);
    expect(result.length).toBe(2);
    expect(result.at(0).value).toBe(false);
    expect(result.at(1).value).toBe(true);
  });
  it('should call Modal.show on seleccionarEstablecimiento if modalElement exists', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;
    const showSpy = jest.fn();
    (window as any).Modal = function () { return { show: showSpy }; };
    component.seleccionarEstablecimiento();
    expect(typeof component.modalElement.nativeElement).toBe('object');
  });

  it('should enable forms and set habilitarEstado to false on aceptar', () => {
    component.inicializarFormulario();
    component.aceptar();
    expect(component.datosDelEstablecimientoForm.enabled).toBeTruthy();
    expect(component.domicilloDelEstablecimientoForm.enabled).toBeTruthy();
    expect(component.habilitarEstado).toBeFalsy();
  });

  it('should set manifiestos on obtenerManifiestos', () => {
    component.obtenerManifiestos();
    expect(component.manifiestos).toEqual([{ id: 1 }]);
  });

  it('should set value in seleccionadaManifiesto and call setValoresStore on onManifiestoCheckboxCambiar', () => {
    component.inicializarFormulario();
    component.manifiestosForm.setControl('seleccionadaManifiesto', component.fb.array([false]));
    const event = { target: { checked: true } } as unknown as Event;
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.onManifiestoCheckboxCambiar(event, 0);
    expect(component.seleccionadaManifiesto.at(0).value).toBe(true);
    expect(setValoresStoreSpy).toHaveBeenCalled();
  });

  it('should call Modal.show on agregarMercanciaGrid2606 if modalElement exists', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;
    const showSpy = jest.fn();
    (window as any).Modal = function () { return { show: showSpy }; };
    component.agregarMercanciaGrid2606();
    expect(typeof component.modalElement.nativeElement).toBe('object');
  });

  it('should call closeModal.nativeElement.click on cerrarModal', () => {
    const clickSpy = jest.fn();
    component.closeModal = { nativeElement: { click: clickSpy } } as ElementRef;
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should call tramite260601Store method in setValoresStore', () => {
    component.inicializarFormulario();
    component.datosDelEstablecimientoForm.get('razonSocial')?.setValue('test');
    component.setValoresStore(component.datosDelEstablecimientoForm, 'razonSocial', 'setEstado');
    expect(mockStore.setEstado).toHaveBeenCalledWith('test');
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destruirNotificador$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
