import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';

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

  it('should initialize documentosSeleccionados on ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentosSeleccionados.length).toBe(2);
    expect(component.documentosSeleccionados[0].descripcion).toBe('Documentos que ampare el valor de la mercancía');
    expect(component.documentosSeleccionados[1].descripcion).toBe('Documentos del medio de transporte (Guías, BL o carta porte según corresponda)');
  });

  it('should call getTiposDocumentos on component initialization', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update catalogoDocumentos when getTiposDocumentos is called', () => {
    const mockCatalogo: Catalogo[] = [
      { id: 1, descripcion: 'Tipo Documento 1' },
      { id: 2, descripcion: 'Tipo Documento 2' }
    ];
    catalogosServiceMock.getCatalogo.mockReturnValue(of(mockCatalogo));

    component.getTiposDocumentos();
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });
});