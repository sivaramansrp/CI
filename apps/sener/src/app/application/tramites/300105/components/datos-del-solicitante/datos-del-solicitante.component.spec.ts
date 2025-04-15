import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDelSolicitanteComponent } from './datos-del-solicitante.component';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { Tramite300105Store } from '../../estados/tramite300105.store';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';

describe('DatosDelSolicitanteComponent', () => {
  let component: DatosDelSolicitanteComponent;
  let fixture: ComponentFixture<DatosDelSolicitanteComponent>;
  let tramite300105QueryMock: jest.Mocked<Tramite300105Query>;
  let tramite300105StoreMock: jest.Mocked<Tramite300105Store>;
  let autorizacionDeRayosXServiceMock: jest.Mocked<AutorizacionDeRayosXService>;

  beforeEach(async () => {
    tramite300105QueryMock = {
      selectTramite300105$: of({
        numeroExpediente: '12345',
        tipoOperacion: 'Operacion1',
        finalidad: 'Finalidad1',
        isExento: true,
        isAutorizacion: false,
        numAutorizacion1: '001',
        numAutorizacion2: '002',
        numAutorizacion3: '003',
      }),
    } as jest.Mocked<Tramite300105Query>;

    tramite300105StoreMock = {
      setNumAutorizacion1: jest.fn(),
      setNumAutorizacion2: jest.fn(),
      setNumAutorizacion3: jest.fn(),
    } as unknown as jest.Mocked<Tramite300105Store>;

    autorizacionDeRayosXServiceMock = {
      getTipoOperacion: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Operacion1' }])),
      getFinalidad: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Finalidad1' }])),
    } as Partial<jest.Mocked<AutorizacionDeRayosXService>> as jest.Mocked<AutorizacionDeRayosXService>;

    await TestBed.configureTestingModule({
      declarations: [DatosDelSolicitanteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Query, useValue: tramite300105QueryMock },
        { provide: Tramite300105Store, useValue: tramite300105StoreMock },
        { provide: AutorizacionDeRayosXService, useValue: autorizacionDeRayosXServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.formSolicitud).toBeDefined();
    expect(component.datosSolicitante.get('numeroExpediente')?.value).toBe('12345');
    expect(component.datosSolicitante.get('tipoOperacion')?.value).toBe('Operacion1');
    expect(component.datosSolicitante.get('finalidad')?.value).toBe('Finalidad1');
    expect(component.datosSolicitante.get('isExento')?.value).toBe(true);
    expect(component.datosSolicitante.get('isAutorizacion')?.value).toBe(false);
  });

  it('should fetch tipoOperacion data', () => {
    component.fetchTipoOperacionData();
    expect(autorizacionDeRayosXServiceMock.getTipoOperacion).toHaveBeenCalled();
    expect(component.tipoOperacionCatalogo.catalogos).toEqual([{ id: 1, nombre: 'Operacion1' }]);
  });

  it('should fetch finalidad data', () => {
    component.fetchFinalidadData();
    expect(autorizacionDeRayosXServiceMock.getFinalidad).toHaveBeenCalled();
    expect(component.finalidadCatalogo.catalogos).toEqual([{ id: 1, nombre: 'Finalidad1' }]);
  });

  it('should toggle radio button value on onRadioClick', () => {
    component.onRadioClick('isExento', true);
    expect(component.datosSolicitante.get('isExento')?.value).toBe(null);

    component.onRadioClick('isExento', true);
    expect(component.datosSolicitante.get('isExento')?.value).toBe(true);
  });

  it('should update store value on setValoresStore', () => {
    const form = component.datosSolicitante;
    form.get('numAutorizacion1')?.setValue('123');
    component.setValoresStore(form, 'numAutorizacion1', 'setNumAutorizacion1');
    expect(tramite300105StoreMock.setNumAutorizacion1).toHaveBeenCalledWith('123');
  });

  it('should handle keyup event on onKeyUpNumAutorizacion', () => {
    const event = { target: { value: '456' } };
    component.onKeyUpNumAutorizacion(event, 'numAutorizacion1', 'setNumAutorizacion1');
    expect(tramite300105StoreMock.setNumAutorizacion1).toHaveBeenCalledWith('456');
    expect(component.datosSolicitante.get('numAutorizacion1')?.value).toBe('456');
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});