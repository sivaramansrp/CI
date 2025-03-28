import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos-declaraciones.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { Subject, of } from 'rxjs';
import CumplimientoOptions from '@libs/shared/theme/assets/json/260501/cumplimiento-options.json';
import { MENSAJE_DE_ALERTA } from '../../constantes/datos-domicilio-legal.enum';

describe('ManifiestosComponent', () => {
  let component: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;

  beforeEach(async () => {
    mockStore = {
      setCumplimiento: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        cumplimiento: 'Cumple',
      }),
    } as unknown as jest.Mocked<DatosDomicilioLegalQuery>;

    await TestBed.configureTestingModule({
      declarations: [ManifiestosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and solicitudState on ngOnInit', () => {
    component.ngOnInit();

    expect(component.solicitudState).toEqual({
      cumplimiento: 'Cumple',
    });

    expect(component.manifiestos.value).toEqual({
      cumplimiento: 'Cumple',
    });
  });

  it('should set mensaje to MENSAJE_DE_ALERTA', () => {
    expect(component.mensaje).toBe(MENSAJE_DE_ALERTA);
  });

  it('should load cumplimientoOptions from JSON', () => {
    expect(component.cumplimientoOptions).toBe(CumplimientoOptions);
  });

  it('should call the appropriate store method when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore(component.manifiestos, 'cumplimiento', 'setCumplimiento');
    expect(mockStore.setCumplimiento).toHaveBeenCalledWith('Cumple');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
