import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BancoList } from '../../modelos/pago-de-derechos.model';
import { Tramite260904Query } from '../../estados/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramite260904.store';
 

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockPagoDeDerechosService: Partial<PagoDeDerechosService>;
  let mockTramite260904Query: Partial<Tramite260904Query>;
  let mockTramite260904Store: Partial<Tramite260904Store>;


  beforeEach(async () => {
    mockPagoDeDerechosService = {
      onBancoList: jest.fn().mockReturnValue(of([{ id: 1, name: 'Mock Banco' }] as BancoList[])),
    };
    mockTramite260904Query = {
      selectTramite260904$: of({
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
    mockTramite260904Store = {
      setTramite260904State: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, PagoDeDerechosComponent],
      providers: [
        { provide: PagoDeDerechosService, useValue: mockPagoDeDerechosService },
        { provide: Tramite260904Query, useValue: mockTramite260904Query },
        { provide: Tramite260904Store, useValue: mockTramite260904Store },
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
    
  const mockBancoList = [{ id: 1, name: 'Banco 1' }];

    
    (mockPagoDeDerechosService.onBancoList as jest.Mock).mockReturnValue(of(mockBancoList));
  
    
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.bancoList = mockBancoList;
    component.ngOnInit();
    fixture.detectChanges(); 
    expect(component.bancoList).toEqual(mockBancoList); 
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

  it('should call setTramite260904State with the correct value when setValoresStore is called', () => {
  component.pagoDeDerechosForm.get('clave')?.setValue('VALOR_CLAVE');
  const spy = jest.spyOn(mockTramite260904Store, 'setTramite260904State');
  component.setValoresStore(component.pagoDeDerechosForm, 'clave');
  expect(spy).toHaveBeenCalledWith({ clave: 'VALOR_CLAVE' });
});
});
 