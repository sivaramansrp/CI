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

import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';

import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados-destino.model';
import { TercerosRelacionadosDestinoService } from '../../services/tereceros-relacionados-destino.service';

import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Query } from '../../estados/queries/tramite260104.query';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';


/**
 * @component
 * @name ModificarDestinatarioFinalComponent
 * @description
 * Este componente permite la modificación de los datos de un destinatario final en un trámite específico.
 * Proporciona un formulario reactivo para capturar y validar la información del destinatario, así como
 * métodos para gestionar la interacción con los datos de catálogo y el estado de la aplicación.
 * 
 * @selector app-modificar-destinatario-final
 * @standalone true
 * @imports
 * - CommonModule
 * - CatalogoSelectComponent
 * - ReactiveFormsModule
 * - TituloComponent
 * 
 * @templateUrl ./modificar-destinatario-final.component.html
 * @styleUrl ./modificar-destinatario-final.component.scss
 * 
 * @implements
 * - OnDestroy
 * - OnInit
 * 
 * @example
 * <app-modificar-destinatario-final></app-modificar-destinatario-final>
 * 
 * @remarks
 * Este componente utiliza servicios como `DatosSolicitudService`, `TercerosRelacionadosDestinoService`,
 * `Tramite260104Query` y `Tramite260104Store` para gestionar los datos y el estado del destinatario final.
 * También emplea observables y el operador `takeUntil` para evitar fugas de memoria.
 * 
 * @usageNotes
 * - Este componente es parte del flujo de modificación de destinatarios finales en un trámite.
 * - Utiliza formularios reactivos para la validación de datos.
 * - Incluye métodos para cargar datos de catálogos y actualizar descripciones basadas en selecciones.
 */
@Component({
  selector: 'app-modificar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './modificar-destinatario-final.component.html',
  styleUrl: './modificar-destinatario-final.component.scss',
})
export class ModificarDestinatarioFinalComponent
  implements OnDestroy, OnInit {
  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Grupo de formulario reactivo para recopilar los datos del destinatario final.
   * @property {FormGroup} agregarDestinatarioFinal
   */
  modificarDestinatarioFinal!: FormGroup;

  /**
   * Datos de catálogo de países.
   * @property {Catalogo[]} paisesDatos
   */
  public paisesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de estados.
   * @property {Catalogo[]} estadosDatos
   */
  public estadosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de municipios.
   * @property {Catalogo[]} municipiosDatos
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de localidades.
   * @property {Catalogo[]} localidadesDatos
   */
  public localidadesDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de colonias.
   * @property {Catalogo[]} coloniasDatos
   */
  public coloniasDatos: Catalogo[] = [];

  /**
   * Datos de catálogo de códigos postales.
   * @property {Catalogo[]} codigosPostalesDatos
   */
  public codigosPostalesDatos: Catalogo[] = [];

  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;

  /**
   * Arreglo que almacena la lista de destinatarios.
   * @property {Destinatario[]} destinatarios
   */
  destinatarios: Destinatario[] = [];



  /**
   * Objeto que representa el destinatario seleccionado.
   * 
   * @type {Destinatario}
   * @public
   */
  public selectedDestinario = {} as Destinatario;



  /**
   * Arreglo que almacena los datos del destinatario final.
   * 
   * Este arreglo contiene objetos de tipo `Destinatario` que representan
   * la información de los destinatarios finales en la tabla de datos.
   */
  public destinatarioFinalTablaDatos: Destinatario[] = [];

  /**
   * Constructor de la clase ModificarDestinatarioFinalComponent.
   * 
   * @param fb - Servicio de Angular para la creación y gestión de formularios reactivos.
   * @param tramiteQuery - Servicio para realizar consultas relacionadas con el trámite 260104.
   * @param tramiteStore - Servicio para gestionar el estado del trámite 260104.
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
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    const VALOR_FORMULARIO = this.modificarDestinatarioFinal.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
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
   *   y asignar el primer destinatario disponible a la propiedad `selectedDestinario`.
   * - Se suscribe al observable `getDestinatarioFinalTablaDatos$` de `tramiteQuery` para 
   *   actualizar los datos de la tabla de destinatarios finales en la propiedad 
   *   `destinatarioFinalTablaDatos`.
   * 
   * Las suscripciones se gestionan utilizando `takeUntil` con el observable `unsubscribe$` 
   * para evitar fugas de memoria.
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
   * Recupera varias listas de datos del servicio `DatosSolicitudService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.unsubscribe$)`.
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
   * que coincida con todas las propiedades del objeto `selectedDestinario`. Si encuentra
   * una coincidencia, reemplaza el destinatario encontrado con el primer elemento del 
   * arreglo proporcionado en el parámetro `event` y actualiza el estado en el store.
   * 
   * @param event - Arreglo de destinatarios, donde el primer elemento reemplazará 
   *                al destinatario encontrado en la tabla de datos.
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
   * Este método inicializa un `FormGroup` con los campos necesarios para capturar
   * la información del destinatario final, incluyendo validaciones específicas
   * para cada campo. Algunos campos se inicializan con valores predeterminados
   * basados en la información del destinatario seleccionado.
   * 
   * Campos del formulario:
   * - `tipoPersona`: Define si el destinatario es una persona física o moral. Es obligatorio.
   * - `rfc`: Registro Federal de Contribuyentes del destinatario. Es obligatorio y debe tener una longitud de 12 o 13 caracteres.
   * - `nombres`: Nombre(s) del destinatario. Es obligatorio y tiene un límite de 200 caracteres.
   * - `denominacionRazon`: Razón social o denominación del destinatario. Es obligatorio.
   * - `primerApellido`: Primer apellido del destinatario. Es obligatorio.
   * - `segundoApellido`: Segundo apellido del destinatario. Es opcional.
   * - `pais`: País del destinatario. Es obligatorio y está deshabilitado para edición.
   * - `estado`: Estado o localidad del destinatario. Es obligatorio.
   * - `municipio`: Municipio o alcaldía del destinatario. Es obligatorio.
   * - `localidad`: Localidad del destinatario. Es obligatorio.
   * - `codigoPostal`: Código postal del destinatario. Es obligatorio.
   * - `colonia`: Colonia del destinatario. Es obligatorio.
   * - `calle`: Calle del destinatario. Es obligatorio.
   * - `numeroExterior`: Número exterior del domicilio del destinatario. Es obligatorio.
   * - `numeroInterior`: Número interior del domicilio del destinatario. Es opcional.
   * - `lada`: LADA del número telefónico del destinatario. Es obligatorio.
   * - `telefono`: Número telefónico del destinatario. Es opcional.
   * - `correoElectronico`: Correo electrónico del destinatario. Es obligatorio y debe tener un formato válido.
   * - `descPais`, `descEstado`, `descMunicipio`, `descLocalidad`, `descCodigoPostal`, `descColonia`: Descripciones adicionales de las ubicaciones del destinatario. Son opcionales.
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
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.modificarDestinatarioFinal.reset();
  }
  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

 
  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor al observable `unsubscribe$` y lo completa para liberar recursos
   * y evitar fugas de memoria al desuscribirse de las suscripciones activas.
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
   * - Busca en la lista `paisesDatos` el país correspondiente al valor seleccionado.
   * - Si encuentra el país, actualiza el campo `descPais` con su descripción.
   * - Si no encuentra el país, establece una cadena vacía como valor predeterminado.
   * 
   * @remarks
   * Este método es útil para sincronizar la descripción del país en el formulario
   * cuando el usuario selecciona un país diferente.
   */
  cambiaPais(): void {
    const PAIS_VALUE = this.modificarDestinatarioFinal.get('pais')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descPais: this.paisesDatos.find((pais: Catalogo) => pais.id === PAIS_VALUE)?.descripcion || '',
    });
  }



  /**
   * Actualiza el campo `descEstado` del formulario `modificarDestinatarioFinal`
   * con la descripción del estado seleccionado.
   *
   * Obtiene el valor del campo `estado` del formulario y busca en la lista
   * `estadosDatos` el estado correspondiente por su `id`. Si encuentra una coincidencia,
   * establece la descripción del estado en el campo `descEstado`. Si no encuentra
   * coincidencias, establece una cadena vacía.
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
   * @returns {void} No retorna ningún valor.
   */
  cambiaMunicipio(): void {
    const MUNICIPIO_VALUE = this.modificarDestinatarioFinal.get('municipio')?.value;
    this.modificarDestinatarioFinal.patchValue({
      descMunicipio: this.municipiosDatos.find((municipio: Catalogo) => municipio.id === MUNICIPIO_VALUE)?.descripcion || '',
    });
  }


  /**
   * Cambia la localidad seleccionada en el formulario y actualiza la descripción
   * correspondiente en el campo `descLocalidad`.
   *
   * Este método obtiene el valor actual del campo `localidad` del formulario
   * `modificarDestinatarioFinal`, busca la descripción asociada en la lista
   * `localidadesDatos` y actualiza el campo `descLocalidad` con dicha descripción.
   * Si no se encuentra una coincidencia, se asigna una cadena vacía.
   *
   * @returns {void} Este método no retorna ningún valor.
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
   * - Obtiene el valor actual del campo `codigoPostal`.
   * - Busca en la lista `codigosPostalesDatos` un elemento cuyo `id` coincida con el valor obtenido.
   * - Si encuentra una coincidencia, asigna la descripción correspondiente al campo `descCodigoPostal`.
   * - Si no encuentra una coincidencia, asigna una cadena vacía.
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
