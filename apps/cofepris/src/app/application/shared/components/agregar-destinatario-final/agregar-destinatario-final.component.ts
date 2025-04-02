import { Catalogo, TipoPersona } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Destinatario } from '../../models/terceros-relacionados.model';
import { PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE } from '../../constantes/datos-solicitud.enum';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para agregar un destinatario final (Destinatario) al formulario y almacenarlo.
 *
 * @example
 * <app-agregar-destinatario-final></app-agregar-destinatario-final>
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
  styleUrl: './agregar-destinatario-final.component.css',
})
export class AgregarDestinatarioFinalComponent implements OnDestroy, OnInit, OnChanges {
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
  agregarDestinatarioFinal: FormGroup;

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
    * @property idProcedimiento
    * @description Identificador del procedimiento asociado a este componente.
    * @type {number}
    */
  @Input() idProcedimiento!: number;
  
  /**
   * @property mostrarCamposNoContribuyente
   * @description Controla la visibilidad de los campos específicos para no contribuyentes.
   * @type {boolean}
   * @default false
   */
  public mostrarCamposNoContribuyente: boolean = false;

  /**
   * Emite la lista de destinatarios actualizada para ser consumida por otros componentes.
   * @property {EventEmitter<Destinatario[]>} updateDestinatarioFinalTabla
   **/

  @Output() updateDestinatarioFinalTablaDatos = new EventEmitter<Destinatario[]>();

  /**
   * Crea el componente e inicializa el grupo de formulario.
   *
   * @param {FormBuilder} fb - Inyector de FormBuilder para crear formularios reactivos.
   * @param {Tramite260204Store} tramiteStore - Servicio que maneja las actualizaciones de estado para "Tramite260204".
   * @param {Tramite260204Query} tramiteQuery - Servicio para consultar el estado de "Tramite260204".
   * @param {Location} ubicaccion - Servicio de Angular para navegar hacia atrás en el historial.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener diferentes listas de datos.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
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
      nombres: ['', Validators.required],
      denominacionRazon:['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      numeroExterior: ['', Validators.required],
      numeroInterior: [''],
      lada: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
    this.mostrarCamposNoContribuyente=PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Hook de ciclo de vida de Angular que se llama cuando se detectan cambios en las propiedades de entrada.
   * Llama al método `mostrarCamposNoContribuyente()`.
   */
  ngOnChanges(): void {
    this.mostrarCamposNoContribuyente=PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE.includes(this.idProcedimiento);
  }

  /**
   * Guarda un nuevo destinatario en el arreglo local `destinatarios`
   * y actualiza la información en el store. Finalmente, resetea el formulario
   * y navega hacia atrás en el historial.
   */
  guardarDestinatario(): void {
    const NUEVO_DESTINATARIO: Destinatario = {
      nombreRazonSocial: `${this.agregarDestinatarioFinal.value.nombres} ${
        this.agregarDestinatarioFinal.value.primerApellido
      } ${this.agregarDestinatarioFinal.value.segundoApellido || ''}`.trim(),
      rfc: this.agregarDestinatarioFinal.value.rfc,
      curp: '',
      telefono:
        `${this.agregarDestinatarioFinal.value.lada} ${this.agregarDestinatarioFinal.value.telefono}`.trim(),
      correoElectronico: this.agregarDestinatarioFinal.value.correoElectronico,
      calle: this.agregarDestinatarioFinal.value.calle,
      numeroExterior: this.agregarDestinatarioFinal.value.numeroExterior,
      numeroInterior: this.agregarDestinatarioFinal.value.numeroInterior || '',
      pais: this.agregarDestinatarioFinal.value.pais,
      colonia: this.agregarDestinatarioFinal.value.colonia,
      municipioAlcaldia: this.agregarDestinatarioFinal.value.municipio,
      localidad: this.agregarDestinatarioFinal.value.localidad,
      entidadFederativa: '',
      estadoLocalidad: this.agregarDestinatarioFinal.value.estado,
      codigoPostal: this.agregarDestinatarioFinal.value.codigoPostal,
      coloniaEquivalente: this.agregarDestinatarioFinal.value.codigoPostal,
    };

    this.destinatarios.push(NUEVO_DESTINATARIO);
   this.updateDestinatarioFinalTablaDatos.emit(this.destinatarios);
    this.agregarDestinatarioFinal.reset();
    this.ubicaccion.back();
  }



  /**
   * Hook del ciclo de vida que se invoca cuando se inicializa el componente.
   * Llama al método `cargarDatos()`.
   */
  ngOnInit(): void {
    this.cargarDatos();
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
  cancelar():void{
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
}
