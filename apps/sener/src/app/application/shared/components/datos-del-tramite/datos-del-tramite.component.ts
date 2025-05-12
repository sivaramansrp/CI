import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoOpción } from '../../constantes/vehiculos-adaptados.enum';
/**
 * @description Componente para manejar los detalles del trámite.
 * Este componente proporciona entradas dinámicas para configurar un formulario
 * y opciones relacionadas con los catálogos y solicitudes.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent {
  /**
   * @description El grupo de formulario reactivo que contiene los datos del trámite.
   * Este formulario se utiliza para capturar y validar la información del usuario.
   */
  @Input() form!: FormGroup;

  /**
   * @description Campos dinámicos configurados para el formulario.
   * Cada campo incluye una etiqueta, un marcador de posición, una propiedad requerida
   * y el nombre del control asociado.
   */
  @Input() inputFields: {
    label: string;
    placeholder: string;
    required: boolean;
    controlName: string;
  }[] = [];

  /**
   * @description Matriz de catálogos que contienen opciones adicionales para el formulario.
   * Los catálogos permiten seleccionar valores predefinidos en los campos del formulario.
   */
  @Input() catalogosArray: Catalogo[][] = [];

  /**
   * @description Opciones de solicitud configuradas para el formulario.
   * Estas opciones representan las diferentes configuraciones disponibles para el trámite.
   */
  @Input() solicitudOpciones: ProductoOpción[] = [];

  /**
   * @description Emisor de eventos para comunicar cambios de valores al componente padre.
   * Este evento se dispara cuando se actualizan los valores del formulario.
   * @event setValoresStoreEvent
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
  }>();

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control que se desea verificar.
   * @returns Devuelve `true` si el control es inválido y está marcado como tocado o modificado; de lo contrario, devuelve `false`.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @description Emite un evento para actualizar valores en el almacén.
   * Este método se utiliza para notificar al componente padre sobre los cambios realizados
   * en un campo específico del formulario.
   * @param form El grupo de formulario que contiene los datos.
   * @param campo El campo específico que se está modificando.
   * @param metodoNombre Nombre del método relacionado con el cambio.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo });
  }
}