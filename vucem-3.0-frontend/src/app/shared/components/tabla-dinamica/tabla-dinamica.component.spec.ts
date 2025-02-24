import { EventEmitter } from '@angular/core';
import { TablaDinamicaComponent } from './tabla-dinamica.component';

describe('TablaDinamicaComponent', () => {
  let component: TablaDinamicaComponent<any>;
  let mockFilaSeleccionada: jasmine.SpyObj<EventEmitter<any>>;

  beforeEach(() => {
    // Create a mock of EventEmitter with a spy on 'emit' method
    mockFilaSeleccionada = jasmine.createSpyObj('EventEmitter', ['emit']);
    component = new TablaDinamicaComponent();
    component.filaSeleccionada = mockFilaSeleccionada;
    component.configuracionTabla = [
      { encabezado: 'Columna 1', clave: (row: any) => row.col1, orden: 3 },
      { encabezado: 'Columna 2', clave: (row: any) => row.col2, orden: 1 },
      { encabezado: 'Columna 3', clave: (row: any) => row.col3, orden: 2 }
    ];
  });

  it('debería devolver las columnas ordenadas por "orden"', () => {
    const configOrdenada = component.obtenerConfiguracionOrdenada();

    // Comprobamos que las columnas estén ordenadas correctamente
    expect(configOrdenada[0].orden).toBe(1);
    expect(configOrdenada[1].orden).toBe(2);
    expect(configOrdenada[2].orden).toBe(3);
  });

  it('debería devolver un arreglo vacío si configuracionTabla está vacío', () => {
    component.configuracionTabla = [];
    const configOrdenada = component.obtenerConfiguracionOrdenada();
    expect(configOrdenada.length).toBe(0);
  });

  it('debería actualizar idFilaSeleccionada y emitir la fila seleccionada correctamente', () => {
    const filaSeleccionadaMock = { calle: 'Calle 123', numeroExterior: '456' };
    const idFila = 1;

    // Llamamos al método con los valores simulados
    component.seleccionarFila(idFila, filaSeleccionadaMock);

    // Verificamos que 'idFilaSeleccionada' se haya actualizado correctamente
    expect(component.idFilaSeleccionada).toBe(idFila);

    // Verificamos que el método 'emit' haya sido llamado con la fila seleccionada
    expect(mockFilaSeleccionada.emit).toHaveBeenCalledWith(filaSeleccionadaMock);
  });

});
