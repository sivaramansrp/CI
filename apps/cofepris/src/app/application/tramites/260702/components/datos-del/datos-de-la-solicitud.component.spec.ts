// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { Solicitud260702Store } from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';


describe('DatosdelasolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [DatosdelasolicitudComponent], // Declare the component here

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: RegistrarSolicitudMcpService, useClass: MockRegistrarSolicitudMcpService },
        ChangeDetectorRef,
        { provide: Solicitud260702Store, useClass: MockSolicitud260702Store },
        { provide: Solicitud260702Query, useClass: MockSolicitud260702Query }
      ]
    }).overrideComponent(DatosdelasolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });
  afterEach(() => {
    
  });

  describe('DatosdelasolicitudComponent', () => {
    let fixture;
    let component;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [DatosDeLaSolicitudComponent], // Corrected component name
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [
          FormBuilder,
          { provide: RegistrarSolicitudMcpService, useClass: MockRegistrarSolicitudMcpService },
          ChangeDetectorRef,
          { provide: Solicitud260702Store, useClass: MockSolicitud260702Store },
          { provide: Solicitud260702Query, useClass: MockSolicitud260702Query },
        ],
      })
        .overrideComponent(DatosDeLaSolicitudComponent, {})
        .compileComponents();
      fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
      component = fixture.debugElement.componentInstance;
    });

    afterEach(() => {});

    it('should run #constructor()', async () => {
      expect(component).toBeTruthy();
    });

    it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
      component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
      component.dataDeLaSolicitudForm.get = jest.fn();
      const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
      expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
    });

    it('should run #ngOnInit()', async () => {
      component.solicitud260702Query = component.solicitud260702Query || {};
      component.solicitud260702Query.selectSolicitud$ = observableOf({});
      component.dataDeLaSolicitudState = component.dataDeLaSolicitudState || {};
      component.getEstadosData = jest.fn();
      component.getClasificacionDelProductoData = jest.fn();
      component.ngOnInit();
      expect(component.getEstadosData).toHaveBeenCalled();
      expect(component.getClasificacionDelProductoData).toHaveBeenCalled();
    });

    it('should run #getEstadosData()', async () => {
      component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
      component.registrarsolicitudmcp.getEstadosData = jest.fn().mockReturnValue(observableOf({}));
      component.getEstadosData();
      expect(component.registrarsolicitudmcp.getEstadosData).toHaveBeenCalled();
    });

    it('should run #getClasificacionDelProductoData()', async () => {
      component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
      component.registrarsolicitudmcp.getClasificacionDelProductoData = jest.fn().mockReturnValue(observableOf({}));
      component.getClasificacionDelProductoData();
      expect(component.registrarsolicitudmcp.getClasificacionDelProductoData).toHaveBeenCalled();
    });

    it('should run #onSubmit()', async () => {
      component.dataDeLaSolicitudForm = component.fb.group({
        claveDeLosLotes: ['mockClave'],
        fechaDeFabricacion: ['mockFechaFabricacion'],
        fechaDeCaducidad: ['mockFechaCaducidad'],
      });
      component.tableData = [];
      component.onSubmit();
      expect(component.tableData.length).toBe(1);
      expect(component.tableData[0].claveDeLosLotes).toBe('mockClave');
    });

    it('should run #onLimpiar()', async () => {
      component.dataDeLaSolicitudForm = component.fb.group({
        claveDeLosLotes: ['mockClave'],
      });
      component.onLimpiar();
      expect(component.dataDeLaSolicitudForm.get('claveDeLosLotes')?.value).toBeNull();
    });

    it('should run #onEliminar()', async () => {
      component.selectedRows = new Set([1]);
      component.tableData = [{ id: 1 }, { id: 2 }];
      component.onEliminar();
      expect(component.tableData.length).toBe(1);
      expect(component.tableData[0].id).toBe(2);
    });

    it('should run #onModificar()', async () => {
      component.selectedRows = new Set([1]);
      component.tableData = [{ id: 1, claveDeLosLotes: 'oldValue' }];
      component.dataDeLaSolicitudForm = component.fb.group({
        claveDeLosLotes: ['newValue'],
      });
      component.onModificar();
      expect(component.tableData[0].claveDeLosLotes).toBe('newValue');
    });
  });
    component.dataDeLaSolicitudState.claveDeLosLotes = 'claveDeLosLotes';
    component.dataDeLaSolicitudState.fechaDeFabricacion = 'fechaDeFabricacion';
    component.dataDeLaSolicitudState.fechaDeCaducidad = 'fechaDeCaducidad';
    component.dataDeLaSolicitudState.descripcionFraccionArancelaria = 'descripcionFraccionArancelaria';
    component.dataDeLaSolicitudState.cantidadUMT = 'cantidadUMT';
    component.dataDeLaSolicitudState.cantidadUMC = 'cantidadUMC';
    component.dataDeLaSolicitudState.umc = 'umc';
    component.dataDeLaSolicitudState.tipoProducto = 'tipoProducto';
    component.dataDeLaSolicitudState.clasificaionProductos = 'clasificaionProductos';
    component.dataDeLaSolicitudState.especificarProducto = 'especificarProducto';
    component.dataDeLaSolicitudState.nombreProductoEspecifico = 'nombreProductoEspecifico';
    component.dataDeLaSolicitudState.marca = 'marca';
    component.dataDeLaSolicitudState.fraccionArancelaria = 'fraccionArancelaria';
    component.dataDeLaSolicitudState.justification = 'justification';
    component.dataDeLaSolicitudState.denominacion = 'denominacion';
    component.dataDeLaSolicitudState.correoElectronico = 'correoElectronico';
    component.dataDeLaSolicitudState.codigopostal = 'codigopostal';
    component.dataDeLaSolicitudState.estado = 'estado';
    component.dataDeLaSolicitudState.municipoyalcaldia = 'municipoyalcaldia';
    component.dataDeLaSolicitudState.localidad = 'localidad';
    component.dataDeLaSolicitudState.colonia = 'colonia';
    component.dataDeLaSolicitudState.calle = 'calle';
    component.dataDeLaSolicitudState.lada = 'lada';
    component.dataDeLaSolicitudState.telefono = 'telefono';
    component.dataDeLaSolicitudState.avisoDeFuncionamiento = 'avisoDeFuncionamiento';
    component.dataDeLaSolicitudState.licenciaSanitaria = 'licenciaSanitaria';
    component.dataDeLaSolicitudState.regimenalque = 'regimenalque';
    component.dataDeLaSolicitudState.aduana = 'aduana';
    component.dataDeLaSolicitudState.rfc = 'rfc';
    component.dataDeLaSolicitudState.legalRazonSocial = 'legalRazonSocial';
    component.dataDeLaSolicitudState.apellidoPaterno = 'apellidoPaterno';
    component.dataDeLaSolicitudState.apellidoMaterno = 'apellidoMaterno';
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.getEstadosData = jest.fn();
    component.getClaveScianData = jest.fn();
    component.createclaveScianForm = jest.fn();
    component.getClaveDescripcionDelData = jest.fn();
    component.getRegimenalqueData = jest.fn();
    component.getAduanaData = jest.fn();
    component.getMercanciasData = jest.fn();
    component.getEspificarData = jest.fn();
    component.getClasificacionDelProductoData = jest.fn();
    component.getTipoProductoData = jest.fn();
    component.getListaClaveData = jest.fn();
    component.getMercanciaCrosslistData = jest.fn();
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.getEstadosData).toHaveBeenCalled();
    expect(component.getClaveScianData).toHaveBeenCalled();
    expect(component.createclaveScianForm).toHaveBeenCalled();
    expect(component.getClaveDescripcionDelData).toHaveBeenCalled();
    expect(component.getRegimenalqueData).toHaveBeenCalled();
    expect(component.getAduanaData).toHaveBeenCalled();
    expect(component.getMercanciasData).toHaveBeenCalled();
    expect(component.getEspificarData).toHaveBeenCalled();
    expect(component.getClasificacionDelProductoData).toHaveBeenCalled();
    expect(component.getTipoProductoData).toHaveBeenCalled();
    expect(component.getListaClaveData).toHaveBeenCalled();
    expect(component.getMercanciaCrosslistData).toHaveBeenCalled();
  });

  it('should run #createclaveScianForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createclaveScianForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #getMercanciaCrosslistData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getMercanciaCrosslistData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaCrosslistData();
    expect(component.registrarsolicitudmcp.getMercanciaCrosslistData).toHaveBeenCalled();
  });

  it('should run #paisOrigenColapsable()', async () => {

    component.paisOrigenColapsable();

  });

  it('should run #paisProcedencis_colapsable()', async () => {

    component.paisProcedencis_colapsable();

  });

  it('should run #usoEspecificoColapsable()', async () => {

    component.usoEspecificoColapsable();

  });

  it('should run #getEstadosData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getEstadosData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoData = component.estadoData || {};
    component.estadoData.catalogos = 'catalogos';
    component.getEstadosData();
    expect(component.registrarsolicitudmcp.getEstadosData).toHaveBeenCalled();
  });

  it('should run #getClaveScianData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getClaveScianData = jest.fn().mockReturnValue(observableOf({}));
    component.claveScianData = component.claveScianData || {};
    component.claveScianData.catalogos = 'catalogos';
    component.getClaveScianData();
    expect(component.registrarsolicitudmcp.getClaveScianData).toHaveBeenCalled();
  });

  it('should run #getClaveDescripcionDelData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getClaveDescripcionDelData = jest.fn().mockReturnValue(observableOf({}));
    component.descripcionDelScianData = component.descripcionDelScianData || {};
    component.descripcionDelScianData.catalogos = 'catalogos';
    component.getClaveDescripcionDelData();
    expect(component.registrarsolicitudmcp.getClaveDescripcionDelData).toHaveBeenCalled();
  });

  it('should run #getRegimenalqueData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getRegimenalqueData = jest.fn().mockReturnValue(observableOf({}));
    component.regimenalqueData = component.regimenalqueData || {};
    component.regimenalqueData.catalogos = 'catalogos';
    component.getRegimenalqueData();
    expect(component.registrarsolicitudmcp.getRegimenalqueData).toHaveBeenCalled();
  });

  it('should run #getAduanaData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getAduanaData = jest.fn().mockReturnValue(observableOf({}));
    component.aduanaData = component.aduanaData || {};
    component.aduanaData.catalogos = 'catalogos';
    component.getAduanaData();
    expect(component.registrarsolicitudmcp.getAduanaData).toHaveBeenCalled();
  });

  it('should run #aceptar()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.enable = jest.fn();
    component.aceptar();
    expect(component.dataDeLaSolicitudForm.enable).toHaveBeenCalled();
  });

  it('should run #getMercanciasData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getMercanciasData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciasData();
    expect(component.registrarsolicitudmcp.getMercanciasData).toHaveBeenCalled();
  });

  it('should run #getClasificacionDelProductoData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getClasificacionDelProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.delProducto = component.delProducto || {};
    component.delProducto.catalogos = 'catalogos';
    component.getClasificacionDelProductoData();
    expect(component.registrarsolicitudmcp.getClasificacionDelProductoData).toHaveBeenCalled();
  });

  it('should run #getEspificarData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getEspificarData = jest.fn().mockReturnValue(observableOf({}));
    component.especificarData = component.especificarData || {};
    component.especificarData.catalogos = 'catalogos';
    component.getEspificarData();
    expect(component.registrarsolicitudmcp.getEspificarData).toHaveBeenCalled();
  });

  it('should run #getTipoProductoData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getTipoProductoData = jest.fn().mockReturnValue(observableOf({}));
    component.tipoProductoData = component.tipoProductoData || {};
    component.tipoProductoData.catalogos = 'catalogos';
    component.getTipoProductoData();
    expect(component.registrarsolicitudmcp.getTipoProductoData).toHaveBeenCalled();
  });

  it('should run #getListaClaveData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getListaClaveData = jest.fn().mockReturnValue(observableOf({}));
    component.getListaClaveData();
    expect(component.registrarsolicitudmcp.getListaClaveData).toHaveBeenCalled();
  });

  it('should run #seleccionarEstablecimiento()', async () => {
    component.modalElement = component.modalElement || {};
    component.modalElement.nativeElement = 'nativeElement';
    component.seleccionarEstablecimiento();

  });

  it('should run #onSubmit()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.value = 'value';
    component.clavaScianForm.reset = jest.fn();
    component.claveScianData = component.claveScianData || {};
    component.claveScianData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.descripcionDelScianData = component.descripcionDelScianData || {};
    component.descripcionDelScianData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.tableData = component.tableData || {};
    component.tableData.push = jest.fn();
    component.onSubmit();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
    expect(component.tableData.push).toHaveBeenCalled();
  });

  it('should run #onSelectedRows()', async () => {
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.clear = jest.fn();
    component.onSelectedRows({
      length: {},
      map: function() {
        return [
          {
            "claveScianG": {
              "claveScian": {}
            },
            "id": {},
            "claveDeLosLotes": {}
          }
        ];
      }
    });
    expect(component.selectedRows.clear).toHaveBeenCalled();
  });

  it('should run #onEliminar()', async () => {
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.size = 'size';
    component.onEliminar();

  });

  it('should run #confirmarEliminar()', async () => {
    component.listaClaveTabla = component.listaClaveTabla || {};
    component.listaClaveTabla = ['listaClaveTabla'];
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.has = jest.fn();
    component.selectedRows.clear = jest.fn();
    component.confirmarEliminar();
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.clear).toHaveBeenCalled();
  });

  it('should run #onLimpiar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onLimpiar();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #onAgregar()', async () => {

    component.onAgregar();

  });

  it('should run #onDelete()', async () => {
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.size = 'size';
    component.selectedRows.has = jest.fn();
    component.selectedRows.clear = jest.fn();
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.onDelete();
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.clear).toHaveBeenCalled();
  });

  it('should run #onCancelar()', async () => {
    component.clavaScianForm = component.clavaScianForm || {};
    component.clavaScianForm.reset = jest.fn();
    component.onCancelar();
    expect(component.clavaScianForm.reset).toHaveBeenCalled();
  });

  it('should run #agregarMercanciaGrid()', async () => {
    component.modalElement = component.modalElement || {};
    component.modalElement.nativeElement = 'nativeElement';
    component.agregarMercanciaGrid();

  });

  it('should run #onFechaDeFabricacionChange()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.patchValue = jest.fn();
    component.onFechaDeFabricacionChange({});
    expect(component.dataDeLaSolicitudForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onFechaDeCaducidadChange()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.patchValue = jest.fn();
    component.onFechaDeCaducidadChange({});
    expect(component.dataDeLaSolicitudForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onAgregarListaClave()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.dataDeLaSolicitudForm.reset = jest.fn();
    component.listaClaveTabla = component.listaClaveTabla || {};
    component.listaClaveTabla.push = jest.fn();
    component.onAgregarListaClave();
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
    expect(component.dataDeLaSolicitudForm.reset).toHaveBeenCalled();
    expect(component.listaClaveTabla.push).toHaveBeenCalled();
  });

  it('should run #onModificar()', async () => {
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.size = 'size';
    component.listaClaveTabla = component.listaClaveTabla || {};
    component.listaClaveTabla.findIndex = jest.fn().mockReturnValue([
      {
        "claveDeLosLotes": {}
      }
    ]);
    component.listaClaveTabla.rowIndex = {
      claveDeLosLotes: {},
      fechaDeFabricacion: {},
      fechaDeCaducidad: {}
    };
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.patchValue = jest.fn();
    component.dataDeLaSolicitudForm.valueChanges = observableOf({
      claveDeLosLotes: {},
      fechaDeFabricacion: {},
      fechaDeCaducidad: {}
    });
    component.onModificar();
    expect(component.listaClaveTabla.findIndex).toHaveBeenCalled();
    expect(component.dataDeLaSolicitudForm.patchValue).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud260702Store = component.solicitud260702Store || {};
    component.solicitud260702Store.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.solicitud260702Store.metodoNombre).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

