import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ExpedicionCertificadosAsignacionDirectaComponent } from '../../../../shared/components/expedicion-certificados-asignacion-directa/expedicion-certificados-asignacion-directa.component';
import { FormularioDinamico } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent {
  /** 
   * Configuración del formulario para la persona moral 
   */
  persona: FormularioDinamico[] = [];

  /** 
   * Configuración del formulario para el domicilio fiscal 
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Referencia al componente de expedición de certificados para asignación directa.
   * @type {ExpedicionCertificadosAsignacionDirectaComponent}
   */
  @ViewChild(ExpedicionCertificadosAsignacionDirectaComponent) expedicionCertificadosAsignacionDirectaComponent!: ExpedicionCertificadosAsignacionDirectaComponent;

  /**
   * Evento que se emite para indicar si se debe mostrar un error directo en el formulario.
   * @type {EventEmitter<boolean>}
   * @description Este evento se utiliza para notificar al componente padre si se debe mostrar un error directo en el formulario.
   */
  @Output() mostrarErrorDirecto: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   */
  constructor() {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Muestra un error directo en el formulario.
   * @param event - Indica si se debe mostrar un error directo.
   */
  mostrarErrorEvent(event: boolean) : void {
    this.mostrarErrorDirecto.emit(event);
  }
}