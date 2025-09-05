import { TestBed } from '@angular/core/testing';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';
import { Tramite260214Store } from '../../estados/tramite260214Store.store';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';
import { TercerosRelacionadosFebService } from '../../../../shared/services/tereceros-relacionados-feb.service';
import { of, Subject } from 'rxjs';
import {
  Fabricante,
  Destinatario,
  Proveedor,
  Facturador,
} from '../../../../shared/models/terceros-relacionados.model';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('TercerosRelacionadosVistaComponent', () => {
  let component: TercerosRelacionadosVistaComponent;
  let fixture: any;
  let tramiteStore: jest.Mocked<Tramite260214Store>;
  let tramiteQuery: jest.Mocked<Tramite260214Query>;
  let tercerosService: jest.Mocked<TercerosRelacionadosFebService>;

  beforeEach(async () => {
    tramiteStore = {
      updateFabricanteTablaDatos: jest.fn(() => of()),
      updateDestinatarioFinalTablaDatos: jest.fn(() => of()),
      updateProveedorTablaDatos: jest.fn(() => of()),
      updateFacturadorTablaDatos: jest.fn(() => of()),
      fabricanteTablaModificaDatos: jest.fn(() => of()),
      destinatarioFinalTablaModificaDatos: jest.fn(() => of()),
      proveedorTablaModificaDatos: jest.fn(() => of()),
      facturadorTablaModificaDatos: jest.fn(() => of()),
    } as any;

    tramiteQuery = {
      getFabricanteTablaDatos$: of([]),
      getDestinatarioFinalTablaDatos$: of([]),
      getProveedorTablaDatos$: of([]),
      getFacturadorTablaDatos$: of([]),
    } as any;

    tercerosService = {
      getFabricanteTablaDatos: jest.fn(() => of([])),
      getDestinatarioTablaDatos: jest.fn(() => of([])),
      getProveedorTablaDatos: jest.fn(() => of([])),
      getFacturadorTablaDatos: jest.fn(() => of([])),
      getFabricanteTablaDatos$: jest.fn(() => of([])),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosVistaComponent,
        CommonModule,
        TercerosRelacionadosComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Tramite260214Store, useValue: tramiteStore },
        { provide: Tramite260214Query, useValue: tramiteQuery },
        { provide: TercerosRelacionadosFebService, useValue: tercerosService },
        {
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({}),
          snapshot: { paramMap: { get: () => null } },
        },
      },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosVistaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and set fabricanteTablaDatos', () => {
    const fabricantes: Fabricante[] = [];
    tramiteQuery.getFabricanteTablaDatos$ = of(fabricantes);
    tramiteQuery.getDestinatarioFinalTablaDatos$ = of([]);
    tramiteQuery.getProveedorTablaDatos$ = of([]);
    tramiteQuery.getFacturadorTablaDatos$ = of([]);
    component.ngOnInit();
    expect(component.fabricanteTablaDatos).toEqual(fabricantes);
  });

  it('should subscribe and set destinatarioFinalTablaDatos', () => {
    const destinatarios: Destinatario[] = [];
    tramiteQuery.getFabricanteTablaDatos$ = of([]);
    tramiteQuery.getDestinatarioFinalTablaDatos$ = of(destinatarios);
    tramiteQuery.getProveedorTablaDatos$ = of([]);
    tramiteQuery.getFacturadorTablaDatos$ = of([]);
    component.ngOnInit();
    expect(component.destinatarioFinalTablaDatos).toEqual(destinatarios);
  });

  it('should subscribe and set proveedorTablaDatos', () => {
    const proveedores: Proveedor[] = [];
    tramiteQuery.getFabricanteTablaDatos$ = of([]);
    tramiteQuery.getDestinatarioFinalTablaDatos$ = of([]);
    tramiteQuery.getProveedorTablaDatos$ = of(proveedores);
    tramiteQuery.getFacturadorTablaDatos$ = of([]);
    component.ngOnInit();
    expect(component.proveedorTablaDatos).toEqual(proveedores);
  });

  it('should subscribe and set facturadorTablaDatos', () => {
    const facturadores: Facturador[] = [];
    tramiteQuery.getFabricanteTablaDatos$ = of([]);
    tramiteQuery.getDestinatarioFinalTablaDatos$ = of([]);
    tramiteQuery.getProveedorTablaDatos$ = of([]);
    tramiteQuery.getFacturadorTablaDatos$ = of(facturadores);
    component.ngOnInit();
    expect(component.facturadorTablaDatos).toEqual(facturadores);
  });

  it('should call addFabricantes with response', () => {
    const fabricantes: Fabricante[] = [];
    tercerosService.getFabricanteTablaDatos.mockReturnValue(of(fabricantes));
    const spy = jest.spyOn(component, 'addFabricantes');
    component.loadData();
    expect(spy).toHaveBeenCalledWith(fabricantes);
  });

  it('should call addDestinatarios with response', () => {
    const destinatarios: Destinatario[] = [];
    tercerosService.getDestinatarioTablaDatos.mockReturnValue(
      of(destinatarios)
    );
    const spy = jest.spyOn(component, 'addDestinatarios');
    component.loadData();
    expect(spy).toHaveBeenCalledWith(destinatarios);
  });

  it('should call addProveedores with response', () => {
    const proveedores: Proveedor[] = [];
    tercerosService.getProveedorTablaDatos.mockReturnValue(of(proveedores));
    const spy = jest.spyOn(component, 'addProveedores');
    component.loadData();
    expect(spy).toHaveBeenCalledWith(proveedores);
  });

  it('should call addFacturadores with response', () => {
    const facturadores: Facturador[] = [];
    tercerosService.getFacturadorTablaDatos.mockReturnValue(of(facturadores));
    const spy = jest.spyOn(component, 'addFacturadores');
    component.loadData();
    expect(spy).toHaveBeenCalledWith(facturadores);
  });

  it('addFabricantes should call tramiteStore.updateFabricanteTablaDatos', () => {
    const fabricantes: Fabricante[] = [];
    component.addFabricantes(fabricantes);
    expect(tramiteStore.updateFabricanteTablaDatos).toHaveBeenCalledWith(
      fabricantes
    );
  });

  it('addDestinatarios should call tramiteStore.updateDestinatarioFinalTablaDatos', () => {
    const destinatarios: Destinatario[] = [];
    component.addDestinatarios(destinatarios);
    expect(tramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(
      destinatarios
    );
  });

  it('addProveedores should call tramiteStore.updateProveedorTablaDatos', () => {
    const proveedores: Proveedor[] = [];
    component.addProveedores(proveedores);
    expect(tramiteStore.updateProveedorTablaDatos).toHaveBeenCalledWith(
      proveedores
    );
  });

  it('addFacturadores should call tramiteStore.updateFacturadorTablaDatos', () => {
    const facturadores: Facturador[] = [];
    component.addFacturadores(facturadores);
    expect(tramiteStore.updateFacturadorTablaDatos).toHaveBeenCalledWith(
      facturadores
    );
  });

  it('fabricanteEventoModificar should call tramiteStore.fabricanteTablaModificaDatos', () => {
    const fabricantes: Fabricante[] = [];
    component.fabricanteEventoModificar(fabricantes);
    expect(tramiteStore.fabricanteTablaModificaDatos).toHaveBeenCalledWith(
      fabricantes
    );
  });

  it('destinatarioEventoModificar should call tramiteStore.destinatarioFinalTablaModificaDatos', () => {
    const destinatarios: Destinatario[] = [];
    component.destinatarioEventoModificar(destinatarios);
    expect(
      tramiteStore.destinatarioFinalTablaModificaDatos
    ).toHaveBeenCalledWith(destinatarios);
  });

  it('proveedorEventoModificar should call tramiteStore.proveedorTablaModificaDatos', () => {
    const proveedores: Proveedor[] = [];
    component.proveedorEventoModificar(proveedores);
    expect(tramiteStore.proveedorTablaModificaDatos).toHaveBeenCalledWith(
      proveedores
    );
  });

  it('facturadorEventoModificar should call tramiteStore.facturadorTablaModificaDatos', () => {
    const facturadores: Facturador[] = [];
    component.facturadorEventoModificar(facturadores);
    expect(tramiteStore.facturadorTablaModificaDatos).toHaveBeenCalledWith(
      facturadores
    );
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroy$ = (component as any).destroy$ as Subject<void>;
    const nextSpy = jest.spyOn(destroy$, 'next');
    const completeSpy = jest.spyOn(destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
