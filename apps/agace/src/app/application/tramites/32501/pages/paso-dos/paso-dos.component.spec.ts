import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { Catalogo, CatalogosService } from '@ng-mf/data-access-user';
import { MercDesmSinMonService } from '../../services/merc-desm-sin-mon.service';
import { of } from 'rxjs';
import {
  AvisoCatalogo,
  RequisitosObligatorios,
} from '../../models/aviso-catalogo.model';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;
  let mercDesmSinMonServiceMock: jest.Mocked<MercDesmSinMonService>;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn(),
    } as unknown as jest.Mocked<CatalogosService>;

    mercDesmSinMonServiceMock = {
      obtenerAvisoDelCatalogo: jest.fn(),
      obtenerDatosAgregarNuevo: jest.fn(),
    } as unknown as jest.Mocked<MercDesmSinMonService>;

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock },
        { provide: MercDesmSinMonService, useValue: mercDesmSinMonServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const mockCatalogos: Catalogo[] = [{ descripcion: 'Doc1' }] as Catalogo[];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockCatalogos));

    component.ngOnInit();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(
      'CAT_TIPO_DOCUMENTO'
    );
    expect(component.catalogoDocumentos).toEqual(mockCatalogos);
  });

  it('should call obtenerAvisoDelCatalogo and set opcionTipoDeDocumento', () => {
    const mockAviso: AvisoCatalogo = {
      opcionTipoDeDocumento: {
        labelNombre: 'Tipo de documento',
        required: false,
        primerOpcion: 'Seleccione un tipo de documento',
        catalogos: [
          {
            id: 1,
            descripcion: 'Manifiesto',
          },
          {
            id: 2,
            descripcion: 'ID Oficial',
          },
          {
            id: 3,
            descripcion: 'Actas',
          },
          {
            id: 4,
            descripcion: 'Poderes',
          },
          {
            id: 5,
            descripcion: 'Otros',
          },
        ],
      },
    } as AvisoCatalogo;
    mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo.mockReturnValue(
      of(mockAviso)
    );

    component.obtenerAvisoDelCatalogo();

    expect(
      mercDesmSinMonServiceMock.obtenerAvisoDelCatalogo
    ).toHaveBeenCalled();
    expect(component.opcionTipoDeDocumento).toEqual(
      mockAviso.opcionTipoDeDocumento
    );
  });

  it('should call obtenerDatosAgregarNuevo and set datosAgregarNuevo', () => {
    const mockDatos: RequisitosObligatorios[] = [
      {
        numeroDeSerie: 1,
        valor:
          'Comprobante de domicilio del lugar donde se montará la mercancía.',
      },
      {
        numeroDeSerie: 2,
        valor: 'Factura/Proforma/Documento comercial.',
      },
      {
        numeroDeSerie: 3,
        valor:
          'Lista de empaque/Relación de componentes de la mercancía a importarse.',
      },
    ] as RequisitosObligatorios[];
    mercDesmSinMonServiceMock.obtenerDatosAgregarNuevo.mockReturnValue(
      of(mockDatos)
    );

    component.obtenerDatosAgregarNuevo();

    expect(
      mercDesmSinMonServiceMock.obtenerDatosAgregarNuevo
    ).toHaveBeenCalled();
    expect(component.datosAgregarNuevo).toEqual(mockDatos);
  });

  it('should update seleccionadoTipoDeDocumento on actualizarTipoDeDocumento', () => {
    const mockCatalogo: Catalogo = { descripcion: 'Doc1' } as Catalogo;

    component.actualizarTipoDeDocumento(mockCatalogo);

    expect(component.seleccionadoTipoDeDocumento).toEqual(mockCatalogo);
  });

  it('should clear datosTipo on seleccionarEliminar', () => {
    component.datosTipo = [{ descripcion: 'Doc1' }] as Catalogo[];

    component.seleccionarEliminar();

    expect(component.datosTipo).toEqual([]);
  });

  it('should add seleccionadoTipoDeDocumento to datosTipo on seleccionarAgregarNuevo', () => {
    const mockCatalogo: Catalogo = { descripcion: 'Doc1' } as Catalogo;
    component.seleccionadoTipoDeDocumento = mockCatalogo;

    component.seleccionarAgregarNuevo();

    expect(component.datosTipo).toContain(mockCatalogo);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
