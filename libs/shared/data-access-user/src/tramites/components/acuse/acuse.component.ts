import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ACUSE_SERVICIOS_EXTRAORDINARIOS } from '../../../core/enums/constantes-alertas.enum';
import { AlertComponent } from '../alert/alert.component';
import { BodyTablaAcuse } from '../../../core/models/shared/catalogos.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-component-acuse',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './acuse.component.html',
  styleUrl: './acuse.component.scss',
})
export class AcuseComponent implements OnChanges {
  @Input() titulo!: string;
  @Input() txtAlerta!: string;
  @Input() subtitulo!: string;
  @Input() folio!: string;
  @Input() url!: string;

  readonly encabezadoTablaAcuse: { valor: string, key: keyof BodyTablaAcuse }[] = [
    {
      key: 'id',
      valor: 'No.',
    },
    {
      key: 'documento',
      valor: 'Documento.',
    },
  ];  
  readonly datosTablaAcuse: BodyTablaAcuse[] = ACUSE_SERVICIOS_EXTRAORDINARIOS.datosTablaAcuse;
  public verPdf = AcuseComponent.verPdf;

  constructor(private router: Router) {
    // Lógica de inicialización si es necesario
  }
  /**
   * Método que se ejecuta cuando uno o más inputs del componente cambian.
   *
   * @param changes - Objeto que contiene los cambios de los inputs del componente.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['txtAlerta'].currentValue) {
      console.log('Texto de alerta actualizado:', changes['txtAlerta'].currentValue);
      
      this.txtAlerta = changes['txtAlerta'].currentValue;
    }
  }

  /**
   * Abre un archivo PDF en una nueva pestaña del navegador.
   *
   * @param {string} url - La URL del archivo PDF que se va a abrir.
   * @returns {void}
   */
  static verPdf(url: string): void {
    window.open(url, '_blank');
  }

  salir(): void {
    this.router.navigate(['/seleccion-tramite']);
  }
}
