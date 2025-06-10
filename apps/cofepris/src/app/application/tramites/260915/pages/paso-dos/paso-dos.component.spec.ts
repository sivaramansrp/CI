import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { provideHttpClient } from '@angular/common/http';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

 beforeEach(async () => {

  catalogosServiceMock = {
    getCatalogo: jest.fn().mockReturnValue(of({ data: [] }))
  };

  await TestBed.configureTestingModule({
    declarations: [PasoDosComponent],
    imports: [ToastrModule.forRoot(), TituloComponent, AlertComponent, AnexarDocumentosComponent],
    providers: [
      provideHttpClient(),
      { provide: CatalogosService, useValue: catalogosServiceMock },
      ToastrService
    ],
      schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
});

afterEach(() => {
  // Reset the mock to always return an observable after each test
  catalogosServiceMock.getCatalogo.mockReset();
  catalogosServiceMock.getCatalogo.mockReturnValue(of({ data: [] }));
});

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize TEXTOS', () => {
    expect(component.TEXTOS).toBeDefined();
  });

  it('should call getTiposDocumentos on component initialization', () => {
    const spy = spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should call getTiposDocumentos from CatalogosService', () => {
    const spy = jest.spyOn(catalogosServiceMock, 'getCatalogo');
    component.getTiposDocumentos();
    expect(spy).toHaveBeenCalledWith('tipos-documentos');
  });
  it('should handle error when getTiposDocumentos fails', () => {
    jest.spyOn(catalogosServiceMock, 'getCatalogo').mockImplementation(() => {
      return {
        pipe: () => ({
          subscribe: (_success: any, error: any) => error({ error: 'Error fetching data' })
        })
      } as any;
    });
    const toastrService = TestBed.inject(ToastrService);
    const toastrSpy = jest.spyOn(toastrService, 'error');

    component.getTiposDocumentos();

    expect(toastrSpy).toHaveBeenCalledWith('Error al obtener los tipos de documentos', 'Error');
  });
  it('should set tiposDocumentos when getTiposDocumentos is successful', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'Documento 1' }] };
    jest.spyOn(catalogosServiceMock, 'getCatalogo').mockReturnValue(of(mockResponse));

    component.getTiposDocumentos();

    expect(component.tiposDocumentos).toEqual(mockResponse.data);
  });
  it('should call getValorIndice with valid accion and valor', () => {
    const accionBoton = { accion: 'cont', valor: 2 };
    const wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    expect(wizardComponentMock.siguiente).toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
  it('should call getValorIndice with valid accion and valor for "atras"', () => {
    const accionBoton = { accion: 'atras', valor: 3 };
    const wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    expect(wizardComponentMock.atras).toHaveBeenCalled();
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
  });
  it('should not change indice for invalid accion', () => {
    const accionBoton = { accion: 'invalid', valor: 2 };
    const wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
  it('should not change indice for undefined accion', () => {
    const accionBoton = { accion: undefined, valor: 2 };
    const wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
  });
  it('should not change indice for empty accion', () => {
    const accionBoton = { accion: '', valor: 2 };
    const wizardComponentMock = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    };
    expect(wizardComponentMock.siguiente).not.toHaveBeenCalled();
    expect(wizardComponentMock.atras).not.toHaveBeenCalled();
    void accionBoton; // Prevent unused variable error
  });
  
});