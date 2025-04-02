import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { Solicitud230902State } from '../../estados/tramite230902.store';
import { InputFecha, REG_X } from '@libs/shared/data-access-user/src';
import { FECHA } from '../../enum/fetcha.enum';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let permisoCitesService: PermisoCitesService;
  let tramite230902Store: Tramite230902Store;
  let tramite230902Query: Tramite230902Query;

  beforeEach(async () => {
    permisoCitesService = {
      inicializaPagoDeDerechosDatosCatalogos: jest.fn()
    } as unknown as PermisoCitesService;

    tramite230902Store = {
      setbancoseleccionado: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn()
    } as unknown as Tramite230902Store;

    tramite230902Query = {
      selectSolicitud$: of({
        claveDeReferencia: '123',
        cadenaDeLaDependencia: 'ABC',
        bancoseleccionado: 'Banco1',
        llaveDePago: '123456',
        importeDePago: '100.00',
        fechaDePago: '2023-01-01'
      })
    } as unknown as Tramite230902Query;

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PermisoCitesService, useValue: permisoCitesService },
        { provide: Tramite230902Store, useValue: tramite230902Store },
        { provide: Tramite230902Query, useValue: tramite230902Query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    component.ngOnInit();
    expect(permisoCitesService.inicializaPagoDeDerechosDatosCatalogos).toHaveBeenCalled();
  });

  it('should create the form for pago de derechos', () => {
    component.createFormPagoDerechos();
    expect(component.formPagoDerechos).toBeDefined();
    expect(component.formPagoDerechos.get('claveDeReferencia')).toBeDefined();
    expect(component.formPagoDerechos.get('cadenaDeLaDependencia')).toBeDefined();
    expect(component.formPagoDerechos.get('banco')).toBeDefined();
    expect(component.formPagoDerechos.get('llaveDePago')).toBeDefined();
    expect(component.formPagoDerechos.get('importeDePago')).toBeDefined();
    expect(component.formPagoDerechos.get('fechaDePago')).toBeDefined();
  });

  it('should handle fecha de pago change', () => {
    component.createFormPagoDerechos();
    component.cambioFechaFinal('2023-01-01');
    expect(component.formPagoDerechos.get('fechaDePago')?.value).toBe('2023-01-01');
    expect(tramite230902Store.setFechaDePago).toHaveBeenCalledWith('2023-01-01');
  });

  it('should handle banco selection change', () => {
    component.createFormPagoDerechos();
    component.formPagoDerechos.get('banco')?.setValue('Banco1');
    component.onBancoSeleccion();
    expect(tramite230902Store.setbancoseleccionado).toHaveBeenCalledWith('Banco1');
  });

  it('should handle llave de pago change', () => {
    component.createFormPagoDerechos();
    component.formPagoDerechos.get('llaveDePago')?.setValue('123456');
    component.onllavaDePagoChange();
    expect(tramite230902Store.setLlaveDePago).toHaveBeenCalledWith('123456');
  });

  
});