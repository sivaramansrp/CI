import { Catalogo, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente PagoDerechosComponent.
 * Gestiona la lógica y el formulario para el registro del pago de derechos.
 */
@Component({
  selector: 'app-pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del pago de derechos.
   */
  pagoDeDerechosForm!: FormGroup;

  /**
   * Catálogo de bancos para seleccionar dentro del formulario.
   * Inicializado como un objeto vacío.
   */
  bancoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Configuración para el campo de fecha de pago.
   * Incluye nombre de etiqueta, estado de requerido, y habilitación.
   */
  fechaPago: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };

  /**
   * Estado actual de la solicitud 260101.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Subject para manejar la destrucción del componente y cancelar las suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa los servicios y obtiene el catálogo de pagos de derechos.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para obtener datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar cambios en el estado de la solicitud.
   * @param consultaioQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
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
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.obtenerPagoDerechos();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario reactivo y suscribe a cambios en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
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
      this.pagoDeDerechosForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.pagoDeDerechosForm = this.fb.group({
      /** Clave de referencia del pago. */
      claveDeReferencia: [this.solicitud260101State.claveDeReferencia],
      /** Cadena de dependencia asociada al pago. */
      cadenaDeDependencia: [this.solicitud260101State.cadenaDeDependencia],
      /** Banco seleccionado para el pago. */
      banco: [this.solicitud260101State.banco],
      /** Llave de pago proporcionada por el sistema. */
      liaveDePago: [this.solicitud260101State.liaveDePago],
      /** Fecha en la que se realizó el pago. */
      fechaDePago: [this.solicitud260101State.fechaDePago],
      /** Importe total del pago realizado. */
      importeDePago: [this.solicitud260101State.importeDePago],
    });

    // Suscripción al estado de la solicitud y actualización del formulario reactivo.
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260101State) => {
          this.solicitud260101State = respuesta;
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: this.solicitud260101State.claveDeReferencia,
            cadenaDeDependencia: this.solicitud260101State.cadenaDeDependencia,
            banco: this.solicitud260101State.banco,
            liaveDePago: this.solicitud260101State.liaveDePago,
            fechaDePago: this.solicitud260101State.fechaDePago,
            importeDePago: this.solicitud260101State.importeDePago,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el catálogo de pagos de derechos desde el servicio y actualiza `bancoCatalogo`.
   */
  obtenerPagoDerechos(): void {
    this.solicitudDatosService
      .obtenerPagoDerechos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.bancoCatalogo = respuesta;
        },
      });
  }

  /**
   * Actualiza la clave de referencia del pago en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setClaveDeReferencia(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeReferencia(VALOR);
  }

  /**
   * Actualiza la cadena de dependencia en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setCadenaDeDependencia(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setCadenaDeDependencia(VALOR);
  }

  /**
   * Actualiza el banco seleccionado en el Store.
   * @param evento - Objeto que contiene el banco seleccionado.
   */
  setBanco(evento: Catalogo): void {
    this.solicitud260101Store.setBanco(evento.id);
  }

  /**
   * Actualiza la llave de pago en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setLiaveDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setLiaveDePago(VALOR);
  }

  /**
   * Actualiza la fecha de pago seleccionada en el Store.
   * @param evento - Cadena con la fecha seleccionada.
   */
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260101Store.setFechaDePago(evento);
  }

  /**
   * Actualiza el importe del pago en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setImporteDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setImporteDePago(VALOR);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Libera los recursos y elimina las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
