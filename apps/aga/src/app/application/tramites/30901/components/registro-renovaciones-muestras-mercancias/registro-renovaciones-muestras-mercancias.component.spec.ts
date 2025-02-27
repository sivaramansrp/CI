import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormBuilder} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroRenovacionesMuestrasMercanciasComponent } from './registro-renovaciones-muestras-mercancias.component';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ImportanteCatalogoSeleccion, RenovacionesMuestrasMercanciasService, TituloComponent } from '@ng-mf/data-access-user';

fdescribe('RegistroRenovacionesMuestrasMercanciasComponent', () => {
  let component: RegistroRenovacionesMuestrasMercanciasComponent;
  let fixture: ComponentFixture<RegistroRenovacionesMuestrasMercanciasComponent>;
  let renovacionesService: jasmine.SpyObj<RenovacionesMuestrasMercanciasService>;

  const mockImportanteCatalogoSeleccion: ImportanteCatalogoSeleccion = {
    importadorExportadorPrevio: {
      labelNombre: '¿Se han realizado previamente importaciones o exportaciones?',
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
      catalogos: [
        { id: 1, descripcion: 'Gaseoso' },
      ],
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
    // Otros catálogos que se puedan agregar en el futuro
    requisitosObligatoriosTabla: { tableHeader: [], tableBody: [] },
    tablaDeTarifasDePago: { tableHeader: [], tableBody: [] },
  };

  beforeEach(async () => {
    const renovacionesServiceSpy = jasmine.createSpyObj('RenovacionesMuestrasMercanciasService', ['obtenerOpcionesDesplegables']);
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        AlertComponent,
        CatalogoSelectComponent,
        TituloComponent,
        RegistroRenovacionesMuestrasMercanciasComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: RenovacionesMuestrasMercanciasService, useValue: renovacionesServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroRenovacionesMuestrasMercanciasComponent);
    component = fixture.componentInstance;
    renovacionesService = TestBed.inject(RenovacionesMuestrasMercanciasService) as jasmine.SpyObj<RenovacionesMuestrasMercanciasService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form and call getOpcionImportador', () => {
      spyOn(component, 'getOpcionImportador');
      component.ngOnInit();
      expect(component.formRegistroMuestras).toBeDefined();
      expect(component.formRegistroMuestras.get('opcionDeImportador')).toBeTruthy();
      expect(component.getOpcionImportador).toHaveBeenCalled();
    });
  });

  describe('getOpcionImportador', () => {
    it('should set options from service response', () => {
      renovacionesService.obtenerOpcionesDesplegables.and.returnValue(of(mockImportanteCatalogoSeleccion));
      component.getOpcionImportador();

      expect(component.opcionDeImportador).toEqual(mockImportanteCatalogoSeleccion.importadorExportadorPrevio);
      expect(component.fraccionArancelariaAga).toEqual(mockImportanteCatalogoSeleccion.fraccionArancelariaAga);
      expect(component.nico).toEqual(mockImportanteCatalogoSeleccion.nico);
      expect(component.ideGenerica).toEqual(mockImportanteCatalogoSeleccion.ideGenerica);
      expect(component.tomaMuestraDespacho).toEqual(mockImportanteCatalogoSeleccion.tomaMuestraDespacho);
    });
  });

  describe('mostrarDescFraccArancelaria', () => {
    it('should update form values when description contains " - "', () => {
      component.ngOnInit();
      const catalogo: Catalogo = { id: 1, descripcion: '1234 - Descripción completa' };
      component.mostrarDescFraccArancelaria(catalogo);

      expect(component.formRegistroMuestras.get('fraccionConcatenada')?.value).toBe('1234 - Descripción completa');
      expect(component.formRegistroMuestras.get('fracciondescripcion')?.value).toBe('Descripción completa');
    });

    it('should update form values with empty description if split does not produce 2 parts', () => {
      component.ngOnInit();
      const catalogo: Catalogo = { id: 1, descripcion: '1234' };
      component.mostrarDescFraccArancelaria(catalogo);

      expect(component.formRegistroMuestras.get('fraccionConcatenada')?.value).toBe('1234');
      expect(component.formRegistroMuestras.get('fracciondescripcion')?.value).toBe('');
    });

    it('should do nothing if catalogo is null or undefined', () => {
      component.ngOnInit();
      // Se puede llamar con un valor falsy (null)
      component.mostrarDescFraccArancelaria(null);
      // Se espera que no se modifiquen los valores del formulario
      expect(component.formRegistroMuestras.get('fraccionConcatenada')?.value).toBeFalsy();
      expect(component.formRegistroMuestras.get('fracciondescripcion')?.value).toBeFalsy();
    });
  });

  describe('mostrarOcultarPanelTramite', () => {
    it('should set panelDespachoOrMercancia to true if event id is 1', () => {
      const catalogo: Catalogo = { id: 1, descripcion: 'Sí' };
      component.mostrarOcultarPanelTramite(catalogo);
      expect(component.panelDespachoOrMercancia).toBe(true);
    });

    it('should set panelDespachoOrMercancia to false if event id is not 1', () => {
      const catalogo: Catalogo = { id: 0, descripcion: 'No' };
      component.mostrarOcultarPanelTramite(catalogo);
      expect(component.panelDespachoOrMercancia).toBe(false);

      catalogo.id = 2;
      component.mostrarOcultarPanelTramite(catalogo);
      expect(component.panelDespachoOrMercancia).toBe(false);
    });
  });

  describe('cambiaEstadoMotivo', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should enable descMotivoFaltaMuestra if event id is 1', () => {
      const catalogo: Catalogo = { id: 1, descripcion: 'Sí' };
      component.cambiaEstadoMotivo(catalogo);
      expect(component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled).toBe(true);
    });

    it('should disable and clear descMotivoFaltaMuestra if event id is 0', () => {
      // Primero se habilita para verificar que se limpia
      component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
      component.formRegistroMuestras.patchValue({ descMotivoFaltaMuestra: 'Valor inicial' });

      const catalogo: Catalogo = { id: 0, descripcion: 'No' };
      component.cambiaEstadoMotivo(catalogo);
      expect(component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled).toBe(false);
      expect(component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.value).toBe('');
    });

    it('should disable descMotivoFaltaMuestra for any other event id', () => {
      // Primero se habilita para luego deshabilitar
      component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enable();
      const catalogo: Catalogo = { id: 2, descripcion: 'Otro' };
      component.cambiaEstadoMotivo(catalogo);
      expect(component.formRegistroMuestras.get('descMotivoFaltaMuestra')?.enabled).toBe(false);
    });
  });
});
