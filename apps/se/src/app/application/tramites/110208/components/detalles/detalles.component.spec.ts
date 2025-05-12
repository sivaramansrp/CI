import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DetallesComponent } from './detalles.component';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

describe('DetallesComponent', () => {
  let component: DetallesComponent;
  let fixture: ComponentFixture<DetallesComponent>;
  let mockService: jest.Mocked<ValidarInicalmenteService>;
  let mockStore: jest.Mocked<Tramite110208Store>;
  let mockQuery: jest.Mocked<Tramite110208Query>;

  beforeEach(async () => {
    mockService = {
      obtenerEstadoList: jest.fn(),
    } as unknown as jest.Mocked<ValidarInicalmenteService>;

    mockStore = {
      setMedioTransporte: jest.fn(),
      setRutaCompleta: jest.fn(),
    } as unknown as jest.Mocked<Tramite110208Store>;

    mockQuery = {
      selectSolicitud$: of({
        medioTransporte: 'Terrestre',
        rutaCompleta: 'Ruta 1',
        puertoDeEmbarque: 'Puerto A',
        puertoDeDesembarque: 'Puerto B',
      }),
    } as unknown as jest.Mocked<Tramite110208Query>;

    await TestBed.configureTestingModule({
      imports: [DetallesComponent],
      providers: [
        FormBuilder,
        { provide: ValidarInicalmenteService, useValue: mockService },
        { provide: Tramite110208Store, useValue: mockStore },
        { provide: Tramite110208Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudState and form on ngOnInit', () => {
    expect(component.solicitudState).toEqual({
      medioTransporte: 'Terrestre',
      rutaCompleta: 'Ruta 1',
      puertoDeEmbarque: 'Puerto A',
      puertoDeDesembarque: 'Puerto B',
    });
    expect(component.detallas.value).toEqual({
      medioTransporte: 'Terrestre',
      rutaCompleta: 'Ruta 1',
      puertoDeEmbarque: 'Puerto A',
      puertoDeDesembarque: 'Puerto B',
    });
  });

  it('should call obtenerEstadoList and set estado', () => {
    const mockData = { data: [{ id: 1, name: 'Estado 1' }] };

    component.obtenerEstadoList();

    expect(mockService.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual(mockData.data);
  });

  it('should call setValoresStore and update store value', () => {
    const form = component.detallas;
    form.get('medioTransporte')?.setValue('Aéreo');

    component.setValoresStore(form, 'medioTransporte', 'setMedioTransporte');

    expect(mockStore.setMedioTransporte).toHaveBeenCalledWith('Aéreo');
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const destroyedCompleteSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(destroyedCompleteSpy).toHaveBeenCalled();
  });

  it('should update form values when solicitudState changes', () => {
    const newState: Solicitud110208State = {
      medioTransporte: 'Marítimo',
      rutaCompleta: 'Ruta 2',
      puertoDeEmbarque: 'Puerto C',
      puertoDeDesembarque: 'Puerto D',
      entidadFederativa: '',
      bloque: '',
      fraccionArancelariaForm: '',
      registroProductoForm: '',
      nombreComercialForm: '',
      fechaInicio: '',
      fechaFinal: '',
      tercerOperador: '',
      marca: '',
      cantidad: '',
      umc: '',
      valorDeLa: '',
      complementoDescripcion: '',
      nFactura: '',
      tipoDeFactura: '',
      fechaFactura: '',
      ciudad: '',
      calle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
      paisDestino: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      numeroFiscal: '',
      razonSocial: '',
      observaciones: '',
      idioma: '',
      entidadFederativaCertificado: '',
      representacionFederal: ''
    };
    mockQuery.selectSolicitud$ = of(newState);

    component.ngOnInit();

    expect(component.solicitudState).toEqual(newState);
    expect(component.detallas.value).toEqual(newState);
  });
});
