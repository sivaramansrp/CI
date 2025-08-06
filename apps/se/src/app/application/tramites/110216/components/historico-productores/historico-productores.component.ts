import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ConfiguracionColumna,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite110216State,
  Tramite110216Store
} from '../../../../estados/tramites/tramite110216.store';
import { CertificadosOrigenService } from '../../services/certificado-origen.service';
import { CommonModule } from '@angular/common';
import { HistoricoColumnas } from '../../models/certificado-origen.model';
import { Modal } from 'bootstrap';
import { TABLE_COLUMNS } from '../../constants/inicialmente-certificado-origen.enum';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';

/**
 * Componente para gestionar el histórico de productores.
 * 
 * Este componente permite al usuario visualizar, seleccionar y gestionar productores relacionados
 * con el trámite. También incluye la funcionalidad para agregar nuevos productores y gestionar
 * datos confidenciales.
 */
@Component({
  selector: 'app-historico-productores',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './historico-productores.component.html',
  styleUrl: './historico-productores.component.scss',
})
export class HistoricoProductoresComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos de los productores.
   */
  formulario!: FormGroup;

  /**
 * Configuración de la tabla de selección.
 * 
 * Esta propiedad se utiliza para gestionar la configuración y el comportamiento
 * de la tabla de selección en el componente.
 * 
 * @type {TablaSeleccion}
 */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla dinámica.
   */
  tableColumns: ConfiguracionColumna<HistoricoColumnas>[] = TABLE_COLUMNS;

  /**
   * Lista de productores disponibles para el exportador.
   */
  productoresExportador: HistoricoColumnas[] = [];

  /**
   * Lista de productores seleccionados para agregar.
   */
  seleccionadoProductoresExportador: HistoricoColumnas[] = [];

  /**
   * Lista de productores ya agregados.
   */
  agregarProductoresExportador: HistoricoColumnas[] = [];

  /**
   * Lista de productores seleccionados para eliminar.
   */
  seleccionadoAgregarProductoresExportador: HistoricoColumnas[] = [];

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: Tramite110216State;

  /**
   * Referencia al modal para agregar datos del productor.
   */
  @ViewChild('modalAgregarDatosProductorPorExportador') modalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Formulario para agregar datos del productor.
   */
  agregarDatosProductorFormulario!: FormGroup;
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110216Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110216Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.productoresExportador = this.tramiteState.productoresExportador ?? [];
    this.initFormulario();
    this.initAgregarDatosProductorFormulario();
  }

  /**
   * Inicializa el formulario principal con los datos del estado del trámite.
   */
  initFormulario(): void {
    this.formulario = this.fb.group({
      datosConfidencialesProductor: [this.tramiteState?.datosConfidencialesProductor, []],
      productorMismoExportador: [this.tramiteState?.productorMismoExportador, []],
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el formulario para agregar datos del productor.
   */
  initAgregarDatosProductorFormulario(): void {
    this.agregarDatosProductorFormulario = this.fb.group({
      numeroRegistroFiscal: [this.tramiteState?.agregarDatosProductorFormulario?.numeroRegistroFiscal, [Validators.required]],
      fax: [this.tramiteState?.agregarDatosProductorFormulario?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]]
    });
    this.inicializarEstadoFormulario();
  }
  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   * 
   * Este método habilita o deshabilita los formularios dependiendo del valor de la propiedad `soloLectura`.
   * Si `soloLectura` es `true`, los formularios se deshabilitan; de lo contrario, se habilitan.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.formulario?.disable();
      this.agregarDatosProductorFormulario?.disable();
    } else {
      this.formulario?.enable();
      this.agregarDatosProductorFormulario?.enable();
    }
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.certificadosOrigenService.obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.productoresExportador = respuesta.datos;
      });
  }

  /**
   * Obtiene los productores seleccionados en la tabla.
   * 
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados.
   */
  obtenerSeleccionadoProductores(evento: HistoricoColumnas[]): void {
    this.seleccionadoProductoresExportador = evento;
  }

  /**
   * Obtiene los productores seleccionados para agregar.
   * 
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados para agregar.
   */
  obtenerAnadirProductosSeleccionados(evento: HistoricoColumnas[]): void {
    this.seleccionadoAgregarProductoresExportador = evento;
  }

  /**
   * Agrega los productores seleccionados a la lista de productores agregados.
   */
  productoresSeleccionados(): void {
    this.agregarProductoresExportador = [...this.agregarProductoresExportador, ...this.seleccionadoProductoresExportador];
    this.productoresExportador = this.productoresExportador.filter(elementos => !this.seleccionadoProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoProductoresExportador = [];
  }

  /**
   * Elimina los productores seleccionados de la lista de productores agregados.
   */
  eliminarProductoresSeleccionados(): void {
    this.productoresExportador = [...this.productoresExportador, ...this.seleccionadoAgregarProductoresExportador];
    this.agregarProductoresExportador = this.agregarProductoresExportador.filter(elementos => !this.seleccionadoAgregarProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoAgregarProductoresExportador = [];
  }

  /**
   * Abre el modal para agregar datos del productor.
   */
  agregarDatosProductorPorExportador(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal para agregar datos del productor.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Agrega un productor si el formulario es válido.
   */
agregarExportador(): void {
  this.agregarDatosProductorFormulario.markAllAsTouched();
  if (this.agregarDatosProductorFormulario.valid) {
    const NUEVO_PRODUCTOR: HistoricoColumnas = this.agregarDatosProductorFormulario.value;
    this.productoresExportador = [...this.productoresExportador, NUEVO_PRODUCTOR];
    this.cerrarModal();
  } 
}


  /**
   * Valida un campo del formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110216Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110216Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}