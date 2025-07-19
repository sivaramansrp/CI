import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDuosComponent } from './paso-duos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent, AnexarDocumentosComponent, Catalogo, CATALOGOS_ID, CatalogosService, TituloComponent } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('PasoDuosComponent', () => {
  let component: PasoDuosComponent;
  let fixture: ComponentFixture<PasoDuosComponent>;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;
  
  beforeEach(async () => {
    catalogosServiceMock = {
          getCatalogo: jest.fn(() => of([])),
        } as any;
    await TestBed.configureTestingModule({
      declarations: [PasoDuosComponent],
      imports: [HttpClientTestingModule, AnexarDocumentosComponent, TituloComponent, AlertComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDuosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
      const spy = jest.spyOn(component, 'getTiposDocumentos');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  
    it('should assign catalogoDocumentos when getTiposDocumentos returns data', () => {
      const mockDocs: Catalogo[] = [{ id: 1, descripcion: 'Doc1' } as Catalogo];
      catalogosServiceMock.getCatalogo.mockReturnValue(of(mockDocs));
  
      component.getTiposDocumentos();
  
      expect(catalogosServiceMock.getCatalogo).toHaveBeenCalledWith(
        CATALOGOS_ID.CAT_TIPO_DOCUMENTO
      );
      expect(component.catalogoDocumentos).toEqual(mockDocs);
    });
  
    it('should not assign catalogoDocumentos when getTiposDocumentos returns empty array', () => {
      catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
      component.catalogoDocumentos = [{ id: 1, descripcion: 'Doc1' } as Catalogo];
  
      component.getTiposDocumentos();
  
      expect(component.catalogoDocumentos).toEqual([
        { id: 1, descripcion: 'Doc1' } as Catalogo,
      ]);
    });
  
    it('should complete destroyNotifier$ on ngOnDestroy', () => {
      const completeSpy = jest.spyOn(
        (component as any).destroyNotifier$,
        'complete'
      );
      const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
});
