import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosGeneralesDeLaSolicitudComponent } from './datos-generales-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { CatalogoSelectComponent, ConsultaioQuery, InputFechaComponent, InputRadioComponent, NotificacionesComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { ModificarImmexProgramComponent } from '../modificar-immex-program/modificar-immex-program.component';
import { AgregarImmexProgramComponent } from '../agregar-immex-program/agregar-immex-program.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosGeneralesDeLaSolicitudComponent', () => {
  let component: DatosGeneralesDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosGeneralesDeLaSolicitudComponent>;
  let solicitudServiceSpy: jest.Mocked<SolicitudService>;
  let solicitud31101StoreSpy: jest.Mocked<Solicitud31101Store>;
  let solicitud31101QuerySpy: jest.Mocked<Solicitud31101Query>;
  let consultaioQuerySpy: jest.Mocked<ConsultaioQuery>;

  beforeEach(async () => {
    solicitudServiceSpy = {
      conseguirDatosGeneralesOpcionDeRadio: jest.fn().mockReturnValue(
        of({
          tipoDeGarantia: {},
          modalidadDeLaGarantia: {},
          tipoSector: {},
          requisitos: {},
        })
      ),
      conseguirDatosGeneralesCatologo: jest.fn().mockReturnValue(
        of({
          concepto: { catalogos: [] },
          tipoDeInversion: { catalogos: [] },
          modalidadDelProgramaIMMEX: { catalogos: [] },
        })
      ),
      conseguirListaDeSubcontratistas: jest.fn().mockReturnValue(of([])),
      conseguirRegimenAduanero: jest.fn().mockReturnValue(of([])),
      conseguirMiembrosDeLaEmpresa: jest.fn().mockReturnValue(of([])),
      conseguirTipoDeInversionDatos: jest.fn().mockReturnValue(of([])),
      conseguirDomicilios: jest.fn().mockReturnValue(of([])),
    } as any;

    solicitud31101StoreSpy = {
      actualizarTipoDeGarantia: jest.fn(),
      actualizarModalidadDeLaGarantia: jest.fn(),
      actualizarTipoSector: jest.fn(),
      actualizarConcepto: jest.fn(),
      actualizar3500: jest.fn(),
      actualizar3501: jest.fn(),
      actualizar3502: jest.fn(),
      actualizarDatosGeneralesRFC: jest.fn(),
      actualizar3503: jest.fn(),
      actualizar3504: jest.fn(),
      actualizar3505: jest.fn(),
      actualizar3506: jest.fn(),
      actualizar3507: jest.fn(),
      actualizar3508: jest.fn(),
      actualizar3509: jest.fn(),
      actualizar3511: jest.fn(),
      actualizar3512: jest.fn(),
      actualizar3513: jest.fn(),
      actualizarTextoGenerico1: jest.fn(),
      actualizarTextoGenerico2: jest.fn(),
      actualizar3514: jest.fn(),
      actualizar3515: jest.fn(),
      actualizar3516: jest.fn(),
      actualizarTextoGenerico3: jest.fn(),
      actualizar3517: jest.fn(),
      actualizar3518: jest.fn(),
      actualizar3519: jest.fn(),
      actualizar3520: jest.fn(),
      actualizarTipoInversion: jest.fn(),
      actualizarCantidadInversion: jest.fn(),
      actualizarDescInversion: jest.fn(),
      actualizar3521: jest.fn(),
      actualizar3522: jest.fn(),
      actualizarClaveEnumeracionD0: jest.fn(),
      actualizarClaveEnumeracionD1: jest.fn(),
      actualizarClaveEnumeracionD2: jest.fn(),
      actualizarClaveEnumeracionD3: jest.fn(),
      actualizarClaveEnumeracionH: jest.fn(),
      actualizarModalidadProgramaImmex: jest.fn(),
      actualizarTextoGenerico4: jest.fn(),
      actualizarTextoGenerico5: jest.fn(),
      actualizar3523: jest.fn(),
      actualizar3524: jest.fn(),
      actualizar3525: jest.fn(),
      actualizar3526: jest.fn(),
      actualizar3527: jest.fn(),
      actualizarFechaFinVigencia1: jest.fn(),
      actualizarNumeroAutorizacion1: jest.fn(),
      actualizarFechaFinVigencia2: jest.fn(),
      actualizarNumeroAutorizacion2: jest.fn(),
      actualizar3528: jest.fn(),
      actualizar3529: jest.fn(),
      actualizarTextoGenerico6: jest.fn(),
      actualizarTextoGenerico7: jest.fn(),
      actualizar3530: jest.fn(),
      actualizar3531: jest.fn(),
      actualizarTextoGenerico9: jest.fn(),
      actualizarTextoGenerico10: jest.fn(),
      actualizarTextoGenerico11: jest.fn(),
      actualizarTextoGenerico12: jest.fn(),
      actualizarTextoGenerico13: jest.fn(),
      actualizarTextoGenerico14: jest.fn(),
      actualizarTextoGenerico15: jest.fn(),
      actualizarTextoGenerico16: jest.fn(),
      actualizarTextoGenerico17: jest.fn(),
      actualizarTextoGenerico18: jest.fn(),
      actualizarTextoGenerico19: jest.fn(),
      actualizarTextoGenerico20: jest.fn(),
      actualizarTextoGenerico21: jest.fn(),
      actualizarTextoGenerico22: jest.fn(),
      actualizarTextoGenerico23: jest.fn(),
      actualizarTextoGenerico24: jest.fn(),
      actualizarAlerta2: jest.fn(),
    } as any;

    solicitud31101QuerySpy = {
      selectSolicitud$: of({}) as any,
    } as any;

    consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        NotificacionesComponent,
        MiembroDeLaEmpresaComponent,
        ModificarImmexProgramComponent,
        AgregarImmexProgramComponent,
        InputFechaComponent,
        DatosGeneralesDeLaSolicitudComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreSpy },
        { provide: Solicitud31101Query, useValue: solicitud31101QuerySpy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosGeneralesForm).toBeDefined();
  });

  it('should call actualizarTipoDeGarantia', () => {
    component.actualizarTipoDeGarantia('test');
    expect(
      solicitud31101StoreSpy.actualizarTipoDeGarantia
    ).toHaveBeenCalledWith('test');
  });

  it('should call actualizarModalidadDeLaGarantia', () => {
    component.actualizarModalidadDeLaGarantia(1);
    expect(
      solicitud31101StoreSpy.actualizarModalidadDeLaGarantia
    ).toHaveBeenCalledWith(1);
  });

  it('should set espectaculoConcepto true when actualizarTipoSector with >0', () => {
    component.actualizarTipoSector(1);
    expect(component.espectaculoConcepto).toBe(true);
    expect(solicitud31101StoreSpy.actualizarTipoSector).toHaveBeenCalledWith(1);
  });

  it('should set espectaculoConcepto false when actualizarTipoSector with 0', () => {
    component.actualizarTipoSector(0);
    expect(component.espectaculoConcepto).toBe(false);
  });

  it('should call actualizarConcepto', () => {
    component.actualizarConcepto({ id: 5 } as any);
    expect(solicitud31101StoreSpy.actualizarConcepto).toHaveBeenCalledWith(5);
  });

  it('should call actualizarDatosGeneralesRFC', () => {
    const event = { target: { value: 'RFC123' } } as any;
    component.actualizarDatosGeneralesRFC(event);
    expect(
      solicitud31101StoreSpy.actualizarDatosGeneralesRFC
    ).toHaveBeenCalledWith('RFC123');
  });

  it('should call actualizar3506 and set espectaculoEnCasoNegativo', () => {
    component.actualizar3506(2);
    expect(component.espectaculoEnCasoNegativo).toBe(true);
    expect(solicitud31101StoreSpy.actualizar3506).toHaveBeenCalledWith(2);

    component.actualizar3506(1);
    expect(component.espectaculoEnCasoNegativo).toBe(false);
  });

  it('should add RFC to listaDeSubcontratistas in agregarRFCDatos', () => {
    component.datosGeneralesForm = new FormBuilder().group({
      datosGeneralesRFC: ['RFCX'],
    });
    component.listaDeSubcontratistas = [];
    component.agregarRFCDatos();
    expect(component.listaDeSubcontratistas.length).toBe(1);
    expect(component.datosGeneralesForm.get('datosGeneralesRFC')?.value).toBe(
      ''
    );
  });

  it('should set subContratistasDatos in seleccionarSubContratistasDatos', () => {
    const arr = [{ rfc: 'X', razonSocial: 'Y' }];
    component.seleccionarSubContratistasDatos(arr as any);
    expect(component.subContratistasDatos).toEqual(arr as any);
  });

  it('should remove RFC from listaDeSubcontratistas in eliminarRFCDatos', () => {
    component.listaDeSubcontratistas = [{ rfc: 'A', razonSocial: 'B' }];
    component.subContratistasDatos = [{ rfc: 'A', razonSocial: 'B' }];
    jest.spyOn(component, 'abrirModal');
    component.eliminarRFCDatos();
    expect(component.listaDeSubcontratistas.length).toBe(0);
    expect(component.subContratistasDatos.length).toBe(0);
    expect(component.abrirModal).toHaveBeenCalled();
    expect(component.pedimentos.length).toBe(1);
  });

  it('should set nuevaNotificacion and elementoParaEliminar in abrirModal', () => {
    component.abrirModal('msg', 3);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(3);
  });

  it('should calculate valor comercial in calcularValorComercial', () => {
    component.datosGeneralesForm = new FormBuilder().group({
      textoGenerico10: [1],
      textoGenerico13: [2],
      textoGenerico16: [3],
      textoGenerico19: [4],
    });
    component.solicitud31101Store = solicitud31101StoreSpy;
    component.calcularValorComercial();
    expect(
      solicitud31101StoreSpy.actualizarTextoGenerico22
    ).toHaveBeenCalledWith(10);
  });

  it('should calculate valor aduana in calcularValorAduana', () => {
    component.datosGeneralesForm = new FormBuilder().group({
      textoGenerico11: [1],
      textoGenerico14: [2],
      textoGenerico17: [3],
      textoGenerico20: [4],
    });
    component.solicitud31101Store = solicitud31101StoreSpy;
    component.calcularValorAduana();
    expect(
      solicitud31101StoreSpy.actualizarTextoGenerico23
    ).toHaveBeenCalledWith(10);
  });

  it('should calculate porcentaje in calcularValorPorcentaje', () => {
    component.datosGeneralesForm = new FormBuilder().group({
      textoGenerico12: [1],
      textoGenerico15: [2],
      textoGenerico18: [3],
      textoGenerico21: [4],
    });
    component.solicitud31101Store = solicitud31101StoreSpy;
    component.calcularValorPorcentaje();
    expect(
      solicitud31101StoreSpy.actualizarTextoGenerico24
    ).toHaveBeenCalledWith(10);
  });

  it('should remove pedimento in eliminarPedimento', () => {
    component.pedimentos = [{}, {}, {}] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
  });

  it('should set seleccionarDomiciliosDatos in seleccionarDomiciliosLista', () => {
    const arr = [{ id: 1 }] as any;
    component.seleccionarDomiciliosLista(arr);
    expect(component.seleccionarDomiciliosDatos).toBe(arr);
  });

  it('should add to tipoDeInversionDatos in agregarMiembrosDeLaEmpresa', () => {
    component.tipoDeInversionLista = {
      catalogos: [{ id: 1, descripcion: 'desc' }],
    } as any;
    component.datosGeneralesForm = new FormBuilder().group({
      tipoInversion: [1],
      cantidadInversion: [100],
      descInversion: ['abc'],
    });
    component.tipoDeInversionDatos = [];
    component.agregarMiembrosDeLaEmpresa();
    expect(component.tipoDeInversionDatos.length).toBe(1);
  });

  it('should set tipoSeleccionListo in seleccionarTipoSeleccionTabla', () => {
    const arr = [{ tipoInversion: 'A' }] as any;
    component.seleccionarTipoSeleccionTabla(arr);
    expect(component.tipoSeleccionListo).toBe(arr);
  });

  it('should remove from tipoDeInversionDatos in eliminarMiembrosDeLaEmpresa', () => {
    component.tipoSeleccionListo = [{ tipoInversion: 'A' }] as any;
    component.tipoDeInversionDatos = [
      { tipoInversion: 'A' },
      { tipoInversion: 'B' },
    ] as any;
    jest.spyOn(component, 'abrirModal');
    component.eliminarMiembrosDeLaEmpresa();
    expect(component.tipoDeInversionDatos.length).toBe(0);
    expect(component.abrirModal).toHaveBeenCalled();
    expect(component.pedimentos.length).toBe(1);
  });

  it('should push evento to listaSeccionSociosIC in eventoActualizarMiembro', () => {
    const evento = { id: 1 } as any;
    jest.spyOn(component, 'abrirModal');
    component.listaSeccionSociosIC = [];
    component.eventoActualizarMiembro(evento);
    expect(component.listaSeccionSociosIC.length).toBe(1);
    expect(component.abrirModal).toHaveBeenCalled();
    expect(component.pedimentos.length).toBe(1);
  });

  it('should push evento to domiciliosDatos in agregarImmexValor', () => {
    const evento = { id: 1 } as any;
    component.domiciliosDatos = [];
    component.agregarImmexValor(evento);
    expect(component.domiciliosDatos.length).toBe(1);
  });

  it('should call actualizar3507', () => {
    component.actualizar3507(123);
    expect(solicitud31101StoreSpy.actualizar3507).toHaveBeenCalledWith(123);
  });

  it('should call actualizar3508', () => {
    component.actualizar3508('abc');
    expect(solicitud31101StoreSpy.actualizar3508).toHaveBeenCalledWith('abc');
  });

  it('should call actualizar3509', () => {
    component.actualizar3509(456);
    expect(solicitud31101StoreSpy.actualizar3509).toHaveBeenCalledWith(456);
  });

  it('should call actualizar3511', () => {
    component.actualizar3511('xyz');
    expect(solicitud31101StoreSpy.actualizar3511).toHaveBeenCalledWith('xyz');
  });

  it('should call actualizar3512', () => {
    component.actualizar3512(789);
    expect(solicitud31101StoreSpy.actualizar3512).toHaveBeenCalledWith(789);
  });

  it('should call actualizar3513', () => {
    component.actualizar3513('test');
    expect(solicitud31101StoreSpy.actualizar3513).toHaveBeenCalledWith('test');
  });

  it('should call actualizarTextoGenerico1 with input value', () => {
    const event = { target: { value: 'val1' } } as any;
    component.actualizarTextoGenerico1(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico1).toHaveBeenCalledWith('val1');
  });

  it('should call actualizarTextoGenerico2 with input value', () => {
    const event = { target: { value: 'val2' } } as any;
    component.actualizarTextoGenerico2(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico2).toHaveBeenCalledWith('val2');
  });

  it('should call actualizar3514', () => {
    component.actualizar3514(14);
    expect(solicitud31101StoreSpy.actualizar3514).toHaveBeenCalledWith(14);
  });

  it('should call actualizar3515', () => {
    component.actualizar3515('fifteen');
    expect(solicitud31101StoreSpy.actualizar3515).toHaveBeenCalledWith('fifteen');
  });

  it('should call actualizar3516', () => {
    component.actualizar3516(16);
    expect(solicitud31101StoreSpy.actualizar3516).toHaveBeenCalledWith(16);
  });

  it('should call actualizarTextoGenerico3 with input value', () => {
    const event = { target: { value: 'val3' } } as any;
    component.actualizarTextoGenerico3(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico3).toHaveBeenCalledWith('val3');
  });

  it('should call actualizar3517', () => {
    component.actualizar3517(17);
    expect(solicitud31101StoreSpy.actualizar3517).toHaveBeenCalledWith(17);
  });

  it('should call actualizar3518', () => {
    component.actualizar3518('eighteen');
    expect(solicitud31101StoreSpy.actualizar3518).toHaveBeenCalledWith('eighteen');
  });

  it('should call actualizar3519', () => {
    component.actualizar3519(19);
    expect(solicitud31101StoreSpy.actualizar3519).toHaveBeenCalledWith(19);
  });

  it('should call actualizar3520', () => {
    component.actualizar3520('twenty');
    expect(solicitud31101StoreSpy.actualizar3520).toHaveBeenCalledWith('twenty');
  });

  it('should call actualizarTipoInversion with catalogo id', () => {
    component.actualizarTipoInversion({ id: 99 } as any);
    expect(solicitud31101StoreSpy.actualizarTipoInversion).toHaveBeenCalledWith(99);
  });

  it('should call actualizarCantidadInversion with input value', () => {
    const event = { target: { value: '1234' } } as any;
    component.actualizarCantidadInversion(event);
    expect(solicitud31101StoreSpy.actualizarCantidadInversion).toHaveBeenCalledWith('1234');
  });

  it('should call actualizarDescInversion with input value', () => {
    const event = { target: { value: 'desc' } } as any;
    component.actualizarDescInversion(event);
    expect(solicitud31101StoreSpy.actualizarDescInversion).toHaveBeenCalledWith('desc');
  });

  it('should call actualizar3521', () => {
    component.actualizar3521(21);
    expect(solicitud31101StoreSpy.actualizar3521).toHaveBeenCalledWith(21);
  });

  it('should call actualizar3522', () => {
    component.actualizar3522('twenty-two');
    expect(solicitud31101StoreSpy.actualizar3522).toHaveBeenCalledWith('twenty-two');
  });

  it('should call actualizarClaveEnumeracionD0', () => {
    component.actualizarClaveEnumeracionD0('D0');
    expect(solicitud31101StoreSpy.actualizarClaveEnumeracionD0).toHaveBeenCalledWith('D0');
  });

  it('should call actualizarClaveEnumeracionD1', () => {
    component.actualizarClaveEnumeracionD1('D1');
    expect(solicitud31101StoreSpy.actualizarClaveEnumeracionD1).toHaveBeenCalledWith('D1');
  });

  it('should call actualizarClaveEnumeracionD2', () => {
    component.actualizarClaveEnumeracionD2('D2');
    expect(solicitud31101StoreSpy.actualizarClaveEnumeracionD2).toHaveBeenCalledWith('D2');
  });

  it('should call actualizarClaveEnumeracionD3', () => {
    component.actualizarClaveEnumeracionD3('D3');
    expect(solicitud31101StoreSpy.actualizarClaveEnumeracionD3).toHaveBeenCalledWith('D3');
  });

  it('should call actualizarClaveEnumeracionH', () => {
    component.actualizarClaveEnumeracionH('H');
    expect(solicitud31101StoreSpy.actualizarClaveEnumeracionH).toHaveBeenCalledWith('H');
  });

  it('should call actualizarModalidadProgramaImmex with catalogo id', () => {
    component.actualizarModalidadProgramaImmex({ id: 7 } as any);
    expect(solicitud31101StoreSpy.actualizarModalidadProgramaImmex).toHaveBeenCalledWith(7);
  });

  it('should call actualizarTextoGenerico4 with input value', () => {
    const event = { target: { value: 'val4' } } as any;
    component.actualizarTextoGenerico4(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico4).toHaveBeenCalledWith('val4');
  });

  it('should call actualizarTextoGenerico5 with input value', () => {
    const event = { target: { value: 'val5' } } as any;
    component.actualizarTextoGenerico5(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico5).toHaveBeenCalledWith('val5');
  });

  it('should call actualizar3523', () => {
    component.actualizar3523(23);
    expect(solicitud31101StoreSpy.actualizar3523).toHaveBeenCalledWith(23);
  });

  it('should call actualizar3524', () => {
    component.actualizar3524('twenty-four');
    expect(solicitud31101StoreSpy.actualizar3524).toHaveBeenCalledWith('twenty-four');
  });

  it('should call actualizar3525', () => {
    component.actualizar3525(25);
    expect(solicitud31101StoreSpy.actualizar3525).toHaveBeenCalledWith(25);
  });

  it('should call actualizar3526', () => {
    component.actualizar3526('twenty-six');
    expect(solicitud31101StoreSpy.actualizar3526).toHaveBeenCalledWith('twenty-six');
  });

  it('should call actualizar3527', () => {
    component.actualizar3527(27);
    expect(solicitud31101StoreSpy.actualizar3527).toHaveBeenCalledWith(27);
  });

  it('should call actualizarFechaFinVigencia1', () => {
    component.actualizarFechaFinVigencia1('2024-01-01');
    expect(solicitud31101StoreSpy.actualizarFechaFinVigencia1).toHaveBeenCalledWith('2024-01-01');
  });

  it('should call actualizarNumeroAutorizacion1 with input value', () => {
    const event = { target: { value: 'auth1' } } as any;
    component.actualizarNumeroAutorizacion1(event);
    expect(solicitud31101StoreSpy.actualizarNumeroAutorizacion1).toHaveBeenCalledWith('auth1');
  });

  it('should call actualizarFechaFinVigencia2', () => {
    component.actualizarFechaFinVigencia2('2024-12-31');
    expect(solicitud31101StoreSpy.actualizarFechaFinVigencia2).toHaveBeenCalledWith('2024-12-31');
  });

  it('should call actualizarNumeroAutorizacion2 with input value', () => {
    const event = { target: { value: 'auth2' } } as any;
    component.actualizarNumeroAutorizacion2(event);
    expect(solicitud31101StoreSpy.actualizarNumeroAutorizacion2).toHaveBeenCalledWith('auth2');
  });

  it('should call actualizar3528', () => {
    component.actualizar3528(28);
    expect(solicitud31101StoreSpy.actualizar3528).toHaveBeenCalledWith(28);
  });

  it('should call actualizar3529', () => {
    component.actualizar3529('twenty-nine');
    expect(solicitud31101StoreSpy.actualizar3529).toHaveBeenCalledWith('twenty-nine');
  });

  it('should call actualizarTextoGenerico6 with input value', () => {
    const event = { target: { value: 'val6' } } as any;
    component.actualizarTextoGenerico6(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico6).toHaveBeenCalledWith('val6');
  });

  it('should call actualizarTextoGenerico7 with input value', () => {
    const event = { target: { value: 'val7' } } as any;
    component.actualizarTextoGenerico7(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico7).toHaveBeenCalledWith('val7');
  });

  it('should call actualizar3530', () => {
    component.actualizar3530(30);
    expect(solicitud31101StoreSpy.actualizar3530).toHaveBeenCalledWith(30);
  });

  it('should call actualizar3531', () => {
    component.actualizar3531('thirty-one');
    expect(solicitud31101StoreSpy.actualizar3531).toHaveBeenCalledWith('thirty-one');
  });

  it('should call actualizarTextoGenerico9 with input value', () => {
    const event = { target: { value: 'val9' } } as any;
    component.actualizarTextoGenerico9(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico9).toHaveBeenCalledWith('val9');
  });

  it('should call actualizarTextoGenerico10 and calcularValorComercial', () => {
    const event = { target: { value: 'val10' } } as any;
    jest.spyOn(component, 'calcularValorComercial');
    component.actualizarTextoGenerico10(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico10).toHaveBeenCalledWith('val10');
    expect(component.calcularValorComercial).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico11 and calcularValorAduana', () => {
    const event = { target: { value: 'val11' } } as any;
    jest.spyOn(component, 'calcularValorAduana');
    component.actualizarTextoGenerico11(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico11).toHaveBeenCalledWith('val11');
    expect(component.calcularValorAduana).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico12 and calcularValorPorcentaje', () => {
    const event = { target: { value: 'val12' } } as any;
    jest.spyOn(component, 'calcularValorPorcentaje');
    component.actualizarTextoGenerico12(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico12).toHaveBeenCalledWith('val12');
    expect(component.calcularValorPorcentaje).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico13 and calcularValorComercial', () => {
    const event = { target: { value: 'val13' } } as any;
    jest.spyOn(component, 'calcularValorComercial');
    component.actualizarTextoGenerico13(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico13).toHaveBeenCalledWith('val13');
    expect(component.calcularValorComercial).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico14 and calcularValorAduana', () => {
    const event = { target: { value: 'val14' } } as any;
    jest.spyOn(component, 'calcularValorAduana');
    component.actualizarTextoGenerico14(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico14).toHaveBeenCalledWith('val14');
    expect(component.calcularValorAduana).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico15 and calcularValorPorcentaje', () => {
    const event = { target: { value: 'val15' } } as any;
    jest.spyOn(component, 'calcularValorPorcentaje');
    component.actualizarTextoGenerico15(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico15).toHaveBeenCalledWith('val15');
    expect(component.calcularValorPorcentaje).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico16 and calcularValorComercial', () => {
    const event = { target: { value: 'val16' } } as any;
    jest.spyOn(component, 'calcularValorComercial');
    component.actualizarTextoGenerico16(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico16).toHaveBeenCalledWith('val16');
    expect(component.calcularValorComercial).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico17 and calcularValorAduana', () => {
    const event = { target: { value: 'val17' } } as any;
    jest.spyOn(component, 'calcularValorAduana');
    component.actualizarTextoGenerico17(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico17).toHaveBeenCalledWith('val17');
    expect(component.calcularValorAduana).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico18 and calcularValorPorcentaje', () => {
    const event = { target: { value: 'val18' } } as any;
    jest.spyOn(component, 'calcularValorPorcentaje');
    component.actualizarTextoGenerico18(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico18).toHaveBeenCalledWith('val18');
    expect(component.calcularValorPorcentaje).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico19 and calcularValorComercial', () => {
    const event = { target: { value: 'val19' } } as any;
    jest.spyOn(component, 'calcularValorComercial');
    component.actualizarTextoGenerico19(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico19).toHaveBeenCalledWith('val19');
    expect(component.calcularValorComercial).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico20 and calcularValorAduana', () => {
    const event = { target: { value: 'val20' } } as any;
    jest.spyOn(component, 'calcularValorAduana');
    component.actualizarTextoGenerico20(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico20).toHaveBeenCalledWith('val20');
    expect(component.calcularValorAduana).toHaveBeenCalled();
  });

  it('should call actualizarTextoGenerico21 and calcularValorPorcentaje', () => {
    const event = { target: { value: 'val21' } } as any;
    jest.spyOn(component, 'calcularValorPorcentaje');
    component.actualizarTextoGenerico21(event);
    expect(solicitud31101StoreSpy.actualizarTextoGenerico21).toHaveBeenCalledWith('val21');
    expect(component.calcularValorPorcentaje).toHaveBeenCalled();
  });

  it('should call actualizarAlerta2 with checked value', () => {
    const event = { target: { checked: true } } as any;
    component.actualizarAlerta2(event);
    expect(solicitud31101StoreSpy.actualizarAlerta2).toHaveBeenCalledWith(true);
  });

  it('should return true if control is invalid and touched in noEsValido', () => {
    component.datosGeneralesForm = new FormBuilder().group({
      test: ['val'],
    });
    const control = component.datosGeneralesForm.get('test');
    control?.setErrors({ required: true });
    control?.markAsTouched();
    expect(component.noEsValido('test')).toBe(true);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroy$ = component['destroy$'] as Subject<void>;
    jest.spyOn(destroy$, 'next');
    jest.spyOn(destroy$, 'complete');
    component.ngOnDestroy();
    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });
});
