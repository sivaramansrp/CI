import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerDatosBanco: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco Test' }])),
    };

    storeMock = {
      setFechaPago: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '12345',
        cadenaDependecia: 'Dependencia Test',
        fechaPago: '2025-04-10',
        banco: 'Banco Test',
        liaveDePago: 'Clave123',
        importeDePago: '1000',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,PagoDeDerechosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch data on ngOnInit', () => {
    const spyDonanteDomicilio = jest.spyOn(component, 'donanteDomicilio');
    const spyObtenerDatosBanco = jest.spyOn(component, 'obtenerDatosBanco');

    component.ngOnInit();

    expect(spyDonanteDomicilio).toHaveBeenCalled();
    expect(spyObtenerDatosBanco).toHaveBeenCalled();
    expect(component.solicitudState).toEqual({
      claveDeReferencia: '12345',
      cadenaDependecia: 'Dependencia Test',
      fechaPago: '2025-04-10',
      banco: 'Banco Test',
      liaveDePago: 'Clave123',
      importeDePago: '1000',
    });
  });

  it('should fetch banco data', () => {
    component.obtenerDatosBanco();
    expect(consultaServiceMock.obtenerDatosBanco).toHaveBeenCalled();
    expect(component.bancoCatalogo.catalogos).toEqual([{ id: 1, descripcion: 'Banco Test' }]);
  });

  it('should update fechaPago in the form and store', () => {
    const nuevoFechaPago = '2025-04-15';
    component.pagoDeDerechosForm = component.fb.group({
      fechaPago: [''],
    });

    component.cambioFechaPago(nuevoFechaPago);

    expect(component.pagoDeDerechosForm.get('fechaPago')?.value).toBe(nuevoFechaPago);
    expect(storeMock.setFechaPago).toHaveBeenCalledWith(nuevoFechaPago);
  });

  it('should validate form fields using isValid', () => {
    component.pagoDeDerechosForm = component.fb.group({
      fechaPago: ['2025-04-10'],
    });

    const isValid = component.isValid(component.pagoDeDerechosForm, 'fechaPago');
    expect(isValid).toBe(true);
  });

  it('should set values in the store using setValoresStore', () => {
    const form = component.fb.group({
      fechaPago: ['2025-04-10'],
    });

    component.setValoresStore(form, 'fechaPago', 'setFechaPago');

    expect(storeMock.setFechaPago).toHaveBeenCalledWith('2025-04-10');
  });

  it('should initialize the form in donanteDomicilio', () => {
    component.donanteDomicilio();

    expect(component.pagoDeDerechosForm.value).toEqual({
      claveDeReferencia: '12345',
      cadenaDependecia: 'Dependencia Test',
      fechaPago: '2025-04-10',
      banco: 'Banco Test',
      liaveDePago: 'Clave123',
      importeDePago: '1000',
    });
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComplete).toHaveBeenCalled();
  });
});