import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Tramite221603Query } from '../../estados/tramite221603.query';



/**
 * Mock data for the solicitud state.
 */
const mockSolicitudState: Solicitud221603State = {
  justificacion: '',
  aduana: '',
  oficina: '',
  punto: '',
  guia: '',
  regimen: '',
  carro: '',
  medio: '',
  transporte: '',
  verificacion: '',
  empresa: '',
  clave: '454000554',
  dependencia: '0001840646CAIM',
  banco: 'BBVA',
  llave: '1234',
  fecha: '2025-04-07',
  importe: '1281',
};

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite221603Store: Tramite221603Store;
  let tramite221603Query: Tramite221603Query;

  const tramite221603StoreMock = {
    setClave: jest.fn(),
    setDependencia: jest.fn(),
    setBanco: jest.fn(),
    setLlave: jest.fn(),
    setFecha: jest.fn(),
    setImporte: jest.fn(),
  };

  const tramite221603QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,PagoDeDerechosComponent, TituloComponent, CatalogoSelectComponent],
      providers: [
        FormBuilder,
        { provide: Tramite221603Store, useValue: tramite221603StoreMock },
        { provide: Tramite221603Query, useValue: tramite221603QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    tramite221603Store = TestBed.inject(Tramite221603Store);
    tramite221603Query = TestBed.inject(Tramite221603Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the store', () => {
    // Test form initialization with values from the store
    expect(component.pagoDerechosForm.controls['clave'].value).toBe('454000554');
    expect(component.pagoDerechosForm.controls['dependencia'].value).toBe('0001840646CAIM');
    expect(component.pagoDerechosForm.controls['banco'].value).toBe('BBVA');
    expect(component.pagoDerechosForm.controls['llave'].value).toBe('1234');
    expect(component.pagoDerechosForm.controls['fecha'].value).toBe('2025-04-07');
    expect(component.pagoDerechosForm.controls['importe'].value).toBe('1281');
  });

  it('should disable clave, dependencia, and importe fields', () => {
    expect(component.pagoDerechosForm.controls['clave'].disabled).toBe(true);
    expect(component.pagoDerechosForm.controls['dependencia'].disabled).toBe(true);
    expect(component.pagoDerechosForm.controls['importe'].disabled).toBe(true);
  });

  it('should call the store method setClave when updating the form', () => {
    component.pagoDerechosForm.controls['clave'].setValue('555555555');
    component.setValoresStore(component.pagoDerechosForm, 'clave', 'setClave');
    expect(tramite221603Store.setClave).toHaveBeenCalledWith('555555555');
  });

  it('should call the store method setDependencia when updating the form', () => {
    component.pagoDerechosForm.controls['dependencia'].setValue('0000000000XYZ');
    component.setValoresStore(component.pagoDerechosForm, 'dependencia', 'setDependencia');
    expect(tramite221603Store.setDependencia).toHaveBeenCalledWith('0000000000XYZ');
  });

  it('should call the store method setBanco when updating the form', () => {
    component.pagoDerechosForm.controls['banco'].setValue('Banorte');
    component.setValoresStore(component.pagoDerechosForm, 'banco', 'setBanco');
    expect(tramite221603Store.setBanco).toHaveBeenCalledWith('Banorte');
  });

  it('should call the store method setLlave when updating the form', () => {
    component.pagoDerechosForm.controls['llave'].setValue('5678');
    component.setValoresStore(component.pagoDerechosForm, 'llave', 'setLlave');
    expect(tramite221603Store.setLlave).toHaveBeenCalledWith('5678');
  });

  it('should call the store method setFecha when updating the form', () => {
    component.pagoDerechosForm.controls['fecha'].setValue('2025-04-08');
    component.setValoresStore(component.pagoDerechosForm, 'fecha', 'setFecha');
    expect(tramite221603Store.setFecha).toHaveBeenCalledWith('2025-04-08');
  });

  it('should call the store method setImporte when updating the form', () => {
    component.pagoDerechosForm.controls['importe'].setValue('1500');
    component.setValoresStore(component.pagoDerechosForm, 'importe', 'setImporte');
    expect(tramite221603Store.setImporte).toHaveBeenCalledWith('1500');
  });

  it('should initialize the store state correctly on ngOnInit', () => {
    component.ngOnInit();
    // Ensure that the store values are correctly initialized in the form
    expect(component.pagoDerechosForm.controls['clave'].value).toBe(mockSolicitudState.clave);
    expect(component.pagoDerechosForm.controls['dependencia'].value).toBe(mockSolicitudState.dependencia);
    expect(component.pagoDerechosForm.controls['banco'].value).toBe(mockSolicitudState.banco);
    expect(component.pagoDerechosForm.controls['llave'].value).toBe(mockSolicitudState.llave);
    expect(component.pagoDerechosForm.controls['fecha'].value).toBe(mockSolicitudState.fecha);
    expect(component.pagoDerechosForm.controls['importe'].value).toBe(mockSolicitudState.importe);
  });

  it('should call ngOnDestroy and clean up resources', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
