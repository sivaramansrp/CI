import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: any;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoDosComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set catalogoDocumentos when getTiposDocumentos returns data', () => {
    const mockDocs = [{ id: 1, descripcion: 'Doc1' }, { id: 2, descripcion: 'Doc2' }];
    mockCatalogosService.getCatalogo.mockReturnValue(of(mockDocs));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockDocs);
  });

  it('should not set catalogoDocumentos when getTiposDocumentos returns empty array', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(of([]));
    component.catalogoDocumentos = [{ id: 1, descripcion: 'Should be replaced' }];
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Should be replaced' }]);
  });

  it('should handle error in getTiposDocumentos gracefully', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(throwError(() => new Error('fail')));
    expect(() => component.getTiposDocumentos()).not.toThrow();
  });
});
