import { Component, Input } from '@angular/core';

/**
 * Texto de alerta utilizado en el componente.
 * @constant {string}
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.'; // Define the constant

/**
 * Interfaz para definir la estructura de las filas.
 */
interface Row {
  nombre: string;
  telefono: string;
  correo: string;
  domicilio: string;
  pais: string;
}

/**
 * Interfaz para definir la estructura de las filas con detalles adicionales.
 */
interface Rows {
  nombre: string;
  telefono: string;
  correo: string;
  calle: string;
  exterior: number;
  interior: number;
  pais: string;
}

/**
 * Componente para gestionar los terceros relacionados.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent {
  /**
   * Texto de alerta utilizado en el componente.
   * @type {string}
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Indica si la barra de desplazamiento está habilitada.
   * @type {boolean}
   */
  @Input() enableScrollbar: boolean = false;

  /**
   * Lista de elementos de tipo Row.
   * @type {Row[]}
   */
  items: Row[] = [
    {
      nombre: 'Miriam Lopez Solis',
      telefono: '52-2298456543',
      correo: 'miriam@gmail.com',
      domicilio: 'este es un domicilio address',
      pais: 'ANGOLA(REPUBLIC DE)',
    },
  ];

  /**
   * Lista de elementos de tipo Rows.
   * @type {Rows[]}
   */
  persona: Rows[] = [
    {
      nombre: 'Miriam Lopez Solis',
      telefono: '52-2298456543',
      correo: 'miriam@gmail.com',
      calle: '#10',
      exterior: 856,
      interior: 1,
      pais: 'MEXICO(ESTAD UNIDOS MEXICANOS',
    },
  ];

  // Otros miembros de la clase...
}
