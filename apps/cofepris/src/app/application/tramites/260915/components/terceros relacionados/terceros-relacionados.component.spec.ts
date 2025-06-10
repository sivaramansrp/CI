import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosrelacionadosComponent } from './terceros-relacionados.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CatalogosSelect, Notificacion, Catalogo } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
  })),
}));

describe('TercerosrelacionadosComponent', () => {
  let component: TercerosrelacionadosComponent;
  let fixture: ComponentFixture<TercerosrelacionadosComponent>;
  let mockPermisoService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockPermisoService = {
      getPaisData: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'México' }])),
    };
    mockStore = {
      setTramite260915State: jest.fn(),
    };
    mockQuery = {
      selectSolicitud260915$: of({}),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TercerosrelacionadosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: PermisoSanitarioDispositivosMedicosService, useValue: mockPermisoService },
        { provide: Solicitud260915Store, useValue: mockStore },
        { provide: Solicitud260915Query, useValue: mockQuery },
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

  describe('crearFormTransporte', () => {
    it('should create the form with required controls', () => {
      component.agregarDestinatarioState = {
        clavedereferencia: '',
        cadenadeladependencia: '',
        banco: '',
        llavedepago: '',
        // ... add all other required properties with mock values
        // For brevity, fill with empty strings, zeros, or appropriate mock values
      } as any;
      component.crearFormTransporte();
      expect(component.destinatarioForm.contains('agregarDestinatario')).toBe(true);
      expect(component.destinatarioForm.contains('datosPersonales')).toBe(true);
    });
  });

  describe('ngOnInit', () => {
    it('should initialize state and call getPaisData', () => {
      const getPaisDataSpy = jest.spyOn(component, 'getPaisData');
      component.ngOnInit();
      expect(getPaisDataSpy).toHaveBeenCalled();
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
      const spy = jest.spyOn(component, 'guardarDatosFormulario');
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('should call crearFormTransporte if esFormularioSoloLectura is false', () => {
      const spy = jest.spyOn(component, 'crearFormTransporte');
      component.esFormularioSoloLectura = false;
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('guardarDatosFormulario', () => {
    it('should disable form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.crearFormTransporte();
      component.guardarDatosFormulario();
      expect(component.destinatarioForm.disabled).toBe(true);
    });

    it('should enable form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.crearFormTransporte();
      component.guardarDatosFormulario();
      expect(component.destinatarioForm.enabled).toBe(true);
    });
  });

  describe('eliminarPedimento', () => {
    it('should remove pedimento and call eliminarMercancias and abrirModal', () => {
      component.pedimentos = [{}, {}] as any;
      component.elementoParaEliminar = 0;
      const eliminarMercanciasSpy = jest.spyOn(component, 'eliminarMercancias');
      const abrirModalSpy = jest.spyOn(component, 'abrirModal');
      component.eliminarPedimento(true);
      expect(component.pedimentos.length).toBe(1);
      expect(eliminarMercanciasSpy).toHaveBeenCalled();
      expect(abrirModalSpy).toHaveBeenCalledWith(0, true);
    });

    it('should not remove pedimento if borrar is false', () => {
      component.pedimentos = [{}, {}] as any;
      component.elementoParaEliminar = 0;
      component.eliminarPedimento(false);
      expect(component.pedimentos.length).toBe(2);
    });
  });

  describe('abrirModal', () => {
    it('should set nuevaNotificacion to success if isDeleted is true', () => {
      component.abrirModal(0, true);
      expect(component.nuevaNotificacion.categoria).toBe('success');
    });

    it('should set nuevaNotificacion to danger if selectedRows has items', () => {
      component.selectedRows = new Set([1]);
      component.abrirModal(2, false);
      expect(component.nuevaNotificacion.categoria).toBe('danger');
      expect(component.elementoParaEliminar).toBe(2);
    });

    it('should not set nuevaNotificacion if selectedRows is empty and isDeleted is false', () => {
      component.selectedRows = new Set();
      component.abrirModal(1, false);
      expect(component.nuevaNotificacion).toBeUndefined();
    });
  });

  describe('getPaisData', () => {
    it('should set paisData.catalogos from service', () => {
      component.getPaisData();
      expect(component.paisData.catalogos.length).toBeGreaterThan(0);
    });
  });

  describe('selectedTipoPersona getter', () => {
    it('should return tipoPersona value', () => {
      component.crearFormTransporte();
      component.destinatarioForm.get('agregarDestinatario')?.get('tipoPersona')?.setValue('fisica');
      expect(component.selectedTipoPersona).toBe('fisica');
    });
  });

  describe('agregarDestinatario getter', () => {
    it('should return agregarDestinatario FormGroup', () => {
      component.crearFormTransporte();
      expect(component.agregarDestinatario).toBeTruthy();
    });
  });

  describe('onGuardar', () => {
    it('should push new destinatario to tableData and reset form', () => {
      component.paisData.catalogos = [{ id: 1, descripcion: 'México' }];
      component.crearFormTransporte();
      component.destinatarioForm.setValue({
        agregarDestinatario: { tipoPersona: 'fisica' },
        datosPersonales: {
          nombre: 'Juan',
          primerApellido: 'Pérez',
          segundoApellido: 'López',
          denominacion: 'Empresa',
          pais: '1',
          domicilio: 'Calle 1',
          estado: 'CDMX',
          codigopostal: '12345',
          calle: 'Calle 1',
          numeroExterior: '10',
          numeroInterior: '2',
          lada: '',
          telefono: '',
          correoElectronico: '',
        },
      });
      component.onGuardar();
      expect(component.tableData.length).toBe(1);
      expect(component.destinatarioForm.value.agregarDestinatario.tipoPersona).toBeFalsy();
    });
  });

  describe('getPaisName', () => {
    it('should return country description if found', () => {
      component.paisData.catalogos = [{ id: 1, descripcion: 'México' }];
      expect((component as any).getPaisName('1')).toBe('México');
    });

    it('should return N/A if not found', () => {
      component.paisData.catalogos = [{ id: 1, descripcion: 'México' }];
      expect((component as any).getPaisName('2')).toBe('N/A');
    });
  });

  describe('onSelectedRowsChange', () => {
    it('should update selectedRows and hide form', () => {
      component.onSelectedRowsChange([{ id: 5 } as any]);
      expect(component.selectedRows.has(5)).toBe(true);
      expect(component.esFormularioVisible).toBe(false);
    });
  });

  describe('eliminarMercancias', () => {
    it('should remove selected rows from tableData and clear selectedRows', () => {
      component.tableData = [{ id: 1 } as any, { id: 2 } as any];
      component.selectedRows = new Set([1]);
      component.eliminarMercancias();
      expect(component.tableData.length).toBe(1);
      expect(component.selectedRows.size).toBe(0);
    });

    it('should do nothing if selectedRows is empty', () => {
      component.tableData = [{ id: 1 } as any];
      component.selectedRows = new Set();
      component.eliminarMercancias();
      expect(component.tableData.length).toBe(1);
    });
  });

  describe('openModificarMercancias', () => {
    it('should patch form and show form if one row selected', () => {
      component.tableData = [{
        id: 1,
        tipoPersona: 'fisica',
        nombre: 'Juan',
        primerApellido: 'Pérez',
        segundoApellido: 'López',
        denominacion: 'Empresa',
        pais: '1',
        domicilio: 'Calle 1',
        estado: 'CDMX',
        codigopostal: '12345',
        calle: 'Calle 1',
        numeroExterior: '10',
        numeroInterior: '2',
        lada: '',
        telefono: '',
        correoElectronico: '',
        rfc: '',
        curp: '',
        colonia: '',
        municipio: '',
        localidad: '',
        estado2: ''
      }];
      component.selectedRows = new Set([1]);
      component.crearFormTransporte();
      component.openModificarMercancias();
      expect(component.esFormularioVisible).toBe(true);
      expect(component.destinatarioForm.get('datosPersonales.nombre')?.value).toBe('Juan');
    });

    it('should not patch form if no row found', () => {
      component.tableData = [];
      component.selectedRows = new Set([1]);
      component.crearFormTransporte();
      component.openModificarMercancias();
      expect(component.esFormularioVisible).toBe(false);
    });

    it('should not patch form if selectedRows.size !== 1', () => {
      component.selectedRows = new Set([1, 2]);
      component.openModificarMercancias();
      expect(component.esFormularioVisible).toBe(false);
    });
  });

  describe('agregarMercancias', () => {
    it('should show form and reset it', () => {
      component.crearFormTransporte();
      const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');
      component.agregarMercancias();
      expect(component.esFormularioVisible).toBe(true);
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('cancelarFormulario', () => {
    it('should hide the form', () => {
      component.esFormularioVisible = true;
      component.cancelarFormulario();
      expect(component.esFormularioVisible).toBe(false);
    });
  });
  describe('onSubmit', () => {
    it('should call onGuardar if form is valid', () => {
      component.crearFormTransporte();
      const onGuardarSpy = jest.spyOn(component, 'onGuardar');
      component.destinatarioForm.get('agregarDestinatario.tipoPersona')?.setValue('fisica');
      component.onGuardar();
      expect(onGuardarSpy).toHaveBeenCalled();
    });
  });
  describe('onCancelar', () => {
    it('should call cancelarFormulario', () => {
      const cancelarFormularioSpy = jest.spyOn(component, 'cancelarFormulario');
      component.cancelarFormulario();
      expect(cancelarFormularioSpy).toHaveBeenCalled();
    });
  });
  describe('onAgregar', () => {
    it('should call agregarMercancias', () => {
      const agregarMercanciasSpy = jest.spyOn(component, 'agregarMercancias');
      component.agregarMercancias();
      expect(agregarMercanciasSpy).toHaveBeenCalled();
    });
  });
  describe('onModificar', () => {
    it('should call openModificarMercancias', () => {
      const openModificarMercanciasSpy = jest.spyOn(component, 'openModificarMercancias');
      component.openModificarMercancias();
      expect(openModificarMercanciasSpy).toHaveBeenCalled();
    });
  });
  describe('onEliminar', () => {
    it('should call eliminarPedimento with true', () => {
      const eliminarPedimentoSpy = jest.spyOn(component, 'eliminarPedimento');
      component.eliminarPedimento(true);
      expect(eliminarPedimentoSpy).toHaveBeenCalledWith(true);
    });

    it('should call eliminarPedimento with false', () => {
      const eliminarPedimentoSpy = jest.spyOn(component, 'eliminarPedimento');
      component.eliminarPedimento(false);
      expect(eliminarPedimentoSpy).toHaveBeenCalledWith(false);
    });
  });


  describe('onConfirmarEliminacion', () => {
    it('should call eliminarMercancias, show modal and abrirModal', () => {
      document.body.innerHTML = `<div id="datoseliminadosModal"></div>`;
      const eliminarMercanciasSpy = jest.spyOn(component, 'eliminarMercancias');
      const abrirModalSpy = jest.spyOn(component, 'abrirModal');
      component.onConfirmarEliminacion();
      expect(eliminarMercanciasSpy).toHaveBeenCalled();
      expect(abrirModalSpy).toHaveBeenCalled();
    });
  });

  describe('limpiarFormulario', () => {
    it('should reset the form', () => {
      component.crearFormTransporte();
      const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');
      component.limpiarFormulario();
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('onDeleted', () => {
    it('should call abrirModal if selectedRows.size > 0', () => {
      component.selectedRows = new Set([1]);
      const abrirModalSpy = jest.spyOn(component, 'abrirModal');
      component.onDeleted();
      expect(abrirModalSpy).toHaveBeenCalled();
    });

    it('should not call abrirModal if selectedRows.size === 0', () => {
      component.selectedRows = new Set();
      const abrirModalSpy = jest.spyOn(component, 'abrirModal');
      component.onDeleted();
      expect(abrirModalSpy).not.toHaveBeenCalled();
    });
  });

  describe('setValoresStore', () => {
    it('should update store with control value', () => {
      component.crearFormTransporte();
      component.destinatarioForm.get('agregarDestinatario.tipoPersona')?.setValue('fisica');
      component.setValoresStore(component.destinatarioForm.get('agregarDestinatario') as any, 'tipoPersona');
      expect(mockStore.setTramite260915State).toHaveBeenCalledWith({ tipoPersona: 'fisica' });
    });
  });

  describe('setTipoPersona', () => {
    it('should set tipoPersonaSeleccionada as string', () => {
      component.setTipoPersona(123);
      expect(component.tipoPersonaSeleccionada).toBe('123');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed$', () => {
      const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});