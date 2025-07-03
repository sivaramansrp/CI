import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideToastr, TOAST_CONFIG } from 'ngx-toastr';
import { TituloComponent } from '@libs/shared/data-access-user/src'; // Update with the correct path
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: any;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogo: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TituloComponent],
      declarations: [PasoDosComponent],
      providers: [
        provideToastr({ positionClass: 'toast-top-right' }),
        { provide: 'CatalogosService', useValue: mockCatalogosService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(PasoDosComponent, {
      set: { providers: [{ provide: 'CatalogosService', useValue: mockCatalogosService }] }
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe manejar error en getTiposDocumentos', () => {
    mockCatalogosService.getCatalogo.mockReturnValue(throwError(() => new Error('error')));
    expect(() => component.getTiposDocumentos()).not.toThrow();
  });

  it('debe completar destroyed$ en ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
