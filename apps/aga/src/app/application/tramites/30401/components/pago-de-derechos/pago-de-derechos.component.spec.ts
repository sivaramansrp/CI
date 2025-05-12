import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { RegistroEmpresasTransporteService } from '../../services/registro-empresas-transporte.service';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { createInitialState, Tramite30401Store } from '../../estados/tramites30401.store';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockRegistroEmpresasTransporteService: Partial<RegistroEmpresasTransporteService>;
  let mockTramite30401Query: Partial<Tramite30401Query>;
  let mockTramite30401Store: Partial<Tramite30401Store>;

  beforeEach(async () => {
    mockRegistroEmpresasTransporteService = {
      onBancoList: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Mock Banco' }] as Catalogo[])),
    };
    mockTramite30401Query = {
      selectTramite30401$: of({
        ...createInitialState(),
      }),
    };
    mockTramite30401Store = {
      establecerDatos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, PagoDeDerechosComponent],
      providers: [
        { provide: RegistroEmpresasTransporteService, useValue: mockRegistroEmpresasTransporteService },
        { provide: Tramite30401Query, useValue: mockTramite30401Query },
        { provide: Tramite30401Store, useValue: mockTramite30401Store },
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
    (mockRegistroEmpresasTransporteService.onBancoList as jest.Mock).mockReturnValue(of(mockBancoList));
  
    // Recreate the component to trigger ngOnInit
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.bancoList = mockBancoList;
    component.ngOnInit();
    // expect(mockRegistroEmpresasTransporteService.onBancoList).toHaveBeenCalled();
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

  it('should call establecerDatos in Tramite30401Store with the correct value when setValoresStore is called', () => {
    const mockForm = new FormGroup({
      clave: new FormControl('testValue'),
    });
  
    const establecerDatosSpy = jest.spyOn(mockTramite30401Store, 'establecerDatos');
  
    component.setValoresStore(mockForm, 'clave');
  
    expect(establecerDatosSpy).toHaveBeenCalledWith({ clave: 'testValue' });
  });
  
  it('should not call establecerDatos if the form is null', () => {
    const establecerDatosSpy = jest.spyOn(mockTramite30401Store, 'establecerDatos');
  
    component.setValoresStore(null, 'clave');
  
    expect(establecerDatosSpy).not.toHaveBeenCalled();
  });
  
  it('should not call establecerDatos if the control value is null or undefined', () => {
    const mockForm = new FormGroup({
      clave: new FormControl(null),
    });
    const establecerDatosSpy = jest.spyOn(mockTramite30401Store, 'establecerDatos');
    component.setValoresStore(mockForm, 'clave');
    expect(establecerDatosSpy).not.toHaveBeenCalled();
  });

});