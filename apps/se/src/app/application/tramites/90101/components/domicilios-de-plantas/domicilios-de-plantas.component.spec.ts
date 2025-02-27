import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';


describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;
  let prosecService: ProsecService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomiciliosDePlantasComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [ProsecService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    prosecService = TestBed.inject(ProsecService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('modalidad')).toBeDefined();
  });

  it('should call obtenerListaEstado on init', () => {
    spyOn(component, 'obtenserListaEstado');
    component.ngOnInit();
    expect(component.obtenserListaEstado).toHaveBeenCalled();
  });

  it('should retrieve estado list', () => {
    const mockData = [{ id: 1, nombre: 'Estado 1', descripcion: 'Estado 1' }];
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(of(mockData));
    component.obtenserListaEstado();
    expect(component.estadoSeleccionar).toEqual(mockData);
  });

  it('should handle error when retrieving estado list', () => {
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(throwError('error'));
    component.obtenserListaEstado();
    expect(component.estadoSeleccionar).toBeUndefined();
  });

  it('should retrieve plantas data', () => {
    const mockResponse = [{ tbodyData: 'data' }];
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(of(mockResponse));
    component.recuperarDatos();
    expect(component.plantas).toEqual([{ tbodyData: 'data' }]);
  });

  it('should handle error when retrieving plantas data', () => {
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(throwError('error'));
    component.recuperarDatos();
    expect(component.plantas).toEqual([]);
  });

  it('should retrieve selected plantas data', () => {
    const mockResponse = [{ tbodyData: 'data' }];
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(of(mockResponse));
    component.datosSeleccionados();
    expect(component.plantas).toEqual([{ tbodyData: 'data' }]);
  });

  it('should handle error when retrieving selected plantas data', () => {
    spyOn(prosecService, 'obtenerTablaDatos').and.returnValue(throwError('error'));
    component.datosSeleccionados();
    expect(component.plantas).toEqual([]);
  });
});
