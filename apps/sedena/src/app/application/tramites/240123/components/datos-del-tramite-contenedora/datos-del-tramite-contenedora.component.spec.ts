import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { Tramite240123Query } from '../../estados/tramite240123Query.query';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DatosDelTramiteFormState, MERCANCIA_ENCABEZADO_DE_TABLA, MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('DatosDelTramiteContenedoraComponent', () => {
  let component: DatosDelTramiteContenedoraComponent;
  let fixture: ComponentFixture<DatosDelTramiteContenedoraComponent>;
  let tramiteQueryMock: Partial<Tramite240123Query>;
  let tramiteStoreMock: Partial<Tramite240123Store>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  const MERCANCIA_TABLA = [
    {
      id: 1,
      fraccionArancelaria: '0101',
      descripcion: 'Descripción 1',
      descripcionFraccion: 'Descripción 1',
      unidadMedida: 'KG',
      unidadMedidaTarifa: 'KG',
      cantidad: 10,
      cantidadUMT: 10,
      valorComercial: 100,
      tipoMoneda: 'MXN',
    },
    {
      id: 2,
      fraccionArancelaria: '0102',
      descripcion: 'Descripción 2',
      descripcionFraccion: 'Descripción 2',
      unidadMedida: 'L',
      unidadMedidaTarifa: 'L',
      cantidad: 20,
      cantidadUMT: 20,
      valorComercial: 200,
      tipoMoneda: 'USD',
    },
  ];

  const DATOS_DEL_TRAMITE_FORM_STATE: DatosDelTramiteFormState = {
    permisoGeneral: '',
    usoFinal: '',
    aduanasSeleccionadas: [],
    paisDestino: '',
  };

  beforeEach(async () => {
    tramiteQueryMock = {
      getMercanciaTablaDatos$: of(MERCANCIA_TABLA.map(item => ({
        ...item,
        descripcionFraccion: item.descripcion,
        unidadMedidaTarifa: item.unidadMedida,
        cantidadUMT: item.cantidad,
      }))), 
      getDatosDelTramite$: of(DATOS_DEL_TRAMITE_FORM_STATE), 
    };

    tramiteStoreMock = {
      updateDatosDelTramiteFormState: jest.fn(),
    };

    activatedRouteMock = {};

    await TestBed.configureTestingModule({
      imports:[ CommonModule, TituloComponent, DatosDelTramiteContenedoraComponent ],
      providers: [
        { provide: Tramite240123Query, useValue: tramiteQueryMock },
        { provide: Tramite240123Store, useValue: tramiteStoreMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelTramiteContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las columnas seleccionadas correctamente', () => {
    expect(component.selectedColumns).toEqual([
      'Fracción arancelaria',
      'Descripción de la fracción',
      'Unidad de medida de tarifa (UMT)',
      'Cantidad en UMT',
      'Valor comercial',
      'Tipo moneda',
    ]);
  });

  it('debería filtrar las columnas de la tabla correctamente', () => {
    component.ngOnInit();
    const expectedColumns = MERCANCIA_ENCABEZADO_DE_TABLA.filter(col => 
      component.selectedColumns.includes(col.encabezado));
    expect(component.configuracionTablaFiltrada).toEqual(expectedColumns);
  });

  it('debería obtener correctamente los datos de mercancías', () => {
    component.ngOnInit();
    expect(component.datosMercanciaTabla.length).toBeGreaterThan(0);
    expect(component.datosMercanciaTabla).toEqual(MERCANCIA_TABLA);
  });

  it('debería obtener correctamente el estado del trámite', () => {
    component.ngOnInit();
    expect(component.datosDelTramiteFormState).toEqual(DATOS_DEL_TRAMITE_FORM_STATE);
  });

  it('debería liberar las suscripciones al destruir el componente', () => {
    const spy = jest.spyOn(component['unsubscribe$'], 'next');
    const spyComplete = jest.spyOn(component['unsubscribe$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('debería actualizar el estado del formulario en el store', () => {
    const newFormState: DatosDelTramiteFormState = {
      permisoGeneral: '',
      usoFinal: '',
      aduanasSeleccionadas: [],
      paisDestino: '',
    };
    component.updateDatosDelTramiteFormulario(newFormState);
    expect(tramiteStoreMock.updateDatosDelTramiteFormState).toHaveBeenCalledWith(newFormState);
  });

  it('debería inicializar correctamente los datos en ngOnInit', () => {
    component.ngOnInit();

    expect(component.datosMercanciaTabla).toEqual(MERCANCIA_TABLA);

    expect(component.datosDelTramiteFormState).toEqual(DATOS_DEL_TRAMITE_FORM_STATE);

    const expectedColumns = MERCANCIA_ENCABEZADO_DE_TABLA.filter(col => 
      component.selectedColumns.includes(col.encabezado));
    expect(component.configuracionTablaFiltrada).toEqual(expectedColumns);
  });
});
