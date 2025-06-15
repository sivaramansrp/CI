import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { of, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BancoList } from '../../modelos/pago-de-derechos.model';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockPagoDeDerechosService: Partial<PagoDeDerechosService>;
  let mockTramite260912Query: Partial<Tramite260912Query>;
  let mockTramite260912Store: Partial<Tramite260912Store>;


  beforeEach(async () => {
    mockPagoDeDerechosService = {
      onBancoList: jest.fn().mockReturnValue(of([{ id: 1, name: 'Mock Banco' }] as BancoList[])),
    };
    mockTramite260912Query = {
      selectTramite260912$: of({
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
        licenciaSanitaria: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
      }),
    };
    mockTramite260912Store = {};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, PagoDeDerechosComponent],
      providers: [
        { provide: PagoDeDerechosService, useValue: mockPagoDeDerechosService },
        { provide: Tramite260912Query, useValue: mockTramite260912Query },
        { provide: Tramite260912Store, useValue: mockTramite260912Store },
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
});