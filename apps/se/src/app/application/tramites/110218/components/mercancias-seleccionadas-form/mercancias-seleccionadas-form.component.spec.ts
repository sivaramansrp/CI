import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { MercanciasSeleccionadasFormComponent } from './mercancias-seleccionadas-form.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('MercanciasSeleccionadasFormComponent', () => {
  let component: MercanciasSeleccionadasFormComponent;
  let fixture: ComponentFixture<MercanciasSeleccionadasFormComponent>;
  let serviceMock: jest.Mocked<CertificadoTecnicoJaponService>;
  let storeMock: jest.Mocked<Tramite110218Store>;
  let queryMock: jest.Mocked<Tramite110218Query>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    serviceMock = {
      getUnidadMedida: jest.fn().mockReturnValue(of([])),
      getTipodeFctura: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<CertificadoTecnicoJaponService>;

    storeMock = {
      setTramite110218State: jest.fn(),
    } as unknown as jest.Mocked<Tramite110218Store>;

    queryMock = {
      selectTramite110218State$: of({
        complementoDelaDescripcion: 'Descripción de prueba',
        marca: 'Marca de prueba',
        valorMercancia: '100.50',
        unidaddeMedidadeComercializacion: { id: 1, descripcion: 'Unidad' },
        numerodeFactura: '12345',
        tipodeFactura: { id: 2, descripcion: 'Factura' },
      }),
    } as unknown as jest.Mocked<Tramite110218Query>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MercanciasSeleccionadasFormComponent],
      declarations: [],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: serviceMock },
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciasSeleccionadasFormComponent);
    component = fixture.componentInstance;
    (component as any).destroyed$ = destroyed$;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    component.inicializarFormulario();
    expect(component.modifydatosdelcertificado.value).toEqual({
      complementoDelaDescripcion: 'Descripción de prueba',
      marca: 'Marca de prueba',
      valorMercancia: '100.50',
      unidaddeMedidadeComercializacion: { id: 1, descripcion: 'Unidad' },
      numerodeFactura: '12345',
      tipodeFactura: { id: 2, descripcion: 'Factura' },
    });
  });

  it('debería obtener los datos de la unidad de medida desde el servicio', () => {
    const unidadMock: Catalogo[] = [{ id: 1, descripcion: 'Unidad 1' }];
    serviceMock.getUnidadMedida.mockReturnValue(of(unidadMock));

    component.unidadMedidaData();

    expect(serviceMock.getUnidadMedida).toHaveBeenCalled();
    expect(component.unidaddeMedidadeComercializacionOptions).toEqual(unidadMock);
  });

  it('debería obtener los datos del tipo de factura desde el servicio', () => {
    const facturaMock: Catalogo[] = [{ id: 2, descripcion: 'Factura 1' }];
    serviceMock.getTipodeFctura.mockReturnValue(of(facturaMock));

    component.tipoDeFactura();

    expect(serviceMock.getTipodeFctura).toHaveBeenCalled();
    expect(component.tipodeFacturaOptions).toEqual(facturaMock);
  });

  it('debería establecer los valores de la tabla en el formulario', () => {
    component.receivedData = [
      { nombreComercial: 'Producto 1', nombreIngles: 'Product 1' },
    ];

    component.tableDataValues();

    expect(component.modifydatosdelcertificado.get('nombreComercial')?.value).toEqual('Producto 1');
    expect(component.modifydatosdelcertificado.get('nombreIngles')?.value).toEqual('Product 1');
    expect(component.modifydatosdelcertificado.get('cantidad')?.value).toEqual('100');
    expect(component.modifydatosdelcertificado.get('fechadelaFactura')?.value).toEqual('2024-11-13');
  });

  it('debería actualizar un valor en el store', () => {
    component.modifydatosdelcertificado = component.formBuilder.group({
      complementoDelaDescripcion: ['Nueva Descripción'],
    });

    component.setValorStore(component.modifydatosdelcertificado, 'complementoDelaDescripcion');

    expect(storeMock.setTramite110218State).toHaveBeenCalledWith({
      complementoDelaDescripcion: 'Nueva Descripción',
    });
  });

  it('debería obtener el estado actual del trámite desde el store', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      complementoDelaDescripcion: 'Descripción de prueba',
      marca: 'Marca de prueba',
      valorMercancia: '100.50',
      unidaddeMedidadeComercializacion: { id: 1, descripcion: 'Unidad' },
      numerodeFactura: '12345',
      tipodeFactura: { id: 2, descripcion: 'Factura' },
    });
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});