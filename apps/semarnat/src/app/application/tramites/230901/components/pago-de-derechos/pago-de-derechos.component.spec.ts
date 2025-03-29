import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite230901Store: Tramite230901Store;
  let tramite230901Query: Tramite230901Query;
  let autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService;

  beforeEach(async () => {
    // Mock dependencies
    const tramite230901StoreMock = {
      setbancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
    };

    const tramite230901QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '12345',
        cadenaDeLaDependencia: 'Dependencia',
        bancoseleccionado: 'Banco 1',
        llaveDePago: 'Llave123',
        importeDePago: 1000,
        fechaDePago: '2025-03-27',
      }),
    };

    const autorizacionesDeVidaSilvestreServiceMock = {
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    tramite230901Store = TestBed.inject(Tramite230901Store);
    tramite230901Query = TestBed.inject(Tramite230901Query);
    autorizacionesDeVidaSilvestreService = TestBed.inject(AutorizacionesDeVidaSilvestreService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioPagoDerechos).toBeDefined();
    expect(component.formularioPagoDerechos.get('claveDeReferencia')?.value).toBe('12345');
    expect(component.formularioPagoDerechos.get('cadenaDeLaDependencia')?.value).toBe('Dependencia');
    expect(component.formularioPagoDerechos.get('banco')?.value).toBe('Banco 1');
    expect(component.formularioPagoDerechos.get('llaveDePago')?.value).toBe('Llave123');
    expect(component.formularioPagoDerechos.get('importeDePago')?.value).toBe(1000);
    expect(component.formularioPagoDerechos.get('fechaDePago')?.value).toBe('2025-03-27');
  });

  it('should disable specific form controls', () => {
    component.ngOnInit();
    expect(component.formularioPagoDerechos.get('claveDeReferencia')?.disabled).toBe(true);
    expect(component.formularioPagoDerechos.get('cadenaDeLaDependencia')?.disabled).toBe(true);
    expect(component.formularioPagoDerechos.get('importeDePago')?.disabled).toBe(true);
  });

  it('should call setbancoseleccionado when seleccionarBanco is triggered', () => {
    component.ngOnInit();
    component.formularioPagoDerechos.get('banco')?.setValue('Banco 2');
    component.seleccionarBanco();
    expect(tramite230901Store.setbancoseleccionado).toHaveBeenCalledWith('Banco 2');
  });

  it('should call setLlaveDePago when cambiarLlaveDePago is triggered', () => {
    component.ngOnInit();
    component.formularioPagoDerechos.get('llaveDePago')?.setValue('Llave456');
    component.cambiarLlaveDePago();
    expect(tramite230901Store.setLlaveDePago).toHaveBeenCalledWith('Llave456');
  });

  it('should call setFechaDePago when cambiarFechaDePago is triggered', () => {
    component.ngOnInit();
    component.cambiarFechaDePago('2025-03-28');
    expect(tramite230901Store.setFechaDePago).toHaveBeenCalledWith('2025-03-28');
  });

  it('should call inicializaPagoDeDerechosDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreService.inicializaPagoDeDerechosDatosCatalogos).toHaveBeenCalled();
  });

  it('should call ngOnDestroy and complete notificadorDestruccion$', () => {
    const destroyNotifierSpy = spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});