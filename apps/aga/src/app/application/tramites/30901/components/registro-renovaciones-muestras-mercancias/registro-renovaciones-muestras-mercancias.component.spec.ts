import { AlertComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ImportanteCatalogoSeleccion } from '../../models/registro-muestras-mercancias.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroRenovacionesMuestrasMercanciasComponent } from './registro-renovaciones-muestras-mercancias.component';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('RegistroRenovacionesMuestrasMercanciasComponent', () => {
  let component: RegistroRenovacionesMuestrasMercanciasComponent;
  let fixture: ComponentFixture<RegistroRenovacionesMuestrasMercanciasComponent>;
  let renovacionesService: jest.Mocked<RenovacionesMuestrasMercanciasService>;

  const MOCKIMPORTANTECATALOGOSELECCION: ImportanteCatalogoSeleccion = {
    importadorExportadorPrevio: {
      labelNombre:
        '¿Se han realizado previamente importaciones o exportaciones?',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: 'Sí' },
        { id: 0, descripcion: 'No' },
      ],
    },
    fraccionArancelariaAga: {
      labelNombre: 'Fracción arancelaria',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: '01022901' },
        { id: 2, descripcion: '01022902' },
      ],
    },
    nico: {
      labelNombre: 'Nico',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: '01' },
        { id: 2, descripcion: '02' },
      ],
    },
    ideGenerica: {
      labelNombre: 'Estado físico',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [{ id: 1, descripcion: 'Gaseoso' }],
    },
    tomaMuestraDespacho: {
      labelNombre: '¿Producto previamente inscrito?',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: 'Sí' },
        { id: 0, descripcion: 'No' },
      ],
    },
    requisitosObligatoriosTabla: { tableHeader: [], tableBody: [] },
    tablaDeTarifasDePago: { tableHeader: [], tableBody: [] },
  };

  beforeEach(async () => {
    const RENOVACIONESSERVICEMOCK = {
      obtenerOpcionesDesplegables: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        AlertComponent,
        CatalogoSelectComponent,
        TituloComponent,
      ],
      declarations: [RegistroRenovacionesMuestrasMercanciasComponent],
      providers: [
        FormBuilder,
        {
          provide: RenovacionesMuestrasMercanciasService,
          useValue: RENOVACIONESSERVICEMOCK,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RegistroRenovacionesMuestrasMercanciasComponent
    );
    component = fixture.componentInstance;
    renovacionesService = TestBed.inject(
      RenovacionesMuestrasMercanciasService
    ) as jest.Mocked<RenovacionesMuestrasMercanciasService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form and call getOpcionImportador', () => {
      jest.spyOn(component, 'getOpcionImportador');
      component.ngOnInit();
      expect(component.formRegistroMuestras).toBeDefined();
      expect(
        component.formRegistroMuestras.get('opcionDeImportador')
      ).toBeTruthy();
      expect(component.getOpcionImportador).toHaveBeenCalled();
    });
  });

  describe('getOpcionImportador', () => {
    it('should set options from service response', () => {
      renovacionesService.obtenerOpcionesDesplegables.mockReturnValue(
        of(MOCKIMPORTANTECATALOGOSELECCION)
      );
      component.getOpcionImportador();

      expect(component.opcionDeImportador).toEqual(
        MOCKIMPORTANTECATALOGOSELECCION.importadorExportadorPrevio
      );
      expect(component.fraccionArancelariaAga).toEqual(
        MOCKIMPORTANTECATALOGOSELECCION.fraccionArancelariaAga
      );
      expect(component.nico).toEqual(MOCKIMPORTANTECATALOGOSELECCION.nico);
      expect(component.ideGenerica).toEqual(
        MOCKIMPORTANTECATALOGOSELECCION.ideGenerica
      );
      expect(component.tomaMuestraDespacho).toEqual(
        MOCKIMPORTANTECATALOGOSELECCION.tomaMuestraDespacho
      );
    });
  });

  describe('mostrarDescFraccArancelaria', () => {
    it('should update form values when description contains " - "', () => {
      component.ngOnInit();
      const CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1234 - Descripción completa',
      };
      component.mostrarDescFraccArancelaria(CATALOGO);

      expect(
        component.formRegistroMuestras.get('fraccionConcatenada')?.value
      ).toBe('1234 - Descripción completa');
      expect(
        component.formRegistroMuestras.get('fracciondescripcion')?.value
      ).toBe('Descripción completa');
    });

    it('should update form values with empty description if split does not produce 2 parts', () => {
      component.ngOnInit();
      const CATALOGO: Catalogo = { id: 1, descripcion: '1234' };
      component.mostrarDescFraccArancelaria(CATALOGO);

      expect(
        component.formRegistroMuestras.get('fraccionConcatenada')?.value
      ).toBe('1234');
      expect(
        component.formRegistroMuestras.get('fracciondescripcion')?.value
      ).toBe('');
    });

    it('should do nothing if catalogo is null or undefined', () => {
      component.ngOnInit();
      component.mostrarDescFraccArancelaria({
        descripcion: '01022901',
        id: 1,
      });
      // Se espera que no se modifiquen los valores del formulario
      expect(
        component.formRegistroMuestras.get('fraccionConcatenada')?.value
      ).toBeFalsy();
      expect(
        component.formRegistroMuestras.get('fracciondescripcion')?.value
      ).toBeFalsy();
    });
  });

  describe('mostrarOcultarPanelTramite', () => {
    it('should set panelDespachoOrMercancia to true if event id is 1', () => {
      const CATALOGO: Catalogo = { id: 1, descripcion: 'Sí' };
      component.mostrarOcultarPanelTramite(CATALOGO);
      expect(component.panelDespachoOrMercancia).toBe(true);
    });

    it('should set panelDespachoOrMercancia to false if event id is not 1', () => {
      const CATALOGO: Catalogo = { id: 0, descripcion: 'No' };
      component.mostrarOcultarPanelTramite(CATALOGO);
      expect(component.panelDespachoOrMercancia).toBe(false);

      CATALOGO.id = 2;
      component.mostrarOcultarPanelTramite(CATALOGO);
      expect(component.panelDespachoOrMercancia).toBe(false);
    });
  });

  describe('cambiaEstadoMotivo', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should enable descMotivoFaltaMuestra if event id is 1', () => {
      const CATALOGO: Catalogo = { id: 1, descripcion: 'Sí' };
      component.cambiaEstadoMotivo(CATALOGO);
      expect(
        component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled
      ).toBe(true);
    });

    it('should disable and clear descMotivoFaltaMuestra if event id is 0', () => {
      // Primero se habilita para verificar que se limpia
      component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
      component.formRegistroMuestras.patchValue({
        descMotivoFaltaMuestra: 'Valor inicial',
      });

      const CATALOGO: Catalogo = { id: 0, descripcion: 'No' };
      component.cambiaEstadoMotivo(CATALOGO);
      expect(
        component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled
      ).toBe(false);
      expect(
        component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.value
      ).toBe('');
    });

    it('should disable descMotivoFaltaMuestra for any other event id', () => {
      // Primero se habilita para luego deshabilitar
      component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
      const CATALOGO: Catalogo = { id: 2, descripcion: 'Otro' };
      component.cambiaEstadoMotivo(CATALOGO);
      expect(
        component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled
      ).toBe(false);
    });
  });
});
