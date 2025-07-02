import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TercerosRelacionadosFebService } from '../../services/tereceros-relacionados-feb.service';
import { AlertComponent, ConsultaioQuery, NotificacionesComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let routerMock: any;
  let activatedRouteMock: any;
  let tercerosServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jest.fn() };
    activatedRouteMock = {};
    tercerosServiceMock = {
      getFabricanteTablaDatos: jest.fn().mockReturnValue(of([])),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosComponent,
        ReactiveFormsModule,
        CommonModule,
          TituloComponent,
          TablaDinamicaComponent,
          AlertComponent,
          NotificacionesComponent,
          HttpClientTestingModule,
        ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TercerosRelacionadosFebService, useValue: tercerosServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    component.elementosRequeridos = ['campo1', 'campo2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('esCampoRequerido', () => {
    it('should return true if campo is required', () => {
      expect(component.esCampoRequerido('campo1')).toBe(true);
    });

    it('should return false if campo is not required', () => {
      expect(component.esCampoRequerido('otroCampo')).toBe(false);
    });

    it('should return false if elementosRequeridos is undefined', () => {
      component.elementosRequeridos = undefined as any;
      expect(component.esCampoRequerido('campo1')).toBe(false);
    });
  });

  describe('modificarFabricante', () => {
    it('should show alert if no fabricante selected', () => {
      component.fabricanteSeleccionadoDatos = [];
      component.modificarFabricante();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should emit event and navigate if fabricante selected', () => {
      const emitSpy = jest.spyOn(component.fabricanteEventoModificar, 'emit');
      component.fabricanteSeleccionadoDatos = [{ rfc: '123' } as any];
      component.modificarFabricante();
      expect(emitSpy).toHaveBeenCalledWith(component.fabricanteSeleccionadoDatos);
      expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-fabricante'], { relativeTo: activatedRouteMock });
    });
  });

  describe('modificarDestinatario', () => {
    it('should show alert if no destinatario selected', () => {
      component.destinatarioSeleccionadoDatos = [];
      component.modificarDestinatario();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should emit event and navigate if destinatario selected', () => {
      const emitSpy = jest.spyOn(component.destinatarioEventoModificar, 'emit');
      component.destinatarioSeleccionadoDatos = [{ rfc: 'abc' } as any];
      component.modificarDestinatario();
      expect(emitSpy).toHaveBeenCalledWith(component.destinatarioSeleccionadoDatos);
      expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-destinatario-final'], { relativeTo: activatedRouteMock });
    });
  });

  describe('modificarProveedor', () => {
    it('should show alert if no proveedor selected', () => {
      component.proveedorSeleccionadoDatos = [];
      component.modificarProveedor();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should emit event and navigate if proveedor selected', () => {
      const emitSpy = jest.spyOn(component.proveedorEventoModificar, 'emit');
      component.proveedorSeleccionadoDatos = [{ rfc: 'prov' } as any];
      component.modificarProveedor();
      expect(emitSpy).toHaveBeenCalledWith(component.proveedorSeleccionadoDatos);
      expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-proveedor'], { relativeTo: activatedRouteMock });
    });
  });

  describe('modificarFacturador', () => {
    it('should show alert if no facturador selected', () => {
      component.facturadorSeleccionadoDatos = [];
      component.modificarFacturador();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should emit event and navigate if facturador selected', () => {
      const emitSpy = jest.spyOn(component.facturadorEventoModificar, 'emit');
      component.facturadorSeleccionadoDatos = [{ rfc: 'fact' } as any];
      component.modificarFacturador();
      expect(emitSpy).toHaveBeenCalledWith(component.facturadorSeleccionadoDatos);
      expect(routerMock.navigate).toHaveBeenCalledWith(['../agregar-facturador'], { relativeTo: activatedRouteMock });
    });
  });

  describe('eliminarFabricante', () => {
    it('should show alert if no fabricante selected', () => {
      component.fabricanteSeleccionadoDatos = [];
      component.eliminarFabricante();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should filter and emit fabricanteEliminar', () => {
      const emitSpy = jest.spyOn(component.fabricanteEliminar, 'emit');
      component.fabricanteTablaDatos = [
        { rfc: '1' } as any,
        { rfc: '2' } as any,
      ];
      component.fabricanteSeleccionadoDatos = [{ rfc: '1' } as any];
      component.eliminarFabricante();
      expect(component.fabricanteTablaDatos).toEqual([{ rfc: '2' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ rfc: '2' }]);
    });
  });

  describe('eliminarDestinatario', () => {
    it('should show alert if no destinatario selected', () => {
      component.destinatarioSeleccionadoDatos = [];
      component.eliminarDestinatario();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should filter and emit destinatarioEliminar', () => {
      const emitSpy = jest.spyOn(component.destinatarioEliminar, 'emit');
      component.destinatarioFinalTablaDatos = [
        { rfc: 'a' } as any,
        { rfc: 'b' } as any,
      ];
      component.destinatarioSeleccionadoDatos = [{ rfc: 'a' } as any];
      component.eliminarDestinatario();
      expect(component.destinatarioFinalTablaDatos).toEqual([{ rfc: 'b' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ rfc: 'b' }]);
    });
  });

  describe('eliminarProveedor', () => {
    it('should show alert if no proveedor selected', () => {
      component.proveedorSeleccionadoDatos = [];
      component.eliminarProveedor();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should filter and emit proveedorEliminar by nombreRazonSocial', () => {
      const emitSpy = jest.spyOn(component.proveedorEliminar, 'emit');
      component.proveedorTablaDatos = [
        { nombreRazonSocial: 'X', razonSocial: 'Y' } as any,
        { nombreRazonSocial: 'A', razonSocial: 'B' } as any,
      ];
      component.proveedorSeleccionadoDatos = [{ nombreRazonSocial: 'X', razonSocial: 'Y' } as any];
      component.eliminarProveedor();
      expect(component.proveedorTablaDatos).toEqual([{ nombreRazonSocial: 'A', razonSocial: 'B' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ nombreRazonSocial: 'A', razonSocial: 'B' }]);
    });

    it('should filter and emit proveedorEliminar by razonSocial if nombreRazonSocial empty', () => {
      const emitSpy = jest.spyOn(component.proveedorEliminar, 'emit');
      component.proveedorTablaDatos = [
        { nombreRazonSocial: '', razonSocial: 'Y' } as any,
        { nombreRazonSocial: '', razonSocial: 'B' } as any,
      ];
      component.proveedorSeleccionadoDatos = [{ nombreRazonSocial: '', razonSocial: 'Y' } as any];
      component.eliminarProveedor();
      expect(component.proveedorTablaDatos).toEqual([{ nombreRazonSocial: '', razonSocial: 'B' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ nombreRazonSocial: '', razonSocial: 'B' }]);
    });
  });

  describe('eliminarFacturador', () => {
    it('should show alert if no facturador selected', () => {
      component.facturadorSeleccionadoDatos = [];
      component.eliminarFacturador();
      expect(component.mostrarAlerta).toBe(true);
    });

    it('should filter and emit facturadorEliminar by nombreRazonSocial', () => {
      const emitSpy = jest.spyOn(component.facturadorEliminar, 'emit');
      component.facturadorTablaDatos = [
        { nombreRazonSocial: 'X', razonSocial: 'Y' } as any,
        { nombreRazonSocial: 'A', razonSocial: 'B' } as any,
      ];
      component.facturadorSeleccionadoDatos = [{ nombreRazonSocial: 'X', razonSocial: 'Y' } as any];
      component.eliminarFacturador();
      expect(component.facturadorTablaDatos).toEqual([{ nombreRazonSocial: 'A', razonSocial: 'B' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ nombreRazonSocial: 'A', razonSocial: 'B' }]);
    });

    it('should filter and emit facturadorEliminar by razonSocial if nombreRazonSocial empty', () => {
      const emitSpy = jest.spyOn(component.facturadorEliminar, 'emit');
      component.facturadorTablaDatos = [
        { nombreRazonSocial: '', razonSocial: 'Y' } as any,
        { nombreRazonSocial: '', razonSocial: 'B' } as any,
      ];
      component.facturadorSeleccionadoDatos = [{ nombreRazonSocial: '', razonSocial: 'Y' } as any];
      component.eliminarFacturador();
      expect(component.facturadorTablaDatos).toEqual([{ nombreRazonSocial: '', razonSocial: 'B' }]);
      expect(emitSpy).toHaveBeenCalledWith([{ nombreRazonSocial: '', razonSocial: 'B' }]);
    });
  });

  describe('ngOnInit', () => {
    it('should set habilitarFacturador and habilitarProveedor based on idProcedimiento', () => {
      component.idProcedimiento = 9999;
      (global as any).OCULTAR_FACTURADOR = [9999];
      (global as any).OCULTAR_PROVEEDOR = [8888];
      component.ngOnInit();
      expect(component.habilitarFacturador).toBe(false);
      expect(component.habilitarProveedor).toBe(true);
    });

    it('should subscribe to tercerosService and set table data', () => {
      const data = [{ rfc: 'test' }];
      tercerosServiceMock.getFabricanteTablaDatos = jest.fn().mockReturnValue(of(data));
      component.ngOnInit();
      expect(component.fabricanteTablaDatos).toEqual(data);
      expect(component.destinatarioFinalTablaDatos).toEqual(data);
      expect(component.proveedorTablaDatos).toEqual(data);
      expect(component.facturadorTablaDatos).toEqual(data);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroy$', () => {
      const destroy$ = (component as any).destroy$ as Subject<void>;
      const completeSpy = jest.spyOn(destroy$, 'complete');
      component.ngOnDestroy();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});