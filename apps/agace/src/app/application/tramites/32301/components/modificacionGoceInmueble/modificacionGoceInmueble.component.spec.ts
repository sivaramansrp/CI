import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionGoceInmuebleComponent } from './modificacionGoceInmueble.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, NotificacionesComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('ModificacionGoceInmuebleComponent', () => {
  let component: ModificacionGoceInmuebleComponent;
  let fixture: ComponentFixture<ModificacionGoceInmuebleComponent>;
  let avisoModifyServiceMock: any;
  let tramite32301StoreMock: any;
  let tramite32301QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Entidad' }])),
      getGridDomiciliosModificados: jest.fn().mockReturnValue(of({ tableHeader: ['h1'], tableBody: [{ tbodyData: ['a'] }] })),
      getGridMostrarGridModificado: jest.fn().mockReturnValue(of({ tableHeader: ['h2'], tableBody: [{ tbodyData: ['b'] }] })),
    };
    tramite32301StoreMock = {
      setModificacionGoceInmueble: jest.fn(),
    };
    tramite32301QueryMock = {
      selectModificacionGoceInmueble$: of({ campo: 'valor' }),
      select: jest.fn().mockReturnValue(of({})),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        ModificacionGoceInmuebleComponent,
            CommonModule,
            TituloComponent,
            InputRadioComponent,
            AlertComponent,
            TableComponent,
            CatalogoSelectComponent,
            NotificacionesComponent,
            HttpClientTestingModule,

      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramite32301StoreMock },
        { provide: Tramite32301Query, useValue: tramite32301QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionGoceInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable forms in guardarDatosFormulario when readonly', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.direccionGrid.disabled).toBe(true);
    expect(component.modificacionGoceForm.disabled).toBe(true);
  });

  it('should enable forms in guardarDatosFormulario when not readonly', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.direccionGrid.enabled).toBe(true);
    expect(component.modificacionGoceForm.enabled).toBe(true);
  });

  it('should call getEntidadFederativa and set entidadFederativa', () => {
    component.getEntidadFederativa();
    expect(avisoModifyServiceMock.getEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativa).toEqual([{ id: 1, nombre: 'Entidad' }]);
  });

  it('should call getGridDomiciliosModificados and set headers/data', () => {
    component.getGridDomiciliosModificados();
    expect(avisoModifyServiceMock.getGridDomiciliosModificados).toHaveBeenCalled();
    expect(component.gridDomiciliosModificadosHeader).toEqual(['h1']);
    expect(component.gridDomiciliosModificadosData).toEqual([{ tbodyData: ['a'] }]);
  });

  it('should call getGridMostrarGridModificado and set headers/data', () => {
    component.getGridMostrarGridModificado();
    expect(avisoModifyServiceMock.getGridMostrarGridModificado).toHaveBeenCalled();
    expect(component.mostrarGridNuevoHeader).toEqual(['h2']);
    expect(component.mostrarGridNuevoHeaderData).toEqual([{ tbodyData: ['b'] }]);
  });

  it('should set mostrarGridNuevo and mostrarGridModificado on verificaRadioTipoSem', () => {
    component.verificaRadioTipoSem('ModificarDomicilio');
    expect(component.mostrarGridNuevo).toBe(false);
    expect(component.mostrarGridModificado).toBe(true);

    component.verificaRadioTipoSem('DomicilioNuevo');
    expect(component.mostrarGridNuevo).toBe(true);
    expect(component.mostrarGridModificado).toBe(false);

    component.verificaRadioTipoSem('Otro');
    expect(component.mostrarGridNuevo).toBe(false);
    expect(component.mostrarGridModificado).toBe(false);
  });

  it('should patch values in cargarDatosRfcPartesC', () => {
    component.inicializarFormulario();
    component.direccionGrid.get('rfcPartesC')?.setValue('RFC123');
    component.cargarDatosRfcPartesC();
    expect(component.direccionGrid.get('rfcPartesCons')?.value).toBe('RFC123');
    expect(component.direccionGrid.get('nombrePartesCons')?.value).toBe('EuroFoods De Maxico Gonza');
  });

  it('should clear fields in limpiaCamposParteC', () => {
    component.inicializarFormulario();
    component.direccionGrid.patchValue({
      rfcPartesC: 'a',
      rfcPartesCons: 'b',
      nombrePartesCons: 'c',
      caracterDeCons: 'd',
    });
    component.limpiaCamposParteC();
    expect(component.direccionGrid.get('rfcPartesC')?.value).toBe('');
    expect(component.direccionGrid.get('rfcPartesCons')?.value).toBe('');
    expect(component.direccionGrid.get('nombrePartesCons')?.value).toBe('');
    expect(component.direccionGrid.get('caracterDeCons')?.value).toBe('');
  });

  it('should add a new parte contratante in agregarParteC', () => {
    component.inicializarFormulario();
    component.direccionGrid.patchValue({
      rfcPartesCons: 'RFC',
      nombrePartesCons: 'Nombre',
      caracterDeCons: 'Caracter',
    });
    component.agregarParteC();
    expect(component.modificacionPartesData[0].tbodyData).toContain('RFC');
    expect(component.modificacionPartesData[0].tbodyData).toContain('Nombre');
    expect(component.modificacionPartesData[0].tbodyData).toContain('Caracter');
  });

  it('should not add parte contratante if fields are missing', () => {
    component.inicializarFormulario();
    component.direccionGrid.patchValue({
      rfcPartesCons: '',
      nombrePartesCons: '',
      caracterDeCons: '',
    });
    const before = [...component.modificacionPartesData[0].tbodyData];
    component.agregarParteC();
    expect(component.modificacionPartesData[0].tbodyData).toEqual(before);
  });

  it('should remove last parte contratante in eliminarParteC', () => {
    component.modificacionPartesData[0].tbodyData = ['a', 'b', 'c'];
    component.modificacionPartes = [{ rfc: 'a', nombre: 'b', caracter: 'c' }];
    component.eliminarParteC();
    expect(component.modificacionPartesData[0].tbodyData.length).toBe(2);
  });

  it('should call setValoresStore', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    tramite32301StoreMock['setCampo'] = jest.fn();
    component.setValoresStore(form, 'campo', 'setCampo' as any);
    expect(tramite32301StoreMock.setCampo).toHaveBeenCalledWith('valor');
  });

  it('should push data to mostrarGridNuevoHeaderData in getValorStore', () => {
    component.mostrarGridNuevoHeaderData = [];
    component.getValorStore();
    expect(component.mostrarGridNuevoHeaderData.length).toBeGreaterThan(0);
  });

  it('should call store and close modal in guardarDomInmuebleNvo', () => {
    component.inicializarFormulario();
    component.direccionGrid.setValue({
      idAviInmueble: '',
      direccion: 'dir',
      codigoPostal: '12345',
      cveEntidad: '1',
      cveMunicipio: '1',
      cveTipoDoc: '1',
      fechaInicioAnterior: '2020-01-01',
      fechaFinAnterior: '2020-01-02',
      fechaInicioActual: '2020-01-03',
      fechaFinActual: '2020-01-04',
      rfcPartesC: 'RFC1234567890',
      rfcPartesCons: '',
      nombrePartesCons: '',
      caracterDeCons: 'caracter',
      observaciones: '',
    });
    component.modalDomiciliosInmuebleNuevoInstance = new Modal(document.createElement('div'));
    const closeSpy = jest.spyOn(component, 'closeModalDomiciliosInmuebleNuevoModel');
    component.guardarDomInmuebleNvo();
    expect(tramite32301StoreMock.setModificacionGoceInmueble).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should call openModalDomiciliosInmuebleNuevoModel in abrirModalDomiciliosNvo', () => {
    component.modalDomiciliosInmuebleNuevoInstance = new Modal(document.createElement('div'));
    const spy = jest.spyOn(component, 'openModalDomiciliosInmuebleNuevoModel');
    component.abrirModalDomiciliosNvo();
    expect(spy).toHaveBeenCalled();
  });

  it('should show modal in openModalDomiciliosInmuebleNuevoModel', () => {
    const modal = new Modal(document.createElement('div'));
    component.modalDomiciliosInmuebleNuevoInstance = modal;
    const showSpy = jest.spyOn(modal, 'show');
    component.openModalDomiciliosInmuebleNuevoModel();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should hide modal and call getValorStore in closeModalDomiciliosInmuebleNuevoModel', () => {
    const modal = new Modal(document.createElement('div'));
    component.modalDomiciliosInmuebleNuevoInstance = modal;
    const hideSpy = jest.spyOn(modal, 'hide');
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
    component.closeModalDomiciliosInmuebleNuevoModel();
    expect(hideSpy).toHaveBeenCalled();
    expect(getValorStoreSpy).toHaveBeenCalled();
  });

  it('should set modificarNotificacion in openModificarModel', () => {
    component.openModificarModel();
    expect(component.modificarNotificacion).toBeDefined();
    expect(component.modificarNotificacion.tipoNotificacion).toBe('alert');
  });

  it('should set modificarRecordNotificacion in openModificarRecordModel', () => {
    component.openModificarRecordModel();
    expect(component.modificarRecordNotificacion).toBeDefined();
    expect(component.modificarRecordNotificacion.mensaje).toContain('Selecciona sólo un registro');
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});