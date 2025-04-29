import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosTabComponent } from './solicitud-datos.component';
import { TituloComponent, AlertComponent } from '@ng-mf/data-access-user';
import { TEXTOS } from '../../enums/texto-enum';
import { Solicitud } from '../../models/solicitud-pantallas.model';

describe('SolicitudDatosTabComponent', () => {
  let component: SolicitudDatosTabComponent;
  let fixture: ComponentFixture<SolicitudDatosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloComponent, AlertComponent, SolicitudDatosTabComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toEqual(TEXTOS);
  });

  test('should have colapsable set to true by default', () => {
    expect(component.colapsable).toBe(true);
  });

  test('should toggle colapsable when mostrarColapsable is called', () => {
    component.colapsable = true;
    component.mostrarColapsable();
    expect(component.colapsable).toBe(false);

    component.mostrarColapsable();
    expect(component.colapsable).toBe(true);
  });

  test('should have tablaHeadData as an empty array by default', () => {
    expect(component.tablaHeadData).toEqual([]);
  });

  test('should have tablaFilaDatos as an empty array by default', () => {
    expect(component.tablaFilaDatos).toEqual([]);
  });

  test('should accept tablaHeadData as input', () => {
    const mockHeadData = ['Column1', 'Column2'];
    component.tablaHeadData = mockHeadData;
    expect(component.tablaHeadData).toEqual(mockHeadData);
  });

  test('should accept tablaFilaDatos as input', () => {
    const mockFilaDatos: Solicitud[] = [
      {
        fechaCreacion: 'string',
        mercancia: 'string',
        cantidad: 'string',
        proovedor: 'string',
      },
    ];
    component.tablaFilaDatos = mockFilaDatos;
    expect(component.tablaFilaDatos).toEqual(mockFilaDatos);
  });
});
