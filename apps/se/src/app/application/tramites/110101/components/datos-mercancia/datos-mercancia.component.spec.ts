import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaStore } from '../../estados/tramites/datos-mercancia110101.store';
import { DatosMercanciaQuery } from '../../estados/queries/datos-mercancia110101.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let store: DatosMercanciaStore;
  let query: DatosMercanciaQuery;
  let validacionesService: ValidacionesFormularioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMercanciaComponent, ReactiveFormsModule],
      // declarations: [DatosMercanciaComponent],
      providers: [
        FormBuilder,
        {
          provide: DatosMercanciaStore,
          useValue: {
            actualizarValoresFormulario: jest.fn(),
          },
        },
        {
          provide: DatosMercanciaQuery,
          useValue: {
            formValues$: of({
              nombreComercial: 'Test Comercial',
              nombreIngles: 'Test English',
              fraccionArancelaria: '12345678',
              descripcion: 'Test Description',
              valorTransaccion: '1000',
            }),
          },
        },
        {
          provide: ValidacionesFormularioService,
          useValue: {
            isValid: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
           // Mock `apiDatosDeRespuesta` with proper values
           component.apiDatosDeRespuesta = {
            fraccionArancelaria: '0101.21.00',
            descripcion: 'Caballos pura sangre',
            valorTransaccion: '12345'
          };
      
          // Mock the form initialization
          component.formMercancia = new FormBuilder().group({
            fraccionArancelaria: [''],
            descripcion: [''],
            valorTransaccion: ['']
          });
    store = TestBed.inject(DatosMercanciaStore);
    query = TestBed.inject(DatosMercanciaQuery);
    validacionesService = TestBed.inject(ValidacionesFormularioService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.formMercancia).toBeDefined();
    expect(component.formMercancia.get('nombreComercial')?.value).toBe('');
    expect(component.formMercancia.get('nombreIngles')?.value).toBe('');
  });

  it('should populate the form with data from the store', () => {
    component.ngOnInit();
    expect(component.formMercancia.get('nombreComercial')?.value).toBe('Test Comercial');
    expect(component.formMercancia.get('nombreIngles')?.value).toBe('Test English');
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBe('12345678');
    expect(component.formMercancia.get('descripcion')?.value).toBe('Test Description');
    expect(component.formMercancia.get('valorTransaccion')?.value).toBe('1000');
  });

  it('should update the store when form values change', () => {
    const spy = jest.spyOn(store, 'actualizarValoresFormulario');
    component.formMercancia.get('nombreComercial')?.setValue('Updated Comercial');
    component.formMercancia.get('nombreIngles')?.setValue('Updated English');
    expect(spy).toHaveBeenCalledWith({
      nombreComercial: 'Updated Comercial',
      nombreIngles: 'Updated English',
      fraccionArancelaria: '',
      descripcion: '',
      valorTransaccion: '',
    });
  });

  it('should validate form fields using the validation service', () => {
    const spy = jest.spyOn(validacionesService, 'isValid');
    const isValid = component.isValid('nombreComercial');
    expect(spy).toHaveBeenCalledWith(component.formMercancia, 'nombreComercial');
    expect(isValid).toBe(true);
  });

  it('should set form values from API response', () => {
    component.apiDatosDeRespuesta = {
      fraccionArancelaria: '87654321',
      descripcion: 'API Description',
      valorTransaccion: '2000',
    };
    component.getFormDatosDeMercancia();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBe('87654321');
    expect(component.formMercancia.get('descripcion')?.value).toBe('API Description');
    expect(component.formMercancia.get('valorTransaccion')?.value).toBe('2000');
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroy$'], 'next');
    const spyComplete = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should not trigger valueChanges when patching form values from the store', () => {
    const spy = jest.spyOn(component.formMercancia.valueChanges, 'subscribe');
    component['obtenerDatosFormularioDesdeStore']();
    expect(spy).not.toHaveBeenCalled();
  });
  
});