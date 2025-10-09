import {
  Catalogo,
  ProyectoImmexConfiguartion,
  ProyectoImmexEncabezado,
} from '../../models/nuevo-programa-industrial.model';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnInit, Output } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { ComplimentosService } from '../../services/complimentos.service';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { PoryectoDatos } from '../../models/nuevo-programa-industrial.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-proyecto-immex',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  templateUrl: './proyecto-immex.component.html',
  styleUrl: './proyecto-immex.component.scss',
})
/**
 * Componente para gestionar los proyectos IMMEX.
 */
export class ProyectoImmexComponent implements OnInit {
  /**
   * Datos del proyecto IMMEX.
   * @type {PoryectoDatos}
   */
  @Input() proyectoImmexDatos!: PoryectoDatos;

  /**
   * Datos del catálogo de documentos.
   * @type {Catalogo[]}
   */
  public documentoCatalogDatos: Catalogo[] = [];

  /**
   * Configuración del proyecto IMMEX.
   * @type {ProyectoImmexConfiguartion<ProyectoImmexEncabezado>}
   */
  @Input()
  proyectoImmexConfiguartion!: ProyectoImmexConfiguartion<ProyectoImmexEncabezado>;

  /**
   * Lista de encabezados del proyecto IMMEX.
   * @type {ProyectoImmexEncabezado[]}
   */
  @Input() proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];

  /**
   * Emisor de eventos para devolver la lista de encabezados del proyecto IMMEX.
   * @type {EventEmitter<ProyectoImmexEncabezado[]>}
   */
  @Output() obtenerProyectoTablaDevolverLaLlamada: EventEmitter<
    ProyectoImmexEncabezado[]
  > = new EventEmitter<ProyectoImmexEncabezado[]>(true);

  /**
   * Formulario reactivo para gestionar los datos del proyecto IMMEX.
   * @type {FormGroup}
   */
  public proyectoForm!: FormGroup;

  /**
   * Indica si la tabla está seleccionada.
   * @type {boolean}
   */
  public esTablaeleccionada: boolean = false;

  /**
   * Lista de encabezados seleccionados del proyecto IMMEX.
   * @type {ProyectoImmexEncabezado[]}
   */
  public seleccionList: ProyectoImmexEncabezado[] = [];

  /**
   * Evento que se emite al cerrar el popup.
   * 
   * Se utiliza para notificar al componente padre que el popup ha sido cerrado.
   */
  @Output() cerrarPopup = new EventEmitter<void>();

  /**
    *  * compodoc
   * @property {Subject<void>} destroyNotifier$
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public complementarState!: ComplementarState;

  /**
   * Contiene la notificación relacionada con la acción de agregar una empresa o elemento.
   * 
   * Se utiliza para mostrar mensajes al usuario, como confirmaciones de éxito,
   * advertencias o errores durante el proceso de agregado.
   */
  public agregarNotification!: Notificacion;


  /**
   * Constructor de la clase ProyectoImmexComponent.
   * @param {FormBuilder} fb - FormBuilder para la creación del formulario reactivo.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private complimentosService: ComplimentosService,
    private complementarStore: ComplementarStore,
    private complementarQuery: ComplementarQuery) {
    //El constructor requiere inyección de dependencias, pero se ha mantenido vacío debido a una regla de ESLint.
  }

  /**
 * Inicializa el componente, suscribe al estado de la solicitud y carga las opciones de país si es necesario.
 */
  ngOnInit(): void {
    this.crearProyectoForm();
    this.complementarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.complementarState = seccionState as ComplementarState;
        })
      )
      .subscribe();
    if (!(this.complementarState.tipoDocumentoOptions.length)) {
      this.obtenerTipoDocumentoOptions(102);
    } else {
      this.documentoCatalogDatos = [...this.complementarState.tipoDocumentoOptions];
    }
  }

  /** Obtiene y actualiza las opciones del catálogo de tipo de documento desde el servicio. */
  obtenerTipoDocumentoOptions(id: number): void {
    this.complimentosService.getTipoDocumento(id)
    .pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe((res) => {
      this.complementarStore.setTipoDocumentoOptions(res.datos);
      this.documentoCatalogDatos = res.datos;
    });
  }

  /**
   * Crea el formulario reactivo para el proyecto IMMEX.
   * @returns {void}
   */
  crearProyectoForm(): void {
    this.proyectoForm = this.fb.group({
      descripcion: [{value: this.proyectoImmexDatos.descripcion, disabled: true}, Validators.required],
      tipoDeDocumente: ['', Validators.required],
      fechaDeFirma: [this.proyectoImmexDatos.fechaDeFirma, Validators.required],
      fechaDeVigencia: [
        this.proyectoImmexDatos.fechaDeVigencia,
        Validators.required,
      ],
      rfcTaxId: [0, Validators.required],
      razonSocial: ['', Validators.required],
    });
  }

  /**
   * Establece la lista de proyectos seleccionados.
   * @param {ProyectoImmexEncabezado[]} event - Lista de encabezados seleccionados.
   * @returns {void}
   */
  setProyectpLista(event: ProyectoImmexEncabezado[]): void {
    const LISTA_SELECCIONADA = event ? event : [];
    this.seleccionList = LISTA_SELECCIONADA;
    this.seleccionList.map((ele) => {
      ele.estatus = true;
      return ele;
    });
    this.obtenerProyectoTablaDevolverLaLlamada.emit(LISTA_SELECCIONADA);
    this.esTablaeleccionada = true;
  }

  /**
   * Agrega un nuevo proyecto IMMEX a la lista.
   * @returns {void}
   */
  aggregar(): void {
    this.agregarNotification = {
    tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'La operación se realizó exitosamente.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
  }
    if (this.esTablaeleccionada && this.seleccionList.length) {
      const OBJECTO_IDX: ProyectoImmexEncabezado = {
        ...this.seleccionList[0],
        encabezadoDescripcionOtro: this.proyectoForm.get('descripcion')?.value,
        encabezadoTipoDocument: this.proyectoForm.get('tipoDeDocumente')?.value,
        encabezadoFechaFirma: this.proyectoForm.get('fechaDeFirma')?.value,
        encabezadoFechaVigencia:
          this.proyectoForm.get('fechaDeVigencia')?.value,
        encabezadoRfc: this.proyectoForm.get('rfcTaxId')?.value,
        encabezadoRazonFirmante: this.proyectoForm.get('razonSocial')?.value,
        estatus: this.seleccionList[0].estatus,
        encabezadoFraccion: this.proyectoImmexDatos?.fraccionArancelaria,
      };
      const OBJECTO_INDICE = this.proyectoImmexTablaLista.findIndex((idx) => {
        return idx.encabezadoRfc === OBJECTO_IDX.encabezadoRfc;
      });
      this.proyectoImmexTablaLista.splice(OBJECTO_INDICE, 1, OBJECTO_IDX);
      this.obtenerProyectoTablaDevolverLaLlamada.emit(
        this.proyectoImmexTablaLista
      );
      this.esTablaeleccionada = !this.esTablaeleccionada;
      this.seleccionList = [];
      this.proyectoForm.reset();
      return;
    }
    const OBJECTO_IDX: ProyectoImmexEncabezado = {
      encabezadoDescripcionOtro: this.proyectoForm.get('descripcion')?.value,
      encabezadoTipoDocument: this.proyectoForm.get('tipoDeDocumente')?.value,
      encabezadoFechaFirma: this.proyectoForm.get('fechaDeFirma')?.value,
      encabezadoFechaVigencia: this.proyectoForm.get('fechaDeVigencia')?.value,
      encabezadoRfc: this.proyectoForm.get('rfcTaxId')?.value,
      encabezadoRazonFirmante: this.proyectoForm.get('razonSocial')?.value,
      estatus: false,
      encabezadoFraccion: this.proyectoImmexDatos?.fraccionArancelaria,
    };
    this.proyectoImmexTablaLista = [...this.proyectoImmexTablaLista, OBJECTO_IDX];
    this.obtenerProyectoTablaDevolverLaLlamada.emit(
      this.proyectoImmexTablaLista
    );
    this.proyectoForm.reset();
  }

  /**
   * Limpia el formulario del proyecto IMMEX.
   * @returns {void}
   */
  limpar(): void {
    this.proyectoForm.reset();
  }

  /**
   * Elimina los proyectos IMMEX seleccionados de la lista.
   * @returns {void}
   */
  elimiar(): void {
    this.proyectoImmexTablaLista = this.proyectoImmexTablaLista.filter(
      (idx) => {
        return !idx.estatus;
      }
    );
  }

  /**
   * Edita el proyecto IMMEX seleccionado en el formulario.
   * @returns {void}
   */
  eidtar(): void {
    this.seleccionList = this.proyectoImmexTablaLista.filter((idx) => {
      return idx.estatus;
    });
    this.proyectoForm.patchValue({
      descripcion: this.seleccionList[0]?.encabezadoDescripcionOtro,
      tipoDeDocumente: this.seleccionList[0]?.encabezadoTipoDocument,
      fechaDeFirma: this.seleccionList[0].encabezadoFechaFirma,
      fechaDeVigencia: this.seleccionList[0].encabezadoFechaVigencia,
      rfcTaxId: this.seleccionList[0].encabezadoRfc,
      razonSocial: this.seleccionList[0].encabezadoRazonFirmante,
    });
  }

  /**
   * Regresa a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regresar(): void {
    this.cerrarPopup.emit();
  }
}
