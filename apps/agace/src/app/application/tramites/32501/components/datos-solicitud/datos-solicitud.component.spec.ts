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
import * as bootstrap from 'bootstrap';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mercDesmSinMonServiceMock: any;
  let solicitud32501QueryMock: any;
  let solicitud32501StoreMock: any;

  beforeEach(async () => {
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

    solicitud32501StoreMock = {
      establecerDatos: jest.fn(() => of({})),
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
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario en ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAviso).toBeDefined();
    expect(component.formAviso.get('adace')).toBeTruthy();
    expect(component.formAviso.get('fechaIniExposicion')).toBeTruthy();
  });

  it('debe llamar obtenerAvisoDelCatalogo al inicializar', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoDelCatalogo');
    component.obtenerAvisoDelCatalogo();
    expect(mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo).toHaveBeenCalled();
  });

  it('debe llamar obtenerOperacionDeImportacion al inicializar', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerOperacionDeImportacion');
    component.obtenerOperacionDeImportacion();
    expect(mercDesmSinMonServiceMock.obtenerOperacionDeImportacion).toHaveBeenCalled();
  });

  it('debe llamar obtenerAvisoOpcionesDeRadio y establecer avisoOpcionesDeRadio', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoOpcionesDeRadio');
    component.obtenerAvisoOpcionesDeRadio();
    expect(mercDesmSinMonServiceMock.obtenerAvisoOpcionesDeRadio).toHaveBeenCalled();
  });

  it('debe actualizar tipoAviso cuando se llama setTipoDeAviso', () => {
    component.setTipoDeAviso('TAV.IMP');
    expect(component.tipoAviso).toBe('TAV.IMP');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ ideGenerica1: 'TAV.IMP' });
  });

  it('debe actualizar descripcionMercancia usando establecerValoresEnEstado', () => {
    component.formAviso.get('descripcionMercancia')?.setValue('Descripción de prueba');
    component.establecerValoresEnEstado(component.formAviso, 'descripcionMercancia');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ descripcionMercancia: 'Descripción de prueba' });
  });

  it('debe actualizar nombreComercial usando establecerValoresEnEstado', () => {
    component.formAviso.get('nombreComercial')?.setValue('Comercial Test');
    component.establecerValoresEnEstado(component.formAviso, 'nombreComercial');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ nombreComercial: 'Comercial Test' });
  });

  it('debe actualizar calle usando establecerValoresEnEstado', () => {
    component.formAviso.get('calle')?.setValue('Calle Test');
    component.establecerValoresEnEstado(component.formAviso, 'calle');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ calle: 'Calle Test' });
  });

  it('debe actualizar numeroExterior usando establecerValoresEnEstado', () => {
    component.formAviso.get('numeroExterior')?.setValue('123');
    component.establecerValoresEnEstado(component.formAviso, 'numeroExterior');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ numeroExterior: '123' });
  });

  it('debe actualizar numeroInterior usando establecerValoresEnEstado', () => {
    component.formAviso.get('numeroInterior')?.setValue('A1');
    component.establecerValoresEnEstado(component.formAviso, 'numeroInterior');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ numeroInterior: 'A1' });
  });

  it('debe actualizar codigoPostal usando establecerValoresEnEstado', () => {
    component.formAviso.get('codigoPostal')?.setValue('54321');
    component.establecerValoresEnEstado(component.formAviso, 'codigoPostal');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ codigoPostal: '54321' });
  });

  it('debe actualizar entidadFederativa usando establecerValoresEnEstado', () => {
    component.formAviso.get('entidadFederativa')?.setValue(1);
    component.establecerValoresEnEstado(component.formAviso, 'entidadFederativa');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ entidadFederativa: 1 });
  });

  it('debe actualizar delegacionMunicipio usando establecerValoresEnEstado', () => {
    component.formAviso.get('delegacionMunicipio')?.setValue(2);
    component.establecerValoresEnEstado(component.formAviso, 'delegacionMunicipio');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ delegacionMunicipio: 2 });
  });

  it('debe actualizar colonia usando establecerValoresEnEstado', () => {
    component.formAviso.get('colonia')?.setValue(3);
    component.establecerValoresEnEstado(component.formAviso, 'colonia');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ colonia: 3 });
  });

  it('debe actualizar cveFraccionArancelaria usando establecerValoresEnEstado', () => {
    component.formAviso.get('cveFraccionArancelaria')?.setValue(1);
    component.establecerValoresEnEstado(component.formAviso, 'cveFraccionArancelaria');
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ cveFraccionArancelaria: 1 });
  });

  it('debe actualizar idTransaccionVU usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '1234567890123456789012345' } } as any;
    component.actualizarNumeroValor('idTransaccionVU', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ idTransaccionVU: '1234567890123456789012345' });
  });

  it('debe actualizar nico usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '12' } } as any;
    component.actualizarNumeroValor('nico', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ nico: '12' });
  });

  it('debe actualizar peso usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '100.50' } } as any;
    component.actualizarNumeroValor('peso', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ peso: '100.50' });
  });

  it('debe actualizar valorUSD usando actualizarNumeroValor', () => {
    const EVENT = { target: { value: '200.75' } } as any;
    component.actualizarNumeroValor('valorUSD', EVENT);
    expect(solicitud32501StoreMock.establecerDatos).toHaveBeenCalledWith({ valorUSD: '200.75' });
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const SPY = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(SPY).toHaveBeenCalled();
  });

  it('debe mostrar el modal cuando se llama modificarOperacionImp', () => {
    const MODAL_MOCK = { nativeElement: document.createElement('div') };
    component.modalElement = MODAL_MOCK as ElementRef;
    const showSpy = jest.fn();
    const MODAL_INSTANCE_MOCK = { show: showSpy };
    const MODAL_CONSTRUCTOR_SPY = jest
      .spyOn(bootstrap, 'Modal')
      .mockImplementation(() => MODAL_INSTANCE_MOCK as unknown as Modal);
    component.modificarOperacionImp();
    expect(MODAL_CONSTRUCTOR_SPY).toHaveBeenCalledWith(MODAL_MOCK.nativeElement);
    expect(showSpy).toHaveBeenCalled();
    MODAL_CONSTRUCTOR_SPY.mockRestore();
  });

  it('debe mostrar el modal cuando se llama agregarOperacionImp', () => {
    const MODAL_MOCK = { nativeElement: document.createElement('div') };
    component.modalElement = MODAL_MOCK as ElementRef;
    const showSpy = jest.fn();
    const MODAL_INSTANCE_MOCK = { show: showSpy };
    const MODAL_CONSTRUCTOR_SPY = jest
      .spyOn(bootstrap, 'Modal')
      .mockImplementation(() => MODAL_INSTANCE_MOCK as unknown as Modal);
    component.agregarOperacionImp();
    expect(MODAL_CONSTRUCTOR_SPY).toHaveBeenCalledWith(MODAL_MOCK.nativeElement);
    expect(showSpy).toHaveBeenCalled();
    MODAL_CONSTRUCTOR_SPY.mockRestore();
  });
});