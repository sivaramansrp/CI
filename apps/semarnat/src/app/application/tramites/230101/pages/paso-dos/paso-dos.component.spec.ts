import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { ReplaySubject } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let mockCatalogosService: any;

  beforeEach(() => {
    mockCatalogosService = {
      getCatalogo: jest.fn(), // Mocked function for the service
    };

    TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and call getTiposDocumentos on ngOnInit', () => {
    const mockResponse = [{ id: 1, nombre: 'Tipo A' }, { id: 2, nombre: 'Tipo B' }];
    mockCatalogosService.getCatalogo.mockReturnValue(of(mockResponse));

    // Call ngOnInit
    component.ngOnInit();

    expect(mockCatalogosService.getCatalogo).toHaveBeenCalledWith('CAT_TIPO_DOCUMENTO');
    expect(component.catalogoDocumentos).toEqual(mockResponse);
  });

  it('should complete ReplaySubject on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    // Call ngOnDestroy
    component.ngOnDestroy();

    expect(completeSpy).toHaveBeenCalled();
  });
});
