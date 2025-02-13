import { ComponentFixture } from '@angular/core/testing';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { TestBed } from '@angular/core/testing';
import { solicitud } from '../../../../core/models/220502/solicitud-pantallas.model';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [SolicitudDatosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default colapsable value as true', () => {
    expect(component.colapsable).toBeTrue();
  });

  it('should toggle colapsable when mostrarColapsable is called', () => {
    component.colapsable = true;
    component.mostrarColapsable();
    expect(component.colapsable).toBeFalse();
    component.mostrarColapsable();
    expect(component.colapsable).toBeTrue();
  });

  it('should have tablaHeadData as input', () => {
    const testHeadData = ['Fecha Creación', 'Mercancía','Cantidad','Proovedor'];
    component.tablaHeadData = testHeadData;
    fixture.detectChanges();
    expect(component.tablaHeadData).toEqual(testHeadData);
  });

  it('should have tablaFilaDatos as input', () => {
    const testFilaDatos: solicitud[] = [
      {
        fechaCreacion: '2025-02-02 19:50:08:0',
        mercancia: 'descripcion',
        cantidad: '1000000',
        proovedor: 'erick',
      },
      {
        fechaCreacion: '2025-02-02 19:50:08:0',
        mercancia: 'descripcion',
        cantidad: '1000000',
        proovedor: 'erick',
      },
    ];
    component.tablaFilaDatos = testFilaDatos;
    fixture.detectChanges();
    expect(component.tablaFilaDatos).toEqual(testFilaDatos);
  });
});
