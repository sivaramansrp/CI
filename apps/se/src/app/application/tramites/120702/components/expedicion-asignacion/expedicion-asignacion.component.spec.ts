import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ExpedicionAsignacionComponent } from './expedicion-asignacion.component';
import { Tramite120702Store } from '../../estados/tramite120702.store';
import { Tramite120702Query } from '../../estados/tramite120702.query';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';

describe('ExpedicionAsignacionComponent', () => {
  let component: ExpedicionAsignacionComponent;
  let fixture: ComponentFixture<ExpedicionAsignacionComponent>;
  let store: Tramite120702Store;
  let query: Tramite120702Query;
  let service: ExpedicionCertificadosFronteraService;

  const mockAnoOficioDatos = [
    { id: 1, descripcion: '2024' },
    { id: 2, descripcion: '2025' },
  ];

  const mockMontoExpedirTablaDatos = {
    columns: ['Monto A Expedir'],
    rows: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedicionAsignacionComponent,ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: Tramite120702Store,
          useValue: {
            setDynamicFieldValue: jest.fn(),
          },
        },
        {
          provide: Tramite120702Query,
          useValue: {
            selectSolicitud$: of({}),
          },
        },
        {
          provide: ExpedicionCertificadosFronteraService,
          useValue: {
            getAnoOficioDatos: jest.fn().mockReturnValue(of(mockAnoOficioDatos)),
            getMontoExpedirTabla: jest
              .fn()
              .mockReturnValue(of(mockMontoExpedirTablaDatos)),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicionAsignacionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite120702Store);
    query = TestBed.inject(Tramite120702Query);
    service = TestBed.inject(ExpedicionCertificadosFronteraService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.asignacionForm).toBeDefined();
    expect(component.asignacionForm.get('anoDelOficio')?.value).toBe('');
    expect(component.asignacionForm.get('estado')?.value).toBe('CHIHUAHUA');
    expect(component.asignacionForm.get('montoAsignado')?.value).toBe('500');
  });

  it('should fetch anoOficioDatos from the service on init', () => {
    expect(service.getAnoOficioDatos).toHaveBeenCalled();
    expect(component.anoOficioDatos).toEqual(mockAnoOficioDatos);
  });

  it('should fetch montoExpedirTabla from the service on init', () => {
    expect(service.getMontoExpedirTabla).toHaveBeenCalled();
    expect(component.montoTablaDatos).toEqual(mockMontoExpedirTablaDatos.columns);
  });

  it('should call setValoresStore and update the store', () => {
    const spy = jest.spyOn(store, 'setDynamicFieldValue');
    component.setValoresStore(component.asignacionForm, 'anoDelOficio', 'setDynamicFieldValue');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should add montoAExpedir to the table and update totalAExpedir', () => {
    component.asignacionForm.get('montoAExpedir')?.setValue('100');
    component.enviarMontoFormulario();

    expect(component.montoTablaFilaDatos).toEqual([
      { tbodyData: ['100'] },
    ]);
    expect(component.asignacionForm.get('totalAExpedir')?.value).toBe('100');
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroy$'], 'next');
    const spyComplete = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});