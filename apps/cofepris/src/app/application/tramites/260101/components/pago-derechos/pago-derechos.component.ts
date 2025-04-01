import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
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
   * Constructor del componente.
   * Inicializa los servicios y obtiene el catálogo de pagos de derechos.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para obtener datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
    this.obtenerPagoDerechos();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario reactivo y suscribe a cambios en el estado de la solicitud.
   */
  ngOnInit(): void {
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