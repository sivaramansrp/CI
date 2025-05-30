import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite301Store } from '../../../core/estados/tramite301.store';
import { Tramite301Query } from '../../../core/queries/tramite301.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solocitud301Service } from '../../../core/services/service301.service';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  const mockStore = {
    setLinea: jest.fn(),
    setMonto: jest.fn(),
    setLineaCheckbox: jest.fn()
  };

  const mockQuery = {
    selectSolicitud$: of({
      linea: 'Test Linea',
      lineaCheckbox: true,
    })
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({
      readonly: false,
      parameter: 'FLUJO_FUNCIONARIO_AUTORIZACION'
    })
  };

  const mockService = {
    getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
    actualizarEstadoFormulario: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosComponent],
      providers: [
        { provide: Tramite301Store, useValue: mockStore },
        { provide: Tramite301Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: Solocitud301Service, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.FormSolicitud.get('pagodederechos');
    expect(form).toBeTruthy();
    expect(form?.get('linea')?.value).toEqual('Test Linea');
    expect(form?.get('monto')?.value).toEqual('4845');
    expect(form?.get('monto')?.disabled).toBe(true);
  });


  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call store setter methods in setValoresStore()', () => {
    component.setValoresStore(component.FormSolicitud, 'pagodederechos.linea', 'setLinea');
    expect(mockStore.setLinea).toHaveBeenCalled();
  });
});
