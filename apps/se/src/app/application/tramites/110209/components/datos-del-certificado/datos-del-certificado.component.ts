
/**
 * Este componente maneja el formulario de datos del certificado.
 */

import { CONFIGURACION_MERCANCIAS, Mercancias } from '../../constantes/certificado-sgp.enum';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MercanciasService } from '../../services/mercancias/mercancias.service';
import { REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';


/**
 * Este componente maneja el formulario de datos del certificado.
 */

@Component({
  selector: 'app-datos-del-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './datos-del-certificado.component.html',
  styleUrl: './datos-del-certificado.component.scss',
})
export class DatosDelCertificadoComponent implements OnInit, OnDestroy {

  /**
   * Formulario para los datos del certificado.
   * @type {FormGroup}
   */
  datosDelCertificadoForm!: FormGroup;

  /**
   * Selección de la tabla inicializada como RADIO.
   * @type {TablaSeleccion}
   */
  seleccionTabla: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Datos que se mostrarán en la tabla.
   * @type {any}
   */
  datosTabla!: Mercancias[];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Configuración de la tabla que se utilizará en el componente.
   * @type {any}
   */
  configuracionTabla = CONFIGURACION_MERCANCIAS;

  /**
   * Mercancías seleccionadas en la tabla.
   * @type {Mercancias}
   */
  mercanciasSeleccionadas!: Mercancias;

  /**
   * Evento que se emite para modificar el certificado.
   * @type {EventEmitter<boolean>}
   */
  @Output() modificarEventCertificado: EventEmitter<boolean> = new EventEmitter<boolean>(false);

   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de mercancías.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {MercanciasService} service - Servicio para obtener datos de mercancías.
   * @param {Tramite110209Store} tramite110209Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110209Query} tramite110209Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: MercanciasService, 
    private tramite110209Store: Tramite110209Store, 
    private tramite110209Query: Tramite110209Query ,private router: Router,
    private consultaQuery: ConsultaioQuery
  ) {
    this.datosDelCertificadoForm = this.fb.group({
      observaciones: ['',Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL)]
    });

     /**
 * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyed$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.actualizarEstadoCampos();
        })
      )
      .subscribe();

  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las mercancías y los valores del store.
   */
  ngOnInit(): void {
    this.getMercancias();
    this.getValoresStore();
  }

  /**
   * Habilita o deshabilita dinámicamente los campos del formulario
   * según el estado de solo lectura del formulario.
   *
   * @returns void
   * @description Si el formulario está en modo solo lectura, deshabilita ambos campos; de lo contrario, los habilita.
   */
  actualizarEstadoCampos(): void {
    const CAMPOS = ['observaciones'];
    CAMPOS.forEach(campo => {
      const CONTROL = this.datosDelCertificadoForm.get(campo);
      if (CONTROL) {
        if (this.esFormularioSoloLectura) {
          CONTROL.disable();
        } else {
          CONTROL.enable();
        }
      }
    });
  }

  /**
   * Obtiene las mercancías desde el servicio.
   */
  getMercancias(): void {
    this.service.getMercancias().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:Mercancias[]) => {
        this.datosTabla = data;
      }
    );
  }

   /**
     * Establece el valor en Tramite110209Store para el campo especificado del formulario.
     * 
     * @param {FormGroup} form - El grupo de formularios que contiene el campo.
     * @param {string} campo - El nombre del campo a obtener y guardar en el store.
     * @returns {void}
     */
    setValoresStore(form: FormGroup, campo: string): void {
      const VALOR = form.get(campo)?.value;
      this.tramite110209Store.setTramite110209({ [campo]: VALOR });
    }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110209$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.datosDelCertificadoForm.patchValue({
            observaciones: seccionState.observaciones
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene las mercancías seleccionadas desde el evento.
   * @param {Mercancias} $event - Las mercancías seleccionadas.
   */
  getMercanciasSeleccionadas($event: Mercancias): void {
    this.mercanciasSeleccionadas = $event;
  }

  /**
   * Navega a una nueva ruta y emite un evento para modificar el certificado.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Establece las mercancías seleccionadas en el store `tramite110209Store`.
   * 2. Emite un evento `modificarEventCertificado` con el valor `false`.
   * 
   * @returns {void}
   */
  navegar(): void {
    this.tramite110209Store.setTramite110209({ ['mercanciasSeleccionadas']: this.mercanciasSeleccionadas });
    this.modificarEventCertificado.emit(true);
  }


  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}