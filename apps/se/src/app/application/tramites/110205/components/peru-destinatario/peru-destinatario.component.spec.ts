import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PeruDestinatarioComponent } from './peru-destinatario.component';
import { Tramite110205Store } from '../../estados/tramite110205.store';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { DatosDelDestinatarioComponent } from '../../../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../../../shared/components/destinatario/destinatario.component';
import { RepresentanteLegalComponent } from '../../../../shared/components/representante-legal/representante-legal.component';

describe('PeruDestinatarioComponent', () => {
  let component: PeruDestinatarioComponent;
  let fixture: ComponentFixture<PeruDestinatarioComponent>;
  let mockStore: Partial<Tramite110205Store>;
  let mockQuery: Partial<Tramite110205Query>;
  let mockSeccionStore: Partial<SeccionLibStore>;
  let mockSeccionQuery: Partial<SeccionLibQuery>;

  beforeEach(async () => {
    mockStore = {
      setFormDatosDelDestinatario: jest.fn(),
      setFormExportador: jest.fn(),
      setFormDestinatario: jest.fn(),
      setFormValida: jest.fn(),
    };

    mockQuery = {
      selectFormDatosDelDestinatario$: of({}),
      selectFormDestinatario$: of({}),
      selectFormExportador$: of({}),
      selectPeru$: of({
        formCertificado: {
          si: false,
          entidadFederativa: '',
          bloque: '',
          nombreComercialForm: '',
          registroProductoForm: '',
          fraccionArancelariaForm: '',
          fechaInicioInput: '',
          fechaFinalInput: '',
        },
        estado: {
          id: -1,
          descripcion: '',
        },
        paisBloques: [],
        mercanciaForm: {
          fraccionArancelaria: '',
          nombreComercialMercancia: '',
          nombreTecnico: '',
          nombreIngles: '',
          otrasInstancias: '',
          criterioParaConferirOrigen: '',
          marca: '',
          cantidad: '',
          umc: '',
          valorMercancia: '',
          complementoDescripcion: '',
          masaBruta: '',
          unidadMedidaMasaBruta: '',
          numeroFactura: '',
          tipoFactura: '',
          fechaFinal: '',
          normaOrigen: '',
          id: '',
          fechaFinalInput: '',
          nalad: '',
        },
        mercanciaTabla: [],
        formDatosCertificado: {
          observacionesDates: '',
          idiomaDates: '',
          precisaDates: '',
          EntidadFederativaDates: '',
          representacionFederalDates: '',
        },
        idiomaDatosSeleccion: { id: -1, descripcion: '' },
        entidadFederativaSeleccion: { id: -1, descripcion: '' },
        representacionFederalSeleccion: { id: -1, descripcion: '' },
        formDatosDelDestinatario: {
          nombres: '',
          primerApellido: '',
          segundoApellido: '',
          numeroDeRegistroFiscal: '',
          razonSocial: '',
        },
        fraccionArancelaria: '',
        nombreComercialMercancia: '',
        nombreTecnico: '',
        nombreIngles: '',
        otrasInstancias: '',
        criterioParaConferirOrigen: '',
        cantidad: '',
        umc: [],
        valorMercancia: '',
        complementoDescripcion: '',
        numeroFactura: '',
        tipoFactura: [],
        formExportor: {
          lugar: '',
          exportador: '',
          empresa: '',
          cargo: '',
          lada: '',
          telfono: '',
          fax: '',
          correo: '',
        },
        formaValida: {
          certificado: false,
          datos: false,
          destinatrio: false,
          datosDestinatario: false,
          exportador: false,
        },
        formDestinatario: {
          paisDestin: '',
          ciudad: '',
          celle: '',
          numeroLetra: '',
          lada: '',
          telefono: '',
          fax: '',
          correoElectronico: '',
        },
        formulario:{
          datosConfidencialesProductor: '',
          productorMismoExportador: '',
        },
        agregarDatosProductorFormulario: {
          numeroRegistroFiscal: '',
          fax: '',      
        }
      }),
    };

    mockSeccionStore = {};
    mockSeccionQuery = {
      selectSeccionState$: of({ seccion: [], formaValida: [] }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelDestinatarioComponent, DestinatarioComponent, RepresentanteLegalComponent],
      declarations: [PeruDestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110205Store, useValue: mockStore },
        { provide: Tramite110205Query, useValue: mockQuery },
        { provide: SeccionLibStore, useValue: mockSeccionStore },
        { provide: SeccionLibQuery, useValue: mockSeccionQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PeruDestinatarioComponent);
    component = fixture.componentInstance;

    // Initialize destroyNotifier$ to avoid undefined errors
    component['destroyNotifier$'] = new Subject<void>();

    fixture.detectChanges();
  });

  afterEach(() => {
    if (component['destroyNotifier$']) {
      component['destroyNotifier$'].next();
      component['destroyNotifier$'].complete();
    }
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setFormDatosDelDestinatario when datosDelDestinatarioFunc is invoked', () => {
    const mockData = { key: 'value' };
    component.datosDelDestinatarioFunc(mockData);
    expect(mockStore.setFormDatosDelDestinatario).toHaveBeenCalledWith(mockData);
  });

  it('should call setFormExportador when setValoresStoreExportador is invoked', () => {
    const mockEvent = { formGroupName: 'group', campo: 'campo', valor: undefined, storeStateName: 'state' };
    component.setValoresStoreExportador(mockEvent);
    expect(mockStore.setFormExportador).toHaveBeenCalledWith({ [mockEvent.campo]: mockEvent.valor });
  });

  it('should call setFormDestinatario when setValoresStoreDe is invoked', () => {
    const mockEvent = { formGroupName: 'group', campo: 'campo', valor: undefined, storeStateName: 'state'};
    component.setValoresStoreDe(mockEvent);
    expect(mockStore.setFormDestinatario).toHaveBeenCalledWith({ [mockEvent.campo]: mockEvent.valor });
  });

  it('should call setFormValida with correct value', () => {
    component.setFormValida(true);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({ destinatrio: true });
  });

  it('should call setFormValidaExportador with correct value', () => {
    component.setFormValidaExportador(false);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({ exportador: false });
  });

  it('should call setFormValidaDestinatario with correct value', () => {
    component.setFormValidaDestinatario(true);
    expect(mockStore.setFormValida).toHaveBeenCalledWith({ datosDestinatario: true });
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});