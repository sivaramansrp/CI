import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaComponent } from './datos-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

// Mocks for dependencies
const tramite260215StoreMock = {
  setDenominacion: jest.fn(),
  setCorreo: jest.fn(),
};
const tramite260215QueryMock = {
  selectSolicitud$: of({
    rfcDel: 'RFC123456789',
    denominacion: 'Empresa S.A.',
    correo: 'correo@ejemplo.com',
  }),
};
const consultaioQueryMock = {
  selectConsultaioState$: of({ readonly: false }),
};
const serviciosPermisoSanitarioServiceMock = {
  getSolicitudes: jest.fn().mockReturnValue(of([{ fechaCreacion: '2025-11-07', mercancia: 'Producto', cantidad: 10, proveedor: 'Proveedor S.A.' }])),
};

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: 'Tramite260215Store', useValue: tramite260215StoreMock },
        { provide: 'Tramite260215Query', useValue: tramite260215QueryMock },
        { provide: 'ConsultaioQuery', useValue: consultaioQueryMock },
        { provide: 'ServiciosPermisoSanitarioService', useValue: serviciosPermisoSanitarioServiceMock },
      ],
    }).overrideComponent(DatosDeLaComponent, {
      set: {
        providers: [
          { provide: FormBuilder, useValue: new FormBuilder() },
          { provide: 'Tramite260215Store', useValue: tramite260215StoreMock },
          { provide: 'Tramite260215Query', useValue: tramite260215QueryMock },
          { provide: 'ConsultaioQuery', useValue: consultaioQueryMock },
          { provide: 'ServiciosPermisoSanitarioService', useValue: serviciosPermisoSanitarioServiceMock },
        ],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values', () => {
    component.inicializarFormulario();
    expect(component.forma.get('rfcDel')?.value).toBe('RFC123456789');
    expect(component.forma.get('denominacion')?.value).toBe('Empresa S.A.');
    expect(component.forma.get('correo')?.value).toBe('correo@ejemplo.com');
  });

  it('should set esFormularioSoloLectura from consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should toggle colapsable state', () => {
    const initial = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should open modal and set nuevaNotificacion', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should remove pedimento when eliminarPedimento is called with true', () => {
    component.pedimentos = [
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
        
      },
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      }
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
  });

  it('should not remove pedimento when eliminarPedimento is called with false', () => {
    component.pedimentos = [
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      },
      {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: '',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      }
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(false);
    expect(component.pedimentos.length).toBe(3);
  });

  it('should enable disabled controls in alternarControlesDeFormulario', () => {
    component.inicializarFormulario();
    component.forma.get('rfcDel')?.disable();
    component.alternarControlesDeFormulario();
    expect(component.forma.get('rfcDel')?.enabled).toBe(true);
  });

  it('should set value in store using setValoresStore', () => {
    component.inicializarFormulario();
    component.forma.get('denominacion')?.setValue('Nueva Empresa');
    component.setValoresStore(component.forma, 'denominacion', 'setDenominacion');
    expect(tramite260215StoreMock.setDenominacion).toHaveBeenCalledWith('Nueva Empresa');
  });

  it('should validate number with max three decimals', () => {
    const control = { value: '123.456' } as any;
    expect(DatosDeLaComponent.validarNumeroTresDecimales(control)).toBeNull();

    control.value = '123.4567';
    expect(DatosDeLaComponent.validarNumeroTresDecimales(control)).toEqual({ maximoTresDecimales: true });

    control.value = 'abc';
    expect(DatosDeLaComponent.validarNumeroTresDecimales(control)).toEqual({ noEsNumero: true });
  });

  it('should update solicitudData in actualizarEstado', () => {
    component.actualizarEstado();
    expect(component.solicitudData.length).toBeGreaterThan(0);
    expect(component.solicitudData[0].mercancia).toBe('Producto');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});