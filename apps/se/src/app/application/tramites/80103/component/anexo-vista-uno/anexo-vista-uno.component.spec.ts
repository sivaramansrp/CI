import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexoVistaUnoComponent } from './anexo-vista-uno.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import {
  AnexoUnoEncabezado,
  AnexoDosEncabezado,
  RutaNombre,
} from '../../../../shared/models/nuevo-programa-industrial.model';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-anexo-uno',
  template: ''
})
class MockAnexoUnoComponent {
  @Input() anexoUnoConfig: any;
  @Input() anexoImportacionConfig: any;
  @Input() anexoUnoTablaLista: any;
  @Input() anexoDosTablaLista: any;
  @Input() readonly!: boolean;
  @Input() mostrarTitulo?: boolean;
  @Input() esVistaUno = false;
  @Input() modoDeUso: 'crear' | 'ver' | 'editar' = 'crear';
  @Input() sinEncabezado = false;
}

describe('AnexoVistaUnoComponent (Jest)', () => {
  let component: AnexoVistaUnoComponent;
  let fixture: ComponentFixture<AnexoVistaUnoComponent>;
  let mockQuery: Partial<Tramite80101Query>;
  let mockStore: Partial<Tramite80101Store>;
  let router: Router;

  const IMPORTAR_DATOS_MOCK: AnexoUnoEncabezado[] = [
    {
      encabezadoFraccion: '0101.21.01',
      encabezadoFraccionArancelaria: '12345678',
      encabezadoDescripcionComercial: 'Descripción de producto importado',
      encabezadoAnexoII: 'Sí',
      encabezadoTipo: 'Tipo A',
      encabezadoUmt: 'KG',
      encabezadoCategoria: 'Categoría 1',
      encabezadoValorEnMercado: '1000.00',
      estatus: true,
    },
  ];

  const EXPORTAR_DATOS_MOCK: AnexoDosEncabezado[] = [
    {
      encabezadoFraccion: '0202.30.00',
      encabezadoFraccionExportacion: '87654321',
      encabezadoDescripcionComercial: 'Producto de exportación',
      encabezadoFraccionImportacion: '12345678',
      estatus: false,
    },
  ];

  beforeEach(async () => {
    mockQuery = {
      selectImportarTablsDatos$: of([]),
      selectExportarTablsDatos$: of([]),
    };

    mockStore = {
      setImportarDatosTabla: jest.fn(),
      setExportarDatosTabla: jest.fn(),
      setAnnexoUnoSeccionActiva: jest.fn(),
      setDatosParaNavegar: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, AnexoVistaUnoComponent],
      declarations: [MockAnexoUnoComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite80101Query, useValue: mockQuery },
        { provide: Tramite80101Store, useValue: mockStore },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnexoVistaUnoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call store and update anexoUno list', () => {
    component.obtenerAnexoUnoDevolverLaLlamada(IMPORTAR_DATOS_MOCK);

    expect(component.anexoUnoTablaLista).toEqual(IMPORTAR_DATOS_MOCK);
    expect(mockStore.setImportarDatosTabla).toHaveBeenCalledWith(IMPORTAR_DATOS_MOCK);
  });

  it('should call store and update anexoDos list', () => {
    component.obtenerAnexoDosDevolverLaLlamada(EXPORTAR_DATOS_MOCK);

    expect(component.anexoDosTablaLista).toEqual(EXPORTAR_DATOS_MOCK);
    expect(mockStore.setExportarDatosTabla).toHaveBeenCalledWith(EXPORTAR_DATOS_MOCK);
  });

it('should call store and navigate on rutaLaFraccionDeComplemento', () => {
  const RUTA_EVENTO: RutaNombre = {
    catagoria: 'complemento',
    id: 'ruta-id-456',
    datos: {
      encabezadoFraccion: '0101.21.01',
      encabezadoFraccionArancelaria: '12345678',
      encabezadoDescripcionComercial: 'desc',
      encabezadoAnexoII: 'sí',
      encabezadoTipo: 'tipo',
      encabezadoUmt: 'KG',
      encabezadoCategoria: 'cat',
      encabezadoValorEnMercado: '1000.00',
      estatus: true,
    }, 
  };

  component.rutaLaFraccionDeComplemento(RUTA_EVENTO);

  expect(mockStore.setAnnexoUnoSeccionActiva).toHaveBeenCalledWith('ruta-id-456');
  expect(mockStore.setDatosParaNavegar).toHaveBeenCalledWith(RUTA_EVENTO.datos);
  expect(router.navigate).toHaveBeenCalledWith(['../complemento'], { relativeTo: {} });
});


  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
