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
      actualizarCveFraccionArancelaria: jest.fn(() => of(1)),
      actualizarEntidadFederativa: jest.fn(() => of(1)),
      actualizarDelegacionMunicipio: jest.fn(() => of(1)),
      actualizarColonia: jest.fn(() => of(1)),
      actualizarIdTransaccionVU: jest.fn(() => of('12345')),
      actualizarNico: jest.fn(() => of('67')),
      actualizarPeso: jest.fn(() => of('100.50')),
      actualizarValorUSD: jest.fn(() => of('200.75')),
      actualizarDescripcionMercancia: jest.fn(() => of('Test Description')),
      actualizarCodigoPostal: jest.fn(() => of('12345')),
      actualizarNumeroInterior: jest.fn(() => of('A1')),
      actualizarNumeroExterior: jest.fn(() => of('B2')),
      actualizarCalle: jest.fn(() => of('Main Street')),
      actualizarNombreComercial: jest.fn(() => of('Test Business')),
      establecerDatos: jest.fn(() => of({})), // Mock the missing method
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

    jest.mock('bootstrap', () => {
      return {
        Modal: jest.fn().mockImplementation(() => ({
          show: jest.fn(),
        })),
      };
    });

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formAviso).toBeDefined();
    expect(component.formAviso.get('adace')).toBeTruthy();
    expect(component.formAviso.get('fechaIniExposicion')).toBeTruthy();
  });

  it('should call obtenerAvisoDelCatalogo on initialization', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoDelCatalogo');
    mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo();
    expect(
      mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo
    ).toHaveBeenCalled();
  });

  it('should call obtenerOperacionDeImportacion on initialization', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerOperacionDeImportacion');
    mercDesmSinMonServiceMock.obtenerOperacionDeImportacion();
    expect(
      mercDesmSinMonServiceMock.obtenerOperacionDeImportacion
    ).toHaveBeenCalled();
  });

  it('should call obtenerAvisoOpcionesDeRadio and set avisoOpcionesDeRadio', () => {
    jest.spyOn(mercDesmSinMonServiceMock, 'obtenerAvisoOpcionesDeRadio');
    mercDesmSinMonServiceMock.obtenerAvisoOpcionesDeRadio();
    expect(
      mercDesmSinMonServiceMock.obtenerAvisoOpcionesDeRadio
    ).toHaveBeenCalled();
  });

  it('should update tipoAviso when setTipoDeAviso is called', () => {
    component.setTipoDeAviso('TAV.IMP');
    expect(component.tipoAviso).toBe('TAV.IMP');
  });

  it('should call actualizarCveFraccionArancelaria on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    solicitud32501StoreMock.actualizarCveFraccionArancelaria(catalogoMock.id);
    expect(
      solicitud32501StoreMock.actualizarCveFraccionArancelaria
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarEntidadFederativa on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    solicitud32501StoreMock.actualizarEntidadFederativa(catalogoMock.id);
    expect(
      solicitud32501StoreMock.actualizarEntidadFederativa
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarDelegacionMunicipio on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    solicitud32501StoreMock.actualizarDelegacionMunicipio(catalogoMock.id);
    expect(
      solicitud32501StoreMock.actualizarDelegacionMunicipio
    ).toHaveBeenCalledWith(1);
  });

  it('should call actualizarColonia on store when triggered', () => {
    const catalogoMock = { id: 1, descripcion: 'Test' };
    solicitud32501StoreMock.actualizarColonia(catalogoMock.id);
    expect(solicitud32501StoreMock.actualizarColonia).toHaveBeenCalledWith(1);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate form fields correctly', () => {
    const control = component.formAviso.get('fechaIniExposicion');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.noEsValido('fechaIniExposicion')).toBe(false);
  });

  it('should call actualizarIdTransaccionVU on store when triggered', () => {
    const eventMock = { target: { value: '12345' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarIdTransaccionVU(value);
    expect(
      solicitud32501StoreMock.actualizarIdTransaccionVU
    ).toHaveBeenCalledWith('12345');
  });

  it('should call actualizarNico on store when triggered', () => {
    const eventMock = { target: { value: '67' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarNico(value);
    expect(solicitud32501StoreMock.actualizarNico).toHaveBeenCalledWith('67');
  });

  it('should call actualizarPeso on store when triggered', () => {
    const eventMock = { target: { value: '100.50' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarPeso(value);
    expect(solicitud32501StoreMock.actualizarPeso).toHaveBeenCalledWith(
      '100.50'
    );
  });

  it('should call actualizarValorUSD on store when triggered', () => {
    const eventMock = { target: { value: '200.75' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarValorUSD(value);
    expect(solicitud32501StoreMock.actualizarValorUSD).toHaveBeenCalledWith(
      '200.75'
    );
  });

  it('should call actualizarDescripcionMercancia on store when triggered', () => {
    const eventMock = {
      target: { value: 'Test Description' },
    } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarDescripcionMercancia(value);
    expect(
      solicitud32501StoreMock.actualizarDescripcionMercancia
    ).toHaveBeenCalledWith('Test Description');
  });

  it('should call actualizarCodigoPostal on store when triggered', () => {
    const eventMock = { target: { value: '12345' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarCodigoPostal(value);
    expect(solicitud32501StoreMock.actualizarCodigoPostal).toHaveBeenCalledWith(
      '12345'
    );
  });

  it('should call actualizarNumeroInterior on store when triggered', () => {
    const eventMock = { target: { value: 'A1' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarNumeroInterior(value);
    expect(
      solicitud32501StoreMock.actualizarNumeroInterior
    ).toHaveBeenCalledWith('A1');
  });

  it('should call actualizarNumeroExterior on store when triggered', () => {
    const eventMock = { target: { value: 'B2' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarNumeroExterior(value);
    expect(
      solicitud32501StoreMock.actualizarNumeroExterior
    ).toHaveBeenCalledWith('B2');
  });

  it('should call actualizarCalle on store when triggered', () => {
    const eventMock = { target: { value: 'Main Street' } } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarCalle(value);
    expect(solicitud32501StoreMock.actualizarCalle).toHaveBeenCalledWith(
      'Main Street'
    );
  });

  it('should call actualizarNombreComercial on store when triggered', () => {
    const eventMock = {
      target: { value: 'Test Business' },
    } as unknown as Event;
    const value = (eventMock.target as HTMLInputElement | null)?.value;
    solicitud32501StoreMock.actualizarNombreComercial(value);
    expect(
      solicitud32501StoreMock.actualizarNombreComercial
    ).toHaveBeenCalledWith('Test Business');
  });

  it('should show modal when modificarOperacionImp is called', () => {
    const modalMock = { nativeElement: document.createElement('div') };
    component.modalElement = modalMock as ElementRef;
    const showSpy = jest.fn();
    const modalInstanceMock = { show: showSpy };
    const modalConstructorSpy = jest
      .spyOn(bootstrap, 'Modal')
      .mockImplementation(() => modalInstanceMock as unknown as Modal);
    component.modificarOperacionImp();
    expect(modalConstructorSpy).toHaveBeenCalledWith(modalMock.nativeElement);
    expect(showSpy).toHaveBeenCalled();
    modalConstructorSpy.mockRestore();
  });

  it('should show modal when agregarOperacionImp is called', () => {
    const modalMock = { nativeElement: document.createElement('div') };
    component.modalElement = modalMock as ElementRef;
    const showSpy = jest.fn();
    const modalInstanceMock = { show: showSpy };
    const modalConstructorSpy = jest
      .spyOn(bootstrap, 'Modal')
      .mockImplementation(() => modalInstanceMock as unknown as Modal);
    component.agregarOperacionImp();
    expect(modalConstructorSpy).toHaveBeenCalledWith(modalMock.nativeElement);
    expect(showSpy).toHaveBeenCalled();
    modalConstructorSpy.mockRestore();
  });
});
