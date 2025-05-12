/**
 * @componente
 * @nombre AgregarDestinatarioComponente
 * @descripción
 * Componente que gestiona la funcionalidad para agregar destinatarios o instalaciones en el trámite 220103.
 * Proporciona un formulario dinámico y maneja la interacción con el estado del trámite.
 */

import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  InputRadioComponent,
  ModeloDeFormaDinamica,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Subject, takeUntil } from 'rxjs';

import {
  CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO,
  CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_INSTALACI,
  TIPO_PERSONA,
} from '../../constantes/sanidad-acuicola-importacion.enum';

import { Tramite220103Query } from '../../estados/queries/tramites220103.query';

import {
  Tramite220103State,
  Tramite220103Store,
} from '../../estados/tramites/tramites220103.store';

import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';

/**
 * Componente para gestionar destinatarios e instalaciones del trámite 220103.
 * Maneja formularios dinámicos para dos modos: Destinatario e Instalación.
 * Integra con el store Akita para gestión del estado y servicios externos.
 */
@Component({
  selector: 'app-agregar-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputRadioComponent,
    FormasDinamicasComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.scss',
})
export class AgregarDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Emite un evento para solicitar el cierre del modal que contiene este componente.
   */
  @Output() closeModal = new EventEmitter<void>();
  /**
   * Indicador para determinar si el componente opera en modo 'Instalación' (true) o 'Destinatario' (false).
   * Afecta qué configuración de formulario y qué lógica de guardado se utiliza.
   * @default false
   */
  @Input() isInstalacionMode: boolean = false;

  /**
   * Enumeración que contiene los posibles tipos de persona (Física o Moral).
   * Utilizado para configurar la lógica de visibilidad del formulario.
   */
  tipoPersona = TIPO_PERSONA;

  /**
   * Subject utilizado para notificar la destrucción del componente y desuscribirse
   * de observables, previniendo fugas de memoria.
   */
  private notificadorDestruccion$ = new Subject<void>();

  /**
   * Configuración del formulario dinámico para agregar un destinatario.
   * Define los campos, validaciones y apariencia del formulario en modo 'Destinatario'.
   */
  formularioConfiguracion: ModeloDeFormaDinamica[] =
    CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO;
  /**
   * Configuración del formulario dinámico para agregar una instalación.
   * Define los campos, validaciones y apariencia del formulario en modo 'Instalación'.
   */
  formularioConfiguracionInstalacion: ModeloDeFormaDinamica[] =
    CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_INSTALACI;

  /**
   * Formulario reactivo para manejar los datos al agregar un destinatario.
   * Contiene los controles definidos en `formularioConfiguracion`.
   */
  formularioAgregarDestinatario!: FormGroup;
  /**
   * Formulario reactivo para manejar los datos al agregar una instalación.
   * Contiene los controles definidos en `formularioConfiguracionInstalacion`.
   */
  formularioAgregarInstalacion!: FormGroup;

  /**
   * Almacena el estado actual del trámite 220103 obtenido del store.
   * Utilizado para prellenar campos y tomar decisiones lógicas.
   */
  estadoSeleccionado!: Tramite220103State;

  /**
   * Constructor del componente. Inyecta las dependencias necesarias.
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite220103Query: Tramite220103Query,
    private tramite220103Store: Tramite220103Store,
    private servicio: SanidadAcuicolaImportacionService
  ) {}

  /**
   * Método del ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos iniciales (colonias, estado del trámite),
   * inicializa el formulario reactivo y configura la visibilidad inicial de los campos
   * según el tipo de persona.
   */
  ngOnInit(): void {
    this.obtenerColonia(); // Obtiene opciones para el campo colonia
    this.obtenerEstadoValor(); // Obtiene el estado actual del trámite
    this.inicializarFormulario(); // Crea el FormGroup principal
    this.cambiarValoresTipoPersona(); // Ajusta visibilidad inicial de campos persona física/moral
  }

  /**
   * Inicializa el formulario reactivo principal (`formularioAgregarDestinatario` o `formularioAgregarInstalacion`)
   * basándose en el valor de `isInstalacionMode`. Establece el control 'tipoPersona' con
   * validación requerida y valor inicial obtenido del estado del trámite.
   */
  inicializarFormulario(): void {
    if (!this.isInstalacionMode) {
      this.formularioAgregarDestinatario = this.formBuilder.group({
        tipoPersona: [
          this.estadoSeleccionado?.['tipoPersona'] || '', // Valor inicial desde el estado o vacío
          Validators.required, // Campo obligatorio
        ],
      });
    } else {
      this.formularioAgregarInstalacion = this.formBuilder.group({
        tipoPersona: [
          this.estadoSeleccionado?.['tipoPersona'] || '', // Valor inicial desde el estado o vacío
          Validators.required, // Campo obligatorio
        ],
      });
    }
  }

  /**
   * Se suscribe al observable del estado del trámite (`Tramite220103Query`)
   * para obtener y almacenar el estado actual en `estadoSeleccionado`.
   * La suscripción se gestiona con `takeUntil` para limpiarse automáticamente
   * en `ngOnDestroy`.
   */
  obtenerEstadoValor(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado: Tramite220103State) => {
        this.estadoSeleccionado = estado;
        // Nota: Podría ser necesario volver a inicializar o actualizar
        // el formulario aquí si el estado cambia después de ngOnInit.
      });
  }

  /**
   * Llama al servicio `SanidadAcuicolaImportacionService` para obtener el catálogo de colonias.
   * Una vez recibidas las opciones, busca el campo 'colonia' en la configuración del
   * formulario de destinatario (`formularioConfiguracion`) y actualiza sus `opciones`.
   * La suscripción se gestiona con `takeUntil`.
   */
  obtenerColonia(): void {
    this.servicio
      .getColonia()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((opciones: Catalogo[]) => {
        // Encuentra el campo 'colonia' en la configuración del formulario de destinatario
        const CAMPO_COLONIA_DEST = this.formularioConfiguracion.find(
          (campo) => campo.campo === 'colonia'
        );
        if (CAMPO_COLONIA_DEST) {
          CAMPO_COLONIA_DEST.opciones = opciones; // Asigna las opciones obtenidas
        }
        // Encuentra el campo 'colonia' en la configuración del formulario de instalación
        const CAMPO_COLONIA_INST = this.formularioConfiguracionInstalacion.find(
          (campo) => campo.campo === 'colonia'
        );
        if (CAMPO_COLONIA_INST) {
          CAMPO_COLONIA_INST.opciones = opciones; // Asigna las opciones obtenidas
        }
      });
  }

  /**
   * Ajusta la propiedad `mostrar` de los campos del formulario dinámico
   * ('nombre', 'primerApellido', 'segundoApellido', 'razonSocial')
   * basándose en el 'tipoPersona' seleccionado en el estado (`estadoSeleccionado`).
   * Opera sobre la configuración de formulario correcta (`formularioConfiguracion` o
   * `formularioConfiguracionInstalacion`) según `isInstalacionMode`.
   * Muestra los campos de persona física si es 'Fisica', y 'razonSocial' si es 'Moral'.
   */
  cambiarValoresTipoPersona(): void {
    const TIPO_PERSONA_SELECCIONADA = this.estadoSeleccionado?.['tipoPersona'];

    if (!TIPO_PERSONA_SELECCIONADA) {
      // Si no hay tipo seleccionado, no hace nada o podría ocultar todos.
      return;
    }

    // Selecciona la configuración de formulario adecuada basada en el modo.
    const formConfig = this.isInstalacionMode
      ? this.formularioConfiguracionInstalacion
      : this.formularioConfiguracion;

    // Encuentra todos los campos relevantes de una vez para eficiencia.
    const fieldNames = [
      'nombre',
      'primerApellido',
      'segundoApellido',
      'razonSocial',
    ];
    // Crea un objeto que contiene los campos encontrados en la configuración del formulario.
    const fields = fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = formConfig.find((campo) => campo.campo === fieldName);
      return acc;
    }, {} as Record<string, ModeloDeFormaDinamica | undefined>);

    // Verifica si se encontraron todos los campos necesarios.
    const allFieldsFound = fieldNames.every((name) => fields[name]);

    if (allFieldsFound) {
      const isFisica = TIPO_PERSONA_SELECCIONADA === 'Fisica';

      // Actualiza la visibilidad ('mostrar') para todos los campos encontrados.
      fields['nombre']!.mostrar = isFisica;
      fields['primerApellido']!.mostrar = isFisica;
      fields['segundoApellido']!.mostrar = isFisica;
      fields['razonSocial']!.mostrar = !isFisica; // Muestra razón social si NO es física (es Moral)
    } else {
      console.warn(
        'Algunos campos de tipo de persona no fueron encontrados en la configuración del formulario:',
        formConfig
      );
    }
  }

  /**
   * Actualiza una propiedad específica en el estado del trámite (`Tramite220103Store`).
   * Si el campo actualizado es 'tipoPersona', llama a `cambiarValoresTipoPersona`
   * para ajustar la visibilidad de los campos dependientes.
   *
   */
  establecerCambioDeValor(
    evento: { campo: string; valor: unknown },
    prop?: string
  ): void {
    this.tramite220103Store.setTramite220103State(
      evento.campo,
      evento.valor,
      prop
    );
    // Si el campo modificado es 'tipoPersona', actualiza la visibilidad del formulario.
    if (evento.campo === 'tipoPersona') {
      this.cambiarValoresTipoPersona();
    }
  }

  /**
   * Gestiona el proceso de guardar el destinatario o la instalación.
   * Verifica si el componente está en modo instalación.
   * Valida el formulario correspondiente (`formularioAgregarInstalacion` o `formularioAgregarDestinatario`).
   * Si es válido:
   * 1. Llama al método de servicio apropiado (`getInstalacion` o `getDestinatario`) para actualizar la tabla correspondiente en el estado.
   * 2. Emite el evento `closeModal` para cerrar el modal.
   * 3. Resetea el formulario correspondiente.
   * 4. Resetea el estado temporal en `Tramite220103Store` usado por este modal.
   * Si no es válido, marca todos los controles del formulario como 'touched' para mostrar errores de validación.
   */
  guardarDestinatario(): void {
    if (this.isInstalacionMode) {
      // Modo Instalación
      if (this.formularioAgregarInstalacion.valid) {
        this.getInstalacion(); // Llama al servicio para obtener/actualizar datos de instalación
        this.closeModal.emit(); // Cierra el modal
        this.formularioAgregarInstalacion.reset(); // Limpia el formulario
        this.tramite220103Store.reset(); // Resetea el estado temporal del store
      } else {
        // Marca todos los controles como tocados para mostrar errores
        this.formularioAgregarInstalacion.markAllAsTouched();
      }
    } else {
      // Modo Destinatario
      if (this.formularioAgregarDestinatario.valid) {
        this.getDestinatario(); // Llama al servicio para obtener/actualizar datos de destinatario
        this.closeModal.emit(); // Cierra el modal
        this.formularioAgregarDestinatario.reset(); // Limpia el formulario
        this.tramite220103Store.reset(); // Resetea el estado temporal del store
      } else {
        // Marca todos los controles como tocados para mostrar errores
        this.formularioAgregarDestinatario.markAllAsTouched();
      }
    }
    // Nota: Se marcó como 'touched' ambos formularios en el 'else' original,
    // pero es más preciso marcar solo el formulario activo. He corregido eso.
  }

  /**
   * Llama al método `getDestinatario` del servicio `SanidadAcuicolaImportacionService`.
   * Se suscribe al resultado y actualiza la propiedad 'tablaDestinatario' en el
   * estado del trámite (`Tramite220103Store`) con los datos recibidos.
   * La suscripción se gestiona con `takeUntil`.
   * Nota: El nombre `getDestinatario` podría ser confuso si en realidad *guarda* basado en el estado actual.
   * Asume que obtiene datos actualizados para la tabla después de una operación implícita de guardado/creación.
   */
  getDestinatario(): void {
    this.servicio
      .getDestinatario() // Asume que esto obtiene la lista actualizada o el nuevo ítem.
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((valor) => {
        // Actualiza la tabla de destinatarios en el estado global.
        this.tramite220103Store.setTramite220103State(
          'tablaDestinatario',
          valor
        );
      });
  }

  /**
   * Llama al método `getInstalacion` del servicio `SanidadAcuicolaImportacionService`.
   * Se suscribe al resultado y actualiza la propiedad 'tablaInstalacion' en el
   * estado del trámite (`Tramite220103Store`) con los datos recibidos.
   * La suscripción se gestiona con `takeUntil`.
   * Nota: Similar a `getDestinatario`, asume que obtiene datos actualizados para la tabla.
   */
  getInstalacion(): void {
    this.servicio
      .getInstalacion() // Asume que esto obtiene la lista actualizada o el nuevo ítem.
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((valor) => {
        // Actualiza la tabla de instalaciones en el estado global.
        this.tramite220103Store.setTramite220103State(
          'tablaInstalacion',
          valor
        );
      });
  }

  /**
   * Método del ciclo de vida de Angular. Se ejecuta justo antes de que el componente sea destruido.
   * Emite un valor en `notificadorDestruccion$` y lo completa. Esto provoca que todas
   * las suscripciones que usan `takeUntil(this.notificadorDestruccion$)` se desuscriban
   * automáticamente, previniendo fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next(); // Notifica a las suscripciones para que se completen.
    this.notificadorDestruccion$.complete(); // Completa el subject.
  }
}
