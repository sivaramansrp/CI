import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaisProcendenciaComponent } from './pais-procendencia.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CatalogosSelect} from '../../../../core/models/shared/components.model';

describe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PaisProcendenciaComponent],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch country options on initialization', () => {
    const mockData: CatalogosSelect = {
      labelNombre: 'País de Procedencia',
      required: true,
      primerOpcion: 'Seleccione un país',
      catalogos: [
        { id: 1, descripcion: 'Mexico' },
        { id: 2, descripcion: 'USA' },
      ],
    };

    httpClientSpy.get.and.returnValue(of(mockData));

    component.fetchPaisOptions();
    expect(component.paisProc).toEqual(mockData);
  });

  it('should add selected dates when agregar is called with "t"', () => {
    component.selectRangoDias = ['2024-02-10', '2024-02-11'];
    component.agregar('t');

    expect(component.fechasSeleccionadas).toEqual(['2024-02-10', '2024-02-11']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should remove all selected dates when quitar is called with "t"', () => {
    component.fechasSeleccionadas = ['2024-02-10', '2024-02-11'];
    component.quitar('t');

    expect(component.fechasDatos).toEqual(['2024-02-10', '2024-02-11']);
    expect(component.fechasSeleccionadas).toEqual([]);
  });
});
