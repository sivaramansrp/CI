import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosDeFerrocarrilComponent } from './carros-de-ferrocarril.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { carrosDeFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';

describe('CarrosDeFerrocarrilComponent', () => {
  let component: CarrosDeFerrocarrilComponent;
  let fixture: ComponentFixture<CarrosDeFerrocarrilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ CarrosDeFerrocarrilComponent, TituloComponent],
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
    const testHeadData = ['Número de parcialidad/remesa', 'Cantidad de carros de ferrocarril'];
    component.tablaHeadData = testHeadData;
    fixture.detectChanges();
    expect(component.tablaHeadData).toEqual(testHeadData);
  });

  it('should have tablaFilaDatos as input', () => {
    const testFilaDatos: carrosDeFerrocarril[] = [
      { 
        idInspeccionFisica: 1, 
        numeroAutorizacion: 'P001', 
        numeroPartidaMercancia: '10', 
        numeroTotalCarros: 1,
      },
      { 
        idInspeccionFisica: 2, 
        numeroAutorizacion: 'P002', 
        numeroPartidaMercancia: '15', 
        numeroTotalCarros: 1,
      },
    ];
    component.tablaFilaDatos = testFilaDatos;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(testFilaDatos);
  });
});