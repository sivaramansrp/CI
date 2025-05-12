import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { DestinatarioCatalogos } from '../../models/destinatario.model';
import { DestinatarioImitar } from '../../models/mercancia.model';
import { REGEX_CORREO_ELECTRONICO } from '@libs/shared/data-access-user/src';
import { REGEX_TELEFONO } from '@libs/shared/data-access-user/src';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente ModificarDestinatarioComponent.
 * Este componente gestiona la lógica y funcionalidad para la modificación de los datos de destinatarios.
 */
@Component({
  selector: 'app-modificar-destinatario',
  templateUrl: './modificar-destinatario.component.html',
  styleUrl: './modificar-destinatario.component.scss',
})
export class ModificarDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la modificación de destinatarios.
   * Inicializado posteriormente en el método `ngOnInit`.
   */
  modificarDestinatarioForm!: FormGroup;

  /**
   * Opciones para los botones de selección (radio) de tipo de persona.
   * Cada opción incluye una etiqueta y un valor asociado.
   */
  tipoPersonaRadioOptions: { label: string; value: string | number }[] = [];

  /**
   * Valor predeterminado para el tipo de persona.
   * Inicializado como "moral".
   */
  tipoPublicos = 'moral';

  /**
   * Catálogo de países disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  paisCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de estados disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de municipios disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  municipioCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de localidades disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  localidadCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de códigos postales disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  codigoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de colonias disponibles.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  coloniaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Estado actual de la solicitud 260910.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Subject para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas al momento de destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa servicios necesarios y carga datos de catálogos y opciones de destinatarios.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para manejar datos de la solicitud.
   * @param solicitud260910Store - Almacén que gestiona el estado de la solicitud.
   * @param solicitud260910Query - Consulta que permite observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query
  ) {
    this.obtenerDestinatarioCatalogos();
    this.obtenerDestinatarioRadio();
    this.obtenerDestinatarioImitar();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Se ejecuta automáticamente cuando el componente se inicializa.
   * Inicializa el formulario reactivo y actualiza los valores basados en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.modificarDestinatarioForm = this.fb.group({
      /** Tipo de persona, requerido. */
      tipoPersona: [
        this.solicitud260910State.tipoPersona,
        [Validators.required],
      ],
      /** RFC del destinatario, requerido con validación de longitud máxima. */
      modificarRFC: [
        this.solicitud260910State.modificarRFC,
        [Validators.required, Validators.maxLength(13)],
      ],
      /** Denominación o razón social del destinatario, requerido. */
      denominacion: [
        this.solicitud260910State.denominacion,
        [Validators.required, Validators.maxLength(30)],
      ],
      /** País asociado al domicilio, requerido (solo lectura). */
      domicilioPais: [
        { value: this.solicitud260910State.domicilioPais, disabled: true },
        [Validators.required],
      ],
      /** Estado asociado al domicilio, requerido. */
      domicilioEstado: [
        this.solicitud260910State.domicilioEstado,
        [Validators.required],
      ],
      /** Municipio asociado al domicilio, requerido. */
      domicilioMunicipio: [
        this.solicitud260910State.domicilioMunicipio,
        [Validators.required],
      ],
      /** Localidad asociada al domicilio, requerido. */
      domicilioLocalidad: [
        this.solicitud260910State.domicilioLocalidad,
        [Validators.required],
      ],
      /** Código postal del domicilio, requerido con validación de longitud máxima. */
      domicilioCodigo: [
        this.solicitud260910State.domicilioCodigo,
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Colonia asociada al domicilio. */
      domicilioColonia: [this.solicitud260910State.domicilioColonia],
      /** Calle del domicilio, requerido con validación de longitud máxima. */
      domiciliCalle: [
        this.solicitud260910State.domiciliCalle,
        [Validators.required, Validators.maxLength(68)],
      ],
      /** Número exterior del domicilio, requerido con validación de longitud máxima. */
      domiciliNumeroExterior: [
        this.solicitud260910State.domiciliNumeroExterior,
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Número interior del domicilio con validación de longitud máxima. */
      domiciliNumeroInterior: [
        this.solicitud260910State.domiciliNumeroInterior,
        [Validators.maxLength(10)],
      ],
      /** Código LADA asociado al domicilio. */
      domiciliLada: [this.solicitud260910State.domiciliLada],
      /** Número telefónico con validación de patrón. */
      domiciliTelefono: [
        this.solicitud260910State.domiciliTelefono,
        [Validators.maxLength(10), Validators.pattern(REGEX_TELEFONO)],
      ],
      /** Correo electrónico con validación de formato y longitud máxima. */
      domiciliCorreoElectronioco: [
        this.solicitud260910State.domiciliCorreoElectronioco,
        [
          Validators.pattern(REGEX_CORREO_ELECTRONICO),
          Validators.maxLength(30),
        ],
      ],
    });

    // Observa cambios en el estado y actualiza los valores en el formulario.
    this.solicitud260910Query.seleccionarSolicitud$.pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.modificarDestinatarioForm.patchValue({
            tipoPersona: this.solicitud260910State.tipoPersona,
            modificarRFC: this.solicitud260910State.modificarRFC,
            denominacion: this.solicitud260910State.denominacion,
            domicilioPais: this.solicitud260910State.domicilioPais,
            domicilioEstado: this.solicitud260910State.domicilioEstado,
            domicilioMunicipio: this.solicitud260910State.domicilioMunicipio,
            domicilioLocalidad: this.solicitud260910State.domicilioLocalidad,
            domicilioCodigo: this.solicitud260910State.domicilioCodigo,
            domicilioColonia: this.solicitud260910State.domicilioColonia,
            domiciliCalle: this.solicitud260910State.domiciliCalle,
            domiciliNumeroExterior:
              this.solicitud260910State.domiciliNumeroExterior,
            domiciliNumeroInterior:
              this.solicitud260910State.domiciliNumeroInterior,
            domiciliLada: this.solicitud260910State.domiciliLada,
            domiciliTelefono: this.solicitud260910State.domiciliTelefono,
            domiciliCorreoElectronioco:
              this.solicitud260910State.domiciliCorreoElectronioco,
          });
        })
      )
      .subscribe();
  }

  /**
   * Obtiene los catálogos relacionados con los datos del destinatario.
   * Incluye catálogos de países, estados, municipios, localidades, códigos postales y colonias.
   */
  obtenerDestinatarioCatalogos(): void {
    this.solicitudDatosService
      .obtenerDestinatarioCatalogos().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DestinatarioCatalogos) => {
          this.paisCatalogo = respuesta.paisCatalogo;
          this.estadoCatalogo = respuesta.estadoCatalogo;
          this.municipioCatalogo = respuesta.municipioCatalogo;
          this.localidadCatalogo = respuesta.localidadCatalogo;
          this.codigoCatalogo = respuesta.codigoCatalogo;
          this.coloniaCatalogo = respuesta.coloniaCatalogo;
        },
      });
  }

  /**
   * Obtiene las opciones de los botones de selección (radio) para el tipo de persona.
   */
  obtenerDestinatarioRadio(): void {
    this.solicitudDatosService
      .obtenerDestinatarioRadio().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: { label: string; value: string | number }[]) => {
          this.tipoPersonaRadioOptions = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos de destinatarios a imitar y actualiza el estado del país del domicilio.
   */
  obtenerDestinatarioImitar(): void {
    this.solicitudDatosService
      .obtenerDestinatarioImitar().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DestinatarioImitar) => {
          this.solicitud260910Store.setDomicilioPais(respuesta.domicilioPais);
        },
      });
  }

  /**
   * Actualiza el tipo de persona seleccionado en el Store.
   * @param evento - Valor del tipo de persona seleccionado (puede ser cadena o número).
   */
  setTipoPersona(evento: string | number): void {
    this.solicitud260910Store.setTipoPersona(evento);
  }

  /**
   * Actualiza el RFC del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setModificarRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setModificarRFC(VALOR);
  }

  /**
   * Actualiza la denominación del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDenominacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDenominacion(VALOR);
  }

  /**
   * Selecciona el país del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el país seleccionado.
   */
  seleccionaPais(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioPais(evento.id);
  }

  /**
   * Selecciona el estado del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el estado seleccionado.
   */
  seleccionaEstado(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioEstado(evento.id);
  }

  /**
   * Selecciona el municipio del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el municipio seleccionado.
   */
  seleccionaMunicipio(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioMunicipio(evento.id);
  }

  /**
   * Selecciona la localidad del domicilio y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la localidad seleccionada.
   */
  seleccionaLocalidad(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioLocalidad(evento.id);
  }

  /**
   * Selecciona el código postal del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el código postal seleccionado.
   */
  seleccionaCodigo(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioCodigo(evento.id);
  }

  /**
   * Selecciona la colonia del domicilio y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la colonia seleccionada.
   */
  seleccionaColonia(evento: Catalogo): void {
    this.solicitud260910Store.setDomicilioColonia(evento.id);
  }

  /**
   * Actualiza la calle del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliCalle(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioCalle(VALOR);
  }

  /**
   * Actualiza el número exterior del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliNumeroExterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioNumeroExterior(VALOR);
  }

  /**
   * Actualiza el número interior del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliNumeroInterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioNumeroInterior(VALOR);
  }

  /**
   * Actualiza el código LADA del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliLada(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioLada(VALOR);
  }

  /**
   * Actualiza el número telefónico del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioTelefono(VALOR);
  }

  /**
   * Actualiza el correo electrónico del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliCorreoElectronioco(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDomicilioCorreoElectronico(VALOR);
  }

  /**
   * Limpia todos los datos del formulario de destinatarios.
   */
  limpiarDestinatario(): void {
    this.modificarDestinatarioForm.reset();
  }

  /**
   * Guarda los datos del destinatario y los agrega al Store como un nuevo destinatario.
   * Si el formulario es inválido, no realiza la operación.
   */
  guardarDestinatario(): void {
    if (this.modificarDestinatarioForm.invalid) {
      return;
    }
    const OBJETO_JSON = {
      nombre: this.modificarDestinatarioForm.get('denominacion')?.value,
      rfc: this.modificarDestinatarioForm.get('modificarRFC')?.value,
      curp: '--',
      telefono: this.modificarDestinatarioForm.get('domiciliTelefono')?.value,
      correoElectronico: this.modificarDestinatarioForm.get(
        'domiciliCorreoElectronioco'
      )?.value,
      calle: this.modificarDestinatarioForm.get('domiciliCalle')?.value,
      numeroExterior: this.modificarDestinatarioForm.get(
        'domiciliNumeroExterior'
      )?.value,
      numeroInterior: this.modificarDestinatarioForm.get(
        'domiciliNumeroInterior'
      )?.value,
      pais: this.modificarDestinatarioForm.get('domicilioPais')?.value,
      colonia: this.modificarDestinatarioForm.get('domicilioColonia')?.value,
      municipio:
        this.modificarDestinatarioForm.get('domicilioMunicipio')?.value,
      localidad:
        this.modificarDestinatarioForm.get('domicilioLocalidad')?.value,
      estado: this.modificarDestinatarioForm.get('domicilioEstado')?.value,
      estado2: '--',
      codigo: this.modificarDestinatarioForm.get('domicilioCodigo')?.value,
    };
    this.solicitud260910Store.addDestinatarioDato(OBJETO_JSON);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Se utiliza para liberar recursos y eliminar suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
