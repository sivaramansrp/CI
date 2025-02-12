import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { PaisProcendenciaComponent } from './pais-procendencia.component';

fdescribe('PaisProcendenciaComponent', () => {
  let component: PaisProcendenciaComponent;
  let fixture: ComponentFixture<PaisProcendenciaComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockData: CatalogosSelect = {
    labelNombre: 'País de Procedencia',
    required: true,
    primerOpcion: 'Seleccione un país',
    catalogos: [
      { id: 1, descripcion: 'Mexico' },
      { id: 2, descripcion: 'USA' },
    ],
  };

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,PaisProcendenciaComponent],
      declarations: [],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaisProcendenciaComponent);
    component = fixture.componentInstance;

    // Mock the HTTP response before detectChanges()
    httpClientSpy.get.and.returnValue(of(mockData));

    fixture.detectChanges(); // Triggers ngOnInit() safely
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch country options on initialization', () => {
    expect(component.paisProc).toEqual(mockData);
  });

  it('should add selected dates when agregar is called with "t"', () => {
    component.selectRangoDias = ['2024-02-10', '2024-02-11'];
    component.agregar('t');

    expect(component.fechasSeleccionadas).toEqual(['2024-02-10', '2024-02-11']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should remove all selected dates when quitar is called with "t"', () => {
    // Arrange: Set initial selected dates
    component.fechasSeleccionadas = ['2024-02-10', '2024-02-11'];
  
    // Act: Call quitar method
    component.quitar('t');
    fixture.detectChanges();  // ✅ Ensure Angular updates the component
  
    // Assert: Check if dates are moved correctly
    expect(component.fechasDatos).toEqual(['2024-02-10', '2024-02-11']);
    expect(component.fechasSeleccionadas).toEqual([]);  // Ensure the list is emptied
  });
  
});
