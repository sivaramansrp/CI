/**
 * Componente que representa la interfaz de una cortina a la italiana.
 * Permite la navegación entre diferentes pestañas mediante un índice.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: Partial<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: mockCatalogosService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to handle unknown elements like 'ng-titulo'
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las variables TEXTOS e infoAlert', () => {
    expect(component.TEXTOS).toBeDefined();
    expect(component.infoAlert).toBe('alert-info');
  });

  it('debería llamar a getTiposDocumentos en ngOnInit', async () => {
    // Mock getCatalogo to return an observable to avoid undefined error
    (mockCatalogosService.getCatalogo as jest.Mock).mockReturnValue(of([]));
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    await component.ngOnInit();
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
  });

  it('debería poblar catalogoDocumentos al obtener getCatalogo exitosamente', async () => {
    const mockCatalogo: Catalogo[] = [{ id: 1, descripcion: 'Documento 1' }];
    (mockCatalogosService.getCatalogo as jest.Mock).mockReturnValue(of(mockCatalogo));

    await component.getTiposDocumentos();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });

  it('debería manejar el error en la llamada a getCatalogo', async () => {
    (mockCatalogosService.getCatalogo as jest.Mock).mockReturnValue(throwError(() => new Error('Error fetching catalog')));

    await component.getTiposDocumentos();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
    expect(component.catalogoDocumentos).toEqual([]);
  });
});
