import { Component } from '@angular/core';
import { IMPORTANTE } from '../../constantes/fitosanitario.enum';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';

interface Fila {
  fraccionArancelaria: string;
  descripcionFraccion: string;
  descripcionMercancia: string;
  unidadMedidaTarifa: string;
  cantidadUMT: number;
  unidadMedidaComercializacion: string;
  cantidadUMC: number;
  nombre: string;
}
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent {
  /**
    * @description Tipo de selección para la tabla de solicitudes.
    * @type {TablaSeleccion}
    */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Configuración de columnas para la tabla principal.
   * @type {ConfiguracionColumna<Fila>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<Fila>[] = [
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 1 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 2 },
    { encabezado: 'Descripción de la mercancía', clave: (fila) => fila.descripcionMercancia, orden: 3 },
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.unidadMedidaTarifa, orden: 4 },
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 5 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.unidadMedidaComercializacion, orden: 6 },
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 7 },
    { encabezado: 'Nombre', clave: (fila) => fila.nombre, orden: 8 },
  ];
  IMPORTANTES: string = IMPORTANTE.Importante;
  cuerpoTabla: any[] = [];
}
