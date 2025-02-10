import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CriterioDeDictComponent } from './criterio-de-dict.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('CriterioDeDictComponent', () => {
  let component: CriterioDeDictComponent;
  let fixture: ComponentFixture<CriterioDeDictComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        CriterioDeDictComponent,
        SelectCatalogosComponent,
        TituloComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CriterioDeDictComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.frmCriterioDict).toBeDefined();
    expect(
      component.frmCriterioDict.controls['solicitudMercancia']
    ).toBeDefined();
  });

  it('should handle solicitudMercanciaSeleccion correctly', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.solicitudMercanciaSeleccion(mockCatalogo);
    expect(component.selectedSolicitudMercancia).toEqual(mockCatalogo);
  });

  it('should update textarea value when solicitudMercanciaSeleccion is called', () => {
    const mockCatalogo = { id: 1, descripcion: 'Test descripcion' };
    component.solicitudMercanciaSeleccion(mockCatalogo);
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector('textarea');
    expect(textarea.value).toBe(mockCatalogo.descripcion);
  });

  it('should fetch solicitudMercancia on init', () => {
    component.ngOnInit();
    const req = httpMock.expectOne(
      '/assets/json/130102/solicitud_mercancia.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      catalogos: [
        {
          id: 1,
          descripcion:
            'La SE autorizará la importación de mercancías de la Regla 8a, cuando se',
        },
        { id: 2, descripcion: 'Solicitud mercancia 2' },
        { id: 3, descripcion: 'Solicitud mercancia 3' },
      ],
    });
    expect(component.solicitudMercancia.catalogos.length).toBe(3);
    httpMock.verify();
  });
});
