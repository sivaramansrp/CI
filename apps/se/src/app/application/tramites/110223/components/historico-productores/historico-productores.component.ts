import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { headersDataSeleccionadasTabla, historicoTableColumns } from '../../models/registro.model';
import { map, takeUntil } from 'rxjs';
import { CertificadosOrigenService } from '../../../110223/services/certificado-origen.service';
import { CommonModule } from '@angular/common';
import { HistoricoColumnas } from '../../../110223/models/certificado-origen.model';
import { Modal } from 'bootstrap';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { Solicitud110223State } from '../../../../estados/tramites/Tramite110223.store';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110223Query } from '../../../../estados/queries/tramite110223.query';
import { Tramite110223Store } from '../../../../estados/tramites/Tramite110223.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar el histórico de productores.
 * Este componente permite al usuario visualizar, seleccionar y gestionar productores relacionados
 * con el trámite. También incluye la funcionalidad para agregar nuevos productores y gestionar
 * datos confidenciales.
 */
@Component({
  selector: 'app-historico-productores',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent],
  templateUrl: './historico-productores.component.html',
  styleUrls: ['./historico-productores.component.scss'],
})
export class HistoricoProductoresComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos de los productores.
   */
  formulario!: FormGroup;

  /**
   * Configuración de la tabla de selección.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla dinámica.
   */
  tableColumns = historicoTableColumns;

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
   * Indica si se está editando una mercancía.
   */
  esMercanciaEnEdicion = false;

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: Solicitud110223State;

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
   * Estado actual de la consulta.
   */
    consultaDatos!: ConsultaioState;

    /**
     * Indica si el formulario está en modo de solo lectura.
     */
    soloLectura: boolean = false;

  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110223Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110223Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110223Store,
    public tramiteQuery: Tramite110223Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.cargarProductorPorExportador();
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.initFormulario();
    this.initAgregarDatosProductorFormulario();
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
      fax: [this.tramiteState?.agregarDatosProductorFormulario?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]],
    });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.certificadosOrigenService
      .obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.productoresExportador = this.agregarProductoresExportador = respuesta.datos;
      });
  }

  /**
   * Obtiene los productores seleccionados en la tabla.
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados.
   */
  obtenerSeleccionadoProductores(evento: HistoricoColumnas[]): void {
    this.seleccionadoProductoresExportador = evento;
  }

  /**
   * Obtiene los productores seleccionados para agregar.
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados para agregar.
   */
  obtenerAnadirProductosSeleccionados(evento: HistoricoColumnas[]): void {
    this.seleccionadoAgregarProductoresExportador = evento;
  }

  /**
   * Agrega los productores seleccionados a la lista de productores agregados.
   */
  productoresSeleccionados(): void {
    this.agregarProductoresExportador = [
      ...this.agregarProductoresExportador,
      ...this.seleccionadoProductoresExportador,
    ];
    this.productoresExportador = this.productoresExportador.filter(
      (elementos) =>
        !this.seleccionadoProductoresExportador.some(
          (elementosSecundarios) => elementosSecundarios.id === elementos.id
        )
    );
    this.seleccionadoProductoresExportador = [];
  }

  /**
   * Elimina los productores seleccionados de la lista de productores agregados.
   */
  eliminarProductoresSeleccionados(): void {
    this.productoresExportador = [
      ...this.productoresExportador,
      ...this.seleccionadoAgregarProductoresExportador,
    ];
    this.agregarProductoresExportador = this.agregarProductoresExportador.filter(
      (elementos) =>
        !this.seleccionadoAgregarProductoresExportador.some(
          (elementosSecundarios) => elementosSecundarios.id === elementos.id
        )
    );
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
    this.esMercanciaEnEdicion = true;
    this.agregarDatosProductorFormulario.markAllAsTouched();
    if (this.agregarDatosProductorFormulario.valid) {
      this.cerrarModal();
    }
  }

  /**
   * Valida un campo del formulario.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110223Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110223Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   */
  public headersData = headersDataSeleccionadasTabla;
    /**
   * Inicializa el estado del formulario (habilitado/deshabilitado) basado en el modo de solo lectura.
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
}