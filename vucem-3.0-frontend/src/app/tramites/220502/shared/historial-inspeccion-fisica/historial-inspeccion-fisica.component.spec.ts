import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialInspeccionFisicaComponent } from './historial-inspeccion-fisica.component';
import { TituloComponent } from '../../titulo/titulo.component';
import { InspeccionFisica } from '../models/inspeccion-fisica.model';

describe('HistorialInspeccionFisicaComponent', () => {
  let component: HistorialInspeccionFisicaComponent;
  let fixture: ComponentFixture<HistorialInspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialInspeccionFisicaComponent, TituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialInspeccionFisicaComponent);
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
    const testFilaDatos: InspeccionFisica[] = [
      { id: 1, nombre: 'Inspeccion 1', fecha: new Date() },
      { id: 2, nombre: 'Inspeccion 2', fecha: new Date() }
    ];
    component.tablaFilaDatos = testFilaDatos;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(testFilaDatos);
  });
});