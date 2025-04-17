import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';
import { CatalogoSelectComponent, InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let tramite230901StoreMock: any;
  let tramite230901QueryMock: any;
  let autorizacionesDeVidaSilvestreServiceMock: any;

  beforeEach(async () => {
    // Mock dependencies
    tramite230901StoreMock = {
      setbancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
    };

    tramite230901QueryMock = {
      selectSolicitud$: of({
        bancoseleccionado: 'Banco 1',
        llaveDePago: 'Llave123',
        fecPago: '2025-03-27',
      }),
    };

    autorizacionesDeVidaSilvestreServiceMock = {
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule,TituloComponent,
        CatalogoSelectComponent, InputFechaComponent],
      providers: [
        { provide: Tramite230901Store, useValue: tramite230901StoreMock },
        { provide: Tramite230901Query, useValue: tramite230901QueryMock },
        { provide: AutorizacionesDeVidaSilvestreService, useValue: autorizacionesDeVidaSilvestreServiceMock },
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
    expect(component.formularioPagoDerechos).toBeDefined();
    expect(component.formularioPagoDerechos.get('claveDeReferencia')?.value).toBe('084000966');
    expect(component.formularioPagoDerechos.get('cadenaPagoDependencia')?.value).toBe('00130090940161');
    expect(component.formularioPagoDerechos.get('banco')?.value).toBe('Banco 1');
    expect(component.formularioPagoDerechos.get('llaveDePago')?.value).toBe('Llave123');
    expect(component.formularioPagoDerechos.get('fecPago')?.value).toBe('2025-03-27');
    expect(component.formularioPagoDerechos.get('impPago')?.value).toBe(672);
  });

  it('should disable specific form controls', () => {
    component.ngOnInit();
    expect(component.formularioPagoDerechos.get('claveDeReferencia')?.disabled).toBeTruthy();
    expect(component.formularioPagoDerechos.get('cadenaPagoDependencia')?.disabled).toBeTruthy();
    expect(component.formularioPagoDerechos.get('impPago')?.disabled).toBeTruthy();
  });

  it('should validate form banco', () => {
    const BANCO = component.formularioPagoDerechos.get('banco');
    BANCO?.setValue('');
    BANCO?.updateValueAndValidity();
    expect(BANCO?.valid).toBeFalsy();

    BANCO?.setValue('Bancomer');
    BANCO?.updateValueAndValidity();
    expect(BANCO?.valid).toBeTruthy();
  });

  it('should validate form llaveDePago', () => {
    const LLAVE = component.formularioPagoDerechos.get('llaveDePago');
    LLAVE?.setValue('');
    LLAVE?.updateValueAndValidity();
    expect(LLAVE?.valid).toBeFalsy();

    LLAVE?.setValue('Llave456');
    LLAVE?.updateValueAndValidity();
    expect(LLAVE?.valid).toBeTruthy();
  });

  it('should validate form fecPago', () => {
    const FECHA = component.formularioPagoDerechos.get('fecPago');
    FECHA?.setValue('');
    FECHA?.updateValueAndValidity();
    expect(FECHA?.valid).toBeFalsy();

    FECHA?.setValue('2025-03-28');
    FECHA?.updateValueAndValidity();
    expect(FECHA?.valid).toBeTruthy();
  });

  it('should call setbancoseleccionado when seleccionarBanco is triggered', () => {
    component.ngOnInit();
    component.formularioPagoDerechos.get('banco')?.setValue('Banco 2');
    component.manejarSeleccionBanco();
    expect(tramite230901StoreMock.setbancoseleccionado).toHaveBeenCalledWith('Banco 2');
  });

  it('should call setLlaveDePago when cambiarLlaveDePago is triggered', () => {
    component.ngOnInit();
    component.formularioPagoDerechos.get('llaveDePago')?.setValue('Llave456');
    component.manejarCambioLlavePago();
    expect(tramite230901StoreMock.setLlaveDePago).toHaveBeenCalledWith('LLAVE456');
  });

  it('should call setFechaDePago when cambiarFechaDePago is triggered', () => {
    component.ngOnInit();
    component.cambioFechaFinal('2025-03-28');
    expect(tramite230901StoreMock.setFechaDePago).toHaveBeenCalledWith('2025-03-28');
  });

  it('should call inicializaPagoDeDerechosDatosCatalogos on ngOnInit', () => {
    component.ngOnInit();
    expect(autorizacionesDeVidaSilvestreServiceMock.inicializaPagoDeDerechosDatosCatalogos).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});