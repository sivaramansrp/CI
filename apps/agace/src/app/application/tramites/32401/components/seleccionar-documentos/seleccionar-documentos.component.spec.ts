import { TestBed } from '@angular/core/testing';
import { SeleccionarDocumentosComponent } from './seleccionar-documentos.component';
import { AlertComponent, AnexarDocumentosComponent, CatalogosService, TituloComponent } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeleccionarDocumentosComponent', () => {
  let component: SeleccionarDocumentosComponent;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(() => {
    catalogosServiceMock = {
      getCatalogo: jest.fn(()=> of()),
    } as unknown as jest.Mocked<CatalogosService>;

    TestBed.configureTestingModule({
      imports: [
        SeleccionarDocumentosComponent,
        AlertComponent,
        CommonModule,
        AnexarDocumentosComponent,
        TituloComponent,
        ToastrModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        ToastrService,
        { provide: CatalogosService, useValue: catalogosServiceMock },
      ],
    });

    const fixture = TestBed.createComponent(SeleccionarDocumentosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(component.getTiposDocumentos).toHaveBeenCalled();
  });

  it('should populate catalogoDocumentos on successful getCatalogo call', () => {
    const mockResponse = [{ id: 1, descripcion: 'Document 1' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(
      CATALOGOS_ID.CAT_TIPO_DOCUMENTO
    );
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should handle error in getCatalogo call', () => {
    const mockError = new Error('Error fetching catalog');
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(mockError));

    component.getTiposDocumentos();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(
      CATALOGOS_ID.CAT_TIPO_DOCUMENTO
    );
    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
