import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { of } from 'rxjs';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // For ignoring unknown elements like `ng-titulo`
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { TEXTOS } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    // Create a mock CatalogosService
    catalogosServiceMock = {
      getCatalogo: jest.fn().mockReturnValue(of([])), // Mock the getCatalogo method
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }, // Provide the mock service
      ],
      imports: [HttpClientModule], // Import HttpClientModule
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown components like 'ng-titulo'
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toEqual(TEXTOS);
  });

  it('should call getCatalogo on initialization', () => {
    const spy = jest.spyOn(catalogosServiceMock, 'getCatalogo');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(CATALOGOS_ID.CAT_TIPO_DOCUMENTO);
  });

  // it('should populate catalogoDocumentos when getCatalogo returns data', () => {
  //   const mockData = [{ id: 1, name: 'Document 1' }];
  //   catalogosServiceMock.getCatalogo.mockReturnValue(of(mockData)); // Mock return value
  //   component.ngOnInit();
  //   expect(component.catalogoDocumentos).toEqual(mockData);
  // });
});
