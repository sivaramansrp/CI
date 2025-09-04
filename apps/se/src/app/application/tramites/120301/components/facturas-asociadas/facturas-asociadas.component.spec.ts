import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FormularioAsociacionFacturaComponent } from './facturas-asociadas.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { TextilesState } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { CapturarColumns, AsociadasTableColumns } from '../../models/elegibilidad-de-textiles.model';

const seccionStateStub = {
  seccion: [],
  formaValida: [],
};

const fullTextilesStateStub: TextilesState = {
  SolicitudState: {
    flexRadioRegistro: 'Option1',
    estado: 'Estado Falso',
    representacionFederal: 'Representation',
    fraccionArancelaria: '1234.56.78',
    descripcionProducto: 'Producto de prueba',
    tratado: 'Tratado de prueba',
    subproducto: 'Subproducto de prueba',
    mecanismo: 'Mecanismo de prueba',
    typoCategoria: 'Categoria de prueba',
    typoRegimen: 'Regimen de prueba',
    descripcionCategoriaTextil: 'Descripción de categoría',
    pais: 'Pais Falso',
    unidadMedidaCategoriaTextil: '',
    factorConversionCategoriaTextil: '',
    fechaInicioVigencia: '',
    fechaFinVigencia: ''
  },
  numeroFactura: 'NF123',
  cantidadTotal: '200',
  unidadDeMedida: 'm2',
  fechaInicioInput: '2023-01-01',
  valorDolares: '1000',
  taxId: 'TAX123',
  razonSocial: 'Empresa XYZ',
  calle: 'Calle Falsa 123',
  ciudad: 'Ciudad Falsa',
  cp: '12345',
  PaisDestino: 'Pais de destino',
  unidadMedidaCategoriaTextil: 'Unidad de medida textil',
  factorConversionCategoriaTextil: '1.5',
  fechaInicioVigencia: '2023-01-01',
  fechaFinVigencia: '2023-12-31',
  cantidadFacturas: '5',
  exportadorFabricanteMismo: 'false',
  numeroRegistroFiscal: '',
  tipo: '',
  cantidadTotalImportador: '0',
  razonSocialImportador: '',
  domicilio: '',
  ciudadImportador: '',
  cpImportador: '',
  PaisImportador: '',
  formaValida: [],
  metrosCuadradosEquivalentes: 50,
  cantidadFacturasTotal: 100,
  anoDeLaConstancia: '',
  numeroDeLaConstancia: '',
  datosTablaConstanciaDelRegistro: [],
  guardarBandera: false,
  pais: '',
  flexRadioRegistro: '',
  estado: '',
  representacionFederal: '',
  fraccionArancelaria: '',
  descripcionProducto: '',
  tratado: '',
  subproducto: '',
  mecanismo: '',
  typoCategoria: '',
  typoRegimen: '',
  descripcionCategoriaTextil: ''
};

describe('FormularioAsociacionFacturaComponent', () => {
  let component: FormularioAsociacionFacturaComponent;
  let fixture: ComponentFixture<FormularioAsociacionFacturaComponent>;

  let storeMock: Partial<ElegibilidadDeTextilesStore>;
  let queryMock: Partial<ElegibilidadDeTextilesQuery>;
  let seccionStoreMock: Partial<SeccionLibStore>;
  let seccionQueryMock: Partial<SeccionLibQuery>;
  let serviceMock: Partial<ElegibilidadTextilesService>;

  beforeEach(async () => {
    storeMock = {
      setFormaValida: jest.fn(),
    };
    queryMock = {
      selectTextile$: of({
        ...fullTextilesStateStub,
        formaValida: [],
      }),
    };
    seccionStoreMock = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    };
    seccionQueryMock = {
      selectSeccionState$: of(seccionStateStub),
    };
    serviceMock = {
      obtenerTablaDatos: jest.fn().mockImplementation((url: string) => {
        if (url === 'facturasDisponible.json') {
          const facturasDisponible: CapturarColumns[] = [
            {
              numeroDeLaFactura: 'F1',
              razonSocial: 'RS1',
              domicilio: 'D1',
              fechaExpedicionFactura: '2024-01-01',
              cantidadTotal: '100',
              cantidadDisponible: '80',
              unidadMedida: 'm2',
              valorDolares: '500',
            },
            {
              numeroDeLaFactura: 'F2',
              razonSocial: 'RS2',
              domicilio: 'D2',
              fechaExpedicionFactura: '2024-01-02',
              cantidadTotal: '200',
              cantidadDisponible: '150',
              unidadMedida: 'kg',
              valorDolares: '1000',
            },
          ];
          return of(facturasDisponible);
        }
        if (url === 'facturas-asociadas.json') {
          const facturasAsociadas: AsociadasTableColumns[] = [
            {
              candidadAsociada: '10',
              numeroDeLaFactura: 'FA1',
              razonSocial: 'RS3',
              domicilio: 'D3',
              fechaExpedicionFactura: '2024-01-03',
              cantidadTotal: '50',
              cantidadDisponible: '40',
              unidadMedida: 'm2',
              valorDolares: '250',
            },
          ];
          return of(facturasAsociadas);
        }
        return of([]);
      }),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormularioAsociacionFacturaComponent],
      providers: [
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useValue: storeMock },
        { provide: ElegibilidadDeTextilesQuery, useValue: queryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock },
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: ElegibilidadTextilesService, useValue: serviceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAsociacionFacturaComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores del store en ngOnInit y llamar métodos del store', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.formularioAsociacionFactura).toBeTruthy();

    expect(component.formularioAsociacionFactura.get('cantidadFacturas')?.value).toBe('5');
    expect(component.formularioAsociacionFactura.get('cantidadFacturasTotal')?.value).toBe(100);
    expect(component.formularioAsociacionFactura.get('metrosCuadradosEquivalentes')?.value).toBe(50);
    expect(storeMock.setFormaValida).not.toHaveBeenCalled();
  }));

  it('debe marcar el formulario como válido y llamar a setFormaValida en statusChanges', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.formularioAsociacionFactura.get('cantidadFacturas')?.setValue('10');
    component.formularioAsociacionFactura.get('cantidadFacturas')?.markAsDirty();

    tick(20);

    expect(component.formularioAsociacionFactura.valid).toBe(true);
    expect(storeMock.setFormaValida).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ descripcion: 'Valida' }),
        expect.objectContaining({ id: 1 }),
      ])
    );
  }));

  it('debe tener el formulario inválido si cantidadFacturas está vacío', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    component.formularioAsociacionFactura.get('cantidadFacturas')?.setValue('');
    tick(20);

    expect(component.formularioAsociacionFactura.invalid).toBe(true);
    expect(storeMock.setFormaValida).not.toHaveBeenCalled();
  }));

  it('debe llamar a recuperarDatos y establecer facturasDisponible', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(serviceMock.obtenerTablaDatos).toHaveBeenCalledWith('facturasDisponible.json');
    expect(component.facturasDisponible.length).toBe(2);
    expect(component.facturasDisponible[0].numeroDeLaFactura).toBe('F1');
  }));

  it('debe llamar a recuperarDatosAsociadas y establecer facturasAsociadas', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(serviceMock.obtenerTablaDatos).toHaveBeenCalledWith('facturas-asociadas.json');
    expect(component.facturasAsociadas.length).toBe(1);
    expect(component.facturasAsociadas[0].numeroDeLaFactura).toBe('FA1');
  }));

  it('debe llamar a setValoresStore con el valor correcto', () => {
    const fb = (component as any).fb as FormBuilder;
    const form = fb.group({
      testField: ['valueTest'],
    });

    const spyMethod = jest.fn();
    (component as any).ElegibilidadDeTextilesStore = {
      testMethod: spyMethod,
    };

    component.setValoresStore(form, 'testField', 'testMethod' as any);

    expect(spyMethod).toHaveBeenCalledWith('valueTest');
  });

it('debe deshabilitar el formulario si formularioDeshabilitado es verdadero en ngOnInit', fakeAsync(() => {
  component.formularioDeshabilitado = true;
  component.ngOnInit();
  tick();
  fixture.detectChanges();

  expect(component.formularioAsociacionFactura.disabled).toBe(true);
  tick(20);
}));

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    (component as any).destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn(),
    };

    component.ngOnDestroy();

    expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
    expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });
});