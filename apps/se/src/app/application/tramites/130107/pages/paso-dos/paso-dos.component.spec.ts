import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { of, Subject, throwError } from 'rxjs';
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos on ngOnInit', () => {
    const getTiposDocumentosSpy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(getTiposDocumentosSpy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
  catalogosServiceMock.getCatalogo.mockReturnValue(of([])); 
  const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
  const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

  component.getTiposDocumentos(); 
  component.ngOnDestroy();

  expect(destroyedSpy).toHaveBeenCalled();
  expect(completeSpy).toHaveBeenCalled();
  });
});
