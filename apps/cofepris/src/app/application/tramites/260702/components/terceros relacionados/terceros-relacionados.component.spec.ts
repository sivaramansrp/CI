import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { Solicitud260702Store } from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';
import { ConsultaioQuery, AlertComponent, TituloComponent, TablaDinamicaComponent,
        CatalogoSelectComponent,
        NotificacionesComponent,
        InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TercerosrelacionadosComponent', () => {
  let component: TercerosrelacionadosComponent;
  let fixture: ComponentFixture<TercerosrelacionadosComponent>;
  let mockRegistrarSolicitudMcpService: any;
  let mockSolicitud260702Store: any;
  let mockSolicitud260702Query: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockRegistrarSolicitudMcpService = {
      getPaisData: jest
        .fn()
        .mockReturnValue(of([{ id: 1, descripcion: 'México' }] as Catalogo[])),
    };
    mockSolicitud260702Store = {};
    mockSolicitud260702Query = {
      selectSolicitud$: of({
        tipoPersona: 'fisica',
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'López',
        denominacion: 'Empresa',
        pais: 1,
        domicilio: 'Calle 1',
        estado: 'CDMX',
        codigopostal: '12345',
        calle: 'Calle 1',
        numeroExterior: '10',
        numeroInterior: '2',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@mail.com',
      }),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [
        TercerosrelacionadosComponent,
        ReactiveFormsModule,
        CommonModule,
        TercerosRelacionadosComponent,
        AlertComponent,
        TituloComponent,
        TablaDinamicaComponent,
        CatalogoSelectComponent,
        NotificacionesComponent,
        InputRadioComponent,
        HttpClientTestingModule],
      declarations: [],
      providers: [
        FormBuilder,
        {
          provide: RegistrarSolicitudMcpService,
          useValue: mockRegistrarSolicitudMcpService,
        },
        { provide: Solicitud260702Store, useValue: mockSolicitud260702Store },
        { provide: Solicitud260702Query, useValue: mockSolicitud260702Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosrelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.get('agregarDestinatario')).toBeDefined();
    expect(component.destinatarioForm.get('datosPersonales')).toBeDefined();
  });

  it('should call getPaisData and set paisData.catalogos', () => {
    component.getPaisData();
    expect(mockRegistrarSolicitudMcpService.getPaisData).toHaveBeenCalled();
    expect(component.paisData.catalogos.length).toBeGreaterThan(0);
    expect(component.paisData.catalogos[0].descripcion).toBe('México');
  });

  it('should add a new destinatario to tableData on onGuardar', () => {
    component.paisData.catalogos = [{ id: 1, descripcion: 'México' }];
    component.destinatarioForm.setValue({
      agregarDestinatario: { tipoPersona: 'fisica' },
      datosPersonales: {
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'López',
        denominacion: 'Empresa',
        pais: 1,
        domicilio: 'Calle 1',
        estado: 'CDMX',
        codigopostal: '12345',
        calle: 'Calle 1',
        numeroExterior: '10',
        numeroInterior: '2',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@mail.com',
      },
    });
    component.onGuardar();
    expect(component.tableData.length).toBe(1);
    expect(component.tableData[0].nombre).toBe('Juan');
    expect(component.tableData[0].pais).toBe('México');
  });

  it('should clear selectedRows and remove rows from tableData on eliminarMercancias', () => {
    component.tableData = [
      { id: 1, nombre: 'A', tipoPersona: 'fisica' } as any,
      { id: 2, nombre: 'B', tipoPersona: 'moral' } as any,
    ];
    component.selectedRows = new Set([1]);
    component.eliminarMercancias();
    expect(component.tableData.length).toBe(1);
    expect(component.tableData[0].id).toBe(2);
    expect(component.selectedRows.size).toBe(0);
  });

  it('should set esFormularioVisible to true and reset form on agregarMercancias', () => {
    const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');
    component.esFormularioVisible = false;
    component.agregarMercancias();
    expect(component.esFormularioVisible).toBe(true);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should set esFormularioVisible to false on cancelarFormulario', () => {
    component.esFormularioVisible = true;
    component.cancelarFormulario();
    expect(component.esFormularioVisible).toBe(false);
  });

  it('should patch form and set esFormularioVisible to true on openModificarMercancias with one selected row', () => {
    component.tableData = [
      {
        id: 1,
        tipoPersona: 'fisica',
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'López',
        denominacion: 'Empresa',
        pais: 1,
        domicilio: 'Calle 1',
        estado: 'CDMX',
        codigopostal: '12345',
        calle: 'Calle 1',
        numeroExterior: '10',
        numeroInterior: '2',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'test@mail.com',
      } as any,
    ];
    component.selectedRows = new Set([1]);
    component.openModificarMercancias();
    expect(component.esFormularioVisible).toBe(true);
    expect(
      component.destinatarioForm.get('datosPersonales.nombre')?.value
    ).toBe('Juan');
  });

  it('should set tipoPersonaSeleccionada on setTipoPersona', () => {
    component.setTipoPersona('moral');
    expect(component.tipoPersonaSeleccionada).toBe('moral');
  });

  it('should clear form on limpiarFormulario', () => {
    const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should set nuevaNotificacion and elementoParaEliminar on abrirModal when not deleted', () => {
    component.selectedRows = new Set([1]);
    component.abrirModal(2, false);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.categoria).toBe('danger');
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should set nuevaNotificacion on abrirModal when isDeleted', () => {
    component.abrirModal(0, true);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.nuevaNotificacion.categoria).toBe('success');
  });

  it('should call abrirModal on onDeleted if selectedRows.size > 0', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.selectedRows = new Set([1]);
    component.onDeleted();
    expect(abrirModalSpy).toHaveBeenCalled();
  });

  it('should call eliminarMercancias and abrirModal on onConfirmarEliminacion', () => {
    const eliminarMercanciasSpy = jest.spyOn(component, 'eliminarMercancias');
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    // Mock document.getElementById and Modal
    const showMock = jest.fn();
    (global as any).document.getElementById = jest
      .fn()
      .mockReturnValue({} as any);
    (global as any).Modal = jest
      .fn()
      .mockImplementation(() => ({ show: showMock }));
    component.onConfirmarEliminacion();
    expect(eliminarMercanciasSpy).toHaveBeenCalled();
    expect(abrirModalSpy).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const fakeStoreMethod = jest.fn();
    component.destinatarioForm
      .get('agregarDestinatario')
      ?.setValue({ tipoPersona: 'fisica' });
    mockSolicitud260702Store['setTipoPersona'] = fakeStoreMethod;
    component.setValoresStore(
      component.destinatarioForm,
      'agregarDestinatario',
      'setTipoPersona'
    );
    expect(fakeStoreMethod).toHaveBeenCalled();
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should return N/A if pais not found in getPaisName', () => {
    component.paisData.catalogos = [];
    // @ts-ignore
    expect(component['getPaisName']('999')).toBe('N/A');
  });

  it('should update selectedRows and hide form on onSelectedRowsChange', () => {
    component.esFormularioVisible = true;
    component.onSelectedRowsChange([{ id: 5 } as any]);
    expect(component.selectedRows.has(5)).toBe(true);
    expect(component.esFormularioVisible).toBe(false);
  });
});
