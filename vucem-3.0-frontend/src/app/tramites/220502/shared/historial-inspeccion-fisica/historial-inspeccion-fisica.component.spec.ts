import { ComponentFixture } from '@angular/core/testing';
import { HistorialInspeccionFisicaComponent } from './historial-inspeccion-fisica.component';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { historialInspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';

describe('HistorialInspeccionFisicaComponent', () => {
  let component: HistorialInspeccionFisicaComponent;
  let fixture: ComponentFixture<HistorialInspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HistorialInspeccionFisicaComponent, TituloComponent],
    }).compileComponents();
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
    const testHeadData = ['Número parcialidad/remesa', 'Fracción arancelaria', 'Nico','Cantidad total en UMT','Cantidad parcial en UTM','Saldo pendiente','Fecha de ingreso'];
    component.tablaHeadData = testHeadData;
    fixture.detectChanges();
    expect(component.tablaHeadData).toEqual(testHeadData);
  });

  it('should have tablaFilaDatos as input', () => {
    const testFilaDatos: historialInspeccionFisica[] = [
      {
        numeroPartidaMercancia: '12345',
        fraccionArancelaria: '0101.21.00',
        nico: 'Si',
        cantidadUmt: '1000',
        cantidadInspeccion: '500',
        saldoPendiente: '500',
        fechaInspeccionString: '2023-10-01',
      },
      {
        numeroPartidaMercancia: '67890',
        fraccionArancelaria: '0202.30.00',
        nico: 'No',
        cantidadUmt: '2000',
        cantidadInspeccion: '1500',
        saldoPendiente: '500',
        fechaInspeccionString: '2023-10-02',
      },
    ];
    component.tablaFilaDatos = testFilaDatos;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(testFilaDatos);
  });
});
