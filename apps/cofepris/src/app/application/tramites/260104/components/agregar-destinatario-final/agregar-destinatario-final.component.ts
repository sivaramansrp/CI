import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
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
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados-destino.model';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { PERSONA_OPCIONES_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tereceros-relacionados-fab-seccion.enum';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';



/**
 * Componente para agregar un destinatario final en el trámite 260104.
 * Este componente permite gestionar un formulario reactivo para capturar
 * y validar los datos de un destinatario final, así como realizar operaciones
 * relacionadas como guardar, limpiar y cancelar la operación.
 * 
 * @remarks
 * - Utiliza servicios para cargar datos de catálogos como países, estados, municipios, etc.
 * - Implementa validaciones específicas para los campos del formulario.
 * - Maneja la desuscripción de observables para evitar fugas de memoria.
 * 
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
 * 
 * @implements OnDestroy
 * @implements OnInit
 */
@Component({
  selector: 'app-agregar-destinatario-final',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './agregar-destinatario-final.component.html',
  styleUrl: './agregar-destinatario-final.component.scss',
})


export class AgregarDestinatarioFinalComponent
  implements OnDestroy, OnInit {

  /**
   * Sujeto utilizado para manejar la desuscripción de observables en el componente.
   * Se emite un valor `void` para completar los observables y evitar fugas de memoria.
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Representa el formulario reactivo para agregar un destinatario final.
   * Este formulario se utiliza para capturar y validar los datos necesarios
   * relacionados con el destinatario final en el trámite.
   */
  public agregarDestinatarioFinal!: FormGroup;

    /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
    public esFormularioSoloLectura: boolean = false;

  /**
   * Arreglo que contiene los datos del catálogo de países.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   * 
   * @type {Catalogo[]}
   */
  public paisesDatos: Catalogo[] = [];

  
  /**
   * Arreglo que contiene los datos del catálogo de estados.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   */
  public estadosDatos: Catalogo[] = [];

  
  /**
   * Arreglo que almacena los datos de los municipios.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   * 
   * @type {Catalogo[]}
   */
  public municipiosDatos: Catalogo[] = [];

  /**
   * Arreglo que almacena los datos de las localidades.
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
   * Cada elemento del arreglo es de tipo `Catalogo`.
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
   * Arreglo que contiene los destinatarios finales.
   * Cada elemento del arreglo es una instancia de la clase `Destinatario`.
   */
  public destinatarios: Destinatario[] = [];

  /**
   * Almacena las opciones disponibles para el botón de radio de selección de persona.
   * Utiliza la constante `PERSONA_OPCIONES_DE_BOTON_DE_RADIO` para definir las opciones que el usuario puede elegir.
   * 
   * @see PERSONA_OPCIONES_DE_BOTON_DE_RADIO
   */
  personaOpcionDeBotonDeRadio = PERSONA_OPCIONES_DE_BOTON_DE_RADIO


  /**
   * Constructor de la clase AgregarDestinatarioFinalComponent.
   * 
   * @param fb - Servicio de FormBuilder para la creación y manejo de formularios reactivos.
   * @param ubicaccion - Servicio de Location para manejar la navegación y ubicación actual.
   * @param datosSolicitudService - Servicio para gestionar los datos de la solicitud.
   * @param tramiteStore - Almacén específico para el manejo del estado del trámite 260104.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore: Tramite260104Store,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.crearAgregarFormularioAgregarDestinatarioFinal();
        })
      )
      .subscribe();
  }

 
   /**
   * Guarda un nuevo destinatario final basado en los datos ingresados en el formulario
   * y lo agrega a la lista de destinatarios existentes. Luego, actualiza la tabla de datos
   * de destinatarios finales en el store y reinicia el formulario.
   *
   * @remarks
   * - Si el tipo de persona es "MORAL", se utiliza el campo `denominacionRazon` como nombre o razón social.
   * - Si el tipo de persona es "FISICA", se construye el nombre completo concatenando nombres y apellidos.
   * - Si el tipo de persona no es reconocido, se asigna un valor vacío como nombre o razón social.
   *
   * @throws Puede lanzar errores si el formulario no está correctamente inicializado o si hay problemas
   * al actualizar el store.
   */
  guardarDestinatario(): void {
    const VALOR_FORMULARIO = this.agregarDestinatarioFinal.getRawValue();

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
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se realizan las siguientes acciones:
   * - Carga de datos necesarios para el componente mediante `cargarDatos`.
   * - Creación y configuración del formulario reactivo para agregar un destinatario final
   *   mediante `crearAgregarFormularioAgregarDestinatarioFinal`.
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

 
  /**
   * Método encargado de cargar los datos necesarios para el componente.
   * Realiza múltiples solicitudes a servicios para obtener listas de datos
   * como códigos postales, países, estados, municipios, localidades y colonias.
   * 
   * Cada solicitud se gestiona utilizando el operador `takeUntil` para evitar
   * fugas de memoria al desuscribirse automáticamente cuando el componente
   * se destruye.
   * 
   * Los datos obtenidos se asignan a las propiedades correspondientes del componente:
   * - `codigosPostalesDatos`: Lista de códigos postales.
   * - `paisesDatos`: Lista de países.
   * - `estadosDatos`: Lista de estados.
   * - `municipiosDatos`: Lista de municipios.
   * - `localidadesDatos`: Lista de localidades.
   * - `coloniasDatos`: Lista de colonias.
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
   * Crea y configura el formulario reactivo para agregar un destinatario final.
   * 
   * Este formulario incluye validaciones específicas para cada campo, como 
   * requisitos de longitud, formato de correo electrónico, y campos obligatorios.
   * Algunos campos están predefinidos o deshabilitados por defecto.
   * 
   * Campos del formulario:
   * - `tipoPersona`: Tipo de persona (obligatorio).
   * - `rfc`: Registro Federal de Contribuyentes (obligatorio, longitud mínima de 12 y máxima de 13 caracteres).
   * - `nombres`: Nombre(s) del destinatario (obligatorio, máximo 200 caracteres).
   * - `denominacionRazon`: Denominación o razón social (obligatorio).
   * - `primerApellido`: Primer apellido (obligatorio).
   * - `segundoApellido`: Segundo apellido (opcional).
   * - `pais`: País (predefinido como "1" y deshabilitado, obligatorio).
   * - `estado`: Estado (obligatorio).
   * - `municipio`: Municipio (obligatorio).
   * - `localidad`: Localidad (obligatorio).
   * - `codigoPostal`: Código postal (obligatorio).
   * - `colonia`: Colonia (obligatorio).
   * - `calle`: Calle (obligatorio).
   * - `numeroExterior`: Número exterior (obligatorio).
   * - `numeroInterior`: Número interior (opcional).
   * - `lada`: Lada telefónica (obligatorio).
   * - `telefono`: Teléfono (opcional).
   * - `correoElectronico`: Correo electrónico (obligatorio, debe ser un correo válido).
   * - `descPais`: Descripción del país (opcional).
   * - `descEstado`: Descripción del estado (opcional).
   * - `descMunicipio`: Descripción del municipio (opcional).
   * - `descLocalidad`: Descripción de la localidad (opcional).
   * - `descCodigoPostal`: Descripción del código postal (opcional).
   * - `descColonia`: Descripción de la colonia (opcional).
   * 
   * @returns {void} No retorna ningún valor.
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
      curp: ['', Validators.required],
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
        '', [Validators.email],
      ],
      descPais: [''],
      descEstado: [''],
      descMunicipio: [''],
      descLocalidad: [''],
      descCodigoPostal: [''],
      descColonia: ['']
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.agregarDestinatarioFinal.controls).forEach((key) => {
        this.agregarDestinatarioFinal.get(key)?.disable();
      });
    } else {
      Object.keys(this.agregarDestinatarioFinal.controls).forEach((key) => {
        this.agregarDestinatarioFinal.get(key)?.enable();
      });
    }
  }


  
  /**
   * Restablece el formulario de agregar destinatario final a su estado inicial.
   * 
   * Este método utiliza el método `reset` del formulario reactivo para limpiar
   * todos los campos y devolverlos a sus valores predeterminados.
   */
  limpiarFormulario(): void {
    this.agregarDestinatarioFinal.reset();
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
   * Se utiliza para completar y limpiar el Subject `unsubscribe$`, evitando fugas de memoria
   * al desuscribirse de observables.
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
   * Busca en la lista `estadosDatos` un estado cuyo `id` coincida con el valor actual
   * del campo `estado` en el formulario. Si encuentra una coincidencia, asigna la
   * descripción del estado al campo `descEstado`. Si no encuentra coincidencias, 
   * asigna una cadena vacía.
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
   * utilizando el identificador seleccionado y la asigna al campo `descMunicipio`.
   * Si no se encuentra un municipio coincidente, se asigna una cadena vacía.
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
   * - Busca en la lista `localidadesDatos` un objeto que coincida con el ID seleccionado.
   * - Si encuentra una coincidencia, establece la descripción correspondiente en el campo `descLocalidad`.
   * - Si no encuentra una coincidencia, establece una cadena vacía.
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
   * Actualiza el campo `descCodigoPostal` en el formulario `agregarDestinatarioFinal`
   * basado en el valor del código postal seleccionado.
   *
   * - Obtiene el valor del campo `codigoPostal` del formulario.
   * - Busca en la lista `codigosPostalesDatos` un elemento cuyo `id` coincida con el valor del código postal.
   * - Si encuentra una coincidencia, actualiza el campo `descCodigoPostal` con la descripción correspondiente.
   * - Si no encuentra una coincidencia, establece el campo `descCodigoPostal` como una cadena vacía.
   *
   * @remarks
   * Este método se utiliza para sincronizar la descripción del código postal
   * con el valor seleccionado en el formulario.
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
   * Busca la descripción de la colonia seleccionada en la lista `coloniasDatos` 
   * y la asigna al campo `descColonia`. Si no se encuentra una coincidencia, 
   * se asigna una cadena vacía.
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
