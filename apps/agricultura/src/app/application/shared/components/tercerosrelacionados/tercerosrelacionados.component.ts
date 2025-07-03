import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input } from '@angular/core';
import {TercerosrelacionadosTable, TercerosrelacionadosdestinoTable} from '../../models/tercerosrelacionados.model';
import { CommonModule } from '@angular/common';
import { SELECCIONADO } from '../../constantes/tercerosrelacionados.enum';

@Component({
  selector: 'app-tercerosrelacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent,AlertComponent,TablaDinamicaComponent],
  templateUrl: './tercerosrelacionados.component.html',
  styleUrl: './tercerosrelacionados.component.scss',
})
export class TercerosrelacionadosComponent {
  seleccionado:string = SELECCIONADO;
    /**
       * Indica si el formulario debe mostrarse en modo solo lectura.
       *
       * @type {boolean}
       * @default false
       * @see https://compodoc.app/
       *
       * @description
       * Cuando es verdadero, el formulario se presenta únicamente para visualización,
       * deshabilitando la edición de los campos.
       */
      @Input() esFormularioSoloLectura:boolean = false;

    /**
     * @description
     * Tipo de selección para la solicitud.
     * Utiliza la enumeración TablaSeleccion para definir el tipo de selección.
     * @type {TablaSeleccion}
     */
    tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.CHECKBOX;
      /**
       * @description
       * Configuración de las columnas para la tabla de solicitudes de datos.
       * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
       * @type {ConfiguracionColumna<SolicitudData>[]}
       */
      configuracionColumnasExportador: ConfiguracionColumna<TercerosrelacionadosTable>[] = [
        { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.exportadorNombre, orden: 1 },
        { encabezado: 'Teléfono', clave: (fila) => fila.exportadorTelefono, orden: 2 },
        { encabezado: 'Correo', clave: (fila) => fila.exportadorCorreo, orden: 3 },
        { encabezado: 'Domicilio', clave: (fila) => fila.exportadorDomicilio, orden: 4 },
        { encabezado: 'País', clave: (fila) => fila.exportadorPais, orden: 5 },
      ];
        cuerpoTablaExportador: TercerosrelacionadosTable[] = [];

         /**
       * @description
       * Configuración de las columnas para la tabla de solicitudes de datos.
       * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
       * @type {ConfiguracionColumna<SolicitudData>[]}
       */
      configuracionColumnasDestino: ConfiguracionColumna<TercerosrelacionadosdestinoTable>[] = [
        { encabezado: 'Nombre/denominación o razón social', clave: (fila) => fila.exportadorNombre, orden: 1 },
        { encabezado: 'Teléfono', clave: (fila) => fila.exportadorTelefono, orden: 2 },
        { encabezado: 'Correo', clave: (fila) => fila.exportadorCorreo, orden: 3 },
        { encabezado: 'Calle', clave: (fila) => fila.exportadorCalle, orden: 4 },
        { encabezado: 'Número exterior', clave: (fila) => fila.exportadorNumeroExterior, orden: 5 },
        { encabezado: 'Número interior', clave: (fila) => fila.exportadorNumeroInterior, orden: 6 },
        { encabezado: 'País', clave: (fila) => fila.exportadorPais, orden: 7 },
        { encabezado: 'Colonia', clave: (fila) => fila.colonia, orden: 8 },
        { encabezado: 'Municipio/Alcaldía', clave: (fila) => fila.municipioAlcaldia, orden: 9 },
        { encabezado: 'Entidad Federativa', clave: (fila) => fila.entidadFederativa, orden: 10 },
        { encabezado: 'Código Postal', clave: (fila) => fila.codigoPostal, orden: 11 },
      ];
      cuerpoTablaDestino:TercerosrelacionadosdestinoTable[]=[];
}
