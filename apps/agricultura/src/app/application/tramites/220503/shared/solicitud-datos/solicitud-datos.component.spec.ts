import { SolicitudDatosTabComponent } from './solicitud-datos.component';
import { TEXTOS } from '../../enums/texto-enum';
import { Solicitud } from '../../models/solicitud-pantallas.model';
import { Subject } from 'rxjs';

describe('SolicitudDatosTabComponent', () => {
  let component: SolicitudDatosTabComponent;

  beforeEach(() => {
    component = new SolicitudDatosTabComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS set to enum TEXTOS', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should have colapsable set to true by default', () => {
    expect(component.colapsable).toBe(true);
  });

  it('should toggle colapsable when mostrarColapsable is called', () => {
    expect(component.colapsable).toBe(true);
    component.mostrarColapsable();
    expect(component.colapsable).toBe(false);
    component.mostrarColapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should have tablaHeadData as an empty array by default', () => {
    expect(component.tablaHeadData).toEqual([]);
  });

  it('should have tablaFilaDatos as an empty array by default', () => {
    expect(component.tablaFilaDatos).toEqual([]);
  });

  it('should accept tablaHeadData as input', () => {
    const headData = ['Col1', 'Col2'];
    component.tablaHeadData = headData;
    expect(component.tablaHeadData).toBe(headData);
  });

  it('should accept tablaFilaDatos as input', () => {
    const filaDatos: Solicitud[] = [{
      fechaCreacion: new Date().toISOString(),
      mercancia: 'Mercancia de prueba',
      cantidad: '10',
      proovedor: 'Proveedor de prueba'
    }];
    component.tablaFilaDatos = filaDatos;
    expect(component.tablaFilaDatos).toBe(filaDatos);
  });

  

  it('should have destroyed$ as a Subject', () => {
    expect(component['destroyed$']).toBeDefined();
  });
  it('should have destroyed$ initialized as a Subject', () => {
    expect(component['destroyed$']).toBeInstanceOf(Subject);
  });

  it('should have destroyed$ as a Subject', () => {
    expect(component['destroyed$']).toBeInstanceOf(Subject);
  });
});
