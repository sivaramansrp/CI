import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: Partial<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Documento 1' }])),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('debe completar destroyed$ en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
  });
});
