import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
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
   * Estado actual de la solicitud 260910.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Subject para manejar la destrucción del componente y cancelar las suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa los servicios y obtiene el catálogo de pagos de derechos.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para obtener datos relacionados con la solicitud.
   * @param solicitud260910Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260910Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query
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
      claveDeReferencia: [this.solicitud260910State.claveDeReferencia],
      /** Cadena de dependencia asociada al pago. */
      cadenaDeDependencia: [this.solicitud260910State.cadenaDeDependencia],
      /** Banco seleccionado para el pago. */
      banco: [this.solicitud260910State.banco],
      /** Llave de pago proporcionada por el sistema. */
      liaveDePago: [this.solicitud260910State.liaveDePago],
      /** Fecha en la que se realizó el pago. */
      fechaDePago: [this.solicitud260910State.fechaDePago],
      /** Importe total del pago realizado. */
      importeDePago: [this.solicitud260910State.importeDePago],
    });

    // Suscripción al estado de la solicitud y actualización del formulario reactivo.
    this.solicitud260910Query.seleccionarSolicitud$.pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: this.solicitud260910State.claveDeReferencia,
            cadenaDeDependencia: this.solicitud260910State.cadenaDeDependencia,
            banco: this.solicitud260910State.banco,
            liaveDePago: this.solicitud260910State.liaveDePago,
            fechaDePago: this.solicitud260910State.fechaDePago,
            importeDePago: this.solicitud260910State.importeDePago,
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
      .obtenerPagoDerechos().pipe(takeUntil(this.destroyNotifier$))
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
    this.solicitud260910Store.setClaveDeReferencia(VALOR);
  }

  /**
   * Actualiza la cadena de dependencia en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setCadenaDeDependencia(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setCadenaDeDependencia(VALOR);
  }

  /**
   * Actualiza el banco seleccionado en el Store.
   * @param evento - Objeto que contiene el banco seleccionado.
   */
  setBanco(evento: Catalogo): void {
    this.solicitud260910Store.setBanco(evento.id);
  }

  /**
   * Actualiza la llave de pago en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setLiaveDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setLiaveDePago(VALOR);
  }

  /**
   * Actualiza la fecha de pago seleccionada en el Store.
   * @param evento - Cadena con la fecha seleccionada.
   */
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260910Store.setFechaDePago(evento);
  }

  /**
   * Actualiza el importe del pago en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setImporteDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setImporteDePago(VALOR);
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