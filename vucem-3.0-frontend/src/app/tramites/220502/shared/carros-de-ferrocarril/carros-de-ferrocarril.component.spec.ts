import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosDeFerrocarrilComponent } from './carros-de-ferrocarril.component';
import { TituloComponent } from '../titulo/titulo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarroFerrocarril } from '../models/carro-ferrocarril.model';

describe('CarrosDeFerrocarrilComponent', () => {
  let component: CarrosDeFerrocarrilComponent;
  let fixture: ComponentFixture<CarrosDeFerrocarrilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosDeFerrocarrilComponent, TituloComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosDeFerrocarrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tablaHeadData as input', () => {
    const testHeadData = ['Header1', 'Header2'];
    component.tablaHeadData = testHeadData;
    fixture.detectChanges();
    expect(component.tablaHeadData).toEqual(testHeadData);
  });

  it('should have tablaFilaDatos as input', () => {
    const testFilaDatos: CarroFerrocarril[] = [
      { id: 1, nombre: 'Carro 1', fecha: new Date() },
      { id: 2, nombre: 'Carro 2', fecha: new Date() }
    ];
    component.tablaFilaDatos = testFilaDatos;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(testFilaDatos);
  });
});