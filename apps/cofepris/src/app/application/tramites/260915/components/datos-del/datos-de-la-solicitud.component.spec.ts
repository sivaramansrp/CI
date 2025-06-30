
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import{DatosdelasolicitudComponent} from './datos-de-la-solicitud.component'
import { FormBuilder } from '@angular/forms';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockPermisoSanitarioDispositivosMedicosService {}

@Injectable()
class MockSolicitud260915Store {}

@Injectable()
class MockSolicitud260915Query {}


describe('DatosdelasolicitudComponent', () => {
  let fixture: ComponentFixture<DatosdelasolicitudComponent>;
  let component: {
    listaClaveTabla: any;
    showClavaScianForm(showClavaScianForm: any): unknown;
    selectedRows: Set<{ id: number; }>;
    esFormularioSoloLectura: boolean; ngOnDestroy: () => void; dataDeLaSolicitudForm: { get?: any; disable?: any; enable?: any; value?: any; reset?: any; patchValue?: any; }; datosDelTramiteRealizar: { disable?: any; enable?: any; }; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); createForm: jest.Mock<any, any, any> | (() => void); createclaveScianForm: jest.Mock<any, any, any> | (() => void); inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); clavaScianForm: { disable?: any; enable?: any; reset?: any; value?: any; }; getEstadosData: jest.Mock<any, any, any> | (() => void); getClaveScianData: jest.Mock<any, any, any> | (() => void); getClaveDescripcionDelData: jest.Mock<any, any, any> | (() => void); getRegimenalqueData: jest.Mock<any, any, any> | (() => void); getAduanaData: jest.Mock<any, any, any> | (() => void); getEspificarData: jest.Mock<any, any, any> | (() => void); getClasificacionDelProductoData: jest.Mock<any, any, any> | (() => void); getTipoProductoData: jest.Mock<any, any, any> | (() => void); getMercanciaCrosslistData: jest.Mock<any, any, any> | (() => void); getEstadoFisicoData: jest.Mock<any, any, any> | (() => void); getMercanciasDatosData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; solicitud260915Query: { selectSolicitud260915$?: any; }; fb: { group?: any; }; clearNotificacion: jest.Mock<any, any, any> | (() => void); closeModal: () => void; tableData: string[]; filasSeleccionadas: { has?: any; clear?: any; size?: any; }; eliminarPedimento: (arg0: {}) => void; abrirModal: jest.Mock<any, any, any> | (() => void); permisosanitariodisposivos: { getMercanciaCrosslistData?: any; getEstadosData?: any; getClaveScianData?: any; getClaveDescripcionDelData?: any; getRegimenalqueData?: any; getAduanaData?: any; getEstadoFisicoData?: any; getClasificacionDelProductoData?: any; getEspificarData?: any; getTipoProductoData?: any; getMercanciasDatosData?: any; }; paisOrigenColapsable: () => void; paisProcedencis_colapsable: () => void; usoEspecificoColapsable: () => void; estadoData: { catalogos?: any; }; claveScianData: { catalogos?: any; }; descripcionDelScianData: { catalogos?: any; }; regimenalqueData: { catalogos?: any; }; aduanaData: { catalogos?: any; }; estadoFisicoData: { catalogos?: any; }; aceptar: () => void; delProducto: { catalogos?: any; }; especificarData: { catalogos?: any; }; tipoProductoData: { catalogos?: any; }; seleccionarEstablecimiento: () => void; onLimpiar: () => void; onAgregar: () => void; onDelete: () => void; onCancelar: () => void; modalElement: { nativeElement?: any; }; agregarMercanciaGrid: () => void; onfilasSeleccionadas: (arg0: { length: {}; map: () => { claveScianG: { claveScian: {}; }; id: {}; }[]; }) => void; onSubmit: () => void; toggleLicenciaSanitaria: () => void; mercanciasData: { push?: any; findIndex?: any; SELECTED_ROW_INDEX?: any; }; onSave: () => void; onModificar: () => void; changeEvent: () => void; solicitud260915Store: { setTramite260915State?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}) => void; destroyed$: { next?: any; complete?: any; }; 
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosdelasolicitudComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useClass: MockPermisoSanitarioDispositivosMedicosService },
        ChangeDetectorRef,
        { provide: Solicitud260915Store, useClass: MockSolicitud260915Store },
        { provide: Solicitud260915Query, useClass: MockSolicitud260915Query },
        ConsultaioQuery
      ]
    }).overrideComponent(DatosdelasolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.debugElement.componentInstance;
    const fb = TestBed.inject(FormBuilder);
  component.fb = fb;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
     expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });


  it('should run #guardarDatosFormulario()', async () => {
    component.createForm = jest.fn();
    component.createclaveScianForm = jest.fn();
  
    component.dataDeLaSolicitudForm = new FormGroup({
      datosDelTramiteRealizar: new FormGroup({
        avisoDeFuncionamiento: new FormControl(false),
        licenciaSanitaria: new FormControl(''),
      }),
    });
  
    component.dataDeLaSolicitudForm.disable = jest.fn();
    component.dataDeLaSolicitudForm.enable = jest.fn();
  
    component.clavaScianForm = new FormGroup({});
    component.clavaScianForm.disable = jest.fn();
    component.clavaScianForm.enable = jest.fn();
  
    component.esFormularioSoloLectura = true;
  
    component.guardarDatosFormulario();
  
    expect(component.createForm).toHaveBeenCalled();
    expect(component.createclaveScianForm).toHaveBeenCalled();
    expect(component.dataDeLaSolicitudForm.disable).toHaveBeenCalled();
    expect(component.dataDeLaSolicitudForm.enable).not.toHaveBeenCalled();
    expect(component.clavaScianForm.disable).toHaveBeenCalled();
    expect(component.clavaScianForm.enable).not.toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.getEstadosData = jest.fn();
    component.getClaveScianData = jest.fn();
    component.getClaveDescripcionDelData = jest.fn();
    component.getRegimenalqueData = jest.fn();
    component.getAduanaData = jest.fn();
    component.getEspificarData = jest.fn();
    component.getClasificacionDelProductoData = jest.fn();
    component.getTipoProductoData = jest.fn();
    component.getMercanciaCrosslistData = jest.fn();
    component.createclaveScianForm = jest.fn();
    component.getEstadoFisicoData = jest.fn();
    component.getMercanciasDatosData = jest.fn();
    component.ngOnInit();
     expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
     expect(component.getEstadosData).toHaveBeenCalled();
     expect(component.getClaveScianData).toHaveBeenCalled();
     expect(component.getClaveDescripcionDelData).toHaveBeenCalled();
     expect(component.getRegimenalqueData).toHaveBeenCalled();
     expect(component.getAduanaData).toHaveBeenCalled();
     expect(component.getEspificarData).toHaveBeenCalled();
     expect(component.getClasificacionDelProductoData).toHaveBeenCalled();
     expect(component.getTipoProductoData).toHaveBeenCalled();
     expect(component.getMercanciaCrosslistData).toHaveBeenCalled();
     expect(component.createclaveScianForm).toHaveBeenCalled();
     expect(component.getEstadoFisicoData).toHaveBeenCalled();
     expect(component.getMercanciasDatosData).toHaveBeenCalled();
  });

  it('should run #createclaveScianForm()', async () => {
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud260915$ = observableOf({});
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createclaveScianForm();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud260915$ = observableOf({});
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createForm();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #clearNotificacion()', async () => {

    component.clearNotificacion();

  });

  it('should run #closeModal()', async () => {
    component.clearNotificacion = jest.fn();
    component.closeModal();
     expect(component.clearNotificacion).toHaveBeenCalled();
  });

  it('should run #eliminarPedimento()', async () => {
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.filasSeleccionadas = component.filasSeleccionadas || {};
    component.filasSeleccionadas.has = jest.fn();
    component.filasSeleccionadas.clear = jest.fn();
    component.eliminarPedimento({});
     expect(component.filasSeleccionadas.has).toHaveBeenCalled();
     expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });

  it('should run #abrirModal()', async () => {
    const mockItem = { id: 1 };
    component.selectedRows = new Set([mockItem]);
    component.abrirModal = jest.fn();
    component.abrirModal();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #getMercanciaCrosslistData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getMercanciaCrosslistData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaCrosslistData();
     expect(component.permisosanitariodisposivos.getMercanciaCrosslistData).toHaveBeenCalled();
  });

  it('should run #paisOrigenColapsable()', async () => {

    component.paisOrigenColapsable();

  });

  it('should run #paisProcedencis_colapsable()', async () => {

    component.paisProcedencis_colapsable();

  });

  it('should run #usoEspecificoColapsable()', async () => {

    component.usoEspecificoColapsable();

  });

  it('should run #getEstadosData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEstadosData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoData = component.estadoData || {};
    component.estadoData.catalogos = 'catalogos';
    component.getEstadosData();
     expect(component.permisosanitariodisposivos.getEstadosData).toHaveBeenCalled();
  });

  it('should run #getClaveScianData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClaveScianData = jest.fn().mockReturnValue(observableOf({}));
    component.claveScianData = component.claveScianData || {};
    component.claveScianData.catalogos = 'catalogos';
    component.getClaveScianData();
     expect(component.permisosanitariodisposivos.getClaveScianData).toHaveBeenCalled();
  });

  it('should run #getClaveDescripcionDelData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClaveDescripcionDelData = jest.fn().mockReturnValue(observableOf({}));
    component.descripcionDelScianData = component.descripcionDelScianData || {};
    component.descripcionDelScianData.catalogos = 'catalogos';
    component.getClaveDescripcionDelData();
     expect(component.permisosanitariodisposivos.getClaveDescripcionDelData).toHaveBeenCalled();
  });

  it('should run #getRegimenalqueData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getRegimenalqueData = jest.fn().mockReturnValue(observableOf({}));
    component.regimenalqueData = component.regimenalqueData || {};
    component.regimenalqueData.catalogos = 'catalogos';
    component.getRegimenalqueData();
     expect(component.permisosanitariodisposivos.getRegimenalqueData).toHaveBeenCalled();
  });

  it('should run #getAduanaData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getAduanaData = jest.fn().mockReturnValue(observableOf({}));
    component.aduanaData = component.aduanaData || {};
    component.aduanaData.catalogos = 'catalogos';
    component.getAduanaData();
     expect(component.permisosanitariodisposivos.getAduanaData).toHaveBeenCalled();
  });

  it('should run #getEstadoFisicoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEstadoFisicoData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoFisicoData = component.estadoFisicoData || {};
    component.estadoFisicoData.catalogos = 'catalogos';
    component.getEstadoFisicoData();
     expect(component.permisosanitariodisposivos.getEstadoFisicoData).toHaveBeenCalled();
  });

  it('should run #aceptar()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.enable = jest.fn();
    component.aceptar();
     expect(component.dataDeLaSolicitudForm.enable).toHaveBeenCalled();
  });

  it('should run #getClasificacionDelProductoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getClasificacionDelProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.delProducto = component.delProducto || {};
    component.delProducto.catalogos = 'catalogos';
    component.getClasificacionDelProductoData();
     expect(component.permisosanitariodisposivos.getClasificacionDelProductoData).toHaveBeenCalled();
  });

  it('should run #getEspificarData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getEspificarData = jest.fn().mockReturnValue(observableOf({}));
    component.especificarData = component.especificarData || {};
    component.especificarData.catalogos = 'catalogos';
    component.getEspificarData();
     expect(component.permisosanitariodisposivos.getEspificarData).toHaveBeenCalled();
  });

  it('should run #getTipoProductoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getTipoProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.tipoProductoData = component.tipoProductoData || {};
    component.tipoProductoData.catalogos = 'catalogos';
    component.getTipoProductoData();
     expect(component.permisosanitariodisposivos.getTipoProductoData).toHaveBeenCalled();
  });

  it('should run #seleccionarEstablecimiento()', async () => {
    component.abrirModal = jest.fn();
    component.seleccionarEstablecimiento();
     expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #onLimpiar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onLimpiar();
     expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #onAgregar()', async () => {

    component.onAgregar();

  });

  it('should run #onDelete()', async () => {
    component.clavaScianForm = component.fb.group({
      claveScianG: component.fb.group({
        claveScian: [''],
        descripcionDelScian: [''],
      }),
    });
  
    const resetSpy = jest.spyOn(component.clavaScianForm, 'reset');
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
  
    component.filasSeleccionadas = new Set([1, 2]);
  
    component.onDelete();
  
    expect(abrirModalSpy).toHaveBeenCalled();
  
    expect(resetSpy).not.toHaveBeenCalled();
  });
  it('should run #onCancelar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onCancelar();
     expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #onfilasSeleccionadas()', async () => {
    component.filasSeleccionadas = component.filasSeleccionadas || {};
    component.filasSeleccionadas.clear = jest.fn();
    component.onfilasSeleccionadas({
      length: {},
      map: function() {
        return [
          {
            "claveScianG": {
              "claveScian": {}
            },
            "id": {}
          }
        ];
      }
    });
     expect(component.filasSeleccionadas.clear).toHaveBeenCalled();
  });

 it('should run #onSubmit() and add data to tableData', () => {
     component.claveScianData = {
       catalogos: [
         { id: 1, descripcion: 'Description 1' },
         { id: 2, descripcion: 'Description 2' },
       ],
     };
     component.descripcionDelScianData = {
       catalogos: [
         { id: 1, descripcion: 'Desc 1' },
         { id: 2, descripcion: 'Desc 2' },
       ],
     };
   
     component.clavaScianForm = {
       value: {
         claveScianG: {
           claveScian: 1,
           descripcionDelScian: 2,
         },
       },
       reset: jest.fn(),
     } as unknown as FormGroup;
   
     component.onSubmit();
   
     const expectedData = {
       claveScianG: {
         claveScian: 'Description 1',
         descripcionDelScian: 'Desc 2',
       },
     };
   
     expect(component.tableData).toEqual([expectedData]);
   
     expect(component.clavaScianForm.reset).toHaveBeenCalled();
     expect(component.showClavaScianForm).toBe(false);
   });
  it('should run #toggleLicenciaSanitaria()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {}
    });
    component.toggleLicenciaSanitaria();
     expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #onSave()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.value = 'value';
    component.dataDeLaSolicitudForm.reset = jest.fn();
    component.tipoProductoData = component.tipoProductoData || {};
    component.tipoProductoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.delProducto = component.delProducto || {};
    component.delProducto.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.especificarData = component.especificarData || {};
    component.especificarData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.estadoFisicoData = component.estadoFisicoData || {};
    component.estadoFisicoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.mercanciasData = component.mercanciasData || {};
    component.mercanciasData.push = jest.fn();
    component.onSave();
     expect(component.dataDeLaSolicitudForm.reset).toHaveBeenCalled();
     expect(component.mercanciasData.push).toHaveBeenCalled();
  });

  it('should run #onModificar()', async () => {
    component.filasSeleccionadas = new Set([
      { claveDeLosLotes: 'mockClaveDeLosLotes' },
    ]);

    component.listaClaveTabla = [
      JSON.stringify({ claveDeLosLotes: 'mockClaveDeLosLotes', fechaDeFabricacion: 'mockFecha', fechaDeCaducidad: 'mockFecha' }),
    ];
    jest.spyOn(component.listaClaveTabla, 'findIndex').mockReturnValue(0);

    component.dataDeLaSolicitudForm = {
      patchValue: jest.fn(),
    };

    component.onModificar();
});

  it('should run #changeEvent()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function() {},
      disable: function() {},
      enable: function() {}
    });
    component.changeEvent();
     expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #getMercanciasDatosData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getMercanciasDatosData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciasDatosData();
     expect(component.permisosanitariodisposivos.getMercanciasDatosData).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud260915Store = component.solicitud260915Store || {};
    component.solicitud260915Store.setTramite260915State = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {});
     expect(component.solicitud260915Store.setTramite260915State).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
     expect(component.destroyed$.next).toHaveBeenCalled();
     expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});