import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(component.getTiposDocumentos).toHaveBeenCalled();
  });

  it('should set catalogoDocumentos if response has items in getTiposDocumentos', () => {
    const mockDocs = [{ id: 1, nombre: 'Doc1' }];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockDocs));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockDocs);
  });

  it('should not set catalogoDocumentos if response is empty in getTiposDocumentos', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(of([]));
    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual([{ id: 1, nombre: 'Doc1' }]);
  });

  it('should handle error in getTiposDocumentos', () => {
    catalogosServiceMock.getCatalogo.mockReturnValue(throwError(() => new Error('fail')));
    expect(() => component.getTiposDocumentos()).not.toThrow();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});