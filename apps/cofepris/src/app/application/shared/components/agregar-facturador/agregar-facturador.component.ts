import { Component, Input } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { EventEmitter } from '@angular/core';
import { Facturador } from '../../models/terceros-relacionados.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TipoPersona } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * Componente para agregar un facturador (persona física o moral) al trámite actual.
 * Permite capturar datos generales y de contacto, y actualiza el store con el nuevo registro.
 */
@Component({
  selector: 'app-agregar-facturador',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './agregar-facturador.component.html',
  styleUrl: './agregar-facturador.component.css',
})
export class AgregarFacturadorComponent implements OnInit, OnDestroy {
  /**
   * Identificador del procedimiento actual.
   * Utilizado para controlar el flujo de la vista dependiendo del tipo de procedimiento.
   *
   * @input idProcedimiento - Cadena que representa el ID del procedimiento (por ejemplo: '260102').
   */
  @Input()
  idProcedimiento!: number;
  /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];
  /**
   * @property tipoPersona
   * @description Proporciona acceso al enum `TipoPersona` para su uso en la clase.
   * @type {TipoPersona}
   */
  public tipoPersona = TipoPersona;
  /**
   * Formulario reactivo para capturar los datos del facturador.
   * @property {FormGroup} agregarFacturadorForm
   */
  agregarFacturadorForm!: FormGroup;

  /**
   * Subject utilizado para desuscribirse automáticamente de observables al destruir el componente.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Lista de países obtenidos del servicio.
   * @property {Catalogo[]} paisesDatos
   */
  paisesDatos: Catalogo[] = [];

  /**
   * Lista de facturadores almacenados localmente.
   * @property {Facturador[]} facturadores
   */
  facturadores: Facturador[] = [];

   /**
   * @property {Facturador | undefined} datoSeleccionado
   * Dato seleccionado que se pasará al componente hijo `AgregarDestinatarioComponent`.
   */
  @Input() datoSeleccionado: Facturador[] | undefined;

  /**
   * Evento de salida que emite la lista de facturadores actualizada.
   * @property {EventEmitter<Facturador[]>} updateFacturadorTablaDatos
   */
  @Output() updateFacturadorTablaDatos = new EventEmitter<Facturador[]>();



  /**
   * Controla si el desplegable de nacionalidad está deshabilitado.
   * @property {boolean} estaDeshabilitadoDesplegable
   */
  public estaDeshabilitadoDesplegable: boolean = true;

  /**
   * Constructor que inicializa el formulario y servicios necesarios.
   *
   * @param {FormBuilder} fb - FormBuilder para construir el formulario reactivo.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener listas de catálogos.
   * @param {Tramite260204Store} tramiteStore - Store que administra el estado del trámite.
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado actual del trámite.
   * @param {Location} ubicaccion - Servicio para manejar la navegación (volver atrás).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location
  ) {
    // Constructor vacío, se inyectan las dependencias para su uso en el componente.
  }

  /**
   * Hook de inicialización del componente. Carga los catálogos necesarios.
   */
  ngOnInit(): void {
    this.cargarDatos();
    this.crearAgregarFormularioFacturador();
    this.changeNacionalidad();
  }

  /**
   * Método que inicializa el formulario reactivo y valida los elementos según el procedimiento.
   * @returns {void}
   */
  crearAgregarFormularioFacturador(): void {
    this.agregarFacturadorForm = this.fb.group({
      tipoPersona: ['', Validators.required],
      nombres: [this.obtenerValor('nombres'), Validators.required],
      primerApellido: [
        this.obtenerValor('primerApellido'),
        Validators.required,
      ],
      segundoApellido: [this.obtenerValor('segundoApellido')],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [this.obtenerValor('estadoLocalidad'), Validators.required],
      codigoPostal: [this.obtenerValor('codigoPostal'), Validators.required],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [
        this.obtenerValor('numeroExterior'),
        Validators.required,
      ],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [this.obtenerValor('lada'), Validators.required],
      telefono: [
        {
          value: this.elementosDeshabilitados.includes('telefono')
            ? '3461235'
            : this.obtenerValor('telefono'),
          disabled: this.elementosDeshabilitados.includes('telefono'),
        },
      ],
      correoElectronico: [
        {
          value: this.elementosDeshabilitados.includes('correoElectronico')
            ? 'abc@njk.com'
            : this.obtenerValor('correoElectronico'),
          disabled: this.elementosDeshabilitados.includes('correoElectronico'),
        },
        [Validators.email],
      ],
    });
  }

  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof Facturador } field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(field: keyof Facturador): string | number | undefined {
    return this.datoSeleccionado?.[0]?.[field as keyof Facturador] ?? '';
  }

  /**
   * Carga los países desde el servicio y los almacena en `paisesDatos`.
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
   * Construye un objeto `Facturador` a partir del formulario,
   * lo agrega al arreglo `facturadores` y actualiza el store.
   * Después, limpia el formulario y regresa a la vista anterior.
   */
  guardarFacturador(): void {
    const VALOR_FORMULARIO = this.agregarFacturadorForm.getRawValue();

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
    const NUEVO_FACTURADOR: Facturador = {
      nombreRazonSocial: nombreRazonSocial,
      rfc: '',
      curp: '',
      telefono: VALOR_FORMULARIO.telefono || '',
      correoElectronico: VALOR_FORMULARIO.correoElectronico || '',
      calle: VALOR_FORMULARIO.calle || '',
      numeroExterior: VALOR_FORMULARIO.numeroExterior || '',
      numeroInterior: VALOR_FORMULARIO.numeroInterior || '',
      pais: VALOR_FORMULARIO.pais || '',
      colonia: VALOR_FORMULARIO.colonia || '',
      municipioAlcaldia: '',
      localidad: '',
      entidadFederativa: VALOR_FORMULARIO.estado || '',
      estadoLocalidad: '',
      codigoPostal: VALOR_FORMULARIO.codigoPostal || '',
      coloniaEquivalente: '',
        nombres: VALOR_FORMULARIO.nombres,
      primerApellido: VALOR_FORMULARIO.primerApellido,
      segundoApellido: VALOR_FORMULARIO.segundoApellido,
      razonSocial: VALOR_FORMULARIO.razonSocial,
      lada: VALOR_FORMULARIO.lada,
    };

    this.facturadores.push(NUEVO_FACTURADOR);
    this.updateFacturadorTablaDatos.emit(this.facturadores);
    this.agregarFacturadorForm.reset();
    this.ubicaccion.back();
  }
  /**
   * @method limpiarFormulario
   * @description Resetea el formulario reactivo `agregarProveedorForm` para limpiar todos los campos.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  limpiarFormulario(): void {
    this.agregarFacturadorForm.reset();
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
   * Habilita o deshabilita los controles del formulario según el valor de `tipoPersona`.
   * Si `tipoPersona` está vacío, deshabilita todos los campos excepto el propio `tipoPersona`.
   * Si tiene valor, habilita todos los campos y activa el desplegable de nacionalidad.
   *
   * @returns {void} No retorna ningún valor.
   */
  changeNacionalidad(): void {
    if (this.agregarFacturadorForm?.value?.tipoPersona === '') {
      Object.keys(this.agregarFacturadorForm.controls).forEach(
        (controlName) => {
          this.agregarFacturadorForm.get(controlName)?.disable();
          if (controlName === 'tipoPersona') {
            this.agregarFacturadorForm.get(controlName)?.enable();
          }
        }
      );
    } else {
      Object.keys(this.agregarFacturadorForm.controls).forEach(
        (controlName) => {
          this.agregarFacturadorForm.get(controlName)?.enable();
          this.estaDeshabilitadoDesplegable = false;
        }
      );
    }
  }

  /**
   * Hook de destrucción del componente. Libera recursos y detiene suscripciones.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
