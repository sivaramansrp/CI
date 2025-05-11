import { Component, OnDestroy, OnInit } from '@angular/core';
import { FORMULARIO_CERTIFICACION_DETALLES, MENSAJE_MODAL, TITULO_MODAL } from '../../constantes/tramite5601.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite5601State, Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
/**
 * Componente para gestionar las certificaciones, incluyendo su visualización y edición.
 * Se utiliza en un módulo independiente con los componentes necesarios importados.
 */
@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.scss',
})
export class CertificacionesComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para gestionar los datos de certificación.
   */
  formularioCertificacion!: FormGroup;

  /**
   * Variable para controlar la visibilidad del modal.
   * Puede ser 'show' para mostrar el modal o una cadena vacía para ocultarlo.
   */
  modal: string = '';

  /**
   * Título del modal que se muestra al usuario.
   */
  tituloModal!: string;

  /**
   * Mensaje del modal que se muestra al usuario.
   */
  mensajeModal!: string;

  /**
   * Estado actual de la certificación, obtenido desde el store.
   */
  public certificacionState!: Tramite5601State;

  /**
 * Un Subject que emite un valor `void` cuando el componente es destruido.
 * Se utiliza para gestionar y limpiar suscripciones, evitando fugas de memoria.
 */
  private destroyed$: Subject<void> = new Subject();

  public pagoDeDerechosFormData = FORMULARIO_CERTIFICACION_DETALLES;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite5601Store - Store para gestionar el estado del trámite 5601.
   * @param tramite5601Query - Query para obtener datos del estado del trámite 5601.
   */
  constructor(private fb: FormBuilder, private tramite5601Store: Tramite5601Store,
    private tramite5601Query: Tramite5601Query) {
    // Inicializa el formulario de certificación
  }

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Configura el formulario reactivo y suscribe al estado de certificación.
   */
  ngOnInit(): void {

    this.tramite5601Query.selectCertificacion$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.certificacionState = seccionState;
        })
      )
      .subscribe();
  }

  mostrarModalSiSeleccionado(): void {
    this.tituloModal = TITULO_MODAL; // Asigna el título del modal.
    this.mensajeModal = MENSAJE_MODAL; // Asigna el mensaje del modal.
    this.abrirModal(); // Abre el modal.
  }

  /**
   * Abre el modal estableciendo su estado en 'show'.
   */
  abrirModal(): void {
    this.modal = 'show';
  }

  /**
   * Cierra el modal y limpia los valores de título y mensaje.
   */
  cerrarModal(): void {
    this.modal = '';
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  /**
   * Confirma la acción del modal y lo cierra.
   */
  confirmarAccion(): void {
    this.cerrarModal();
  }

  /**
   * Cancela la acción del modal y lo cierra.
   */
  cancelarAccion(): void {
    this.cerrarModal();
  }


  /**
   * Actualiza un valor en el store basado en el formulario.
   * @param form - Formulario reactivo.
   * @param campo - Nombre del campo en el formulario.
   * @param metodoNombre - Nombre del método en el store para actualizar el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5601Store): void {
    const VALOR = form.get(campo)?.value; // Obtiene el valor del campo.
    (this.tramite5601Store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método del store con el valor.
  }


  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.tramite5601Store.setDynamicFieldValue(event.campo, event.valor);
      if (event.campo === 'tieneCertificacion') {
        this.mostrarModalSiSeleccionado();
      }
    }
  }


  /**
 * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
 * Este método completa el observable destroyed$ para cancelar las suscripciones activas.
 */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
