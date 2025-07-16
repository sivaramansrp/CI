import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, Subject, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: Partial<CatalogosService>;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [{ provide: CatalogosService, useValue: catalogosServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería obtener tipos de documentos correctamente al inicializar', () => {
    const documentosMock = [{ id: 1, descripcion: 'Documento A' }];
    (catalogosServiceMock.getCatalogo as jest.Mock).mockReturnValue(of(documentosMock));

    component.ngOnInit();

    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalled();
    expect(component.catalogoDocumentos).toEqual(documentosMock);
  });

  it('no debería asignar documentos si la respuesta está vacía', () => {
    (catalogosServiceMock.getCatalogo as jest.Mock).mockReturnValue(of([]));

    component.getTiposDocumentos();

    expect(component.catalogoDocumentos).toEqual([]);
  });

  it('debería manejar error al obtener los documentos sin lanzar excepción', () => {
    const error = new Error('Error al obtener catálogos');
    (catalogosServiceMock.getCatalogo as jest.Mock).mockReturnValue(throwError(() => error));

    expect(() => component.getTiposDocumentos()).not.toThrow();
  });

  it('debería completar destroyed$ al destruir el componente', () => {
    const destroyed$ = (component as any).destroyed$ as Subject<void>;
    const nextSpy = jest.spyOn(destroyed$, 'next');
    const completeSpy = jest.spyOn(destroyed$, 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });
});
