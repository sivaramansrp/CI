import { TestBed } from '@angular/core/testing';
import { TercerosRelacionadosFabricanteComponent } from './terceros-relacionados-fabricante.component';
import { FABRICANTE_TABLA, OTROS_TABLA } from '../../../../shared/constantes/terceros-relacionados-fabricante.enum';
import { Fabricante, TablaSeleccion } from '@libs/shared/data-access-user/src';

describe('TercerosRelacionadosFabricanteComponent', () => {
  let component: TercerosRelacionadosFabricanteComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TercerosRelacionadosFabricanteComponent],
    });
    const FIXTURE = TestBed.createComponent(TercerosRelacionadosFabricanteComponent);
    component = FIXTURE.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar fabricanteTablaDatos como un arreglo vacío', () => {
    expect(component.fabricanteTablaDatos).toEqual([]);
  });

  it('debería inicializar checkbox con TablaSeleccion.CHECKBOX', () => {
    expect(component.checkbox).toBe(TablaSeleccion.CHECKBOX);
  });

  it('debería inicializar facturadorTablaDatos como un arreglo vacío', () => {
    expect(component.facturadorTablaDatos).toEqual([]);
  });

  it('debería inicializar otrosTablaDatos como un arreglo vacío', () => {
    expect(component.otrosTablaDatos).toEqual([]);
  });

  it('debería inicializar configuracionFabricante con FABRICANTE_TABLA', () => {
    expect(component.configuracionFabricante).toEqual(FABRICANTE_TABLA);
  });

  it('debería inicializar configuracionOtros con OTROS_TABLA', () => {
    expect(component.configuracionOtros).toEqual(OTROS_TABLA);
  });

  describe('generateConfiguracionTabla', () => {
    it('debería devolver un arreglo de configuración válido para una entrada dada', () => {
      const INPUT = [
        { encabezado: 'Nombre', clave: 'nombre' as keyof Fabricante },
        { encabezado: 'Dirección', clave: 'direccion' as keyof Fabricante },
      ];
      const RESULT = component.generateConfiguracionTabla(INPUT);

      expect(RESULT).toEqual([
        {
          encabezado: 'Nombre',
          clave: expect.any(Function),
          orden: 1,
        },
        {
          encabezado: 'Dirección',
          clave: expect.any(Function),
          orden: 2,
        },
      ]);

      // Probar la función `clave`
      const TEST_ITEM = { nombre: 'Fabricante A', direccion: 'Dirección A' };
      expect(RESULT[0].clave(TEST_ITEM)).toBe('Fabricante A');
      expect(RESULT[1].clave(TEST_ITEM)).toBe('Dirección A');
    });

    it('debería manejar un arreglo de entrada vacío', () => {
      const RESULT = component.generateConfiguracionTabla([]);
      expect(RESULT).toEqual([]);
    });
  });
});