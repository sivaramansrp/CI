import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import {
  AlertComponent,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputCheckComponent,
  InputFechaComponent,
  InputRadioComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Modal } from 'bootstrap';
import { provideHttpClient } from '@angular/common/http';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let solicitudDatosServiceMock: any;
  let solicitud260910StoreMock: any;
  let solicitud260910QueryMock: any;
  let consultaioQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    solicitudDatosServiceMock = {
      obtenerMercanciaCatalogos: jest.fn().mockReturnValue(of({
        productosCatalogo: [],
        especificarCatalogo: [],
        tipoProductoCatalogo: [],
        farmaceuticaCatalogo: [],
        fisicoCatalogo: [],
        umcCatalogo: [],
      })),
      obtenerCrosslisto: jest.fn().mockReturnValue(
        of({
          paisOrigenCrossList: [],
          paisProcedenciaCrossList: [],
          usoEspecificoCrossList: [],
        })
      ),
      obtenerSolicitud: jest.fn().mockReturnValue(of({})),
      obtenerEstadoCatalogo: jest.fn().mockReturnValue(of({})),
      obtenerDatosDeSolicitud: jest.fn().mockReturnValue(
        of({
          tablaHeadData: [],
          tablaFilaDatos: [],
          hacerlosRadioOptions: [],
          tipoOperacionOptions: [],
        })
      ),
      obtenerMercanciaListo: jest.fn().mockReturnValue(of([])),
      obtenerSCIANMesa: jest.fn().mockReturnValue(of([])),
      obtenerRegimenDestinaraListo: jest.fn().mockReturnValue(of({})),
      obtenerAduanaListo: jest.fn().mockReturnValue(of({})),
      obtenerSCIANListo: jest.fn().mockReturnValue(of({})),
      obtenerSCIANDescListo: jest.fn().mockReturnValue(of({})),
    };
    solicitud260910StoreMock = {
      setRfcSanitario: jest.fn(),
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setLegalRazonSocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setMercanciasDatos: jest.fn(),
      setSCIANDatos: jest.fn(),
      setEstado: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setClaveSCIAN: jest.fn(),
      setClaveSCIANDesc: jest.fn(),
      setHacerlos: jest.fn(),
      setTipoOperacion: jest.fn(),
      setRfc: jest.fn(),
      modificarMercanciasDatos: jest.fn(),
      removeMercanciaDatos: jest.fn(),
      eliminarSCAINDatos: jest.fn(),
      addSCIANDatos: jest.fn(),
      setLiveFreshFrozen: jest.fn(),
      setManifesto: jest.fn(),
    };
    solicitud260910QueryMock = {
      seleccionarSolicitud$: of({}),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true), 
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        TituloComponent,
        InputFechaComponent, 
        AlertComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        InputCheckComponent
      ],
      declarations: [SolicitudDatosComponent],
      providers: [
        FormBuilder,
        { provide: SolicitudDatosService, useValue: solicitudDatosServiceMock },
        { provide: Solicitud260910Store, useValue: solicitud260910StoreMock },
        { provide: Solicitud260910Query, useValue: solicitud260910QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        {
          provide: ValidacionesFormularioService,
          useValue: validacionesServiceMock,
        },
        provideHttpClient()
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize properties', () => {
    expect(component).toBeTruthy();
    expect(component.colapsable).toBe(true);
    expect(component.solicitudForm).toBeDefined();
    expect(component.claveSCIANForm).toBeDefined();
  });

  it('mostrarColapsable should toggle colapsable', () => {
    const initial = component.colapsable;
    component.mostrarColapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('obtenerSolicitud should call service and update store', () => {
    const solicitud = {
      rfcSanitario: 'RFC',
      razonSocial: 'RS',
      correoElectronico: 'mail',
      codigoPostal: '12345',
      municipio: 'mun',
      localidad: 'loc',
      colonia: 'col',
      calle: 'calle',
      lada: 'lada',
      telefono: 'tel',
      avisoDeFuncionamiento: true,
      legalRazonSocial: 'legal',
      apellidoPaterno: 'pat',
      apellidoMaterno: 'mat',
    };
    solicitudDatosServiceMock.obtenerSolicitud.mockReturnValue(of(solicitud));
    component.obtenerSolicitud();
    expect(solicitudDatosServiceMock.obtenerSolicitud).toHaveBeenCalled();
  });

  it('obtenerEstadoCatalogo should update estadoCatalogo', () => {
    const estado = { catalogos: [] };
    solicitudDatosServiceMock.obtenerEstadoCatalogo.mockReturnValue(of(estado));
    component.obtenerEstadoCatalogo();
    expect(solicitudDatosServiceMock.obtenerEstadoCatalogo).toHaveBeenCalled();
  });

  it('obtenerDatosDeAplicacion should update solicitudDatos and radio options', () => {
    const datos = {
      tablaFilaDatos: [{ SCIANLista: [] }],
      hacerlosRadioOptions: [{ label: 'a', value: 1 }],
      tipoOperacionOptions: [{ label: 'b', value: 2 }],
    };
    solicitudDatosServiceMock.obtenerDatosDeSolicitud.mockReturnValue(
      of(datos)
    );
    component.obtenerDatosDeAplicacion();
    expect(
      solicitudDatosServiceMock.obtenerDatosDeSolicitud
    ).toHaveBeenCalled();
  });

  it('obtenerMercanciaListo should update store', () => {
    const mercancias = [{ id: 1 }];
    solicitudDatosServiceMock.obtenerMercanciaListo.mockReturnValue(
      of(mercancias)
    );
    component.obtenerMercanciaListo();
    expect(solicitudDatosServiceMock.obtenerMercanciaListo).toHaveBeenCalled();
  });

  it('obtenerSCIANMesa should update store', () => {
    const scian = [{ id: 1 }];
    solicitudDatosServiceMock.obtenerSCIANMesa.mockReturnValue(of(scian));
    component.obtenerSCIANMesa();
    expect(solicitudDatosServiceMock.obtenerSCIANMesa).toHaveBeenCalled();
  });

  it('obtenerRegimenDestinaraListo should update regimenCatalogo', () => {
    const regimen = { catalogos: [] };
    solicitudDatosServiceMock.obtenerRegimenDestinaraListo.mockReturnValue(
      of(regimen)
    );
    component.obtenerRegimenDestinaraListo();
    expect(
      solicitudDatosServiceMock.obtenerRegimenDestinaraListo
    ).toHaveBeenCalled();
  });

  it('obtenerAduanaListo should update aduanaCatalogo', () => {
    const aduana = { catalogos: [] };
    solicitudDatosServiceMock.obtenerAduanaListo.mockReturnValue(of(aduana));
    component.obtenerAduanaListo();
    expect(solicitudDatosServiceMock.obtenerAduanaListo).toHaveBeenCalled();
  });

  it('obtenerSCIANListo should update SCIANCatalogo', () => {
    const scian = { catalogos: [] };
    solicitudDatosServiceMock.obtenerSCIANListo.mockReturnValue(of(scian));
    component.obtenerSCIANListo();
    expect(solicitudDatosServiceMock.obtenerSCIANListo).toHaveBeenCalled();
  });

  it('obtenerSCIANDescListo should update SCIANDescCatalogo', () => {
    const scianDesc = { catalogos: [] };
    solicitudDatosServiceMock.obtenerSCIANDescListo.mockReturnValue(
      of(scianDesc)
    );
    component.obtenerSCIANDescListo();
    expect(solicitudDatosServiceMock.obtenerSCIANDescListo).toHaveBeenCalled();
  });

  it('openModificarMercancias should open modal if selectedMercanciasDatos is not empty', () => {
    component.selectedMercanciasDatos = [
      {
        clasificaionProductos: '1',
        especificarProducto: 0,
        nombreProductoEspecifico: '',
        distintiva: '',
        cientifico: '',
        tipoProducto: 0,
        farmaceutica: '',
        fisico: '',
        fraccionArancelaria: '',
        descripcionFraccionArancelaria: '',
        cantidadUMT: '',
        umt: '',
        cantidadUMC: '',
        umc: 0,
        presentacionFarmaceutica: '',
        registroSanitario: 0,
        fechaCaducidad: '',
        paisDeOrigen: '',
        paisDeProcedencia: '',
        usoEspecifico: '',
      },
    ];
    component.modalElement = new ElementRef(document.createElement('div'));
    component.openModificarMercancias();
    expect(Modal).toHaveBeenCalled();
  });

  it('onMercanciaModificada should call modificarMercanciasDatos', () => {
    const mercancia = { id: 1 };
    component.onMercanciaModificada(mercancia as any);
    expect(
      solicitud260910StoreMock.modificarMercanciasDatos
    ).toHaveBeenCalledWith(mercancia);
  });

  it('openAgregarSCIAN should open modal', () => {
    component.modalElementSCIAN = new ElementRef(document.createElement('div'));
    component.openAgregarSCIAN();
    expect(Modal).toHaveBeenCalled();
  });

  it('openAgregarMercancias should open modal and reset seleccionadaMercancia', () => {
    component.modalElement = new ElementRef(document.createElement('div'));
    component.seleccionadaMercancia = { id: 1 } as any;
    component.openAgregarMercancias();
    expect(component.seleccionadaMercancia).toBeNull();
    expect(Modal).toHaveBeenCalled();
  });

  it('setEstado should call setEstado on store', () => {
    component.setEstado({ id: 1 } as any);
    expect(solicitud260910StoreMock.setEstado).toHaveBeenCalledWith(1);
  });

  it('setLicenciaSanitaria should call setLicenciaSanitaria on store', () => {
    const event = { target: { value: 'abc' } } as any;
    component.setLicenciaSanitaria(event);
    expect(solicitud260910StoreMock.setLicenciaSanitaria).toHaveBeenCalledWith(
      'abc'
    );
  });

  it('setRegimen should call setRegimen on store', () => {
    component.setRegimen({ id: 2 } as any);
    expect(solicitud260910StoreMock.setRegimen).toHaveBeenCalledWith(2);
  });

  it('setAduana should call setAduana on store', () => {
    component.setAduana({ id: 3 } as any);
    expect(solicitud260910StoreMock.setAduana).toHaveBeenCalledWith(3);
  });

  it('setClaveSCIAN should call setClaveSCIAN and setClaveSCIANDesc', () => {
    component.SCIANDescCatalogo = { catalogos: [{ clave: 'A', id: 5 }] } as any;
    component.solicitud260910Store.setClaveSCIANDesc = jest.fn();
    component.setClaveSCIAN({ id: 5, clave: 'A' } as any);
    expect(solicitud260910StoreMock.setClaveSCIAN).toHaveBeenCalledWith(5);
    expect(solicitud260910StoreMock.setClaveSCIANDesc).toHaveBeenCalledWith(5);
  });

  it('setClaveSCIANDesc should call setClaveSCIANDesc', () => {
    component.setClaveSCIANDesc({ id: 6 } as any);
    expect(solicitud260910StoreMock.setClaveSCIANDesc).toHaveBeenCalledWith(6);
  });

  it('setHacerlos should call setHacerlos', () => {
    component.setHacerlos(1);
    expect(solicitud260910StoreMock.setHacerlos).toHaveBeenCalledWith(1);
  });

  it('setTipoOperacion should call setTipoOperacion and disable/enable fields', () => {
    component.solicitudForm = new FormBuilder().group({
      tipoOperacion: ['PRO'],
      observaciones: [''],
      rfcSanitario: [''],
      razonSocial: [''],
      correoElectronico: [''],
      codigoPostal: [''],
      estado: [''],
      municipio: [''],
      localidad: [''],
      colonia: [''],
      calle: [''],
      lada: [''],
      telefono: [''],
    });
    component.setTipoOperacion('PRO');
    expect(solicitud260910StoreMock.setTipoOperacion).toHaveBeenCalledWith(
      'PRO'
    );
    component.setTipoOperacion('OTRO');
    expect(solicitud260910StoreMock.setTipoOperacion).toHaveBeenCalledWith(
      'OTRO'
    );
  });

  it('setRFC should call setRfc', () => {
    const event = { target: { value: 'RFCVAL' } } as any;
    component.setRFC(event);
    expect(solicitud260910StoreMock.setRfc).toHaveBeenCalledWith('RFCVAL');
  });

  it('getMercanciasDatos should update selectedMercanciasDatos', () => {
    component.getMercanciasDatos([{ id: 1 } as any]);
    expect(component.selectedMercanciasDatos).toEqual([{ id: 1 }]);
  });

  it('getSCIANDatos should update seleccionaSCIANDatos', () => {
    component.getSCIANDatos([{ id: 2 } as any]);
    expect(component.seleccionaSCIANDatos).toEqual([{ id: 2 }]);
  });

  it('eliminarMercancias should call removeMercanciaDatos if selected', () => {
    component.selectedMercanciasDatos = [{ id: 1 } as any];
    component.eliminarMercancias();
    expect(solicitud260910StoreMock.removeMercanciaDatos).toHaveBeenCalled();
  });

  it('eliminarSCIAN should call eliminarSCAINDatos if selected', () => {
    component.seleccionaSCIANDatos = [{ id: 1 } as any];
    component.eliminarSCIAN();
    expect(solicitud260910StoreMock.eliminarSCAINDatos).toHaveBeenCalled();
  });

  it('limpiarSCIAN should reset claveSCIANForm', () => {
    component.claveSCIANForm = new FormBuilder().group({
      claveSCIAN: ['a'],
      claveSCIANDesc: ['b'],
    });
    component.limpiarSCIAN();
    expect(component.claveSCIANForm.value).toEqual({
      claveSCIAN: null,
      claveSCIANDesc: null,
    });
  });

  it('agregarSCIAN should add SCIAN and reset form', () => {
    component.SCIANCatalogo = {
      catalogos: [{ id: 1, descripcion: 'desc1' }],
    } as any;
    component.SCIANDescCatalogo = {
      catalogos: [{ id: 2, descripcion: 'desc2' }],
    } as any;
    component.claveSCIANForm = new FormBuilder().group({
      claveSCIAN: [1],
      claveSCIANDesc: [2],
    });
    component.limpiarSCIAN = jest.fn();
    component.agregarSCIAN();
    expect(solicitud260910StoreMock.addSCIANDatos).toHaveBeenCalledWith({
      claveSCIAN: 'desc1',
      claveSCIANDesc: 'desc2',
    });
    expect(component.limpiarSCIAN).toHaveBeenCalled();
  });

  it('seleccionaTipo should call eliminarMercancias or eliminarSCIAN', () => {
    component.eliminarMercancias = jest.fn();
    component.eliminarSCIAN = jest.fn();
    component.seleccionaTipo('Mercancias');
    expect(component.eliminarMercancias).toHaveBeenCalled();
    component.seleccionaTipo('SCIAN');
    expect(component.eliminarSCIAN).toHaveBeenCalled();
    expect(component.selectedMercanciasDatos).toEqual([]);
    expect(component.seleccionaSCIANDatos).toEqual([]);
  });

  it('confirmarEliminarMercancias should open modal if any selected', () => {
    component.selectedMercanciasDatos = [{ id: 1 } as any];
    component.seleccionaSCIANDatos = [];
    component.modalConfirmarElement = new ElementRef(
      document.createElement('div')
    );
    component.confirmarEliminarMercancias('Mercancias');
    expect(component.seleccionadoTipo).toBe('Mercancias');
    expect(Modal).toHaveBeenCalled();
  });

  it('setLiveFreshFrozen should call setLiveFreshFrozen', () => {
    component.solicitudForm = new FormBuilder().group({
      liveFreshFrozen: [true],
    });
    component.setLiveFreshFrozen();
    expect(solicitud260910StoreMock.setLiveFreshFrozen).toHaveBeenCalledWith(
      true
    );
  });

  it('setAvisoDeFuncionamiento should call setAvisoDeFuncionamiento and disable/enable licenciaSanitaria', () => {
    component.solicitudForm = new FormBuilder().group({
      avisoDeFuncionamiento: [true],
      licenciaSanitaria: [{ value: '', disabled: false }],
    });
    component.setAvisoDeFuncionamiento();
    expect(
      solicitud260910StoreMock.setAvisoDeFuncionamiento
    ).toHaveBeenCalledWith(true);
    component.solicitudForm.get('avisoDeFuncionamiento')?.setValue(false);
    component.setAvisoDeFuncionamiento();
    expect(
      solicitud260910StoreMock.setAvisoDeFuncionamiento
    ).toHaveBeenCalledWith(false);
  });

  it('setManifesto should call setManifesto', () => {
    const event = { target: { checked: true } } as any;
    component.setManifesto(event);
    expect(solicitud260910StoreMock.setManifesto).toHaveBeenCalledWith(true);
  });

  it('setValoresStore should call the correct store method', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    component.setValoresStore(form, 'campo', 'setRfcSanitario');
    expect(solicitud260910StoreMock.setRfcSanitario).toHaveBeenCalledWith(
      'valor'
    );
  });

  it('seleccionarEstablecimiento should open modal', () => {
    component.modalAlertaElement = new ElementRef(
      document.createElement('div')
    );
    component.seleccionarEstablecimiento();
    expect(Modal).toHaveBeenCalled();
  });

  it('esValido should call validacionesService.isValid', () => {
    const form = new FormBuilder().group({ campo: ['valor'] });
    expect(component.esValido(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('actualizarEstadoFormularios should disable/enable forms based on esFormularioSoloLectura', () => {
    component.solicitudForm = new FormBuilder().group({ a: [''] });
    component.claveSCIANForm = new FormBuilder().group({ b: [''] });
    component.esFormularioSoloLectura = true;
    (component as any).actualizarEstadoFormularios();
    expect(component.solicitudForm.disabled).toBe(true);
    expect(component.claveSCIANForm.disabled).toBe(true);
    component.esFormularioSoloLectura = false;
    (component as any).actualizarEstadoFormularios();
    expect(component.solicitudForm.enabled).toBe(false);
    expect(component.claveSCIANForm.enabled).toBe(false);
  });
});