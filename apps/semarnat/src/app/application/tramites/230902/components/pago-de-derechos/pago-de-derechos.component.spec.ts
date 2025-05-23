import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { CatalogoSelectComponent, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let permisoCitesServiceMock: any;
  let tramite230902StoreMock: any;
  let tramite230902QueryMock: any;

  beforeEach(async () => {
    permisoCitesServiceMock = {
      inicializaPagoDeDerechosDatosCatalogos: jest.fn(),
    };
    tramite230902StoreMock = {
      setfecPago: jest.fn(),
      setbancoseleccionado: jest.fn(),
      setllaveDePago: jest.fn(),
    };
    tramite230902QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '123',
        cadenaPagoDependencia: 'cadena',
        bancoseleccionado: 'banco',
        llaveDePago: 'llave',
        fecPago: '2023-01-01',
        impPago: 100,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule,TituloComponent,
        CatalogoSelectComponent, InputFechaComponent],
      providers: [
        { provide: PermisoCitesService, useValue: permisoCitesServiceMock },
        { provide: Tramite230902Store, useValue: tramite230902StoreMock },
        { provide: Tramite230902Query, useValue: tramite230902QueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle cambioFechaFinal', () => {
    component.cambioFechaFinal('2023-02-01');
    expect(tramite230902StoreMock.setfecPago).toHaveBeenCalledWith('2023-02-01');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyed$Spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(destroyed$Spy).toHaveBeenCalled();
  });
});