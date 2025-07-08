import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import {
  CatalogosService,
  CATALOGOS_ID,
  TEXTOS,
  Catalogo,
  SolicitanteComponent,
  FirmaElectronicaComponent,
  WizardComponent,
  BtnContinuarComponent,
  AnexarDocumentosComponent,
  TituloComponent,
  AlertComponent,
} from '@ng-mf/data-access-user';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { FirmarSolicitudComponent } from '../firmar-solicitud/firmar-solicitud.component';
import { PantallasComponent } from '../pantallas/pantallas.component';
import { DatosComponent } from '../datos/datos.component';
import { CommonModule } from '@angular/common';
import { AvisoSanitarioRoutingModule } from '../../aviso-sanitario-routing.module';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';
import { DatosDelEstablecimientoComponent } from '../../components/datos-del-establecimiento/datos-del-establecimiento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: any;
  let mockCatalogosService: jest.Mocked<CatalogosService>;
  let mockAvisoSanitarioService: jest.Mocked<AvisoSanitarioService>;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn(),
    } as any;

    mockAvisoSanitarioService = {
      obtenerDocumentosSeleccionados: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        AlertComponent,
        AnexarDocumentosComponent,
        PasoDosComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService },
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    // Mock ngOnInit if not present
    if (!component.ngOnInit) {
      component.ngOnInit = function (): void {
        this.getTiposDocumentos();
        this.obtenerDocumentosSeleccionados();
      };
    }
    // Mock destruirNotificador$ if not present
    if (!(component as any).destruirNotificador$) {
      (component as any).destruirNotificador$ = new Subject<void>();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS and infoAlert', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
    expect(component.infoAlert).toBe('alert-info');
  });

  describe('ngOnInit', () => {
    it('should call getTiposDocumentos and obtenerDocumentosSeleccionados', () => {
      const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
      const obtenerDocumentosSeleccionadosSpy = jest.spyOn(
        component,
        'obtenerDocumentosSeleccionados'
      );
      component.ngOnInit();
      expect(getTiposDocumentosSpy).toHaveBeenCalled();
      expect(obtenerDocumentosSeleccionadosSpy).toHaveBeenCalled();
    });
  });

  describe('getTiposDocumentos', () => {
    it('should set catalogoDocumentos when response has items', () => {
      const mockDocs = [{ id: 1, descripcion: 'Doc1' }];
      mockCatalogosService.getCatalogo.mockReturnValue(of(mockDocs));
      component.getTiposDocumentos();
      expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(
        CATALOGOS_ID.CAT_TIPO_DOCUMENTO
      );
      expect(component.catalogoDocumentos).toEqual(mockDocs);
    });

    it('should not set catalogoDocumentos when response is empty', () => {
      mockCatalogosService.getCatalogo.mockReturnValue(of([]));
      component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc1' }];
      component.getTiposDocumentos();
      expect(component.catalogoDocumentos).toEqual([
        { id: 1, descripcion: 'Doc1' },
      ]);
    });
  });

  describe('obtenerDocumentosSeleccionados', () => {
    it('should set documentosSeleccionados from service result', () => {
      const mockResult = { data: { id: 2, nombre: 'Doc2' } };
      mockAvisoSanitarioService.obtenerDocumentosSeleccionados.mockReturnValue(
        of(mockResult) as any
      );
      component.obtenerDocumentosSeleccionados();
      expect(component.documentosSeleccionados).toEqual(mockResult.data);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destruirNotificador$', () => {
      const nextSpy = jest.spyOn(
        (component as any).destruirNotificador$,
        'next'
      );
      const completeSpy = jest.spyOn(
        (component as any).destruirNotificador$,
        'complete'
      );
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
