/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import ProductorTabla from 'libs/shared/theme/assets/json/90201/productor-indirecto-tabla.json';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { ProductorIndirectoTabla } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { FormsModule } from '@angular/forms';

/**
 * Componente ProductorIndirecto que se utiliza para mostrar y gestionar los ProductorIndirecto.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, TablaDinamicaComponent, CommonModule,
 * FormsModule y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 *
 * @component
 */
@Component({
  selector: 'app-productor-indirecto',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent, FormsModule],
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss',
})
export class ProductorIndirectoComponent {
  /**
   * Configuración para las columnas de la tabla en el componente Productor Indirecto.
   * Cada configuración de columna incluye el nombre del encabezado, una función clave para extraer el valor de un elemento y el orden de la columna.
   *
   * @type {ConfiguracionColumna<any>[]}
   * @property {string} encabezado - El nombre del encabezado de la columna.
   * @property {(item: any) => any} clave - Una función para extraer el valor de un elemento para la columna.
   * @property {number} orden - El orden de la columna en la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'registro', clave: (item: any) => item.registro, orden: 1 },
    {
      encabezado: 'denominacion',
      clave: (item: any) => item.denominación,
      orden: 2,
    },
    { encabezado: 'correo', clave: (item: any) => item.correo, orden: 3 },
  ];

  /**
   * Un arreglo de objetos `ProductorIndirectoTabla` que representa los datos para la tabla de productor indirecto.
   * Se inicializa con los valores de `ProductorTabla`.
   */
  public tablaDatos: ProductorIndirectoTabla[] = ProductorTabla;
  /**
   * Representa el tipo de selección de checkbox utilizado en el componente.
   * Esto se establece al valor de `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Representa el RFC (Registro Federal de Contribuyentes) de un usuario.
   * Este es un identificador único utilizado para fines fiscales en México.
   */
  public rfc: string = '';
}
