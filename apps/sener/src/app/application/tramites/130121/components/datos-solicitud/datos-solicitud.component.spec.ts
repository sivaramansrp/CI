import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { PermisoDeHidrocarburosService } from '../../services/permiso-de-hidrocarburos.service';
import { Tramite130121Store } from '../../estados/tramites/tramites130121.store';
import { Tramite130121Query } from '../../estados/queries/tramite130121.query';
import { PaisDeOrigenComponent } from '../../../../shared/components/pais-de-origen/pais-de-origen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;  
  let permisodehidrocarburosServiceMock: any;
   let tramiteStoreMock: any;
  let tramiteQueryMock: any;

    beforeEach(async () => {
      permisodehidrocarburosServiceMock = {
        getSolicitudeOptions: jest.fn().mockReturnValue(of({ options: [] })),
        getProductoOptions: jest.fn().mockReturnValue(of({ options: [] })),
        getTablaDatos: jest.fn().mockReturnValue(of([{ cantidad: 10, totalUSD: 100 }])),
        getEstado: jest.fn().mockReturnValue(of([])),
        getRepresentacionFederal: jest.fn().mockReturnValue(of([])),
        getListaDePaisesDisponibles: jest.fn().mockReturnValue(of([])),
        obtenerListaDeCiudades: jest.fn().mockReturnValue(of([])),
        getPaisesPorBloque: jest.fn().mockReturnValue(of([])),
      };
  
      tramiteStoreMock = {
        establecerDatos: jest.fn(),
        storeTableValues: jest.fn(),
        setMostrarTabla: jest.fn(),
      };
  
      tramiteQueryMock = {
        selectSolicitud$: of({}),
        mostrarTabla$: of(false),
      };
  
      await TestBed.configureTestingModule({
        declarations: [DatosSolicitudComponent],
        imports: [ReactiveFormsModule,
           PaisDeOrigenComponent,
           HttpClientTestingModule,
           DatosDelTramiteComponent],
        providers: [
          FormBuilder,
          { provide: PermisoDeHidrocarburosService, useValue: permisodehidrocarburosServiceMock },
          { provide: Tramite130121Store, useValue: tramiteStoreMock },
          { provide: Tramite130121Query, useValue: tramiteQueryMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA] 
      }).compileComponents();
    });

   beforeEach(() => {
     fixture = TestBed.createComponent(DatosSolicitudComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    const spyInitForms = jest.spyOn(component, 'inicializarFormularios');
    component.ngOnInit();
    expect(spyInitForms).toHaveBeenCalled();
  });

  it('should call opcionesDeBusqueda on ngOnInit', () => {
    const spyOpcionesDeBusqueda = jest.spyOn(component, 'opcionesDeBusqueda');
    component.ngOnInit();
    expect(spyOpcionesDeBusqueda).toHaveBeenCalled();
  });

  it('should fetch table data and update formForTotalCount', () => {
    component.obtenerTablaDatos();
    expect(permisodehidrocarburosServiceMock.getTablaDatos).toHaveBeenCalled();
    expect(component.tableBodyData).toEqual([{ cantidad: 10, totalUSD: 100 }]);
    expect(component.formForTotalCount.value).toEqual({
      cantidadTotal: 10,
      valorTotalUSD: 100,
    });
  });

  it('should handle store updates for setFraccion', () => {
    const form = new FormBuilder().group({ fraccion: [1], umt: [''] });
    component.mercanciaCatalogoArray = [[{ id: 1, descripcion: 'Sample Description', relacionadaUmtId: 2 }]];
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');

    component.handleStoreUpdate({ form, campo: 'fraccion', metodoNombre: 'setFraccion' });

    expect(spySetValoresStore).toHaveBeenCalledWith(form, 'fraccion');
    expect(form.value.umt).toBe(2);
  });

  it('should handle store updates for setNico', () => {
    const form = new FormBuilder().group({ fraccion: [1], descripcionNico: [''] });
    component.mercanciaCatalogoArray = [[{ id: 1, descripcion: 'Test Descripción' }]];
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');

    component.handleStoreUpdate({ form, campo: 'nico', metodoNombre: 'setNico' });

    expect(spySetValoresStore).toHaveBeenCalledWith(form, 'nico');
    expect(form.value.descripcionNico).toBe('Test Descripción');
  });

  it('should validate and show/hide table based on form validity', () => {
    component['fb'] = new FormBuilder();
    component.partidasDelaMercanciaForm = component['fb'].group({
      cantidadModificar: ['', Validators.required],
    });

    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(false);

    component.partidasDelaMercanciaForm.patchValue({ cantidadModificar: '10' });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should fetch countries by block and update selectRangoDias', () => {
    const mockData = [{ descripcion: 'Country 1' }, { descripcion: 'Country 2' }];
    permisodehidrocarburosServiceMock.getPaisesPorBloque.mockReturnValue(of(mockData));

    component.fetchPaisesPorBloque(1);
    expect(permisodehidrocarburosServiceMock.getPaisesPorBloque).toHaveBeenCalledWith(1);
    expect(component.paisesPorBloque).toEqual(mockData);
    expect(component.selectRangoDias).toEqual(['Country 1', 'Country 2']);
  });

  it('should set values in the store', () => {
    const form = new FormBuilder().group({ campo: ['value'] });
    component.setValoresStore(form, 'campo');
    expect(tramiteStoreMock.establecerDatos).toHaveBeenCalledWith({ campo: 'value' });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});