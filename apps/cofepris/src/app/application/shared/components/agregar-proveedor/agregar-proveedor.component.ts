import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo, REGEX_CORREO_ELECTRONICO, REGEX_NOMBRE, TELEFONO_DIGITOS, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Proveedor } from '../../models/terceros-relacionados.model';

import { DatosSolicitudService } from '../../services/datos-solicitud.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * @component AgregarProveedorComponent
 * @description Componente responsable de manejar el formulario para agregar proveedores.
 * Se encarga de obtener datos del catálogo (países), gestionar el formulario reactivo y
 * actualizar el estado del trámite con la información del proveedor capturado.
 */
@Component({
  selector: 'app-agregar-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './agregar-proveedor.component.html',
  styleUrl: './agregar-proveedor.component.css',
})
export class AgregarProveedorComponent implements OnDestroy, OnInit {
   /**
     * Identificador del procedimiento actual.
     * Utilizado para controlar el flujo de la vista dependiendo del tipo de procedimiento.
     *
     * @input idProcedimiento - Cadena que representa el ID del procedimiento (por ejemplo: '260102').
     */
    @Input()
    idProcedimiento!: number;
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;
  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {Proveedor[]} proveedores
   * Arreglo de proveedores capturados en el formulario.
   */
  proveedores: Proveedor[] = [];

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarProveedorForm!: FormGroup;

  /**
   * @property {Catalogo[]} paisesDatos
   * Lista de países obtenida del servicio de datos.
   */
  public paisesDatos: Catalogo[] = [];

  /**
 * Arreglo que almacena los elementos requeridos.
 * @type {string[]}
 */
  public elementosRequeridos: string[] = [];

   /**
   * @property {Proveedor | undefined} datoSeleccionado
   * Dato seleccionado que se pasará al componente hijo `AgregarDestinatarioComponent`.
   */
  @Input() datoSeleccionado: Proveedor[] | undefined;

  /**
   * @property updateProveedorTablaDatos
   * @description Evento que emite una lista actualizada de objetos `Proveedor` hacia el componente padre.
   * Se utiliza para sincronizar los datos de la tabla o disparar acciones relacionadas.
   * @type {EventEmitter<Proveedor[]>}
   */
  @Output() updateProveedorTablaDatos = new EventEmitter<Proveedor[]>();
  /**
   * @constructor
   * Inicializa el formulario y los servicios necesarios para el componente.
   *
   * @param fb - FormBuilder para construir el formulario reactivo.
   * @param datosSolicitudService - Servicio para obtener datos del backend.
   * @param tramiteStore - Store que administra el estado del trámite actual.
   * @param tramiteQuery - Servicio para consultar el estado del trámite.
   * @param ubicaccion - Servicio de Angular para navegación de retroceso.
   */  
  
  /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];

  /**
   * Controla si el desplegable de nacionalidad está deshabilitado.
   * @property {boolean} estaDeshabilitadoDesplegable
   */
  public estaDeshabilitadoDesplegable: boolean = true;



  /**
   * Constructor del componente AgregarProveedorComponent.
   * 
   * @param fb - Inyección del servicio FormBuilder para la creación y manejo de formularios reactivos.
   * @param datosSolicitudService - Servicio para gestionar los datos de la solicitud.
   * @param ubicaccion - Servicio Location para manejar la navegación y ubicación dentro de la aplicación.
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location
  ) {
  // Constructor vacío, se inyectan las dependencias para su uso en el componente.
  }

  /**
   * @method ngOnInit
   * @description Hook de inicialización del componente. Llama a `cargarDatos()` para obtener catálogos.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.validarElementos();
    this.crearAgregarFormularioProveedor();
    this.changeNacionalidad();
  }

   /**
     * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
     * @param {keyof Proveedor } field - Nombre del campo a obtener.
     * @returns {string | number | undefined | string[]} - Valor del campo especificado.
     */
    public obtenerValor(field: keyof Proveedor): string | number | undefined {
      return this.datoSeleccionado?.[0]?.[field as keyof Proveedor] ?? '';
    }
  

  /**
   * @method crearAgregarFormularioProveedor
   * @description Crea el formulario reactivo `agregarProveedorForm` con sus respectivos controles y validaciones.
   */
  crearAgregarFormularioProveedor():void{
    this.agregarProveedorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
      denominacionRazon: [
        this.obtenerValor('razonSocial'),
        [Validators.required, Validators.pattern(REGEX_NOMBRE)],
      ],
      nombres: [this.obtenerValor('nombres'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      primerApellido: [this.obtenerValor('primerApellido'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      segundoApellido: [this.obtenerValor('segundoApellido'), [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [
        this.obtenerValor('estadoLocalidad'),
        this.elementosRequeridos.includes('estado')
          ? [Validators.required]
          : [],
      ],
      codigoPostal: [this.obtenerValor('codigoPostal')],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [this.obtenerValor('numeroExterior'), Validators.required],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada')],
      telefono: [
        {
          value: this.elementosDeshabilitados.includes('telefono')
            ? '3461235'
            : this.obtenerValor('telefono'),
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
        [Validators.pattern(TELEFONO_DIGITOS)],
      ],
      correoElectronico: [
        {
          value: this.elementosDeshabilitados.includes('correoElectronico')
            ? 'abc@njk.com'
            : this.obtenerValor('correoElectronico'),
          disabled: this.elementosDeshabilitados.includes('correoElectronico'),
        },
        [Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
    });
  }

    /**
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
    validarElementos(): void {
      switch (this.idProcedimiento) {
          case 260201:
          case 260219:
            this.elementosRequeridos = ['estado'];
          break;
        default:
          this.elementosDeshabilitados = [];
          this.elementosRequeridos = [];
      }
    }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
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
   * @method guardarProveedor
   * @description Toma los datos del formulario, crea un objeto `Proveedor`, lo agrega al arreglo
   * local, actualiza el store del trámite y luego limpia el formulario y regresa a la vista anterior.
   */
  guardarProveedor(): void {
    const VALOR_FORMULARIO = this.agregarProveedorForm.getRawValue();

    let nombreRazonSocial: string;

    if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.MORAL) {
      nombreRazonSocial = VALOR_FORMULARIO.denominacionRazon;
    } else if (VALOR_FORMULARIO.tipoPersona === this.tipoPersona.FISICA) {
      nombreRazonSocial = `${VALOR_FORMULARIO.nombres} ${
        VALOR_FORMULARIO.primerApellido
      } ${VALOR_FORMULARIO.segundoApellido || ''}`.trim();
    } else {
      nombreRazonSocial = ''; // Valor por defecto si tipoPersona es otro
    }
    const NUEVO_PROVEEDOR: Proveedor = {
      nombreRazonSocial: nombreRazonSocial,
      rfc: '',
      curp: '',
      telefono:  VALOR_FORMULARIO.telefono || '',
      correoElectronico:
         VALOR_FORMULARIO.correoElectronico || '',
      calle:  VALOR_FORMULARIO.calle || '',
      numeroExterior:  VALOR_FORMULARIO.numeroExterior || '',
      numeroInterior:  VALOR_FORMULARIO.numeroInterior || '',
      pais:  VALOR_FORMULARIO.pais || '',
      colonia:  VALOR_FORMULARIO.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa:  VALOR_FORMULARIO.estado || '',
      estadoLocalidad: VALOR_FORMULARIO.estadoLocalidad || '',
      codigoPostal:  VALOR_FORMULARIO.codigoPostal || '',
      coloniaEquivalente: '',
        nombres: VALOR_FORMULARIO.nombres,
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      razonSocial: VALOR_FORMULARIO.razonSocial,
      lada: VALOR_FORMULARIO.lada,
    };

    this.proveedores.push(NUEVO_PROVEEDOR);
    this.updateProveedorTablaDatos.emit(this.proveedores);
    this.agregarProveedorForm.reset();
    this.ubicaccion.back();
  }
  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarProveedorForm.reset();
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
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.agregarProveedorForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  changeNacionalidad(): void {
    if (this.agregarProveedorForm?.value?.tipoPersona === '') {
      Object.keys(this.agregarProveedorForm.controls).forEach(controlName => {
        this.agregarProveedorForm.get(controlName)?.disable();
        if (controlName === 'tipoPersona') {
          this.agregarProveedorForm.get(controlName)?.enable();
        }
      });
    } else {
      Object.keys(this.agregarProveedorForm.controls).forEach(controlName => {
        this.agregarProveedorForm.get(controlName)?.enable();
        this.estaDeshabilitadoDesplegable = false;
      });
    }
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
