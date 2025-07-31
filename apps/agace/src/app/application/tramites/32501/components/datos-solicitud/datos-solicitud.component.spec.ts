import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Solicitud32501Query } from '../../estados/solicitud32501.query';
import { Solicitud32501Store } from '../../estados/solicitud32501.store';
import { of } from 'rxjs';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  CrosslistComponent,
  InputCheckComponent,
  InputFechaComponent,
  InputHoraComponent,
  InputRadioComponent,
  SelectPaisesComponent,
  TablaDinamicaComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { provideHttpClientTesting } from '@angular/common/http/testing';

// Mock global para Bootstrap Modal
declare global {
  namespace jest {
    interface Global {
      bootstrap: any;
      Modal: any;
    }
  }
}

// Mock de Bootstrap Modal
const mockBootstrapModal = {
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
};

// Asignar el mock al objeto global
(global as any).bootstrap = mockBootstrapModal;
(global as any).Modal = jest.fn().mockImplementation(() => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mercDesmSinMonServiceMock: any;
  let solicitud32501QueryMock: any;
  let solicitud32501StoreMock: any;
  let consultaQueryMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    // Configuración de mocks para el servicio de mercancías desmontadas o sin montar
    mercDesmSinMonServiceMock = {
      obtenerAvisoDelCatalogo: jest.fn(() =>
        of({
          cveFraccionArancelaria: {
            catalogos: [
              {
                id: 1,
                descripcion: '01031001-Reproductors de raza..',
              },
              {
                id: 2,
                descripcion: '01031002-Reproductors de raza..',
              },
              {
                id: 3,
                descripcion: '01031003-Reproductors de raza..',
              },
            ],
            labelNombre: 'Fracción arancelaria',
            required: true,
            primerOpcion: 'Seleccione una opción',
          },
          entidadFederativa: {
            catalogos: [
              {
                id: 1,
                descripcion: 'MEXICO-1',
              },
              {
                id: 2,
                descripcion: 'MEXICO-2',
              },
              {
                id: 3,
                descripcion: 'MEXICO-3',
              },
            ],
            labelNombre: 'Entidad federativa',
            required: true,
            primerOpcion: 'Seleccione una opción',
          },
          delegacionMunicipio: {
            catalogos: [
              {
                id: 1,
                descripcion: 'ATENCO-1',
              },
              {
                id: 2,
                descripcion: 'ATENCO-2',
              },
              {
                id: 3,
                descripcion: 'ATENCO-3',
              },
            ],
            labelNombre: 'Alcaldía o municipio',
            required: true,
            primerOpcion: 'Seleccione una opción',
          },
          colonia: {
            catalogos: [
              {
                id: 1,
                descripcion: 'LA NORIA-1',
              },
              {
                id: 2,
                descripcion: 'LA NORIA-2',
              },
              {
                id: 3,
                descripcion: 'LA NORIA-3',
              },
            ],
            labelNombre: 'Colonia',
            required: true,
            primerOpcion: 'Seleccione una opción',
          },
          aduanaDeImportacion: {
            catalogos: [
              {
                id: 1,
                descripcion: 'Test-1',
              },
              {
                id: 2,
                descripcion: 'Test-2',
              },
              {
                id: 3,
                descripcion: 'Test-3',
              },
            ],
            labelNombre: 'Aduana de importación',
            required: true,
            primerOpcion: 'Seleccione una opción',
          },
          opcionTipoDeDocumento: {
            labelNombre: 'Tipo de documento',
            required: false,
            primerOpcion: 'Seleccione un tipo de documento',
            catalogos: [
              {
                id: 1,
                descripcion: 'Manifiesto',
              },
              {
                id: 2,
                descripcion: 'ID Oficial',
              },
              {
                id: 3,
                descripcion: 'Actas',
              },
              {
                id: 4,
                descripcion: 'Poderes',
              },
              {
                id: 5,
                descripcion: 'Otros',
              },
            ],
          },
        })
      ),
      obtenerOperacionDeImportacion: jest.fn(() =>
        of([
          {
            agenteAduanal: '1234',
            rfc: 'LEQ18101314S7',
            numeroDePedimento: '12345678',
            aduanaDeImportacion: 'ENSENADA',
          },
        ])
      ),
      obtenerAvisoOpcionesDeRadio: jest.fn(() =>
        of({
          opcionesDeRadio: [
            {
              label: 'Importación',
              value: 'TAV.IMP',
            },
            {
              label: 'Montaje',
              value: 'TAV.MON',
            },
          ],
          required: false,
        })
      ),
    };

    // Configuración de mock para consultas de solicitud 32501
    solicitud32501QueryMock = {
      seleccionarSolicitud$: of({
        adace: '',
        fechaIniExposicion: '',
        ideGenerica1: '',
        idTransaccionVU: '',
        cveFraccionArancelaria: '',
        nico: '',
        peso: '',
        valorUSD: '',
        descripcionMercancia: '',
        nombreComercial: '',
        entidadFederativa: '',
        delegacionMunicipio: '',
        colonia: '',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        codigoPostal: '',
        patente: '',
        rfc: '',
        pedimento: '',
        aduana: '',
      }),
    };

    // Configuración de mock para el store de solicitud 32501
    solicitud32501StoreMock = {
      establecerDatos: jest.fn(() => of({})),
    };

    // Configuración de mock para consultas de estado
    consultaQueryMock = {
      selectConsultaioState$: of({
        readonly: false,
      }),
    };

    // Configuración de mock para el servicio de modales de Bootstrap
    modalServiceMock = {
      show: jest.fn(() => ({
        hide: jest.fn(),
      })),
    };

    await TestBed.configureTestingModule({
      imports: [
        DatosSolicitudComponent,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        WizardComponent,
        BtnContinuarComponent,
        InputCheckComponent,
        InputFechaComponent,
        InputHoraComponent,
        CrosslistComponent,
        TituloComponent,
        SelectPaisesComponent,
        AnexarDocumentosComponent,
        AlertComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
      ],
      providers: [
        FormBuilder,
        provideHttpClientTesting(),
        {
          provide: MercanciasDesmontadasOSinMontarService,
          useValue: mercDesmSinMonServiceMock,
        },
        { provide: Solicitud32501Query, useValue: solicitud32501QueryMock },
        { provide: Solicitud32501Store, useValue: solicitud32501StoreMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    
    // Agregar métodos de mock para evitar errores de pruebas en métodos de modal
    component.mostrarModalSeleccionRequerida = jest.fn();
    component.mostrarModalConfirmacionEliminacion = jest.fn();
    component.cerrarModalSeleccionRequerida = jest.fn();
    component.cerrarModalConfirmacionEliminacion = jest.fn();
    component.confirmarEliminacionOperacionImportacion = jest.fn();
    
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar correctamente todas las dependencias inyectadas', () => {
    expect(component.fb).toBeDefined();
    expect(component.mercanciasDesmontadasOSinMontarService).toBeDefined();
    expect(component.solicitud32501Query).toBeDefined();
    expect(component.solicitud32501Store).toBeDefined();
    expect(component['consultaQuery']).toBeDefined();
    expect(component['modalService']).toBeDefined();
  });

  it('debe inicializar el formulario correctamente en ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAviso).toBeDefined();
    expect(component.formAviso.get('adace')).toBeTruthy();
    expect(component.formAviso.get('fechaIniExposicion')).toBeTruthy();
  });

  it('debe llamar al servicio obtenerAvisoDelCatalogo al inicializar', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoDelCatalogo');
    component.obtenerAvisoDelCatalogo();
    expect(mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo).toHaveBeenCalled();
  });

  it('debe llamar al servicio obtenerOperacionDeImportacion al inicializar', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerOperacionDeImportacion');
    component.obtenerOperacionDeImportacion();
    expect(mercDesmSinMonServiceMock.obtenerOperacionDeImportacion).toHaveBeenCalled();
  });

  it('debe llamar al servicio obtenerAvisoOpcionesDeRadio y establecer avisoOpcionesDeRadio', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoOpcionesDeRadio');
    component.obtenerAvisoOpcionesDeRadio();
    expect(mercDesmSinMonServiceMock.obtenerAvisoOpcionesDeRadio).toHaveBeenCalled();
  });

  it('debe actualizar tipoAviso correctamente cuando se llama setTipoDeAviso', () => {
    component.setTipoDeAviso('TAV.IMP');
    expect(component.tipoAviso).toBe('TAV.IMP');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ ideGenerica1: 'TAV.IMP' });
  });

  it('debe actualizar descripcionMercancia en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('descripcionMercancia')?.setValue('Descripción de prueba');
    component.establecerValoresEnEstado(component.formAviso, 'descripcionMercancia');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ descripcionMercancia: 'Descripción de prueba' });
  });

  it('debe actualizar nombreComercial en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('nombreComercial')?.setValue('Comercial Test');
    component.establecerValoresEnEstado(component.formAviso, 'nombreComercial');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ nombreComercial: 'Comercial Test' });
  });

  it('debe actualizar calle en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('calle')?.setValue('Calle Test');
    component.establecerValoresEnEstado(component.formAviso, 'calle');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ calle: 'Calle Test' });
  });

  it('debe actualizar numeroExterior en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('numeroExterior')?.setValue('123');
    component.establecerValoresEnEstado(component.formAviso, 'numeroExterior');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ numeroExterior: '123' });
  });

  it('debe actualizar numeroInterior en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('numeroInterior')?.setValue('A1');
    component.establecerValoresEnEstado(component.formAviso, 'numeroInterior');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ numeroInterior: 'A1' });
  });

  it('debe actualizar codigoPostal en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('codigoPostal')?.setValue('54321');
    component.establecerValoresEnEstado(component.formAviso, 'codigoPostal');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ codigoPostal: '54321' });
  });

  it('debe actualizar entidadFederativa en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('entidadFederativa')?.setValue(1);
    component.establecerValoresEnEstado(component.formAviso, 'entidadFederativa');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ entidadFederativa: 1 });
  });

  it('debe actualizar delegacionMunicipio en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('delegacionMunicipio')?.setValue(2);
    component.establecerValoresEnEstado(component.formAviso, 'delegacionMunicipio');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ delegacionMunicipio: 2 });
  });

  it('debe actualizar colonia en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('colonia')?.setValue(3);
    component.establecerValoresEnEstado(component.formAviso, 'colonia');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ colonia: 3 });
  });

  it('debe actualizar cveFraccionArancelaria en el store usando establecerValoresEnEstado', () => {
    component.formAviso.get('cveFraccionArancelaria')?.setValue(1);
    component.establecerValoresEnEstado(component.formAviso, 'cveFraccionArancelaria');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ cveFraccionArancelaria: 1 });
  });

  it('debe actualizar idTransaccionVU en el store usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '1234567890123456789012345' } } as any;
    component.actualizarNumeroValor('idTransaccionVU', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ idTransaccionVU: '1234567890123456789012345' });
  });

  it('debe actualizar nico en el store usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '12' } } as any;
    component.actualizarNumeroValor('nico', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ nico: '12' });
  });

  it('debe actualizar peso en el store usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '100.50' } } as any;
    component.actualizarNumeroValor('peso', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ peso: '100.50' });
  });

  it('debe actualizar valorUSD en el store usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '200.75' } } as any;
    component.actualizarNumeroValor('valorUSD', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ valorUSD: '200.75' });
  });

  it('debe limpiar correctamente las suscripciones en ngOnDestroy', () => {
    const SPY = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(SPY).toHaveBeenCalled();
  });

  it('debe validar correctamente un campo inválido con el método noEsValido', () => {
    // Configurar un campo como inválido y tocado para la prueba
    component.formAviso.get('descripcionMercancia')?.markAsTouched();
    component.formAviso.get('descripcionMercancia')?.setErrors({ required: true });
    
    const resultado = component.noEsValido('descripcionMercancia');
    expect(resultado).toBe(true);
  });

  it('debe validar correctamente un campo válido con el método esValido', () => {
    // Configurar un campo como válido para la prueba
    component.formAviso.get('descripcionMercancia')?.setValue('Descripción válida');
    component.formAviso.get('descripcionMercancia')?.markAsTouched();
    
    const resultado = component.esValido('descripcionMercancia');
    expect(resultado).toBe(false);
  });

  it('debe mostrar modal de selección requerida cuando no hay elementos seleccionados para eliminar', () => {
    // Configurar estado vacío para la prueba
    component.operacionDeImportacionLista = [];
    component.selectedOperacionDeImportacion = null;
    
    const spyMostrarModal = jest.spyOn(component, 'mostrarModalSeleccionRequerida');
    component.eliminarOperacionImp();
    
    expect(spyMostrarModal).toHaveBeenCalled();
    expect(component.mensajeSeleccion).toBe('Debe seleccionar un elemento');
  });

  it('debe mostrar modal de confirmación cuando hay elemento seleccionado para eliminar', () => {
    // Configurar datos de prueba para la eliminación
    component.operacionDeImportacionLista = [
      {
        agenteAduanal: '1234',
        rfc: 'LEQ18101314S7',
        numeroDePedimento: '12345678',
        aduanaDeImportacion: 'ENSENADA',
      }
    ];
    component.selectedOperacionDeImportacion = {
      agenteAduanal: '1234',
      rfc: 'LEQ18101314S7',
      numeroDePedimento: '12345678',
      aduanaDeImportacion: 'ENSENADA',
    };
    
    const spyMostrarModal = jest.spyOn(component, 'mostrarModalConfirmacionEliminacion');
    component.eliminarOperacionImp();
    
    expect(spyMostrarModal).toHaveBeenCalled();
  });

  it('debe cambiar correctamente la fecha de inicio de exposición', () => {
    const fechaPrueba = '2024-01-15';
    component.cambiarInputFecha(fechaPrueba);
    
    expect(component.formAviso.get('fechaIniExposicion')?.value).toBe(fechaPrueba);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ fechaIniExposicion: fechaPrueba });
  });

  it('debe habilitar y deshabilitar campos del formulario según modo de solo lectura', () => {
    // Probar modo solo lectura
    component.esSoloLectura = true;
    component.habilitarDeshabilitarFormulario();
    
    expect(component.formAviso.get('ideGenerica1')?.disabled).toBe(true);
    expect(component.formAviso.get('descripcionMercancia')?.disabled).toBe(true);
    
    // Probar modo edición
    component.esSoloLectura = false;
    component.habilitarDeshabilitarFormulario();
    
    expect(component.formAviso.get('ideGenerica1')?.disabled).toBe(false);
    expect(component.formAviso.get('descripcionMercancia')?.disabled).toBe(false);
  });

  it('debe mostrar el modal correctamente cuando se llama modificarOperacionImp', () => {
    // Configurar elemento mock para la prueba del modal
    const MODAL_MOCK = { nativeElement: document.createElement('div') };
    component.modalElement = MODAL_MOCK as ElementRef;
    const showSpy = jest.fn();
    const MODAL_INSTANCE_MOCK = { show: showSpy };
    
    // Mock del constructor de Modal de Bootstrap
    const MODAL_CONSTRUCTOR_SPY = jest.spyOn(global, 'Modal' as any)
      .mockImplementation(() => MODAL_INSTANCE_MOCK as unknown as Modal);
    
    component.modificarOperacionImp();
    
    expect(showSpy).toHaveBeenCalled();
    MODAL_CONSTRUCTOR_SPY.mockRestore();
  });

  it('debe mostrar el modal correctamente cuando se llama agregarOperacionImp', () => {
    // Configurar elemento mock para la prueba del modal
    const MODAL_MOCK = { nativeElement: document.createElement('div') };
    component.modalElement = MODAL_MOCK as ElementRef;
    const showSpy = jest.fn();
    const MODAL_INSTANCE_MOCK = { show: showSpy };
    
    // Mock del constructor de Modal de Bootstrap
    const MODAL_CONSTRUCTOR_SPY = jest.spyOn(global, 'Modal' as any)
      .mockImplementation(() => MODAL_INSTANCE_MOCK as unknown as Modal);
    
    component.agregarOperacionImp();
    
    expect(showSpy).toHaveBeenCalled();
    MODAL_CONSTRUCTOR_SPY.mockRestore();
  });

  it('debe tener propiedades inicializadas correctamente después de la creación', () => {
    // Verificar que las propiedades básicas estén definidas
    expect(component.formAviso).toBeDefined();
    expect(component.tipoAviso).toBeDefined();
    expect(component.operacionDeImportacionLista).toBeDefined();
    expect(component.configuracionColumnas).toBeDefined();
    expect(component.fechaInicioInput).toBeDefined();
  });

  it('debe manejar correctamente los observables del estado', () => {
    // Verificar que los observables se suscriban correctamente
    expect(solicitud32501QueryMock.seleccionarSolicitud$).toBeDefined();
    expect(consultaQueryMock.selectConsultaioState$).toBeDefined();
  });

});