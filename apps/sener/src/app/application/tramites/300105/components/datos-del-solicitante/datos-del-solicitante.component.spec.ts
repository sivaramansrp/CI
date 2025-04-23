import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { DatosDelSolicitanteComponent } from './datos-del-solicitante.component';
import { Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';

describe('DatosDelSolicitanteComponent', () => {
  let component: DatosDelSolicitanteComponent;
  let fixture: ComponentFixture<DatosDelSolicitanteComponent>;
  let tramite300105StoreMock: jest.Mocked<Tramite300105Store>;
  let tramite300105QueryMock: jest.Mocked<Tramite300105Query>;
  let autorizacionDeRayosXServiceMock: jest.Mocked<AutorizacionDeRayosXService>;

  beforeEach(async () => {
    tramite300105StoreMock = {
        establecerDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite300105Store>;

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

    autorizacionDeRayosXServiceMock = {
        getTipoOperacion: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Operacion1' }])),
        getFinalidad: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Finalidad1' }])),
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    await TestBed.configureTestingModule({
      declarations: [DatosDelSolicitanteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Store, useValue: tramite300105StoreMock },
        { provide: Tramite300105Query, useValue: tramite300105QueryMock },
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

  it('should initialize the form and fetch data on ngOnInit', () => {
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
    expect(component.tipoOperacionCatalogo.catalogos).toEqual([{ id: 1, descripcion: 'Operacion1' }]);
  });

  it('should fetch finalidad data', () => {
    component.fetchFinalidadData();
    expect(autorizacionDeRayosXServiceMock.getFinalidad).toHaveBeenCalled();
    expect(component.finalidadCatalogo.catalogos).toEqual([{ id: 1, descripcion: 'Finalidad1' }]);
  });

  it('should update store value on setValoresStore', () => {
    const form = component.datosSolicitante;
    form.get('tipoOperacion')?.setValue('Operacion2');
    component.setValoresStore(form, 'tipoOperacion');
    expect(tramite300105StoreMock.establecerDatos).toHaveBeenCalledWith({ tipoOperacion: 'Operacion2' });
  });

  it('should toggle radio button value on onRadioClick', () => {
    component.onRadioClick('isExento');
    expect(component.datosSolicitante.get('isExento')?.value).toBe(false);
    expect(tramite300105StoreMock.establecerDatos).toHaveBeenCalledWith({ isExento: false });

    component.onRadioClick('isExento');
    expect(component.datosSolicitante.get('isExento')?.value).toBe(true);
    expect(tramite300105StoreMock.establecerDatos).toHaveBeenCalledWith({ isExento: true });
  });

  it('should return datosSolicitante form group', () => {
    const formGroup = component.datosSolicitante;
    expect(formGroup).toBe(component.formSolicitud.get('datosSolicitante'));
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});