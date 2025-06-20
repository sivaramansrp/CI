import { ComponentFixture } from '@angular/core/testing';
import { HistorialInspeccionFisicaComponent } from './historial-inspeccion-fisica.component';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';
import { HistorialInspeccionFisica } from '../../models/solicitud-pantallas.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistorialInspeccionFisicaComponent', () => {
  let component: HistorialInspeccionFisicaComponent;
  let fixture: ComponentFixture<HistorialInspeccionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HistorialInspeccionFisicaComponent, TituloComponent, HttpClientTestingModule],
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
    const TESTHEADDATA = ['Número parcialidad/remesa', 'Fracción arancelaria', 'Nico','Cantidad total en UMT','Cantidad parcial en UTM','Saldo pendiente','Fecha de ingreso'];
    component.tablaHeadData = TESTHEADDATA;
    fixture.detectChanges();
    expect(component.tablaHeadData).toEqual(TESTHEADDATA);
  });

  it('should have tablaFilaDatos as input', () => {
    const TESTFILADATOS: HistorialInspeccionFisica[] = [
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
    component.tablaFilaDatos = TESTFILADATOS;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(TESTFILADATOS);
  });
});
