import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosParaMovilizacionNacionalComponent } from './datos-para-movilizacion-nacional.component';
import { of } from 'rxjs';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('DatosParaMovilizacionNacionalComponent', () => {
  let component: DatosParaMovilizacionNacionalComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionNacionalComponent>;
  let httpMock: any; // Variable para mockear el servicio HttpClient

  beforeEach(async () => {

    // Mockeamos el servicio HttpClient
    httpMock = {
      get: () => of({ data: [] }) // Simulamos una respuesta vacía del servicio
    };

    await TestBed.configureTestingModule({
      declarations: [DatosParaMovilizacionNacionalComponent],
      imports: [ReactiveFormsModule], // Importa ReactiveFormsModule
      providers: [{ provide: HttpClient, useValue: httpMock }] // Inyectamos el mock en lugar del servicio real
    }).compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('transporte')).toBeDefined();
    expect(component.forma.get('guiaIdentificacion')).toBeDefined();
    expect(component.forma.get('empresaTransportista')).toBeDefined();
    expect(component.forma.get('punto')).toBeDefined();

    // Verifica que los controles tengan los validators requeridos
    expect(component.forma.get('transporte')?.validator).toBeDefined();
    expect(component.forma.get('guiaIdentificacion')?.validator).toBeDefined();
    expect(component.forma.get('empresaTransportista')?.validator).toBeDefined();
    expect(component.forma.get('punto')?.validator).toBeDefined();
  });

  it('should call obtenerTodosLosDatosDeOpciones on init', () => {
    const spy = spyOn(component, 'obtenerTodosLosDatosDeOpciones');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call obtenerListaDeJustificaciones and obtenerListaDePunto in obtenerTodosLosDatosDeOpciones', () => {
    const spyJustificaciones = spyOn(component, 'obtenerListaDeJustificaciones');
    const spyPunto = spyOn(component, 'obtenerListaDePunto');
    component.obtenerTodosLosDatosDeOpciones();
    expect(spyJustificaciones).toHaveBeenCalled();
    expect(spyPunto).toHaveBeenCalled();
  });


  it('should get transport data', () => {
    const mockData = [{ id: '1', descripcion: 'Terrestre' }, { id: 2, descripcion: 'Aéreo' }] as Catalogo[];
    httpMock.get = () => of({ data: mockData }); // Configuramos el mock para retornar datos de prueba
    component.obtenerListaDeJustificaciones();
    expect(component.transporteList).toEqual(mockData);
  });

  it('should get point data', () => {
    const mockData = [{ id: '1', descripcion: 'Fronterizo' }, { id: 2, descripcion: 'Interior' }] as Catalogo[];
    httpMock.get = () => of({ data: mockData }); // Configuramos el mock para retornar datos de prueba
    component.obtenerListaDePunto();
    expect(component.puntoList).toEqual(mockData);
  });

  // ... (más tests para cubrir otros métodos y funcionalidades)
});
