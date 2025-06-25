import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a getTiposDocumentos en ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.getTiposDocumentos();
    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe establecer catalogoDocumentos cuando getTiposDocumentos retorna datos', () => {
    const mockDocs = [{ id: 1, descripcion: 'Doc1' }, { id: 2, descripcion: 'Doc2' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockDocs));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockDocs);
  });

  it('no debe establecer catalogoDocumentos cuando getTiposDocumentos retorna un arreglo vacío', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.catalogoDocumentos = [{ id: 1, descripcion: 'Should be replaced' }];
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, descripcion: 'Should be replaced' }]);
  });

  it('debe manejar el error en getTiposDocumentos sin lanzar excepción', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => new Error('Error')));
    component.getTiposDocumentos();
    expect(component['catalogoDocumentos']).toEqual([]);
  });
});
