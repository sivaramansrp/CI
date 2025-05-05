import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

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
import { Subject, takeUntil } from 'rxjs';

import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados-destino.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';



/**
 * @component
 * @name AgregarDestinatarioFinalComponent
 * @description
 * Este componente es responsable de gestionar la funcionalidad para agregar un destinatario final 
 * en el trámite "260104". Proporciona un formulario reactivo para recopilar información del destinatario 
 * y permite guardar los datos en un estado centralizado utilizando un store.
 * 
 * @selector app-agregar-destinatario-final
 * @standalone true
 * @imports
 * - CommonModule
 * - ReactiveFormsModule
 * - CatalogoSelectComponent
 * - TituloComponent
 * 
 * @templateUrl ./agregar-destinatario-final.component.html
 * @styleUrl ./agregar-destinatario-final.component.scss
 * 
 * @implements
 * - OnDestroy
 * - OnInit
 * 
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
 * 
 * @dependencies
 * - FormBuilder: Servicio para crear formularios reactivos.
 * - Location: Servicio de Angular para manejar la navegación en el historial.
 * - DatosSolicitudService: Servicio para obtener listas de datos de catálogos.
 * - Tramite260104Store: Servicio para manejar el estado del trámite "260104".
 */
@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.scss',
})


export class AgregarDestinatarioFinalComponent
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
  agregarDestinatarioFinal!: FormGroup;

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
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Tramite260104Store} tramiteStore - Servicio que maneja las actualizaciones de estado para "Tramite260204".
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore: Tramite260104Store
  ) {
    //constructor necesario para el servicio
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    const VALOR_FORMULARIO = this.agregarDestinatarioFinal.getRawValue();

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
      curp: '',
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      nombres: VALOR_FORMULARIO.nombres,
      telefono: VALOR_FORMULARIO.telefono,
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
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }

  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.crearAgregarFormularioAgregarDestinatarioFinal();
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
   * @method crearAgregarFormularioAgregarDestinatarioFinal
   * @description
   * This method initializes the `FormGroup` for the "Agregar Destinatario Final" component. 
   * It sets up the form controls with their default values, validation rules, and disabled states 
   * based on the `elementosDeshabilitados` and `elementosNoRequeridos` arrays.
   * @returns {void} This method does not return any value.
   */
  crearAgregarFormularioAgregarDestinatarioFinal(): void {
    this.agregarDestinatarioFinal = this.fb.group({
      tipoPersona: ['', Validators.required],
      rfc: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(13),
        ],
      ],
      nombres: ['',
        [Validators.required, Validators.maxLength(200)],
      ],
      denominacionRazon: ['', Validators.required],
      primerApellido: ['',
        Validators.required],
      segundoApellido: [''],
      pais: [
        {
          value: '1',
          disabled: true,
        },
        Validators.required,
      ],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', [Validators.required]
      ],
      calle: [
        '', Validators.required],
      numeroExterior: [
        '', Validators.required],

      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: [''
      ],
      correoElectronico: [
        '', [Validators.required, Validators.email],
      ],
      descPais: [''],
      descEstado: [''],
      descMunicipio: [''],
      descLocalidad: [''],
      descCodigoPostal: [''],
      descColonia: ['']
    });
  }


  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
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
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  

  /**
   * Actualiza el campo `descPais` del formulario `agregarDestinatarioFinal` 
   * basado en el valor seleccionado en el campo `pais`.
   * 
   * Busca la descripción del país correspondiente en la lista `paisesDatos` 
   * utilizando el identificador seleccionado y la asigna al campo `descPais`.
   * Si no se encuentra un país coincidente, se asigna una cadena vacía.
   * 
   * @returns {void} Esta función no retorna ningún valor.
   */
  cambiaPais(): void {
    const PAIS_VALUE = this.agregarDestinatarioFinal.get('pais')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descPais: this.paisesDatos.find((pais: Catalogo) => pais.id === PAIS_VALUE)?.descripcion || '',
    });
  }

  /**
   * Actualiza el valor del campo `descEstado` en el formulario `agregarDestinatarioFinal`
   * basado en el valor seleccionado del campo `estado`.
   *
   * Busca en la lista `estadosDatos` un objeto cuyo `id` coincida con el valor actual
   * del campo `estado` y utiliza su propiedad `descripcion` para actualizar el campo
   * `descEstado`. Si no se encuentra una coincidencia, se asigna una cadena vacía.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiaEstado(): void {
    const ESTADO_VALUE = this.agregarDestinatarioFinal.get('estado')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descEstado: this.estadosDatos.find((estado: Catalogo) => estado.id === ESTADO_VALUE)?.descripcion || '',
    });
  }

  /**
   * Actualiza el campo `descMunicipio` del formulario `agregarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `municipio`.
   *
   * Busca la descripción del municipio correspondiente en la lista `municipiosDatos`
   * utilizando el identificador seleccionado en el formulario. Si no se encuentra
   * un municipio coincidente, se asigna una cadena vacía.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiaMunicipio(): void {
    const MUNICIPIO_VALUE = this.agregarDestinatarioFinal.get('municipio')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descMunicipio: this.municipiosDatos.find((municipio: Catalogo) => municipio.id === MUNICIPIO_VALUE)?.descripcion || '',
    });
  }

  /**
   * Actualiza el campo `descLocalidad` del formulario `agregarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `localidad`.
   *
   * - Obtiene el valor actual del campo `localidad`.
   * - Busca en la lista `localidadesDatos` un objeto `Catalogo` cuyo `id` coincida con el valor seleccionado.
   * - Si encuentra una coincidencia, establece la descripción correspondiente en el campo `descLocalidad`.
   * - Si no encuentra una coincidencia, establece el campo `descLocalidad` como una cadena vacía.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiaLocalidad(): void {
    const LOCALIDAD_VALUE = this.agregarDestinatarioFinal.get('localidad')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descLocalidad: this.localidadesDatos.find((localidad: Catalogo) => localidad.id === LOCALIDAD_VALUE)?.descripcion || '',
    });
  }

  /**
   * Actualiza el campo `descCodigoPostal` del formulario `agregarDestinatarioFinal`
   * basado en el valor seleccionado en el campo `codigoPostal`.
   *
   * Busca en la lista `codigosPostalesDatos` un elemento cuyo `id` coincida con
   * el valor actual del campo `codigoPostal`. Si encuentra una coincidencia, 
   * establece la descripción correspondiente en el campo `descCodigoPostal`.
   * Si no encuentra coincidencias, establece una cadena vacía.
   *
   * @returns {void} No retorna ningún valor.
   */
  cambiaCodigoPostal(): void {
    const POSTAL_VALUE = this.agregarDestinatarioFinal.get('codigoPostal')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descCodigoPostal: this.codigosPostalesDatos.find((postal: Catalogo) => postal.id === POSTAL_VALUE)?.descripcion || '',
    });
  }


  /**
   * Actualiza el campo `descColonia` del formulario `agregarDestinatarioFinal` 
   * basado en el valor seleccionado en el campo `colonia`.
   * 
   * - Obtiene el valor actual del campo `colonia`.
   * - Busca en la lista `coloniasDatos` el objeto que coincide con el ID seleccionado.
   * - Si encuentra una coincidencia, establece la descripción de la colonia en el campo `descColonia`.
   * - Si no encuentra una coincidencia, establece una cadena vacía en el campo `descColonia`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  cambiaColonia(): void {
    const COLONIA_VALUE = this.agregarDestinatarioFinal.get('colonia')?.value;
    this.agregarDestinatarioFinal.patchValue({
      descColonia: this.coloniasDatos.find((colonia: Catalogo) => colonia.id === COLONIA_VALUE)?.descripcion || '',
    });
  }
}
