/**
 * Componente que representa la asignación de recursos o información.
 * Este componente sirve como base para futuras implementaciones relacionadas con asignaciones.
 */
import { Component, ViewChild } from '@angular/core';
import { RepresentacionFederalComponent } from '../../components/representacion-federal/representacion-federal.component';
import { SeleccionDelCupoComponent } from '../../components/seleccion-del-cupo/seleccion-del-cupo.component';
/**
 * Componente que representa la asignación de recursos o información.
 * Este componente sirve como base para futuras implementaciones relacionadas con asignaciones.
 */
@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent {

  /**
   * Referencia al componente hijo de representación federal.
   */
  @ViewChild('representacionFederal') representacionFederal!: RepresentacionFederalComponent;
  /**
   * Referencia al componente hijo de selección del cupo.
   */
  @ViewChild('seleccionDelCupo') seleccionDelCupo!: SeleccionDelCupoComponent;

  /**
   * Índice actual de la asignación.
   */
  indice: number = 0;
 
  /**
   * Estado que indica si una asignación está activa.
   */
  asignacionActiva: boolean = false;
 
  /**
   * Mensaje de estado de la asignación.
   */
  mensajeEstado: string = '';
 
  /**
   * Constructor del componente AsignacionComponent.
   * Inicializa el mensaje de estado.
   */
  constructor() {
    this.actualizarMensajeEstado();
  }
 
  /**
   * Selecciona una asignación específica basada en el índice proporcionado.
   * @param i Índice de la asignación a seleccionar.
   */
  seleccionarAsignacion(i: number): void {
    this.indice = i;
    this.asignacionActiva = true;
    this.actualizarMensajeEstado();
  }
 
  /**
   * Restablece la asignación actual, desactivándola y reiniciando el índice.
   */
  resetAsignacion(): void {
    this.indice = 0;
    this.asignacionActiva = false;
    this.actualizarMensajeEstado();
  }
 
  /**
   * Actualiza el mensaje de estado según el estado de la asignación.
   */
  actualizarMensajeEstado(): void {
    this.mensajeEstado = this.asignacionActiva ? 'Asignación activa' : 'No hay asignación activa';
  }

  /**
   * Valida todos los formularios de los componentes hijos de datos-empresa.
   * Marca todos los campos como tocados para mostrar errores de validación.
   * 
   * @returns {boolean} `true` si todos los formularios son válidos, `false` en caso contrario
   */
  public validarFormularios(): boolean {
    let isValid = true;

    // Validar formulario de representación federal
    if (this.representacionFederal && this.representacionFederal.representacionForm) {
      if (this.representacionFederal.representacionForm.invalid) {
        this.representacionFederal.representacionForm.markAllAsTouched();
        isValid = false;
      }
    }

    // Validar formulario de datos de la solicitud
    if (this.seleccionDelCupo && this.seleccionDelCupo.seleccionForm && this.seleccionDelCupo.datosTablaCupo.length === 0) {
      if (this.seleccionDelCupo.seleccionForm.invalid) {
        this.seleccionDelCupo.seleccionForm.markAllAsTouched();
        isValid = false;
      }
      if (this.seleccionDelCupo.datosTablaCupo.length === 0) {
        this.seleccionDelCupo.esTocado = true;
      }
    }

    return isValid;
  }
}