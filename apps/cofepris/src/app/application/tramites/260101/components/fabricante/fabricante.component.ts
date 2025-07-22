import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Destinatario,
  DestinatarioCatalogos,
} from '../../models/destinatario.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Fabricante } from '../../models/fabricante.model';
import { REGEX_CORREO_ELECTRONICO } from '@libs/shared/data-access-user/src';
import { REGEX_TELEFONO } from '@libs/shared/data-access-user/src';
import { RadioOptions } from '../../models/solicitud-datos.model';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TercerosDestinatarioImitar } from '../../models/mercancia.model';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente FabricanteComponent.
 * Este componente gestiona la lógica y funcionalidad para la modificación de los datos de fabricantes.
 */
@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrl: './fabricante.component.scss',
  standalone: true,
  imports: [
    FabricanteComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    FormsModule,
    InputRadioComponent,
    TituloComponent,
  ],
})
export class FabricanteComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() cerrarModal: EventEmitter<Destinatario> =
    new EventEmitter<Destinatario>();
  /**
   * Formulario reactivo para la de fabricantes.
   * Inicializado posteriormente en el método `ngOnInit`.
   */
  fabricanteComponentForm!: FormGroup;

  /**
   * Opciones para los botones de selección (radio) de tipo de persona.
   * Cada opción incluye una etiqueta y un valor asociado.
   */
  tipoPersonaRadioOptions: RadioOptions[] = [];

  tercerosNacionalidadRadioOptions: RadioOptions[] = [];

  /**
   * Valor predeterminado para el tipo de persona.
   * Inicializado como "moral".
   */
  tipoPublicos: string | number = 1;

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

  @Input() datosDestinatario: Fabricante[] = [] as Fabricante[];

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
    this.obtenerTercerosNacionalidadRadioOptions();
    this.obtenerFabricanteRadio();
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
      this.fabricanteComponentForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.fabricanteComponentForm.enable();
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
    this.fabricanteComponentForm = this.fb.group({
      tercerosNacionalidad: [this.solicitud260101State.tercerosNacionalidad],
      tercerosTipoPersona: [
        this.solicitud260101State.tercerosTipoPersona,
        [Validators.required],
      ],
      tercerosRFC: [
        this.solicitud260101State.tercerosRFC,
        [Validators.required, Validators.maxLength(13)],
      ],
      tercerosCurp: [
        this.solicitud260101State.tercerosCurp,
        [Validators.required, Validators.maxLength(18)],
      ],
      tercerosDenominacion: [this.solicitud260101State.tercerosDenominacion],
      tercerosDenominacionNombre: [
        this.solicitud260101State.tercerosDenominacionNombre,
      ],
      tercerosApellidoPaterno: [
        this.solicitud260101State.tercerosApellidoPaterno,
      ],
      tercerosApellidoMaterno: [
        this.solicitud260101State.tercerosApellidoMaterno,
        [Validators.maxLength(200)],
      ],
      tercerosPais: [
        { value: this.solicitud260101State.tercerosPais, disabled: true },
        [Validators.required],
      ],
      tercerosEstado: [
        this.solicitud260101State.tercerosEstado,
        [Validators.required],
      ],
      tercerosMunicipio: [
        this.solicitud260101State.tercerosMunicipio,
        [Validators.required],
      ],
      tercerosLocalidad: [
        this.solicitud260101State.tercerosLocalidad,
        [Validators.required],
      ],
      tercerosCodigo: [
        this.solicitud260101State.tercerosCodigo,
        [Validators.required, Validators.maxLength(10)],
      ],
      tercerosColonia: [this.solicitud260101State.tercerosColonia],
      tercerosCalle: [
        this.solicitud260101State.tercerosCalle,
        [Validators.required, Validators.maxLength(68)],
      ],
      tercerosNumeroExterior: [
        this.solicitud260101State.tercerosNumeroExterior,
        [Validators.required, Validators.maxLength(10)],
      ],
      tercerosNumeroInterior: [
        this.solicitud260101State.tercerosNumeroInterior,
        [Validators.maxLength(10)],
      ],
      tercerosLada: [this.solicitud260101State.tercerosLada],
      tercerosTelefono: [
        this.solicitud260101State.tercerosTelefono,
        [Validators.maxLength(10), Validators.pattern(REGEX_TELEFONO)],
      ],

      tercerosCorreoElectronico: [
        this.solicitud260101State.tercerosCorreoElectronico,
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
          this.fabricanteComponentForm.patchValue({
            tercerosNacionalidad:
              this.solicitud260101State.tercerosNacionalidad,
            tercerosTipoPersona: this.solicitud260101State.tercerosTipoPersona,
            tercerosRFC: this.solicitud260101State.tercerosRFC,
            tercerosDenominacion:
              this.solicitud260101State.tercerosDenominacion,
            tercerosPais: this.solicitud260101State.tercerosPais,
            tercerosEstado: this.solicitud260101State.tercerosEstado,
            tercerosMunicipio: this.solicitud260101State.tercerosMunicipio,
            tercerosLocalidad: this.solicitud260101State.tercerosLocalidad,
            tercerosCodigo: this.solicitud260101State.tercerosCodigo,
            tercerosColonia: this.solicitud260101State.tercerosColonia,
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
          this.tipoPublicos =
            this.fabricanteComponentForm.get('tipoPersona')?.value;
        })
      )
      .subscribe();

    if (this.datosDestinatario.length > 0) {
      this.fabricanteComponentForm.patchValue({
        // tercerosNacionalidad: this.datosDestinatario[0].nacionalidad,
        tercerosRFC: this.datosDestinatario[0].rfc,
        tercerosDenominacion: this.datosDestinatario[0].nombre,
        tercerosPais: this.datosDestinatario[0].pais,
        tercerosEstado: this.datosDestinatario[0].estado,
        tercerosMunicipio: this.datosDestinatario[0].municipio,
        tercerosLocalidad: this.datosDestinatario[0].localidad,
        tercerosCodigo: this.datosDestinatario[0].codigo,
        tercerosColonia: this.datosDestinatario[0].colonia,
        domiciliCalle: this.datosDestinatario[0].calle,
        domiciliNumeroExterior: this.datosDestinatario[0].numeroExterior,
        domiciliNumeroInterior: this.datosDestinatario[0].numeroInterior,
        domiciliTelefono: this.datosDestinatario[0].telefono,
        domiciliCorreoElectronioco: this.datosDestinatario[0].correoElectronico,
      });
    }
  }

  updateTipoPersonaValidators(valor: number | string): void {
    const DENOMINACION = this.fabricanteComponentForm.get('denominacion');
    const NOMBRE = this.fabricanteComponentForm.get('denominacionNombre');
    const APELLIDO_PATERNO = this.fabricanteComponentForm.get(
      'denominacionApellidoPaterno'
    );

    if (valor === 1) {
      // Persona Moral
      DENOMINACION?.setValidators([Validators.required]);
      NOMBRE?.clearValidators();
      APELLIDO_PATERNO?.clearValidators();
    } else if (valor === 2) {
      // Persona Física
      DENOMINACION?.clearValidators();
      NOMBRE?.setValidators([Validators.required]);
      APELLIDO_PATERNO?.setValidators([Validators.required]);
    } else {
      // Reset all
      DENOMINACION?.clearValidators();
      NOMBRE?.clearValidators();
      APELLIDO_PATERNO?.clearValidators();
    }

    DENOMINACION?.updateValueAndValidity();
    NOMBRE?.updateValueAndValidity();
    APELLIDO_PATERNO?.updateValueAndValidity();
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
  obtenerTercerosNacionalidadRadioOptions(): void {
    this.solicitudDatosService
      .obtenerTercerosNacionalidadRadioOptions()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: RadioOptions[]) => {
          this.tercerosNacionalidadRadioOptions = respuesta;
        },
      });
  }

  /**
   * Obtiene las opciones de los botones de selección (radio) para el tipo de persona.
   */
  obtenerFabricanteRadio(): void {
    this.solicitudDatosService
      .obtenerFabricanteRadio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: RadioOptions[]) => {
          this.tipoPersonaRadioOptions = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos de destinatarios a imitar y actualiza el estado del país del terceros.
   */
  obtenerDestinatarioImitar(): void {
    this.solicitudDatosService
      .obtenerTercerosDestinatarioImitar()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: TercerosDestinatarioImitar) => {
          this.solicitud260101Store.setTercerosPais(respuesta.tercerosPais);
        },
      });
  }

  setTercerosNacionalidad(evento: string | number): void {
    this.tipoPublicos = evento;
    this.solicitud260101Store.setTercerosNacionalidad(evento);
    this.updateTipoPersonaValidators(evento);
  }

  /**
   * Actualiza el tipo de persona seleccionado en el Store.
   * @param evento - Valor del tipo de persona seleccionado (puede ser cadena o número).
   */
  setTipoPersona(evento: string | number): void {
    this.tipoPublicos = evento;
    this.solicitud260101Store.setTipoPersona(evento);
    this.updateTipoPersonaValidators(evento);
  }

  /**
   * Actualiza el RFC del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosRFC(VALOR);
  }

  setCurp(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosCurp(VALOR);
  }

  /**
   * Actualiza la denominación del destinatario en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosDenominacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosDenominacion(VALOR);
  }

  setTercerosDenominacionNombre(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosDenominacionNombre(VALOR);
  }

  setTercerosApellidoPaterno(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosApellidoPaterno(VALOR);
  }

  setTercerosApellidoMaterno(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosApellidoMaterno(VALOR);
  }

  /**
   * Selecciona el país del terceros y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el país seleccionado.
   */
  seleccionaPais(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosPais(evento.id);
  }

  /**
   * Selecciona el estado del terceros y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el estado seleccionado.
   */
  seleccionaEstado(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosEstado(evento.id);
  }

  /**
   * Selecciona el municipio del terceros y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el municipio seleccionado.
   */
  seleccionaMunicipio(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosMunicipio(evento.id);
  }

  /**
   * Selecciona la localidad del terceros y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la localidad seleccionada.
   */
  seleccionaLocalidad(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosLocalidad(evento.id);
  }

  /**
   * Selecciona el código postal del terceros y lo actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene el código postal seleccionado.
   */
  seleccionaCodigo(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosCodigo(evento.id);
  }

  /**
   * Selecciona la colonia del terceros y la actualiza en el Store.
   * @param evento - Objeto del catálogo que contiene la colonia seleccionada.
   */
  seleccionaColonia(evento: Catalogo): void {
    this.solicitud260101Store.setTercerosColonia(evento.id);
  }

  /**
   * Actualiza la calle del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosCalle(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosCalle(VALOR);
  }

  /**
   * Actualiza el número exterior del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosNumeroExterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosNumeroExterior(VALOR);
  }

  /**
   * Actualiza el número interior del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosNumeroInterior(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosNumeroInterior(VALOR);
  }

  /**
   * Actualiza el código LADA del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosLada(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosLada(VALOR);
  }

  /**
   * Actualiza el número telefónico del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosTelefono(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosTelefono(VALOR);
  }

  /**
   * Actualiza el correo electrónico del terceros en el Store.
   * @param evento - Evento que contiene el valor ingresado por el usuario.
   */
  setTercerosCorreoElectronioco(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setTercerosCorreoElectronico(VALOR);
  }

  /**
   * Limpia todos los datos del formulario de destinatarios.
   */
  limpiarDestinatario(): void {
    this.fabricanteComponentForm.reset();
  }

  /**
   * Guarda los datos del destinatario y los agrega al Store como un nuevo destinatario.
   * Si el formulario es inválido, no realiza la operación.
   */
  guardarDestinatario(): void {
    this.updateTipoPersonaValidators(
      this.fabricanteComponentForm.get('tipoPersona')?.value
    );
    this.fabricanteComponentForm.markAllAsTouched();
    if (this.fabricanteComponentForm.invalid) {
      return;
    }
    const OBJETO_JSON = {
      nombre: this.fabricanteComponentForm.get('denominacion')?.value,
      rfc: this.fabricanteComponentForm.get('modificarRFC')?.value,
      curp: '--',
      telefono: this.fabricanteComponentForm.get('domiciliTelefono')?.value,
      correoElectronico: this.fabricanteComponentForm.get(
        'domiciliCorreoElectronioco'
      )?.value,
      calle: this.fabricanteComponentForm.get('domiciliCalle')?.value,
      numeroExterior: this.fabricanteComponentForm.get('domiciliNumeroExterior')
        ?.value,
      numeroInterior: this.fabricanteComponentForm.get('domiciliNumeroInterior')
        ?.value,
      pais: this.fabricanteComponentForm.get('tercerosPais')?.value,
      colonia: this.fabricanteComponentForm.get('tercerosColonia')?.value,
      municipio: this.fabricanteComponentForm.get('tercerosMunicipio')?.value,
      localidad: this.fabricanteComponentForm.get('tercerosLocalidad')?.value,
      estado: this.fabricanteComponentForm.get('tercerosEstado')?.value,
      estado2: '--',
      codigo: this.fabricanteComponentForm.get('tercerosCodigo')?.value,
    };
    // this.solicitud260101Store.addDestinatarioDato(OBJETO_JSON);
    this.cerrarModal.emit(OBJETO_JSON);
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
