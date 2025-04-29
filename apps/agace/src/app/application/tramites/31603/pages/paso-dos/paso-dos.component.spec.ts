import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { of, throwError } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: any;

  beforeEach(async () => {
    mockCatalogosService = jasmine.createSpyObj('CatalogosService', ['getCatalogo']);

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCatalogo on ngOnInit and populate catalogoDocumentos', () => {
    const mockResponse = [{ id: 1, nombre: 'Documento 1' }];
    mockCatalogosService.getCatalogo.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should handle error when getCatalogo fails', () => {
    mockCatalogosService.getCatalogo.and.returnValue(throwError(() => new Error('Error fetching catalog')));

    component.ngOnInit();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = spyOn(component['destroyed$'], 'next');
    const completeSpy = spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
