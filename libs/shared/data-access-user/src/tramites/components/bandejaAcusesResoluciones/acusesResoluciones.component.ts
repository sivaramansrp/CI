import { BodyTablaAcuses, BodyTablaResolucion } from '../../../core/models/shared/consulta-generica.model';
import { CONSULTA_ACUSES, CONSULTA_RESOLUCIONES } from '../../../core/enums/consulta-generica.enum';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-acuses-resoluciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acusesResoluciones.component.html',
  styleUrl: './acusesResoluciones.component.css',
})
export class AcusesResolucionesComponent implements OnChanges {
  @Input() titulo!: string;
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  @Input() folio!: string;
  @Input() url!: string;

  /**
   * Implementación para la tabla de documentos de acuses.
   *
   */
  readonly encabezadoTablaAcuse: { valor: string, key: keyof BodyTablaAcuses }[] = [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ];  
  readonly datosTablaAcuse: BodyTablaAcuses[] = CONSULTA_ACUSES.datosTablaAcuses;
  /**
   * Implementación para la tabla de documentos de resolucion.
   *
   */
  readonly encabezadoTablaResolucion: { valor: string, key: keyof BodyTablaResolucion }[] = [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ];  
  readonly datosTablaResolucion: BodyTablaResolucion[] = CONSULTA_RESOLUCIONES.datosTablaResolucion;

  constructor(private router: Router) {
    // constructor por si lo requiremos en el futuro
  }
  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   *
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta'].currentValue) {
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }
  }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfAcuse(url: string): void {
    window.open(url, '_blank');
  }
  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  descargarPdfResolucion(url: string): void {
    window.open(url, '_blank');
  }

  salir(): void {
    this.router.navigate(['funcionario/app-seleccion-modulo']);
  }
}
