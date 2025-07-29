import { RevisionDocumentalComponent } from './revision-documental.component';
import { PagoDeDerechosComponent } from '../../shared/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosComponent } from '../../shared/terceros-relacionados/terceros-relacionados.component';

describe('RevisionDocumentalComponent', () => {
  let component: RevisionDocumentalComponent;

  beforeEach(() => {
    component = new RevisionDocumentalComponent();
    // Mock child components
    component.pagoDeDerechos = {
      validarFormulario: jest.fn(() => true)
    } as unknown as PagoDeDerechosComponent;

    component.tercerosRelacionados = {
      validarFormulario: jest.fn(() => true)
    } as unknown as TercerosRelacionadosComponent;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties initialized', () => {
    expect(component.indice).toBe(1);
    expect(component.colapsable).toBe(true);
    expect(component.currentIndex).toBe(1);
    expect(component.rows).toEqual([]);
    expect(component.forma).toBe('');
  });

  it('should have a seleccionaTab method', () => {
    expect(typeof component.seleccionaTab).toBe('function');
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should validate formularios and return true when both child components return true', () => {
    const result = component.validarFormularios();
    expect(result).toBe(true);
    expect(component.pagoDeDerechos.validarFormulario).toHaveBeenCalled();
    expect(component.tercerosRelacionados.validarFormulario).toHaveBeenCalled();
  });

  it('should return false if pagoDeDerechos is missing', () => {
    component.pagoDeDerechos = undefined as any;
    const result = component.validarFormularios();
    expect(result).toBe(false);
  });

  it('should return false if tercerosRelacionados is missing', () => {
    component.tercerosRelacionados = undefined as any;
    const result = component.validarFormularios();
    expect(result).toBe(true);
  });

  it('should return false if child validation fails', () => {
    component.pagoDeDerechos.validarFormulario = jest.fn(() => false);
    component.tercerosRelacionados.validarFormulario = jest.fn(() => false);
    const result = component.validarFormularios();
    expect(result).toBe(false);
  });
});
