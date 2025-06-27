import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputCheckComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Tramite30401Store } from '../../estados/tramites30401.store';

/**
 * Componente que representa un permiso expedido.
 * Este componente es parte del flujo de trabajo del trámite 30401.
 */
@Component({
  selector: 'app-permiso-expedido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputCheckComponent,
  ],
  templateUrl: './permiso-expedido.component.html',
  styleUrl: './permiso-expedido.component.scss',
})
export class permisoComponent implements OnInit {
  /**
   * Formulario inicializado para gestionar los datos del componente.
   */
  inicializarFormulario!: FormGroup;

  /**
   * Nombre del grupo de formulario que será utilizado.
   */
  @Input() grupoDeFormulario!: string;

  /**
   * Título que se mostrará en el componente.
   */
  @Input() titulo!: string;

  /**
   * Nota sobre el capital social que se mostrará en el formulario.
   */
  @Input() capitalSocialNota!: string;

  /**
   * Nota sobre la representada que se mostrará en el formulario.
   */
  @Input() miRepresentadaNota!: string;

  /**
   * Indica si el formulario es de solo lectura.
   * Si es true, los campos del formulario no serán editables.
   */
@Input() esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param grupoDeFormaRaiz - Directiva que proporciona acceso al formulario raíz.
   * @param tramite30401Store - Servicio para gestionar el estado del trámite 30401.
   */

  constructor(
    public grupoDeFormaRaiz: FormGroupDirective,
    private tramite30401Store: Tramite30401Store
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método de inicialización del componente.
   * Obtiene el grupo de formulario correspondiente del formulario raíz.
   */
  ngOnInit(): void {
    this.inicializarFormulario = this.grupoDeFormaRaiz.control.get(
      this.grupoDeFormulario
    ) as FormGroup;
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.tramite30401Store.establecerDatos({ [campo]: CONTROL.value });
    }
  }
  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.inicializarFormulario.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }
}
