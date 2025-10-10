import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { ComplimentosService } from '../../services/complimentos.service';

import { CATALOGO_TIPO, MontoDeInversion } from '../../constantes/complementar-planta.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { Notificacion, NotificacionesComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MONTOS_DE_INVERSION } from '../../constantes/montos-de-inversion.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src'
import { TablaSeleccion } from '@libs/shared/data-access-user/src'
import { TituloComponent } from '@libs/shared/data-access-user/src'
/**
 * Componente para gestionar los montos de inversión.
 * @class MontosDeInversionComponent
 */
@Component({
  selector: 'app-montos-de-inversion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    NotificacionesComponent
  ],
  templateUrl: './montos-de-inversion.component.html',
  styleUrl: './montos-de-inversion.component.css',
})
export class MontosDeInversionComponent implements OnInit {
  /**
   * Formulario para gestionar los montos de inversión.
   * @property {FormGroup} montosDeInversionForm
   */
  montosDeInversionForm!: FormGroup;

  /**
   * Opciones disponibles para el tipo de inversión.
   * @property {Array} tipoOptions
   */
  tipoOptions = CATALOGO_TIPO;

  /**
   * Lista de montos de inversión.
   * @property {Array} montosDeInversion
   */
  montosDeInversion = [];
  /**
   * Tipo de selección para la tabla de montos de inversión.
   * @property {TablaSeleccion} montosDeInversionTablaSeleccion
   */
  montosDeInversionTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de montos de inversión.
   * @property {any} montosDeInversionEncabezado
   */
  montosDeInversionEncabezado = MONTOS_DE_INVERSION;

  /**
   * Datos para la tabla de montos de inversión.
   * @property {MontoDeInversion[]} montosDeInversionDatos
   */
  montosDeInversionDatos: MontoDeInversion[] = [];
  /**
    * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
    */
  public solicitudState!: ComplementarState;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Notificación para agregar un monto de inversión.
   */
  public agregarMontoNotificacion!: Notificacion;
  /**
   * Evento que se emite al cerrar el popup.
   * 
   * Se utiliza para notificar al componente padre que el popup ha sido cerrado.
   */
  @Output() cerrarPopup = new EventEmitter<void>();

  /**  
   * Evento de salida que emite una lista de montos de inversión al componente padre.
   */
  @Output() obtenerMontosInversionList: EventEmitter<MontoDeInversion[]> = new EventEmitter<MontoDeInversion[]>();

/**
 * Maneja el cambio de selección en la tabla de montos de inversión.
 * @param event Evento que contiene la lista de filas seleccionadas en la tabla.
 */
  public seleccionados: MontoDeInversion[] = [];

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construcción de formularios
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location, private complementarStore: ComplementarStore,
    private complementarQuery: ComplementarQuery, private complimentosService: ComplimentosService,) {

  }
  /**
  * Método que se ejecuta cuando el componente es inicializado.
  * 
  * Inicializa el formulario reactivo con los valores actuales de la solicitud.
  */
  ngOnInit(): void {
    this.createMontosDeInversionForm();
    if (!(this.solicitudState.tipoInversionOptions.length)) {
      this.obtenerTipoMontoOptions('ENU_TIPO_MONTO_INVERSION');
    } else {
      this.tipoOptions = [...this.solicitudState.tipoInversionOptions];
    }
  }
  /**
   * Agrega un nuevo monto de inversión.
   */
  agregarMonto(): void {

    if (this.montosDeInversionForm.valid) {
      this.agregarMontoNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'La operación se realizó exitosamente.',
        cerrar: true,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      const VALOR_FORMULARIO = this.montosDeInversionForm.value;
      const NUEVO_MONTO: MontoDeInversion = {
        PLANTA: '',
        TIPO: VALOR_FORMULARIO.tipos || '',
        CANTIDAD: VALOR_FORMULARIO.cantidad || '',
        DESCRIPCION: VALOR_FORMULARIO.descripsion || '',
        MONTO: VALOR_FORMULARIO.mnx || '',
      };
      this.montosDeInversionDatos = [...this.montosDeInversionDatos, NUEVO_MONTO];
      this.montosDeInversionForm.reset();
    }
  }
  /**
   * Limpia el formulario de montos de inversión.
   */
  limpiarFormulario(): void {
    this.montosDeInversionForm.reset();
  }

  /** Obtiene y actualiza las opciones del catálogo de tipo de monto desde el servicio. */
  obtenerTipoMontoOptions(tipo: string): void {
    this.complimentosService.getTipoInversion(tipo)
      .pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((res) => {
        this.complementarStore.setTipoInversionOptions(res.datos);
        this.tipoOptions = res.datos;
      });
  }

  /**
   * Crea el formulario de montos de inversión.
   * @method createMontosDeInversionForm
   * @returns {void}
   */
  createMontosDeInversionForm(): void {

    this.complementarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as ComplementarState;
        })
      )
      .subscribe();
    this.montosDeInversionForm = this.fb.group({
      tipos: [this.solicitudState.tipos],
      cantidad: [this.solicitudState.cantidad, [Validators.required]],
      descripsion: [this.solicitudState.descripsion, [Validators.required, Validators.maxLength(1000)]],
      mnx: [
        this.solicitudState.mnx, [Validators.required]
      ],
    });
  }

  /**
   * Maneja el evento de entrada y limita la longitud del texto.
   * @param event Evento del input
   * @param maxLength Longitud máxima permitida
   */
  onInputMaxLength(event: Event, maxLength: number, controlPath: string): void {
    const TARGET = event.target as HTMLInputElement;
    let value = TARGET.value;
    value = value.replace(/\D/g, '').slice(0, maxLength);
    TARGET.value = value;
    this.montosDeInversionForm.get(controlPath)?.setValue(value, { emitEvent: false });
  }
  /**
     * Método que actualiza el store con los valores del formulario.
     * 
     * @param form - Formulario reactivo con los datos actuales.
     * @param campo - El campo que debe actualizarse en el store.
     * @param metodoNombre - El nombre del método en el store que se debe invocar.
     */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof ComplementarStore): void {
    const VALOR = form.get(campo)?.value;
    (this.complementarStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.obtenerMontosInversionList.emit(this.montosDeInversionDatos);
    this.cerrarPopup.emit();
  }

  /**
   * Maneja el cambio de selección en la tabla de montos de inversión.
   * @param event Evento que contiene la lista de filas seleccionadas en la tabla.
   */
  onSeleccionChange(event: MontoDeInversion[]): void {
    this.seleccionados = event;
  }
  
/**
 * Elimina los montos de inversión seleccionados de la lista.
 * @returns {void}
 */
  eliminarMonto(): void {
    this.montosDeInversionDatos = this.montosDeInversionDatos.filter(
      data => !this.seleccionados.some(sel =>
        sel.TIPO === data.TIPO &&
        sel.CANTIDAD === data.CANTIDAD &&
        sel.DESCRIPCION === data.DESCRIPCION &&
        sel.MONTO === data.MONTO
      )
    );
    this.seleccionados = [];
  }
}
