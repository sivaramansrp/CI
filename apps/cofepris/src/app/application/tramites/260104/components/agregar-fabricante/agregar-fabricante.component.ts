import { Component,OnDestroy,OnInit } from '@angular/core';

import { FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

import { CommonModule,Location } from '@angular/common';
import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";

import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Fabricante } from '../../models/terceros-relacionados-destino.model';
import { PERSONA_OPCIONES_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tereceros-relacionados-fab-seccion.enum';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';

/**
 * @component
 * @name AgregarFabricanteComponent
 * @description
 * Componente encargado de gestionar el formulario para agregar un fabricante en el trámite 260104.
 * Permite capturar los datos del fabricante, validarlos y almacenarlos en el estado de la aplicación.
 * 
 * @selector app-agregar-fabricante
 * @standalone true
 * @imports
 * - CommonModule
 * - ReactiveFormsModule
 * - CatalogoSelectComponent
 * - TituloComponent
 * 
 * @templateUrl ./agregar-fabricante.component.html
 * @styleUrl ./agregar-fabricante.component.scss
 * 
 * @implements OnDestroy, OnInit
 */
@Component({
  selector: 'app-agregar-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './agregar-fabricante.component.html',
  styleUrl: './agregar-fabricante.component.scss',
})

 export class AgregarFabricanteComponent implements OnDestroy, OnInit{

  /**
   * Sujeto utilizado para manejar la desuscripción de observables.
   * Se emite un valor `void` para completar los observables y evitar fugas de memoria.
   * Este patrón es comúnmente utilizado en el ciclo de vida de componentes en Angular.
   */
  private unsubscribe$ = new Subject<void>();

 
  /**
   * Formulario reactivo utilizado para agregar un fabricante.
   * Este formulario contiene los controles necesarios para capturar
   * y validar la información del fabricante en el componente.
   */
  public agregarFabricante!: FormGroup;

  /**
 * Determina si el formulario debe estar en modo solo lectura.
 */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Lista de fabricantes asociados al componente.
   * 
   * @type {Fabricante[]}
   */
  public fabricantes:Fabricante[] = [];
 
  /**
   * Arreglo que contiene los datos del catálogo de países.
   * Cada elemento del arreglo es de tipo `Catalogo`.
   */
  public paisesDatos: Catalogo[] = [];

 
 
  /**
   * Representa el tipo de persona asociado a la aplicación.
   * Utiliza la enumeración `TipoPersona` para definir si es una persona física o moral.
   */
  public tipoPersona = TipoPersona;

  /**
     * Almacena las opciones disponibles para el botón de radio de selección de persona.
     * Utiliza la constante `PERSONA_OPCIONES_DE_BOTON_DE_RADIO` para definir las opciones que el usuario puede elegir.
     * 
     * @see PERSONA_OPCIONES_DE_BOTON_DE_RADIO
     */
    personaOpcionDeBotonDeRadio = PERSONA_OPCIONES_DE_BOTON_DE_RADIO


  /**
   * Constructor de la clase AgregarFabricanteComponent.
   * 
   * @param fb - Servicio de FormBuilder para la creación y manejo de formularios reactivos.
   * @param ubicaccion - Servicio de Location para manejar la navegación y ubicación en la aplicación.
   * @param datosSolicitudService - Servicio para gestionar los datos de la solicitud.
   * @param tramiteStore - Almacén específico para manejar el estado del trámite 260104.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService,
    private tramiteStore:Tramite260104Store,
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
   * Guarda un nuevo fabricante basado en los datos proporcionados en el formulario
   * y lo agrega a la lista de fabricantes. Posteriormente, actualiza la tabla de datos
   * del trámite y reinicia el formulario.
   *
   * @remarks
   * - Si el tipo de persona es "MORAL", se utiliza la denominación o razón social.
   * - Si el tipo de persona es "FISICA", se construye el nombre completo utilizando
   *   nombres, primer apellido y segundo apellido (si está disponible).
   * - Si no se especifica un tipo de persona válido, el nombre o razón social queda vacío.
   *
   * @returns {void} No retorna ningún valor.
   */
  guardarFabricante(): void {
    const VALOR_FORMULARIO = this.agregarFabricante.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === '0') {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === '1') {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; 
    }
    const NUEVO_FABRICANTE: Fabricante = {
      tipoPersona:VALOR_FORMULARIO.tipoPersona,
      nombreRazonSocial:nombreRazonSocial,
      rfc: VALOR_FORMULARIO.rfc,
      curp: '',
      telefono:
        `${VALOR_FORMULARIO.lada} ${VALOR_FORMULARIO.telefono}`.trim(),
      correoElectronico: VALOR_FORMULARIO.correoElectronico,
      calle: VALOR_FORMULARIO.calle,
      numeroExterior: VALOR_FORMULARIO.numeroExterior,
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais,
      colonia: VALOR_FORMULARIO.colonia,
      municipioAlcaldia: VALOR_FORMULARIO.municipio,
      localidad: VALOR_FORMULARIO.localidad,
      estadoLocalidad: VALOR_FORMULARIO.estado,
      estado: VALOR_FORMULARIO.estado,
      coloniaEquivalente: VALOR_FORMULARIO.codigoPostal,
      lada:VALOR_FORMULARIO.lada,
      descPais:VALOR_FORMULARIO.descPais,
    };

    this.fabricantes.push(NUEVO_FABRICANTE);
    this.tramiteStore.updateFabricanteTablaDatos(this.fabricantes);
    this.agregarFabricante.reset();
    this.ubicaccion.back();
  }


  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se realizan las siguientes acciones:
   * - Carga de datos necesarios para el componente mediante `cargarDatos`.
   * - Creación del formulario para agregar un destinatario final mediante `crearAgregarFormularioAgregarDestinatarioFinal`.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.crearAgregarFormularioAgregarDestinatarioFinal();
  }

 

    /**
     * Carga los datos necesarios para el componente.
     * 
     * Este método obtiene la lista de países desde el servicio `datosSolicitudService`
     * y la asigna a la propiedad `paisesDatos`. Utiliza un operador `takeUntil` para
     * gestionar la suscripción y evitar fugas de memoria.
     * 
     * @returns {void} No retorna ningún valor.
     */
    cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });

    }
 
  /**
   * Crea y configura un formulario reactivo para agregar un destinatario final.
   * 
   * Este formulario incluye validaciones para los campos requeridos, como tipo de persona,
   * RFC, nombres, dirección, y datos de contacto. Algunos campos tienen valores predeterminados
   * o están deshabilitados por defecto.
   * 
   * Campos del formulario:
   * - `tipoPersona`: Tipo de persona (requerido).
   * - `rfc`: Registro Federal de Contribuyentes (requerido, longitud mínima de 12 y máxima de 13).
   * - `nombres`: Nombres del destinatario (requerido, longitud máxima de 200).
   * - `denominacionRazon`: Denominación o razón social (requerido).
   * - `primerApellido`: Primer apellido (requerido).
   * - `segundoApellido`: Segundo apellido (opcional).
   * - `pais`: País (valor predeterminado "1", deshabilitado, requerido).
   * - `descPais`: Descripción del país (opcional).
   * - `estado`: Estado (requerido).
   * - `municipio`: Municipio (requerido).
   * - `localidad`: Localidad (requerido).
   * - `codigoPostal`: Código postal (requerido).
   * - `colonia`: Colonia (requerido).
   * - `calle`: Calle (requerido).
   * - `numeroExterior`: Número exterior (requerido).
   * - `numeroInterior`: Número interior (opcional).
   * - `lada`: LADA (requerido).
   * - `telefono`: Teléfono (opcional).
   * - `correoElectronico`: Correo electrónico (requerido, debe ser un email válido).
   * 
   * @returns {void} No retorna ningún valor.
   */
  crearAgregarFormularioAgregarDestinatarioFinal(): void {
    this.agregarFabricante = this.fb.group({
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
      descPais: [''], // Added this line
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['',[Validators.required]
      ],
      calle: [
        '',Validators.required],
      numeroExterior: [
        '',Validators.required],

           numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: [''
      ],
      correoElectronico: [
        '',[Validators.required, Validators.email],
      ],
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.agregarFabricante.controls).forEach((key) => {
        this.agregarFabricante.get(key)?.disable();
      });
    } else {
      Object.keys(this.agregarFabricante.controls).forEach((key) => {
        this.agregarFabricante.get(key)?.enable();
      });
    }
  }


  /**
   * Restablece el formulario de agregar fabricante a su estado inicial.
   * Esta función utiliza el método `reset` del formulario reactivo
   * para limpiar todos los campos y devolverlos a sus valores predeterminados.
   */
  limpiarFormulario(): void {
    this.agregarFabricante.reset();
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
   * Aquí se utiliza para emitir un valor al Subject `unsubscribe$` y completar su flujo,
   * asegurando que se liberen los recursos y se eviten fugas de memoria en suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
