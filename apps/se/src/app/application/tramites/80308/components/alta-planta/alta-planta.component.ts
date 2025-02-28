import {
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CONFIGURACION_DOMICILIOS } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DomicilioInfo } from '../../models/plantas-consulta.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-planta',
  templateUrl: './alta-planta.component.html',
  styleUrls: ['./alta-planta.component.scss'],
  standalone: true,
  imports: [
    CatalogoSelectComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ComplementariaImmexComponent,
    ReactiveFormsModule,
  ],
  providers: [ModificacionSolicitudeService, ToastrService],
})
export class AltaPlantaComponent implements OnInit, OnDestroy {
  /**
   * Formulario que contiene el grupo de controles para la entidad federativa.
   */
  formulario: FormGroup;

  /**
   * Lista de catálogos que representan los estados.
   * @type {Catalogo[]}
   */
  estados: Catalogo[] = [];

  /**
   * Estado seleccionado.
   * @type {Catalogo}
   */
  estado!: Catalogo;

  /**
   * Lista de domicilios disponibles.
   * @type {DomicilioInfo[]}
   */
  domicilios: DomicilioInfo[] = [];

  /**
   * Lista de domicilios seleccionados.
   * @type {DomicilioInfo[]}
   */
  domiciliosSeleccionados: DomicilioInfo[] = [];

  /**
   * Variable para definir el tipo de selección en la tabla (por defecto es RADIO).
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Configuración de las columnas de la tabla, utilizando el tipo DomicilioInfo.
   * @type {ConfiguracionColumna<DomicilioInfo>[]}
   */
  configuracionTabla: ConfiguracionColumna<DomicilioInfo>[] =
    CONFIGURACION_DOMICILIOS;

  /**
   * Datos de ejemplo basados en la interfaz DomicilioInfo.
   * @type {DomicilioInfo[]}
   */
  datos: DomicilioInfo[] = [];

  /**
   * Formulario para la certificación.
   * @type {FormGroup}
   */
  certificionForm!: FormGroup;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  fb: FormBuilder = Inject(FormBuilder);
  modificionService: ModificacionSolicitudeService =Inject(ModificacionSolicitudeService)
  toastr: ToastrService =Inject(ToastrService)

  /**
   * Constructor de la clase.
   * @param {FormBuilder} fb - El servicio para construir formularios reactivos.
   * @param {ModificacionSolicitudeService} modificionService - Servicio para la modificación de solicitudes.
   */
  constructor() {
    // Inicialización del formulario para la entidad federativa.
    this.formulario = this.fb.group({
      entidadFederativa: ['-1', Validators.required],
    });

    // Inicialización del formulario de certificación con un valor predeterminado y deshabilitado.
    this.certificionForm = this.fb.group({
      certificion: [{ value: 'Si', disabled: true }],
    });
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formulario.get('entidadFederativa') as FormControl;
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga la lista de estados.
   */
  ngOnInit(): void {
    this.cargarEstados();
  }

  /**
   * Método para cargar los estados mediante el servicio.
   * Realiza una llamada al servicio para obtener la lista de estados.
   */
  cargarEstados(): void {
    this.modificionService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.estados = data;
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  /**
   * Método para buscar domicilios según la entidad seleccionada en el formulario.
   * Realiza una llamada al servicio para obtener los domicilios de la entidad seleccionada.
   */
  buscarDomicilios(): void {
    const entidad = this.formularioControl?.value;

    if (entidad && entidad !== '-1') {
      this.modificionService
        .obtenerDomicilios()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: DomicilioInfo[]) => {
            this.datos = [...data];
          },
          () => {
            this.toastr.error('Error al buscar domicilios')
          }
        );
    } else {
      // Maneja el caso donde la selección de la entidad no es válida.
      this.toastr.error('Seleccione una entidad federativa válida.')
    }
  }

  /**
   * Método para seleccionar un domicilio de la lista.
   * @param {DomicilioInfo} domicilios - El domicilio que se selecciona.
   */
  seleccionarDomicilios(domicilios: DomicilioInfo): void {
    this.domiciliosSeleccionados = [{ ...domicilios }];
  }

  /**
   * Método para aplicar la acción seleccionada, asignando los domicilios seleccionados.
   */
  aplicarAccion(): void {
    this.domicilios = this.domiciliosSeleccionados;
  }

  /**
   * Método para eliminar una planta de los domicilios seleccionados.
   * @param {DomicilioInfo} plantas - El domicilio que se quiere eliminar.
   */
  eliminarPlantas(plantas: DomicilioInfo): void {
    if (!this.domiciliosSeleccionados.length) {
      return;
    }
    this.domiciliosSeleccionados = this.domiciliosSeleccionados.filter(
      (ele) => {
        return ele.id !== plantas.id;
      }
    );
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
