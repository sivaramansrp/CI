import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';
import { Tramite260603Store } from '../../../shared/estados/stores/tramites260603.store';
import { Tramite260603Query } from '../../../shared/estados/queries/tramites260603.query';

describe('DatosDelEstablecimientoComponent', () => {
  let component: DatosDelEstablecimientoComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let mockTramiteStore: jest.Mocked<Tramite260603Store>;
  let mockTramiteQuery: jest.Mocked<Tramite260603Query>;

  beforeEach(async () => {
    mockTramiteStore = {
      setDenominacion: jest.fn(),
      setCorreoElectronico: jest.fn(),
    } as unknown as jest.Mocked<Tramite260603Store>;

    mockTramiteQuery = {
      selectSolicitud$: of({
        denominacion: 'Test Denominacion',
        correoElectronico: 'test@example.com',
      }),
    } as unknown as jest.Mocked<Tramite260603Query>;

    await TestBed.configureTestingModule({
      imports: [DatosDelEstablecimientoComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260603Store, useValue: mockTramiteStore },
        { provide: Tramite260603Query, useValue: mockTramiteQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosDelForm).toBeDefined();
    expect(component.datosDelForm.get('denominacion')?.value).toBe('Test Denominacion');
    expect(component.datosDelForm.get('correoElectronico')?.value).toBe('test@example.com');
  });

  it('should open the modal when abrirModal is called', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
  });

  it('should set values in the store using setValoresStore', () => {
    const form = component.datosDelForm;
    form.get('denominacion')?.setValue('New Denominacion');
    component.setValoresStore(form, 'denominacion', 'setDenominacion');
    expect(mockTramiteStore.setDenominacion).toHaveBeenCalledWith('New Denominacion');

    form.get('correoElectronico')?.setValue('new@example.com');
    component.setValoresStore(form, 'correoElectronico', 'setCorreoElectronico');
    expect(mockTramiteStore.setCorreoElectronico).toHaveBeenCalledWith('new@example.com');
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});