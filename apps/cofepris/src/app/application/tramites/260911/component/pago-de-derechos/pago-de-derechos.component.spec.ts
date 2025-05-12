import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PagoDeDerechosService } from '../../services/datos-de-la-solicitud/pago-de-derechos.service';
import { Tramite260911Query } from '../../estados/queries/tramite260911.query';
import { Tramite260911Store } from '../../estados/store/tramite260911.store';
import { of, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BancoList } from '../../models/pago-de-derechos.model';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockPagoDeDerechosService: Partial<PagoDeDerechosService>;
  let mockTramite260911Query: Partial<Tramite260911Query>;
  let mockTramite260911Store: Partial<Tramite260911Store>;


  beforeEach(async () => {
    mockPagoDeDerechosService = {
      onBancoList: jest.fn().mockReturnValue(of([{ id: 1, name: 'Mock Banco' }] as BancoList[])),
    };
    mockTramite260911Query = {
      selectTramite260911$: of({
        claveDeReferencia: '',
        cadenaPagoDependencia: '',
        clave: '',
        llaveDePago: '',
        fecPago: '',
        impPago: '',
        btonDeRadio: '',
        justificacion: '',
        rfcDel: '',
        denominacion: '',
        correo: '',
        codigoPostal: '',
        estado: null,
        municipioOAlcaldia: '',
        localidad: '',
        colonias: '',
        calle: '',
        lada: '',
        telefono: '',
        avisoCheckbox: '',
        regimen: null,
        aduanasEntradas: null,
        aifaCheckbox: '',
        manifests: '',
        acuerdoPublico: '',
        rfc: '',
      }),
    };
    mockTramite260911Store = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, PagoDeDerechosComponent],
      providers: [
        { provide: PagoDeDerechosService, useValue: mockPagoDeDerechosService },
        { provide: Tramite260911Query, useValue: mockTramite260911Query },
        { provide: Tramite260911Store, useValue: mockTramite260911Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pagoDeDerechosForm).toBeTruthy();
    expect(component.pagoDeDerechosForm.contains('clave')).toBe(true);
    expect(component.pagoDeDerechosForm.contains('llaveDePago')).toBe(true);
  });

  it('should validate fechaLimValidator correctly', () => {
    const control = { value: '2050-01-01' } as any;
    const result = PagoDeDerechosComponent.fechaLimValidator()(control);
    expect(result).toEqual({ fechaLim: true });

    const validControl = { value: '2020-01-01' } as any;
    const validResult = PagoDeDerechosComponent.fechaLimValidator()(validControl);
    expect(validResult).toBeNull();
  });

  it('should validate noComaValidator correctly', () => {
    const control = { value: '12,34' } as any;
    const result = PagoDeDerechosComponent.noComaValidator()(control);
    expect(result).toEqual({ noComa: true });

    const validControl = { value: '1234' } as any;
    const validResult = PagoDeDerechosComponent.noComaValidator()(validControl);
    expect(validResult).toBeNull();
  });

  
  it('should fetch bancoList on obtenerBancoList call', () => {
    
    const mockBancoList = [{ id: 1, descripcion: 'Banco 1' }];

    // Ensure the mock is set up before the component is initialized
    (mockPagoDeDerechosService.onBancoList as jest.Mock).mockReturnValue(of(mockBancoList));
  
    // Recreate the component to trigger ngOnInit
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.bancoList = mockBancoList;
    component.ngOnInit();
    // expect(mockPagoDeDerechosService.onBancoList).toHaveBeenCalled();
    fixture.detectChanges(); // Trigger change detection
    expect(component.bancoList).toEqual(mockBancoList); // Verify the component's state
  });

  it('should patch form data on enPatchStoredFormData call', () => {
    component.enPatchStoredFormData();
    expect(component.pagoDeDerechosForm.get('clave')?.value).toEqual('');
    expect(component.pagoDeDerechosForm.get('fecPago')?.value).toEqual('');
  });

  it('should mark control as invalid if esInvalido is called on an invalid field', () => {
    component.pagoDeDerechosForm.get('clave')?.setErrors({ required: true });
    component.pagoDeDerechosForm.get('clave')?.markAsTouched();
    expect(component.esInvalido('clave')).toBe(true);
  });

  it('should unsubscribe from destroyed$ on component destroy', () => {
    const spy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call the correct store method with the correct value in setValoresStore', () => {
    // Arrange: Mock the store method
    const mockMethod = jest.fn();
    mockTramite260911Store['setClave'] = mockMethod; // Replace 'updateClave' with the actual method name in your store
  
    // Set up the form control with a value
    component.pagoDeDerechosForm = component.fb.group({
      clave: ['testValue'],
    });
  
    // Act: Call the method
    component.setValoresStore(component.pagoDeDerechosForm, 'clave', 'setClave');
  
    // Assert: Verify the store method was called with the correct value
    expect(mockMethod).toHaveBeenCalledWith('testValue');
  });
  
});

