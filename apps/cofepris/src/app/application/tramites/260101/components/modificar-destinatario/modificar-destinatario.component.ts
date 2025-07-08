import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DestinatarioCatalogos } from '../../models/destinatario.model';
import { DestinatarioImitar } from '../../models/mercancia.model';
import { REGEX_CORREO_ELECTRONICO } from '@libs/shared/data-access-user/src';
import { REGEX_TELEFONO } from '@libs/shared/data-access-user/src';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
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
  standalone:true,
  imports:[
      ModificarDestinatarioComponent,
      CommonModule,
      ReactiveFormsModule,
      CatalogoSelectComponent,
      FormsModule,
      InputRadioComponent,
      TituloComponent
    ]
})
export class ModificarDestinatarioComponent
  implements OnInit, OnDestroy, AfterViewInit
{
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
   * Estado actual de la solicitud 260101.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Subject para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas al momento de destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa servicios necesarios y carga datos de catálogos y opciones de destinatarios.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para manejar datos de la solicitud.
   * @param solicitud260101Store - Almacén que gestiona el estado de la solicitud.
   * @param solicitud260101Query - Consulta que permite observar cambios en el estado de la solicitud.
   * @param consultaioQuery - Consulta para obtener el estado actual de la consulta.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
    private consultaioQuery: ConsultaioQuery
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
    this.inicializarEstadoFormulario();
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   *
   * Llama al método `inicializarEstadoFormulario()` para configurar el estado del formulario
   * una vez que todos los elementos de la vista están disponibles.
   */
  ngAfterViewInit(): void {
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
      this.modificarDestinatarioForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.modificarDestinatarioForm.enable();
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
    this.modificarDestinatarioForm = this.fb.group({
      /** Tipo de persona, requerido. */
      tipoPersona: [
        this.solicitud260101State.tipoPersona,
        [Validators.required],
      ],
      /** RFC del destinatario, requerido con validación de longitud máxima. */
      modificarRFC: [
        this.solicitud260101State.modificarRFC,
        [Validators.required, Validators.maxLength(13)],
      ],
      /** Denominación o razón social del destinatario, requerido. */
      denominacion: [
        this.solicitud260101State.denominacion,
        [Validators.required, Validators.maxLength(30)],
      ],
      /** País asociado al domicilio, requerido (solo lectura). */
      domicilioPais: [
        { value: this.solicitud260101State.domicilioPais, disabled: true },
        [Validators.required],
      ],
      /** Estado asociado al domicilio, requerido. */
      domicilioEstado: [
        this.solicitud260101State.domicilioEstado,
        [Validators.required],
      ],
      /** Municipio asociado al domicilio, requerido. */
      domicilioMunicipio: [
        this.solicitud260101State.domicilioMunicipio,
        [Validators.required],
      ],
      /** Localidad asociada al domicilio, requerido. */
      domicilioLocalidad: [
        this.solicitud260101State.domicilioLocalidad,
        [Validators.required],
      ],
      /** Código postal del domicilio, requerido con validación de longitud máxima. */
      domicilioCodigo: [
        this.solicitud260101State.domicilioCodigo,
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Colonia asociada al domicilio. */
      domicilioColonia: [this.solicitud260101State.domicilioColonia],
      /** Calle del domicilio, requerido con validación de longitud máxima. */
      domiciliCalle: [
        this.solicitud260101State.domiciliCalle,
        [Validators.required, Validators.maxLength(68)],
      ],
      /** Número exterior del domicilio, requerido con validación de longitud máxima. */
      domiciliNumeroExterior: [
        this.solicitud260101State.domiciliNumeroExterior,
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Número interior del domicilio con validación de longitud máxima. */
      domiciliNumeroInterior: [
        this.solicitud260101State.domiciliNumeroInterior,
        [Validators.maxLength(10)],
      ],
      /** Código LADA asociado al domicilio. */
      domiciliLada: [this.solicitud260101State.domiciliLada],
      /** Número telefónico con validación de patrón. */
      domiciliTelefono: [
        this.solicitud260101State.domiciliTelefono,
        [Validators.maxLength(10), Validators.pattern(REGEX_TELEFONO)],
      ],
      /** Correo electrónico con validación de formato y longitud máxima. */
      domiciliCorreoElectronioco: [
        this.solicitud260101State.domiciliCorreoElectronioco,
        [
          Validators.pattern(REGEX_CORREO_ELECTRONICO),
          Validators.maxLength(30),
        ],
      ],
    });

    // Observa cambios en el estado y actualiza los valores en el formulario.
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260101State) => {
          this.solicitud260101State = respuesta;
          this.modificarDestinatarioForm.patchValue({
            tipoPersona: this.solicitud260101State.tipoPersona,
            modificarRFC: this.solicitud260101State.modificarRFC,
            denominacion: this.solicitud260101State.denominacion,
            domicilioPais: this.solicitud260101State.domicilioPais,
            domicilioEstado: this.solicitud260101State.domicilioEstado,
            domicilioMunicipio: this.solicitud260101State.domicilioMunicipio,
            domicilioLocalidad: this.solicitud260101State.domicilioLocalidad,
            domicilioCodigo: this.solicitud260101State.domicilioCodigo,
            domicilioColonia: this.solicitud260101State.domicilioColonia,
            domiciliCalle: this.solicitud260101State.domiciliCalle,
            domiciliNumeroExterior:
              this.solicitud260101State.domiciliNumeroExterior,
            domiciliNumeroInterior:
              this.solicitud260101State.domiciliNumeroInterior,
            domiciliLada: this.solicitud260101State.domiciliLada,
            domiciliTelefono: this.solicitud260101State.domiciliTelefono,
            domiciliCorreoElectronioco:
              this.solicitud260101State.domiciliCorreoElectronioco,
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
      .obtenerDestinatarioCatalogos()
      .pipe(takeUntil(this.destroyNotifier$))
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
      .obtenerDestinatarioRadio()
      .pipe(takeUntil(this.destroyNotifier$))
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
      .obtenerDestinatarioImitar()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DestinatarioImitar) => {
          this.solicitud260101Store.setDomicilioPais(respuesta.domicilioPais);
        },
      });
  }

  /**
   * Actualiza el tipo de persona seleccionado en el Store.
   * @param evento - Valor del tipo de persona seleccionado (puede ser cadena o número).
   */
  setTipoPersona(evento: string | number): void {
    this.solicitud260101Store.setTipoPersona(evento);
  }

  /**
   * Actualiza el RFC del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setModificarRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setModificarRFC(VALOR);
  }

  /**
   * Actualiza la denominación del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDenominacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDenominacion(VALOR);
  }

  /**
   * Selecciona el país del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el país seleccionado.
   */
  seleccionaPais(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioPais(evento.id);
  }

  /**
   * Selecciona el estado del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el estado seleccionado.
   */
  seleccionaEstado(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioEstado(evento.id);
  }

  /**
   * Selecciona el municipio del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el municipio seleccionado.
   */
  seleccionaMunicipio(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioMunicipio(evento.id);
  }

  /**
   * Selecciona la localidad del domicilio y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la localidad seleccionada.
   */
  seleccionaLocalidad(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioLocalidad(evento.id);
  }

  /**
   * Selecciona el código postal del domicilio y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el código postal seleccionado.
   */
  seleccionaCodigo(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioCodigo(evento.id);
  }

  /**
   * Selecciona la colonia del domicilio y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la colonia seleccionada.
   */
  seleccionaColonia(evento: Catalogo): void {
    this.solicitud260101Store.setDomicilioColonia(evento.id);
  }

  /**
   * Actualiza la calle del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliCalle(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioCalle(VALOR);
  }

  /**
   * Actualiza el número exterior del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliNumeroExterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioNumeroExterior(VALOR);
  }

  /**
   * Actualiza el número interior del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliNumeroInterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioNumeroInterior(VALOR);
  }

  /**
   * Actualiza el código LADA del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliLada(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioLada(VALOR);
  }

  /**
   * Actualiza el número telefónico del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioTelefono(VALOR);
  }

  /**
   * Actualiza el correo electrónico del domicilio en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setDomiciliCorreoElectronioco(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setDomicilioCorreoElectronico(VALOR);
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
    this.solicitud260101Store.addDestinatarioDato(OBJETO_JSON);
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
