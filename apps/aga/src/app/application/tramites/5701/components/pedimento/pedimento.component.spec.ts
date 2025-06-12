import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedimentoComponent } from './pedimento.component';
import { of, Subject } from 'rxjs';
import { EstadoPedimentoService } from '../../../../core/services/5701/pedimento/estado-pedimento.service';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';
import { FormGroup, FormControl } from '@angular/forms';
import {
  ERR_VALIDACION_PEDIMENTO,
  MSG_ELIMINA_ELEMENTO,
  MSG_NRO_PEDIMENTO,
} from '../../../../core/enums/5701/tramite5701.enum';

describe('PedimentoComponent', () => {
  let component: PedimentoComponent;
  let fixture: ComponentFixture<PedimentoComponent>;
  let mockEstadoPedimentoService: any;
  let mockTramite5701Query: any;
  let mockTramite5701Store: any;

  beforeEach(async () => {
    mockEstadoPedimentoService = {
      postEstadoPedimento: jest.fn(),
    };
    mockTramite5701Query = {
      selectSolicitud$: of({
        idAduanaDespacho: '123',
      }),
    };
    mockTramite5701Store = {
      setSomeValue: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PedimentoComponent],
      providers: [
        {
          provide: EstadoPedimentoService,
          useValue: mockEstadoPedimentoService,
        },
        { provide: Tramite5701Query, useValue: mockTramite5701Query },
        { provide: Tramite5701Store, useValue: mockTramite5701Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PedimentoComponent);
    component = fixture.componentInstance;
    component.datosNroPedimento = { patente: 1, idAduanaDespacho: 2 };
    component.tablaPedimento = [];
    component.validacion = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudState).toBeDefined();
    expect(component.solicitudState.idAduanaDespacho).toBe('123');
  });

  it('should update pedimentos on tablaPedimento change', () => {
    const changes = {
      tablaPedimento: {
        currentValue: [{ idPedimento: 1 }],
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes as any);
    expect(component.pedimentos).toEqual([{ idPedimento: 1 }]);
  });

  it('should update validacion and call acciones on validacion change', () => {
    const accionesSpy = jest.spyOn(component, 'acciones');
    const changes = {
      validacion: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes as any);
    expect(component.validacion).toBe(false);
    expect(accionesSpy).toHaveBeenCalled();
  });

  it('should update datosNroPedimento on datosNroPedimento change', () => {
    const changes = {
      datosNroPedimento: {
        currentValue: { patente: 2, idAduanaDespacho: 3 },
        previousValue: { patente: 1, idAduanaDespacho: 2 },
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes as any);
    expect(component.datosNroPedimento).toEqual({
      patente: 2,
      idAduanaDespacho: 3,
    });
  });

  it('isValid should return correct value', () => {
    component.pedimentoForm.setErrors({ maxlength: true });
    component.pedimentoForm.markAsTouched();
    expect(component.isValid).toBeTruthy();
    component.pedimentoForm.setErrors(null);
    expect(component.isValid).toBeFalsy();
  });

  it('agregaPedimento should emit validaCampos and call acciones if validacion is true', () => {
    const validaCamposSpy = jest.spyOn(component.validaCampos, 'emit');
    const accionesSpy = jest.spyOn(component, 'acciones');
    component.validacion = true;
    component.agregaPedimento();
    expect(validaCamposSpy).toHaveBeenCalled();
    expect(accionesSpy).toHaveBeenCalled();
  });

  it('acciones should set nuevaNotificacion if NUMERO_PEDIMENTO is 0', () => {
    component.validacion = true;
    component.pedimentoForm.setValue('');
    component.solicitudState = { idAduanaDespacho: '123' } as any;
    component.acciones();
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.mensaje).toBe(MSG_NRO_PEDIMENTO);
  });

  it('acciones should add pedimento if response.codigo is "00"', () => {
    component.validacion = true;
    component.pedimentoForm.setValue('1234567');
    component.solicitudState = { idAduanaDespacho: '123' } as any;
    mockEstadoPedimentoService.postEstadoPedimento.mockReturnValue(
      of({
        codigo: '00',
        datos: {
          patente: 23424,
          pedimento: 1234567,
          aduana: 123,
          estado_pedimento: 'estado',
          sub_estado_pedimento: 'subestado',
          pedimento_valido: true,
        },
      })
    );
    const emitSpy = jest.spyOn(component.datosTablaPedimento, 'emit');
    component.acciones();
    expect(component.pedimentos.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.pedimentos);
  });

  it('acciones should set nuevaNotificacion if response.codigo is not "00"', () => {
    component.validacion = true;
    component.pedimentoForm.setValue('1234567');
    component.solicitudState = { idAduanaDespacho: '123' } as any;
    mockEstadoPedimentoService.postEstadoPedimento.mockReturnValue(
      of({
        codigo: '01',
        datos: {},
      })
    );
    component.acciones();
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.mensaje).toBe(ERR_VALIDACION_PEDIMENTO);
  });

  it('abrirModalEliminar should remove pedimento and emit', () => {
    component.pedimentos = [
      { idPedimento: 1 } as any,
      { idPedimento: 2 } as any,
    ];
    const emitSpy = jest.spyOn(component.datosTablaPedimento, 'emit');
    component.abrirModalEliminar(0);
    expect(component.pedimentos.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith(component.pedimentos);
    expect(component.nuevaNotificacion.mensaje).toBe(MSG_ELIMINA_ELEMENTO);
  });

  it('setValoresStore should call store method with value', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    mockTramite5701Store['setSomeValue'] = jest.fn();
    component.setValoresStore(form, 'campo', 'setSomeValue' as any);
    expect(mockTramite5701Store.setSomeValue).toHaveBeenCalledWith('valor');
  });

  it('ngOnDestroy should complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(
      (component as any).destroyNotifier$,
      'complete'
    );
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});

