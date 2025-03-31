import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoDeDerechosEntradaComponent } from './pago-de-derechos-entrada.component';
import { PagoDeDerechosEntradaService } from '../../services/pago-de-derechos-entrada.service';
import { Tramite260402Store } from '../../estados/tramite260402.store';
import { Tramite260402Query } from '../../estados/tramite260402.query';
import { of } from 'rxjs';

describe('PagoDeDerechosEntradaComponent', () => {
  let component: PagoDeDerechosEntradaComponent;
  let fixture: ComponentFixture<PagoDeDerechosEntradaComponent>;
  let pagoDeDerechosServiceMock: any;
  let tramite260402StoreMock: any;
  let tramite260402QueryMock: any;

  beforeEach(async () => {
    pagoDeDerechosServiceMock = {
      getData: jest.fn(() => of([{ id: '1', name: 'Bank A' }, { id: '2', name: 'Bank B' }])),
    };

    tramite260402StoreMock = {
      setClaveDeReferncia: jest.fn(),
      setCadenaDeLaDependencia: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setBanco: jest.fn(),
    };

    tramite260402QueryMock = {
      selectedBanco$: of({ id: '1', name: 'Bank A' }),
      selectedClaveDeReferncia$: of('ReferenceKey123'),
      selectedCadenaDeLaDependencia$: of('DependencyString123'),
      selectedLlaveDePago$: of('PaymentKey123'),
      selectedFechaDePago$: of('2025-03-28'),
      selectedImporteDePago$: of(100.0),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,PagoDeDerechosEntradaComponent],
      providers: [
        { provide: PagoDeDerechosEntradaService, useValue: pagoDeDerechosServiceMock },
        { provide: Tramite260402Store, useValue: tramite260402StoreMock },
        { provide: Tramite260402Query, useValue: tramite260402QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate dropdown data on initialization', () => {
    expect(component.dropdownData).toEqual([
      { id: '1', name: 'Bank A' },
      { id: '2', name: 'Bank B' },
    ]);
  });

  it('should initialize form values from the query on ngOnInit', () => {
    expect(component.pagoDerechos.get('claveDeReferncia')?.value).toBe('ReferenceKey123');
    expect(component.pagoDerechos.get('cadenaDeLaDependencia')?.value).toBe('DependencyString123');
    expect(component.pagoDerechos.get('llaveDePago')?.value).toBe('PaymentKey123');
    expect(component.pagoDerechos.get('fechaDePago')?.value).toBe('2025-03-28');
    expect(component.pagoDerechos.get('importeDePago')?.value).toBe(100.0);
    expect(component.pagoDerechos.get('banco')?.value).toEqual({ id: '1', name: 'Bank A' });
  });

  it('should update store values when updateClaveDeReferncia is called', () => {
    component.pagoDerechos.get('claveDeReferncia')?.setValue('NewReferenceKey');
    component.updateClaveDeReferncia();
    expect(tramite260402StoreMock.setClaveDeReferncia).toHaveBeenCalledWith('NewReferenceKey');
  });

  it('should update store values when updateCadenaDeLaDependencia is called', () => {
    component.pagoDerechos.get('cadenaDeLaDependencia')?.setValue('NewDependencyString');
    component.updateCadenaDeLaDependencia();
    expect(tramite260402StoreMock.setCadenaDeLaDependencia).toHaveBeenCalledWith('NewDependencyString');
  });

  it('should update store values when updateLlaveDePago is called', () => {
    component.pagoDerechos.get('llaveDePago')?.setValue('NewPaymentKey');
    component.updateLlaveDePago();
    expect(tramite260402StoreMock.setLlaveDePago).toHaveBeenCalledWith('NewPaymentKey');
  });

  it('should update store values when cambioFechaDePago is called', () => {
    component.cambioFechaDePago('2025-03-29');
    expect(component.pagoDerechos.get('fechaDePago')?.value).toBe('2025-03-29');
    expect(tramite260402StoreMock.setFechaDePago).toHaveBeenCalledWith('2025-03-29');
  });

  it('should complete destroy$ when ngOnDestroy is called', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
