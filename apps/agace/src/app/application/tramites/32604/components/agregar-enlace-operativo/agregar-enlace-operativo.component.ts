import { ConsultaioQuery, Notificacion, NotificacionesComponent, Pedimento } from '@ng-mf/data-access-user';
import { EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit, Output } from '@angular/core';
import { REGEX_TELEFONO_DIGITOS, TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { EnlaceOperativo } from '../../models/empresas-comercializadoras.model';
import { RepresentanteLegal } from '../../models/empresas-comercializadoras.model';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
/**
 * Componente para agregar un enlace operativo.
 * Utiliza un formulario reactivo para capturar y emitir la información del enlace operativo.
 */
@Component({
  selector: 'app-agregar-enlace-operativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent,NotificacionesComponent],
  templateUrl: './agregar-enlace-operativo.component.html',
  styleUrl: './agregar-enlace-operativo.component.scss',
})
/**
 * Componente para agregar un enlace operativo.
 * Utiliza un formulario reactivo para capturar y emitir la información del enlace operativo.
 */
export class AgregarEnlaceOperativoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para capturar los datos del enlace operativo */
  agregarEnlaceOperativoForm!: FormGroup;

  /** Subject para manejar la destrucción de suscripciones */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud */
  solicitud32604State: Solicitud32604State = {} as Solicitud32604State;

  /** Evento para emitir el objeto EnlaceOperativo al componente padre */
  @Output() agregarEnlaceOperativo = new EventEmitter<EnlaceOperativo>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
/**
 * Propiedad que almacena la notificación actual que se mostrará al usuario.
 */
public nuevaNotificacion!: Notificacion;

/**
 * Índice del elemento que se desea eliminar de la lista de pedimentos.
 */
elementoParaEliminar!: number;

/**
 * Lista de pedimentos asociados al componente.
 */
pedimentos: Array<Pedimento> = [];

  /**
   * Constructor de la clase que inicializa las dependencias necesarias.
   *
   * @param fb - Constructor de formularios reactivos.
   * @param empresasComercializadorasService - Servicio para obtener y gestionar los datos de la solicitud.
   * @param solicitud32604Store - Store de Akita para el estado de la solicitud 32604.
   * @param solicitud32604Query - Consulta (query) de Akita para acceder al estado de la solicitud 32604.
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /** Inicializa el formulario y suscribe al estado de la solicitud */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

 /**
 * Método que elimina un pedimento de la lista de pedimentos.
 *
 * @param borrar Indica si se debe proceder con la eliminación del pedimento.
 *               Si es `true`, se elimina el pedimento en el índice especificado
 *               por la propiedad `elementoParaEliminar`.
 */
eliminarPedimento(borrar: boolean): void {
  if (borrar) {
    this.pedimentos.splice(this.elementoParaEliminar, 1);
  }
}
 
 /**
 * Método que abre un modal para mostrar una notificación al usuario.
 *
 * @param i Índice del elemento que se desea eliminar. Por defecto, es 0.
 *          Este índice se asigna a la propiedad `elementoParaEliminar`.
 *
 * La notificación muestra un mensaje de alerta indicando que el contribuyente
 * no fue encontrado y solicita verificar el RFC.
 */
abrirModal(i: number = 0): void {
  this.nuevaNotificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: 'EI contribuyente no fue encontrado.Favor de verificar el RFC.',
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };

  this.elementoParaEliminar = i;
}

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.agregarEnlaceOperativoForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarEnlaceOperativoForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario `agregarEnlaceOperativoForm` con los valores actuales
   * del estado `solicitud32604State`.
   *
   * Algunos campos están deshabilitados porque no deben ser editables por el usuario.
   * Aplica validaciones como `required`, `email`, y un patrón para el teléfono.
   *
   * Además, se suscribe a los cambios del estado de la solicitud (`selectSolicitud$`)
   * y actualiza los valores del formulario mediante `patchValue`.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.agregarEnlaceOperativoForm = this.fb.group({
      agregarEnlaceRfcTercero: [
        this.solicitud32604State.rfcTercero,
        [Validators.required],
      ],
      agregarEnlaceRfc: [
        { value: this.solicitud32604State.rfc, disabled: true },
      ],
      agregarEnlaceNombre: [
        { value: this.solicitud32604State.nombre, disabled: true },
      ],
      agregarEnlaceApellidoPaterno: [
        { value: this.solicitud32604State.apellidoPaterno, disabled: true },
      ],
      agregarEnlaceApellidoMaterno: [
        { value: this.solicitud32604State.apellidoMaterno, disabled: true },
      ],
      agregarEnlaceCiudadEstado: [
        {
          value: this.solicitud32604State.agregarEnlaceCiudadEstado,
          disabled: true,
        },
      ],
      agregarEnlaceCargo: [this.solicitud32604State.agregarEnlaceCargo],
      agregarEnlaceTelefono: [
        this.solicitud32604State.telefono,
        [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)],
      ],
      agregarEnlaceCorreoElectronico: [
        this.solicitud32604State.correoElectronico,
        [Validators.required, Validators.email],
      ],
      agregarEnlaceSuplente: [this.solicitud32604State.agregarEnlaceSuplente],
    });

    /** Escucha los cambios en el estado de la solicitud y actualiza el formulario */
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32604State) => {
          this.solicitud32604State = respuesta;
          this.agregarEnlaceOperativoForm.patchValue({
            agregarEnlaceRfcTercero: this.solicitud32604State.rfcTercero,
            agregarEnlaceRfc: this.solicitud32604State.rfc,
            agregarEnlaceNombre: this.solicitud32604State.nombre,
            agregarEnlaceApellidoPaterno:
              this.solicitud32604State.apellidoPaterno,
            agregarEnlaceApellidoMaterno:
              this.solicitud32604State.apellidoMaterno,
            agregarEnlaceCiudadEstado:
              this.solicitud32604State.agregarEnlaceCiudadEstado,
            agregarEnlaceCargo: this.solicitud32604State.agregarEnlaceCargo,
            agregarEnlaceTelefono: this.solicitud32604State.telefono,
            agregarEnlaceCorreoElectronico:
              this.solicitud32604State.correoElectronico,
            agregarEnlaceSuplente:
              this.solicitud32604State.agregarEnlaceSuplente,
          });
        })
      )
      .subscribe();
  }

  /**
   * Llama al servicio para obtener los datos del representante legal
   * y actualiza el estado con esos datos.
   */
  buscarTerceroNacionalIDC(): void {
    if (this.agregarEnlaceOperativoForm.get('rfcTercero')?.value) {
      this.empresasComercializadorasService
        .conseguirRepresentanteLegalDatos()
        .pipe(takeUntil(this.destroy$))
        .subscribe((respuesta: RepresentanteLegal) => {
          this.solicitud32604Store.actualizarEnlaceRfc(respuesta.rfc);
          this.solicitud32604Store.actualizarEnlaceNombre(respuesta.nombre);
          this.solicitud32604Store.actualizarEnlaceApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud32604Store.actualizarEnlaceApellidoMaterno(
            respuesta.apellidoMaterno
          );
          this.solicitud32604Store.actualizarEnlaceTelefono(respuesta.telefono);
          this.solicitud32604Store.actualizarEnlaceCorreoElectronico(
            respuesta.correoElectronico
          );
        });
    }
    this.abrirModal();
  }

  /** Actualiza el RFC del tercero en el store */
  actualizarRfcTercero(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarRfcTercero(VALOR);
  }

  /** Actualiza el teléfono en el store */
  actualizarTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTelefono(VALOR);
  }

  /** Actualiza el correo electrónico en el store */
  actualizarCorreoElectronico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarCorreoElectronico(VALOR);
  }

  /** Actualiza el cargo en el store */
  agregarEnlaceCargo(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarEnlaceCargo(VALOR);
  }

  /** Actualiza el valor del campo suplente en el store */
  actualizarEnlaceSuplente(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud32604Store.actualizarEnlaceSuplente(VALOR);
  }

  /**
   * Construye el objeto EnlaceOperativo con los valores del formulario
   * y lo emite al componente padre.
   */
  aceptarEnlaceSuplente(): void {
    const OBJETO_JSON: EnlaceOperativo = {
      rfc: this.agregarEnlaceOperativoForm.get('agregarEnlaceRfc')?.value,
      nombre: this.agregarEnlaceOperativoForm.get('agregarEnlaceNombre')?.value,
      apellidoPaterno: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceApellidoPaterno'
      )?.value,
      apellidoMaterno: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceApellidoMaterno'
      )?.value,
      claveCiudad: '',
      ciudad: this.agregarEnlaceOperativoForm.get('agregarEnlaceCiudadEstado')
        ?.value,
      cargo: this.agregarEnlaceOperativoForm.get('agregarEnlaceCargo')?.value,
      telefono: this.agregarEnlaceOperativoForm.get('agregarEnlaceTelefono')
        ?.value,
      correo: this.agregarEnlaceOperativoForm.get(
        'agregarEnlaceCorreoElectronico'
      )?.value,
      suplente:
        this.agregarEnlaceOperativoForm.get('agregarEnlaceSuplente')?.value ===
        true
          ? 'Maria López'
          : '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      colonia: '',
      codigoPostal: '',
      localidad: '',
      delegacionMunicipio: '',
    };
    this.agregarEnlaceOperativo.emit(OBJETO_JSON);
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.agregarEnlaceOperativoForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /** Finaliza todas las suscripciones para evitar fugas de memoria */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
