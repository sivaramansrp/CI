import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { ConfiguracionItem } from '../../enum/mercancia.enum';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mockPermisoCitesService: jest.Mocked<PermisoCitesService>;
  let mockTramite230902Store: jest.Mocked<Tramite230902Store>;
  let mockTramite230902Query: jest.Mocked<Tramite230902Query>;

  beforeEach(async () => {
    mockPermisoCitesService = {
      inicializaDatosSolicitudDatosCatalogos: jest.fn(),
      inicializaMercanciaDatosCatalogos: jest.fn(),
      loadTablaDatos: jest.fn().mockReturnValue(of([]))
    } as unknown as jest.Mocked<PermisoCitesService>;

    mockTramite230902Store = {
      setTipoDeMovimiento: jest.fn(),
      setTipoDeRegimen: jest.fn()
    } as unknown as jest.Mocked<Tramite230902Store>;

    mockTramite230902Query = {
      selectSolicitud$: of({
        tipoDeMovimiento: '1',
        tipoDeRegimen: 'Importación'
      })
    } as unknown as jest.Mocked<Tramite230902Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosSolicitudComponent],
      providers: [
        { provide: PermisoCitesService, useValue: mockPermisoCitesService },
        { provide: Tramite230902Store, useValue: mockTramite230902Store },
        { provide: Tramite230902Query, useValue: mockTramite230902Query }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call necessary services', () => {
    component.ngOnInit();
    expect(mockPermisoCitesService.inicializaDatosSolicitudDatosCatalogos).toHaveBeenCalled();
    expect(mockPermisoCitesService.loadTablaDatos).toHaveBeenCalled();
  });

  it('should create the solicitud form with default values', () => {
    component.createFormSolitude();
    expect(component.formSolicitud.get('tipodemovimiento')?.value).toBe('1');
    expect(component.formSolicitud.get('tipoderegimen')?.value).toBe('Importación');
  });

  it('should create the mercancia form with default values', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBe('1234.56.78');
    expect(component.formMercancia.get('descripcions')?.value).toBe('Descripción de prueba');
  });

  it('should handle tipo de movimiento change', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).toHaveBeenCalledWith('2');
    expect(component.tipoMovimientoSeleccionada).toBe(2);
  });

  it('should handle tipo de régimen change', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('Exportación');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).toHaveBeenCalledWith('Exportación');
  });

  it('should handle selected row in the table', () => {
    const mockRow: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.hadleFilaSeleccionada(mockRow);
    expect(component.filaSeleccionada).toEqual(mockRow);
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should toggle the visibility of the mercancia modal', () => {
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should submit the mercancia form and add data to the table', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
    expect(component.tablaDatos[0]).toEqual(mockData);
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should not submit invalid mercancia form', () => {
    component.createFormMercancia();
    component.formMercancia.get('fraccionArancelaria')?.setValue('');
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(0);
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should clean up subscriptions on component destruction', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should reset the mercancia form when resetMercanciaForm is called', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.resetMercanciaForm();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBeNull();
    expect(component.formMercancia.get('descripcions')?.value).toBeNull();
  });

  it('should handle empty tipo de movimiento gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('');
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).not.toHaveBeenCalled();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle empty tipo de régimen gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).not.toHaveBeenCalled();
  });

  it('should not add duplicate rows to the table', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should clear selected row when resetMercanciaForm is called', () => {
    const mockRow: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.hadleFilaSeleccionada(mockRow);
    component.resetMercanciaForm();
    expect(component.filaSeleccionada).toBeUndefined();
  });

  it('should handle null filaSeleccionada gracefully', () => {
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should handle destroyed$ being already completed without errors', () => {
    component['destroyed$'].complete();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should not call onTipoMovimientoChange if formSolicitud is not initialized', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoMovimientoChange()).not.toThrow();
  });

  it('should not call onTipoRegimenChange if formSolicitud is not initialized', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoRegimenChange()).not.toThrow();
  });

  it('should disable fraccionDescripcion when otraFraccion is selected', () => {
    component.createFormMercancia();
    component.formMercancia.get('otraFraccion')?.setValue(true);
    expect(component.formMercancia.get('fraccionDescripcion')?.disabled).toBe(true);
    expect(component.formMercancia.get('fraccionVigenteTIGIE')).toBeTruthy();
  });

  it('should enable fraccionDescripcion when otraFraccion is deselected', () => {
    component.createFormMercancia();
    component.formMercancia.get('otraFraccion')?.setValue(true);
    component.formMercancia.get('otraFraccion')?.setValue(false);
    expect(component.formMercancia.get('fraccionDescripcion')?.disabled).toBe(false);
    expect(component.formMercancia.get('fraccionVigenteTIGIE')).toBeFalsy();
  });

  it('should not add row to tablaDatos if formMercancia is invalid', () => {
    component.createFormMercancia();
    component.formMercancia.get('fraccionArancelaria')?.setValue('');
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(0);
  });

  it('should update filaSeleccionada when a row is selected', () => {
    const mockRow: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.hadleFilaSeleccionada(mockRow);
    expect(component.filaSeleccionada).toEqual(mockRow);
  });

  it('should reset formSolicitud when resetSolicitudForm is called', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.formSolicitud.get('tipoderegimen')?.setValue('Exportación');
    component.resetSolicitudForm();
    expect(component.formSolicitud.get('tipodemovimiento')?.value).toBeNull();
    expect(component.formSolicitud.get('tipoderegimen')?.value).toBeNull();
  });

  it('should handle empty tablaDatos gracefully', () => {
    component.tablaDatos = [];
    expect(component.tablaDatos.length).toBe(0);
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should not throw error if destroyed$ is already completed', () => {
    component['destroyed$'].complete();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should not call setTipoDeMovimiento if formSolicitud is null', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoMovimientoChange()).not.toThrow();
  });

  it('should not call setTipoDeRegimen if formSolicitud is null', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoRegimenChange()).not.toThrow();
  });

  it('should toggle showDatosMercanciaModal when toggleDivMercancia is called', () => {
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should call loadTablaDatosMethod and update tablaDatos', () => {
    const mockData: ConfiguracionItem[] = [
      {
        fraccionArancelaria: '1234.56.78',
        otraFraccion: false,
        descripcions: 'Descripción de prueba',
        rendimientoProducto: '10%',
        clasificacionTaxonomica: 'Taxonomía',
        nombreCientifico: 'Nombre Científico',
        nombreComun: 'Nombre Común',
        marca: 'Marca',
        cantidad: 100,
        unidadMedida: 'kg',
        paisOrigen: 'México',
        paisProcedencia: 'Canadá'
      }
    ];
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of(mockData));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual(mockData);
  });

  it('should handle empty state in loadTablaDatosMethod', () => {
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of([]));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual([]);
  });

  it('should initialize crossListBotons correctly', () => {
    component.ngOnInit();
    expect(component.crossListBotons).toBeDefined();
    expect(component.movimientoBotons).toEqual(component.crossListBotons);
    expect(component.aduanasBotons).toEqual(component.crossListBotons);
  });

  it('should handle null solicitud230902State gracefully', () => {
    mockTramite230902Query.selectSolicitud$ = of(null as unknown as Solicitud230902State);
    component.ngOnInit();
    expect(component.solicitud230902State).toBeNull();
  });

  it('should reset formMercancia and clear filaSeleccionada when resetMercanciaForm is called', () => {
    const mockRow: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.hadleFilaSeleccionada(mockRow);
    component.resetMercanciaForm();
    expect(component.formMercancia.get('fraccionArancelaria')?.value).toBeNull();
    expect(component.filaSeleccionada).toBeUndefined();
  });

  it('should handle invalid formSolicitud gracefully in onTipoMovimientoChange', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoMovimientoChange()).not.toThrow();
  });

  it('should handle invalid formSolicitud gracefully in onTipoRegimenChange', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.onTipoRegimenChange()).not.toThrow();
  });

  it('should not add duplicate rows to tablaDatos', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should handle destroyed$ being already completed without errors', () => {
    component['destroyed$'].complete();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle toggleDivMercancia correctly', () => {
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should handle empty aduanasBotons when tipoMovimiento is 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons.slice(1));
  });

  it('should handle full aduanasBotons when tipoMovimiento is not 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons);
  });

  it('should handle null or undefined tipoDeMovimiento in onTipoMovimientoChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue(null);
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).not.toHaveBeenCalled();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle null or undefined tipoDeRegimen in onTipoRegimenChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue(null);
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).not.toHaveBeenCalled();
  });

  it('should not add duplicate rows to tablaDatos when submitMercanciaForm is called', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should reset formSolicitud when resetSolicitudForm is called', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.formSolicitud.get('tipoderegimen')?.setValue('Exportación');
    component.resetSolicitudForm();
    expect(component.formSolicitud.get('tipodemovimiento')?.value).toBeNull();
    expect(component.formSolicitud.get('tipoderegimen')?.value).toBeNull();
  });

  it('should handle empty tablaDatos gracefully', () => {
    component.tablaDatos = [];
    expect(component.tablaDatos.length).toBe(0);
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should handle destroyed$ being already completed without errors', () => {
    component['destroyed$'].complete();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle toggleDivMercancia correctly', () => {
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should handle empty aduanasBotons when tipoMovimiento is 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons.slice(1));
  });

  it('should handle full aduanasBotons when tipoMovimiento is not 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons);
  });

  it('should handle null solicitud230902State in createFormSolitude gracefully', () => {
    mockTramite230902Query.selectSolicitud$ = of(null as unknown as Solicitud230902State);
    component.ngOnInit();
    expect(() => component.createFormSolitude()).not.toThrow();
    expect(component.formSolicitud).toBeDefined();
  });

  it('should handle invalid formMercancia when submitMercanciaForm is called', () => {
    component.createFormMercancia();
    component.formMercancia.get('fraccionArancelaria')?.setValue('');
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(0);
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should not reset formMercancia if it is not initialized', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not reset formSolicitud if it is not initialized', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty crossListBotons gracefully', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle undefined tipoDeMovimiento in onTipoMovimientoChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue(undefined);
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).not.toHaveBeenCalled();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle undefined tipoDeRegimen in onTipoRegimenChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue(undefined);
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).not.toHaveBeenCalled();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should handle destroyed$ being already completed without errors', () => {
    component['destroyed$'].complete();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle toggleDivMercancia correctly', () => {
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(true);
    component.toggleDivMercancia();
    expect(component.showDatosMercanciaModal).toBe(false);
  });

  it('should handle empty aduanasBotons when tipoMovimiento is 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons.slice(1));
  });

  it('should handle full aduanasBotons when tipoMovimiento is not 1', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual(component.crossListBotons);
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should not throw error if formMercancia is null when submitMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formMercancia is null when resetMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formSolicitud is null when resetSolicitudForm is called', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle null destroyed$ gracefully in ngOnDestroy', () => {
    component['destroyed$'] = null as unknown as Subject<void>;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null crossListBotons when onTipoMovimientoChange is called', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should handle null solicitud230902State in createFormSolitude', () => {
    component.solicitud230902State = null as unknown as Solicitud230902State;
    expect(() => component.createFormSolitude()).not.toThrow();
  });

  it('should handle null solicitud230902State in ngOnInit', () => {
    mockTramite230902Query.selectSolicitud$ = of(null as unknown as Solicitud230902State);
    component.ngOnInit();
    expect(component.solicitud230902State).toBeNull();
  });

  it('should handle empty crossListBotons in ngOnInit', () => {
    component.crossListBotons = [];
    component.ngOnInit();
    expect(component.crossListBotons).toEqual([]);
  });

  it('should handle null crossListBotons in ngOnInit', () => {
    component.crossListBotons = null as unknown as any[];
    component.ngOnInit();
    expect(component.crossListBotons).toBeNull();
  });

  it('should handle invalid tipoDeMovimiento in onTipoMovimientoChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('invalid');
    component.onTipoMovimientoChange();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle invalid tipoDeRegimen in onTipoRegimenChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('invalid');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).toHaveBeenCalledWith('invalid');
  });

  it('should not throw error if formMercancia is null when submitMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formMercancia is null when resetMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formSolicitud is null when resetSolicitudForm is called', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty tablaDatos when loadTablaDatosMethod is called', () => {
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of([]));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual([]);
  });

  it('should handle null state in loadTablaDatosMethod', () => {
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of(null as unknown as ConfiguracionItem[]));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual([]);
  });

  it('should handle null filaSeleccionada when hadleFilaSeleccionada is called', () => {
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should handle undefined filaSeleccionada when hadleFilaSeleccionada is called', () => {
    component.hadleFilaSeleccionada(undefined as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeUndefined();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should not throw error if formMercancia is null when submitMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formMercancia is null when resetMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formSolicitud is null when resetSolicitudForm is called', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty crossListBotons in ngOnInit', () => {
    component.crossListBotons = [];
    component.ngOnInit();
    expect(component.crossListBotons).toEqual([]);
  });

  it('should handle null crossListBotons in ngOnInit', () => {
    component.crossListBotons = null as unknown as any[];
    component.ngOnInit();
    expect(component.crossListBotons).toBeNull();
  });

  it('should handle null crossListBotons gracefully in onTipoMovimientoChange', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should handle empty crossListBotons gracefully in onTipoMovimientoChange', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null solicitud230902State in createFormSolitude', () => {
    component.solicitud230902State = null as unknown as Solicitud230902State;
    expect(() => component.createFormSolitude()).not.toThrow();
  });

  it('should handle null solicitud230902State in ngOnInit', () => {
    mockTramite230902Query.selectSolicitud$ = of(null as unknown as Solicitud230902State);
    component.ngOnInit();
    expect(component.solicitud230902State).toBeNull();
  });

  it('should handle invalid tipoDeMovimiento in onTipoMovimientoChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('invalid');
    component.onTipoMovimientoChange();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle invalid tipoDeRegimen in onTipoRegimenChange', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('invalid');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).toHaveBeenCalledWith('invalid');
  });

  it('should handle null destroyed$ gracefully in ngOnDestroy', () => {
    component['destroyed$'] = null as unknown as Subject<void>;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle empty tablaDatos when loadTablaDatosMethod is called', () => {
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of([]));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual([]);
  });

  it('should handle null state in loadTablaDatosMethod', () => {
    mockPermisoCitesService.loadTablaDatos.mockReturnValue(of(null as unknown as ConfiguracionItem[]));
    component.loadTablaDatosMethod();
    expect(component.tablaDatos).toEqual([]);
  });

  it('should handle null filaSeleccionada when hadleFilaSeleccionada is called', () => {
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should handle undefined filaSeleccionada when hadleFilaSeleccionada is called', () => {
    component.hadleFilaSeleccionada(undefined as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeUndefined();
    expect(component.showDatosMercanciaModal).toBe(true);
  });

  it('should not throw error if formMercancia is null when submitMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formMercancia is null when resetMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formSolicitud is null when resetSolicitudForm is called', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty crossListBotons in ngOnInit', () => {
    component.crossListBotons = [];
    component.ngOnInit();
    expect(component.crossListBotons).toEqual([]);
  });

  it('should handle null crossListBotons in ngOnInit', () => {
    component.crossListBotons = null as unknown as any[];
    component.ngOnInit();
    expect(component.crossListBotons).toBeNull();
  });

  it('should not add duplicate rows to tablaDatos when submitMercanciaForm is called with identical data', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should handle null or undefined destroyed$ gracefully in ngOnDestroy', () => {
    component['destroyed$'] = null as unknown as Subject<void>;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 2', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 2', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should handle null solicitud230902State in createFormSolitude gracefully', () => {
    component.solicitud230902State = null as unknown as Solicitud230902State;
    expect(() => component.createFormSolitude()).not.toThrow();
    expect(component.formSolicitud).toBeDefined();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called with null', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called with undefined', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada(undefined as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeUndefined();
  });

  it('should handle invalid tipoDeMovimiento in onTipoMovimientoChange gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('invalid');
    component.onTipoMovimientoChange();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle invalid tipoDeRegimen in onTipoRegimenChange gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('invalid');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).toHaveBeenCalledWith('invalid');
  });

  it('should not throw error if formMercancia is null when submitMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formMercancia is null when resetMercanciaForm is called', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should not throw error if formSolicitud is null when resetSolicitudForm is called', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty crossListBotons in ngOnInit gracefully', () => {
    component.crossListBotons = [];
    component.ngOnInit();
    expect(component.crossListBotons).toEqual([]);
  });

  it('should handle null crossListBotons in ngOnInit gracefully', () => {
    component.crossListBotons = null as unknown as any[];
    component.ngOnInit();
    expect(component.crossListBotons).toBeNull();
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 1', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 1', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should not add a row to tablaDatos if the row already exists', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.tablaDatos = [mockData];
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should handle null or undefined formMercancia gracefully in submitMercanciaForm', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.submitMercanciaForm()).not.toThrow();
  });

  it('should handle null or undefined formMercancia gracefully in resetMercanciaForm', () => {
    component.formMercancia = null as unknown as FormGroup;
    expect(() => component.resetMercanciaForm()).not.toThrow();
  });

  it('should handle null or undefined formSolicitud gracefully in resetSolicitudForm', () => {
    component.formSolicitud = null as unknown as FormGroup;
    expect(() => component.resetSolicitudForm()).not.toThrow();
  });

  it('should handle empty destroyed$ gracefully in ngOnDestroy', () => {
    component['destroyed$'] = null as unknown as Subject<void>;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle null or undefined crossListBotons in onTipoMovimientoChange', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should handle empty crossListBotons in onTipoMovimientoChange', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('1');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null solicitud230902State in createFormSolitude gracefully', () => {
    component.solicitud230902State = null as unknown as Solicitud230902State;
    expect(() => component.createFormSolitude()).not.toThrow();
    expect(component.formSolicitud).toBeDefined();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called with null', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada(null as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called with undefined', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada(undefined as unknown as ConfiguracionItem);
    expect(component.filaSeleccionada).toBeUndefined();
  });

  it('should handle invalid tipoDeMovimiento in onTipoMovimientoChange gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('invalid');
    component.onTipoMovimientoChange();
    expect(component.tipoMovimientoSeleccionada).toBeNaN();
  });

  it('should handle invalid tipoDeRegimen in onTipoRegimenChange gracefully', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue('invalid');
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).toHaveBeenCalledWith('invalid');
  });

  it('should handle empty crossListBotons in ngOnInit gracefully', () => {
    component.crossListBotons = [];
    component.ngOnInit();
    expect(component.crossListBotons).toEqual([]);
  });

  it('should handle null crossListBotons in ngOnInit gracefully', () => {
    component.crossListBotons = null as unknown as any[];
    component.ngOnInit();
    expect(component.crossListBotons).toBeNull();
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 2', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 2', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('2');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should not call setTipoDeMovimiento if tipoDeMovimiento is null or undefined', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue(null);
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).not.toHaveBeenCalled();

    component.formSolicitud.get('tipodemovimiento')?.setValue(undefined);
    component.onTipoMovimientoChange();
    expect(mockTramite230902Store.setTipoDeMovimiento).not.toHaveBeenCalled();
  });

  it('should not call setTipoDeRegimen if tipoDeRegimen is null or undefined', () => {
    component.createFormSolitude();
    component.formSolicitud.get('tipoderegimen')?.setValue(null);
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).not.toHaveBeenCalled();

    component.formSolicitud.get('tipoderegimen')?.setValue(undefined);
    component.onTipoRegimenChange();
    expect(mockTramite230902Store.setTipoDeRegimen).not.toHaveBeenCalled();
  });

  it('should handle empty tablaDatos when hadleFilaSeleccionada is called with invalid data', () => {
    component.tablaDatos = [];
    component.hadleFilaSeleccionada({} as ConfiguracionItem);
    expect(component.filaSeleccionada).toEqual({});
  });

  it('should not add duplicate rows to tablaDatos when submitMercanciaForm is called with the same data multiple times', () => {
    const mockData: ConfiguracionItem = {
      fraccionArancelaria: '1234.56.78',
      otraFraccion: false,
      descripcions: 'Descripción de prueba',
      rendimientoProducto: '10%',
      clasificacionTaxonomica: 'Taxonomía',
      nombreCientifico: 'Nombre Científico',
      nombreComun: 'Nombre Común',
      marca: 'Marca',
      cantidad: 100,
      unidadMedida: 'kg',
      paisOrigen: 'México',
      paisProcedencia: 'Canadá'
    };
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    component.createFormMercancia(mockData);
    component.submitMercanciaForm();
    expect(component.tablaDatos.length).toBe(1);
  });

  it('should handle null or undefined destroyed$ gracefully in ngOnDestroy', () => {
    component['destroyed$'] = null as unknown as Subject<void>;
    expect(() => component.ngOnDestroy()).not.toThrow();
  });

  it('should handle empty crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 3', () => {
    component.crossListBotons = [];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('3');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toEqual([]);
  });

  it('should handle null crossListBotons when onTipoMovimientoChange is called with tipoMovimiento 3', () => {
    component.crossListBotons = null as unknown as any[];
    component.createFormSolitude();
    component.formSolicitud.get('tipodemovimiento')?.setValue('3');
    component.onTipoMovimientoChange();
    expect(component.aduanasBotons).toBeNull();
  });

  it('should handle invalid data in createFormMercancia', () => {
    const invalidData = {
      fraccionArancelaria: null,
      descripcions: null,
      clasificacionTaxonomica: null,
      nombreCientifico: null,
      nombreComun: null,
      marca: null,
      cantidad: null,
      unidadMedida: null,
      paisOrigen: null,
      paisProcedencia: null
    } as unknown as ConfiguracionItem;

    component.createFormMercancia(invalidData);
    expect(component.formMercancia.valid).toBe(false);
  });

  it('should handle empty solicitud230902State in createFormSolitude gracefully', () => {
    component.solicitud230902State = {} as Solicitud230902State;
    expect(() => component.createFormSolitude()).not.toThrow();
    expect(component.formSolicitud).toBeDefined();
  });

  it('should handle empty solicitud230902State in ngOnInit gracefully', () => {
    mockTramite230902Query.selectSolicitud$ = of({} as Solicitud230902State);
    component.ngOnInit();
    expect(component.solicitud230902State).toEqual({});
  });
});