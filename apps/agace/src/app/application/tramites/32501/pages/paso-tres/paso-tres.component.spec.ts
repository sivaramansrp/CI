import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosService: CatalogosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        PasoDosComponent
      ],
      declarations: [],
      providers: [
        {
          provide: CatalogosService,
          useValue: {
            getCatalogo: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Documento 1' }])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    catalogosService = TestBed.inject(CatalogosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tipos de documentos', () => {
    const spy = jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(of([{ id: 1, descripcion: 'Documento 1' }]));
    component.getTiposDocumentos();
    expect(spy).toHaveBeenCalled();
    expect(component.catalogoDocumentos.length).toBeGreaterThan(0);
  });

  it('should handle error when getting tipos de documentos', () => {
    const spy = jest.spyOn(catalogosService, 'getCatalogo').mockReturnValue(of([]));
    component.getTiposDocumentos();
    expect(spy).toHaveBeenCalled();
    expect(component.catalogoDocumentos.length).toBe(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});