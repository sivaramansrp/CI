import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule,Location } from '@angular/common';

import { Catalogo, InputRadioComponent, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';

import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados-destino.model';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';

import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { PERSONA_OPCIONES_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tereceros-relacionados-fab-seccion.enum';

/**
 * Componente para modificar los datos del destinatario final en el trámite 260104.
 * 
 * Este componente permite gestionar la información de los destinatarios finales,
 * incluyendo la creación, modificación y visualización de los datos en una tabla.
 * También se encarga de cargar los catálogos necesarios para los campos del formulario
 * y sincronizar las descripciones correspondientes.
 * 
 * @remarks
 * Utiliza formularios reactivos para la validación y manejo de datos.
 * Implementa los ciclos de vida `OnInit` y `OnDestroy` para inicializar y limpiar recursos.
 * 
 * @example
 * ```html
 * <app-modificar-destinatario-final></app-modificar-destinatario-final>
 * ```
 * 
 * @class
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-modificar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './modificar-destinatario-final.component.html',
  styleUrl: './modificar-destinatario-final.component.scss',
})
export class ModificarDestinatarioFinalComponent
  implements OnDestroy, OnInit {
 
  /**
   * Sujeto utilizado para manejar la desuscripción de observables en el componente.
   * Se emite un valor `void` al momento de destruir el componente para completar
   * todos los observables suscritos y evitar fugas de memoria.
   */
  private unsubscribe$ = new Subject<void>();

 
  /**
   * FormGroup utilizado para gestionar y validar los datos del formulario
   * relacionado con la modificación del destinatario final.
   */
  modificarDestinatarioFinal!: FormGroup;

  /**
   * Arreglo que contiene los datos del catálogo de países.
   * 
   * @type {Catalogo[]}
   */
  public paisesDatos: Catalogo[] = [];

  
   /**
   * Arreglo que contiene los datos del catálogo de estados.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   * 
   * @type {Catalogo[]}
   */
  public estadosDatos: Catalogo[] = [];

 
  /**
   * Arreglo que contiene los datos de los municipios.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   * 
   * @type {Catalogo[]}
   */
  public municipiosDatos: Catalogo[] = [];

   /**
   * Arreglo que contiene los datos del catálogo de localidades.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   * 
   * @type {Catalogo[]}
   */
  public localidadesDatos: Catalogo[] = [];

 
  /**
   * Arreglo que almacena los datos de las colonias.
   * Cada elemento es de tipo `Catalogo`, que representa un catálogo de información.
   */
  public coloniasDatos: Catalogo[] = [];

  
  /**
   * Arreglo que contiene los datos del catálogo de códigos postales.
   * 
   * @type {Catalogo[]}
   */
  public codigosPostalesDatos: Catalogo[] = [];

  
  /**
   * Representa el tipo de persona asociado a la funcionalidad del componente.
   * Utiliza la enumeración `TipoPersona` para definir los valores posibles.
   */
  public tipoPersona = TipoPersona;

 
  /**
   * Lista de destinatarios finales asociados al componente.
   * 
   * @type {Destinatario[]}
   */
  public destinatarios: Destinatario[] = [];

  
  /**
   * Objeto que representa el destinatario seleccionado.
   * 
   * @type {Destinatario}
   * @public
   */
  public selectedDestinario = {} as Destinatario;



  
  /**
   * Arreglo que almacena los datos del destinatario final.
   * Cada elemento del arreglo es una instancia de la interfaz `Destinatario`.
   * 
   * Este arreglo se utiliza para gestionar y mostrar la información
   * de los destinatarios finales en la tabla correspondiente.
   */
  public destinatarioFinalTablaDatos: Destinatario[] = [];

  /**
     * Almacena las opciones disponibles para el botón de radio de selección de persona.
     * Utiliza la constante `PERSONA_OPCIONES_DE_BOTON_DE_RADIO` para definir las opciones que el usuario puede elegir.
     * 
     * @see PERSONA_OPCIONES_DE_BOTON_DE_RADIO
     */
    personaOpcionDeBotonDeRadio = PERSONA_OPCIONES_DE_BOTON_DE_RADIO

 
  /**
   * Constructor de la clase ModificarDestinatarioFinalComponent.
   * 
   * @param fb - Servicio para la creación y manejo de formularios reactivos.
   * @param tramiteQuery - Servicio para realizar consultas relacionadas con el trámite 260104.
   * @param tramiteStore - Almacén para gestionar el estado del trámite 260104.
   * @param ubicaccion - Servicio para manejar la ubicación y navegación dentro de la aplicación.
   * @param datosSolicitudService - Servicio para gestionar los datos de la solicitud.
   * @param tercerosDataService - Servicio para manejar datos relacionados con terceros y destinos.
   */
  constructor(
    private fb: FormBuilder,
    private tramiteQuery: Tramite260104Query,
    private tramiteStore: Tramite260104Store,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private tercerosDataService: TercerosRelacionadosDestinoService
  ) {
    //constructor necesario para el servicio
  }

   /**
   * Guarda un nuevo destinatario final basado en los datos del formulario y lo agrega a la lista de destinatarios.
   * 
   * Este método realiza las siguientes acciones:
   * - Obtiene los valores del formulario `modificarDestinatarioFinal`.
   * - Construye el nombre o razón social dependiendo del tipo de persona (física o moral).
   * - Crea un objeto `Destinatario` con los datos proporcionados.
   * - Agrega el nuevo destinatario a la lista `destinatarios`.
   * - Actualiza la tabla de datos de destinatarios finales en el estado del trámite.
   * - Resetea el formulario.
   * - Navega hacia la vista anterior.
   * 
   * @remarks
   * Si el tipo de persona no es ni física ni moral, el nombre o razón social se inicializa como una cadena vacía.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  guardarDestinatario(): void {
    const VALOR_FORMULARIO = this.modificarDestinatarioFinal.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === '0') {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === '1') {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${VALOR_FORMULARIO.primerApellido
        } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; // Valor por defecto si tipoPersona es otro
    }
    const NUEVO_DESTINATARIO: Destinatario = {
      tipoPersona: VALOR_FORMULARIO.tipoPersona,
      nombreRazonSocial: nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      nombres: VALOR_FORMULARIO.nombres,
      curp: '',
      telefono: VALOR_FORMULARIO.telefono.trim(),
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      estado: '',
      estadoLocalidad: VALOR_FORMULARIO.estado,
      codigoPostal: VALOR_FORMULARIO.codigoPostal,
      lada: VALOR_FORMULARIO.lada,
      descEstado: VALOR_FORMULARIO.descEstado,
      descCodigoPostal: VALOR_FORMULARIO.descCodigoPostal,
      descColonia: VALOR_FORMULARIO.descColonia,
      descMunicipio: VALOR_FORMULARIO.descMunicipio,
      descLocalidad: VALOR_FORMULARIO.descLocalidad,
      descPais: VALOR_FORMULARIO.descPais
    };

    this.destinatarios.push(NUEVO_DESTINATARIO);
    this.tramiteStore.updateDestinatarioFinalTablaDatos(this.destinatarios);
    this.modificarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

 
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * - Llama al método `cargarDatos` para cargar la información inicial necesaria.
   * - Invoca `crearModificarDestinatarioFinal` para configurar el formulario o lógica relacionada.
   * - Se suscribe al observable `destinatario$` del servicio `tercerosDataService` para obtener 
   *   la lista de destinatarios y selecciona el primero si existen datos.
   * - Se suscribe al observable `getDestinatarioFinalTablaDatos$` de `tramiteQuery` para 
   *   actualizar los datos de la tabla de destinatarios finales.
   * 
   * Las suscripciones se gestionan utilizando `takeUntil` con `unsubscribe$` para evitar 
   * fugas de memoria al destruir el componente.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.crearModificarDestinatarioFinal();
    this.tercerosDataService.destinatario$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((destinatarios) => {
        if (destinatarios && destinatarios.length > 0) {
          this.selectedDestinario = destinatarios[0];
        }
      });
    this.tramiteQuery.getDestinatarioFinalTablaDatos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.destinatarioFinalTablaDatos = data;
      });
  }

  
  /**
   * Método encargado de cargar los datos necesarios para el componente.
   * Realiza múltiples solicitudes a servicios para obtener listas de datos como:
   * códigos postales, países, estados, municipios, localidades y colonias.
   * 
   * Cada solicitud se suscribe a un observable y almacena los datos obtenidos
   * en las propiedades correspondientes del componente.
   * 
   * Las suscripciones se gestionan utilizando el operador `takeUntil` para evitar
   * fugas de memoria, asegurándose de que se cancelen cuando el observable `unsubscribe$`
   * emita un valor.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaCodigosPostales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.codigosPostalesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaEstados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.estadosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaMunicipios()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.municipiosDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaLocalidades()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.localidadesDatos = data;
      });

    this.datosSolicitudService
      .obtenerListaColonias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.coloniasDatos = data;
      });
  }

 
  /**
   * Actualiza un destinatario final en la tabla de datos.
   *
   * Este método busca un destinatario en la tabla de datos `destinatarioFinalTablaDatos`
   * que coincida con las propiedades del destinatario seleccionado `selectedDestinario`.
   * Si encuentra una coincidencia, reemplaza el destinatario existente con el primer
   * elemento del arreglo proporcionado en el evento `event` y actualiza el estado
   * correspondiente en el store `tramiteStore`.
   *
   * @param event - Un arreglo de objetos de tipo `Destinatario` que contiene los datos
   *                actualizados del destinatario final.
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    const INDICE_BORROR = this.destinatarioFinalTablaDatos.findIndex((ele) =>
      Object.entries(this.selectedDestinario).every(([key, value]) => ele[key as keyof Destinatario] === value)
    );

    if (INDICE_BORROR !== -1) {
      this.destinatarioFinalTablaDatos[INDICE_BORROR] = event[0];
      this.tramiteStore.modifyDestinatarioFinalTablaDatos(this.destinatarioFinalTablaDatos);
    }
  }


  /**
   * Crea y configura un formulario reactivo para modificar los datos del destinatario final.
   * 
   * Este método inicializa un `FormGroup` utilizando `FormBuilder` y establece los valores iniciales
   * y las validaciones correspondientes para cada uno de los campos del formulario.
   * 
   * Campos del formulario:
   * - `tipoPersona`: Define si el destinatario es una persona física o moral. Es obligatorio.
   * - `rfc`: Registro Federal de Contribuyentes del destinatario. Es obligatorio y debe tener una longitud mínima de 12 y máxima de 13 caracteres.
   * - `nombres`: Nombre(s) del destinatario. Es obligatorio y tiene un límite de 200 caracteres.
   * - `denominacionRazon`: Denominación o razón social del destinatario. Es obligatorio.
   * - `primerApellido`: Primer apellido del destinatario. Es obligatorio.
   * - `segundoApellido`: Segundo apellido del destinatario. Es opcional.
   * - `pais`: País del destinatario. Es obligatorio y está deshabilitado para edición.
   * - `estado`: Estado o localidad del destinatario. Es obligatorio.
   * - `municipio`: Municipio o alcaldía del destinatario. Es obligatorio.
   * - `localidad`: Localidad del destinatario. Es obligatorio.
   * - `codigoPostal`: Código postal del destinatario. Es obligatorio.
   * - `colonia`: Colonia del destinatario. Es obligatorio.
   * - `calle`: Calle del domicilio del destinatario. Es obligatorio.
   * - `numeroExterior`: Número exterior del domicilio del destinatario. Es obligatorio.
   * - `numeroInterior`: Número interior del domicilio del destinatario. Es opcional.
   * - `lada`: LADA del número telefónico del destinatario. Es obligatorio.
   * - `telefono`: Número telefónico del destinatario. Es opcional.
   * - `correoElectronico`: Correo electrónico del destinatario. Es obligatorio y debe tener un formato válido.
   * - `descPais`, `descEstado`, `descMunicipio`, `descLocalidad`, `descCodigoPostal`, `descColonia`: Descripciones adicionales de los campos correspondientes. Son opcionales.
   * 
   * @returns {void} No retorna ningún valor.
   */
  crearModificarDestinatarioFinal(): void {
    this.modificarDestinatarioFinal = this.fb.group({
      tipoPersona: [this.selectedDestinario.tipoPersona === 'Moral' ? this.tipoPersona.MORAL : this.tipoPersona.FISICA, Validators.required],
      rfc: [
        this.selectedDestinario.rfc,
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: [this.selectedDestinario.nombres,
      [Validators.required, Validators.maxLength(200)],
      ],
      denominacionRazon: [this.selectedDestinario.nombreRazonSocial, Validators.required],
      primerApellido: [this.selectedDestinario.primerApellido,
      Validators.required],
      segundoApellido: [this.selectedDestinario.segundoApellido],
      pais: [
        {
          value: this.selectedDestinario.pais,
          disabled: true,
        },
        Validators.required,
      ],
      estado: [this.selectedDestinario.estadoLocalidad, Validators.required],
      municipio: [this.selectedDestinario.municipioAlcaldia, Validators.required],
      localidad: [this.selectedDestinario.localidad, Validators.required],
      codigoPostal: [this.selectedDestinario.codigoPostal, Validators.required],
      colonia: [this.selectedDestinario.colonia, [Validators.required]
      ],
      calle: [
        this.selectedDestinario.calle, Validators.required],
      numeroExterior: [
        this.selectedDestinario.numeroExterior, Validators.required],

      numeroInterior: [this.selectedDestinario.numeroInterior],
      lada: [this.selectedDestinario.lada, Validators.required],
      telefono: [this.selectedDestinario.telefono
      ],
      correoElectronico: [
        this.selectedDestinario.correoElectronico, [Validators.required, Validators.email],
      ],
      descPais: [this.selectedDestinario.descPais],
      descEstado: [this.selectedDestinario.descEstado],
      descMunicipio: [this.selectedDestinario.descMunicipio],
      descLocalidad: [this.selectedDestinario.descLocalidad],
      descCodigoPostal: [this.selectedDestinario.descCodigoPostal],
      descColonia: [this.selectedDestinario.descColonia]
    });
  }


  
  /**
   * Limpia el formulario de modificación del destinatario final.
   * Resetea todos los campos del formulario a su estado inicial.
   */
  limpiarFormulario(): void {
    this.modificarDestinatarioFinal.reset();
  }
  
  /**
   * Cancela la operación actual y navega de regreso a la ubicación anterior.
   * Utiliza el servicio de navegación para retroceder en el historial.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

 
  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor al observable `unsubscribe$` y lo completa para liberar recursos
   * y evitar posibles fugas de memoria al desuscribirse de observables.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Actualiza el campo `descPais` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `pais`.
   *
   * - Obtiene el valor actual del campo `pais` del formulario.
   * - Busca en la lista `paisesDatos` un objeto `Catalogo` cuyo `id` coincida con el valor seleccionado.
   * - Si encuentra una coincidencia, actualiza el campo `descPais` con la descripción correspondiente.
   * - Si no encuentra una coincidencia, establece el campo `descPais` como una cadena vacía.
   *
   * @remarks
   * Este método es útil para sincronizar la descripción del país seleccionado
   * con el formulario, asegurando que los datos sean consistentes.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  cambiaPais(): void {
    const PAIS_VALUE = this.modificarDestinatarioFinal.get('pais')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descPais: this.paisesDatos.find((pais: Catalogo) => pais.id === PAIS_VALUE)?.descripcion || '',
    });
  }



  /**
   * Actualiza el campo `descEstado` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `estado`.
   *
   * Busca la descripción correspondiente al estado seleccionado en la lista
   * `estadosDatos` y la asigna al campo `descEstado`. Si no se encuentra una
   * coincidencia, se asigna una cadena vacía.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiaEstado(): void {
    const ESTADO_VALUE = this.modificarDestinatarioFinal.get('estado')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descEstado: this.estadosDatos.find((estado: Catalogo) => estado.id === ESTADO_VALUE)?.descripcion || '',
    });
  }


  
   /**
   * Actualiza el campo `descMunicipio` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `municipio`.
   *
   * Busca la descripción del municipio correspondiente en la lista `municipiosDatos`
   * utilizando el identificador seleccionado y la asigna al campo `descMunicipio`.
   * Si no se encuentra un municipio coincidente, se asigna una cadena vacía.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  cambiaMunicipio(): void {
    const MUNICIPIO_VALUE = this.modificarDestinatarioFinal.get('municipio')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descMunicipio: this.municipiosDatos.find((municipio: Catalogo) => municipio.id === MUNICIPIO_VALUE)?.descripcion || '',
    });
  }


 
  /**
   * Actualiza el campo `descLocalidad` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `localidad`.
   *
   * - Obtiene el valor actual del campo `localidad` del formulario.
   * - Busca en la lista `localidadesDatos` un objeto `Catalogo` cuyo `id` coincida con el valor seleccionado.
   * - Si encuentra una coincidencia, actualiza el campo `descLocalidad` con la descripción correspondiente.
   * - Si no encuentra una coincidencia, establece el campo `descLocalidad` como una cadena vacía.
   *
   * @remarks
   * Este método es útil para sincronizar la descripción de la localidad seleccionada
   * con el formulario, asegurando que los datos sean consistentes.
   */
  cambiaLocalidad(): void {
    const LOCALIDAD_VALUE = this.modificarDestinatarioFinal.get('localidad')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descLocalidad: this.localidadesDatos.find((localidad: Catalogo) => localidad.id === LOCALIDAD_VALUE)?.descripcion || '',
    });
  }


 
  /**
   * Actualiza el campo `descCodigoPostal` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `codigoPostal`.
   *
   * - Obtiene el valor actual del campo `codigoPostal` del formulario.
   * - Busca en la lista `codigosPostalesDatos` un elemento cuyo `id` coincida con el valor obtenido.
   * - Si encuentra una coincidencia, establece la descripción correspondiente en el campo `descCodigoPostal`.
   * - Si no encuentra una coincidencia, establece una cadena vacía como valor predeterminado.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  cambiaCodigoPostal(): void {
    const POSTAL_VALUE = this.modificarDestinatarioFinal.get('codigoPostal')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descCodigoPostal: this.codigosPostalesDatos.find((postal: Catalogo) => postal.id === POSTAL_VALUE)?.descripcion || '',
    });
  }

 
  /**
   * Actualiza el campo `descColonia` del formulario `modificarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `colonia`.
   *
   * Busca la descripción de la colonia seleccionada en la lista `coloniasDatos`
   * y la asigna al campo `descColonia`. Si no se encuentra una coincidencia,
   * se asigna una cadena vacía.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  cambiaColonia(): void {
    const COLONIA_VALUE = this.modificarDestinatarioFinal.get('colonia')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descColonia: this.coloniasDatos.find((colonia: Catalogo) => colonia.id === COLONIA_VALUE)?.descripcion || '',
    });
  }
}
