import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosDelEstablecimientoRFCComponent } from './datos-del-establecimiento-rfc.component';
import { DomicilioStore } from '../../estados/stores/domicilio.store'; 
import { DomicilioQuery } from '../../estados/queries/domicilio.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosDelEstablecimientoRFCComponent', () => {
  let component: DatosDelEstablecimientoRFCComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoRFCComponent>;
  let mockTramiteStore: jest.Mocked<DomicilioStore>;
  let mockTramiteQuery: jest.Mocked<DomicilioQuery>;

   const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: true }),
  };

  const mockAvisocalidadQuery = {
    selectSolicitud$: of({ solicitudId: 123 }),
  };

  beforeEach(async () => {
    mockTramiteStore = {
      setDenominacion: jest.fn(),
      setCorreoElectronico: jest.fn(),
    } as unknown as jest.Mocked<DomicilioStore>;

    mockTramiteQuery = {
      selectSolicitud$: of({
        denominacion: 'Test Denominacion',
        correoElectronico: 'test@example.com',
      }),
    } as unknown as jest.Mocked<DomicilioQuery>;

    await TestBed.configureTestingModule({
      imports: [DatosDelEstablecimientoRFCComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DomicilioStore, useValue: mockTramiteStore },
        { provide: DomicilioQuery, useValue: mockTramiteQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelEstablecimientoRFCComponent);
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
    component.setValoresStore(form, 'denominacion', 'setDenominacionRazonSocial');
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

   it('should disable form if esFormularioSoloLectura is true and datosDelForm exists', () => {
    component.esFormularioSoloLectura = true;

    const disableSpy = jest.spyOn(component.datosDelForm, 'disable');
    const enableSpy = jest.spyOn(component.datosDelForm, 'enable');

    component.configurarGrupoForm();

    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should enable form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    const disableSpy = jest.spyOn(component.datosDelForm, 'disable');
    const enableSpy = jest.spyOn(component.datosDelForm, 'enable');

    component.configurarGrupoForm();

    expect(enableSpy).toHaveBeenCalled();
    expect(disableSpy).not.toHaveBeenCalled();
  });
});

 describe('Standalone: esFormularioSoloLectura from ConsultaioQuery', () => {
    let component: DatosDelEstablecimientoRFCComponent;
    let fixture: ComponentFixture<DatosDelEstablecimientoRFCComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DatosDelEstablecimientoRFCComponent, ReactiveFormsModule],
        providers: [
          FormBuilder,
          { provide: DomicilioStore, useValue: {
            setDenominacion: jest.fn(),
            setCorreoElectronico: jest.fn(),
          }},
          { provide: DomicilioQuery, useValue: {
            selectSolicitud$: of({
              denominacion: 'Test Denominacion',
              correoElectronico: 'test@example.com',
            }),
          }},
          { provide: ConsultaioQuery, useValue: {
            selectConsultaioState$: of({ readonly: true }),
          }},
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DatosDelEstablecimientoRFCComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set esFormularioSoloLectura from ConsultaioQuery and configure form on ngOnInit', () => {
      const configurarSpy = jest.spyOn(component, 'configurarGrupoForm');

      component.ngOnInit();

      expect(component.esFormularioSoloLectura).toBe(true);
      expect(configurarSpy).toHaveBeenCalled();
    });
  });