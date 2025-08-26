import {
  Catalogo,
  CatalogoSelectComponent,
  REGEX_CORREO_ELECTRONICO,
  REGEX_IMPORTE_PAGO,
  REGEX_NOMBRE,
  REGEX_NUMEROS,
  REGEX_TELEFONO,
  TipoPersona,
  TituloComponent
} from '@ng-mf/data-access-user';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Proveedor } from '../../models/terceros-relacionados.model';
import { STR_NACIONAL } from '../../constantes/datos-solicitud.enum';
import { Subject } from 'rxjs';
import { TERCEROS_RELACIONADOS_DATOS_INICIALES } from '../../constantes/terceros-fabricante.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { takeUntil } from 'rxjs/operators';


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
    TooltipModule
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
   * @property {boolean} habilitarNacionalidad
   * @description
   * Indica si el campo de nacionalidad debe estar habilitado en el formulario de proveedor.
   * Se activa dependiendo del procedimiento seleccionado.
   */
  public habilitarNacionalidad: boolean = false;

  /**
   * @property {string} nacionalStr
   * @description
   * Cadena constante que representa el valor nacional para el campo de nacionalidad.
   */
  public nacionalStr = STR_NACIONAL;

  /**
   * @property {boolean} estaOculto
   * @description
   * Indica si el componente debe estar oculto en la vista.
   * Se recibe como propiedad de entrada desde el componente padre.
   */
  @Input() estaOculto!: boolean;

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
    this.cambiarHabilitacionNacionalidad();
    this.cargarDatos();
    this.validarElementos();
    this.crearAgregarFormularioProveedor();
    this.actualizarValidaciones();
    this.changeNacionalidad();
  }

    /**
   * @method cambiarHabilitacionNacionalidad
   * @description
   * Habilita el campo de nacionalidad en el formulario si el procedimiento actual está incluido en la lista `TERCEROS_RELACIONADOS_DATOS_INICIALES`.
   * Cambia el valor de la propiedad `habilitarNacionalidad` a `true` si la condición se cumple.
   * 
   * @returns {void}
   */
  public cambiarHabilitacionNacionalidad(): void {
    if( TERCEROS_RELACIONADOS_DATOS_INICIALES.includes(this.idProcedimiento)){
      this.habilitarNacionalidad = true;
    }
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
      nacionalidad: [''],
      tipoPersona: ['', Validators.required],
      rfc: [this.obtenerValor('rfc')],
      curp: [this.obtenerValor('curp')],
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
          ? [Validators.required,Validators.pattern(REGEX_IMPORTE_PAGO)]
          : [],
      ],
      codigoPostal: [this.obtenerValor('codigoPostal'),[Validators.pattern(REGEX_NUMEROS)]],
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
        [Validators.pattern(REGEX_TELEFONO)],
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
   * @method actualizarValidaciones
   * @description
   * Actualiza las validaciones de los campos 'nacionalidad', 'rfc' y 'curp' en el formulario de proveedor.
   * Si `habilitarNacionalidad` es verdadero, establece los validadores requeridos en dichos campos.
   * Si es falso, elimina los validadores de los mismos campos.
   * Finalmente, actualiza el estado y la validez de los controles afectados.
   * 
   * @returns {void}
   */
  actualizarValidaciones(): void {
    if(this.habilitarNacionalidad) {
      this.agregarProveedorForm.get('nacionalidad')?.setValidators([Validators.required]);
      this.agregarProveedorForm.get('rfc')?.setValidators([Validators.required, Validators.pattern(REGEX_NOMBRE)]);
      this.agregarProveedorForm.get('curp')?.setValidators([Validators.required]);
    }
    else {
      this.agregarProveedorForm.get('nacionalidad')?.clearValidators();
      this.agregarProveedorForm.get('rfc')?.clearValidators();
      this.agregarProveedorForm.get('curp')?.clearValidators();
    }
    this.agregarProveedorForm.get('nacionalidad')?.updateValueAndValidity();
    this.agregarProveedorForm.get('rfc')?.updateValueAndValidity();
    this.agregarProveedorForm.get('curp')?.updateValueAndValidity();
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
          case 260214:
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

  /**
   * @description Habilita o deshabilita los controles del formulario según el valor del campo 'tipoPersona'.
   * Si 'tipoPersona' está vacío, desactiva todos los campos excepto 'tipoPersona'.
   * En caso contrario, habilita todos los campos y marca el desplegable como habilitado.
   */
  changeNacionalidad(): void {
    if ( this.agregarProveedorForm?.value?.tipoPersona === '') {
      Object.keys(this.agregarProveedorForm.controls).forEach(controlName => {
        this.agregarProveedorForm.get(controlName)?.disable();
        if (controlName==='nacionalidad' || controlName === 'tipoPersona') {
          this.agregarProveedorForm.get(controlName)?.enable();
        }
      });
    } 
    else if(this.agregarProveedorForm?.value?.nacionalidad === this.nacionalStr && (this.agregarProveedorForm?.value?.tipoPersona === this.tipoPersona.FISICA || this.agregarProveedorForm?.value?.tipoPersona === this.tipoPersona.MORAL)) {
      Object.keys(this.agregarProveedorForm.controls).forEach(controlName => {
        this.agregarProveedorForm.get(controlName)?.disable();
        if (controlName==='nacionalidad' || controlName === 'rfc' || controlName === 'tipoPersona') {
          this.agregarProveedorForm.get(controlName)?.enable();
        }
      });
    }
    else if (this.agregarProveedorForm?.value?.nacionalidad === this.nacionalStr && this.agregarProveedorForm?.value?.tipoPersona === this.tipoPersona.NO_CONTRIBUYENTE) {
      Object.keys(this.agregarProveedorForm.controls).forEach(controlName => {
        this.agregarProveedorForm.get(controlName)?.disable();
        if (controlName==='nacionalidad' || controlName === 'tipoPersona' || controlName === 'curp') {
          this.agregarProveedorForm.get(controlName)?.enable();
        }
      });
    }
    else {
       if (this.agregarProveedorForm?.get('tipoPersona')?.value) {
        Object.keys(this.agregarProveedorForm.controls).forEach(
          (controlName) => {
            if (controlName !== 'nacionalidad' && controlName !== 'tipoPersona') {
              this.agregarProveedorForm.get(controlName)?.reset();
            }
          }
        );
      }
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
