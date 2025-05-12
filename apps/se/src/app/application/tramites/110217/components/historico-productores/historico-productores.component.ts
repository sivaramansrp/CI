import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HistoricoColumnas } from '../../models/certificado-origen.model';
import { Modal } from 'bootstrap';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

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
  tableColumns: ConfiguracionColumna<HistoricoColumnas>[] = [
    {
      encabezado: 'Nombre del productor',
      clave: (elementos) => elementos.nombreProductor,
      orden: 1
    },
    {
      encabezado: 'Número de registro fiscal',
      clave: (elementos) => elementos.numeroRegistroFiscal,
      orden: 2,
    },
    {
      encabezado: 'Dirección',
      clave: (elementos) => elementos.direccion,
      orden: 3,
    },
    {
      encabezado: 'Correo Electrónico',
      clave: (elementos) => elementos.correoElectronico,
      orden: 4,
    },
    {
      encabezado: 'Teléfono',
      clave: (elementos) => elementos.telefono,
      orden: 5,
    },
    {
      encabezado: 'Fax',
      clave: (elementos) => elementos.fax,
      orden: 6,
    },
  ];

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
  public tramiteState!: Tramite110217State;

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
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
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
  }

  /**
   * Inicializa el formulario principal con los datos del estado del trámite.
   */
  initFormulario(): void {
    this.formulario = this.fb.group({
      datosConfidencialesProductor: [this.tramiteState?.datosConfidencialesProductor, []],
      productorMismoExportador: [this.tramiteState?.productorMismoExportador, []],
    });
  }

  /**
   * Inicializa el formulario para agregar datos del productor.
   */
  initAgregarDatosProductorFormulario(): void {
    this.agregarDatosProductorFormulario = this.fb.group({
      numeroRegistroFiscal: [this.tramiteState?.agregarDatosProductorFormulario?.numeroRegistroFiscal, [Validators.required]],
      fax: [this.tramiteState?.agregarDatosProductorFormulario?.fax, [Validators.pattern(REGEX_SOLO_DIGITOS)]]
    });
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
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store para actualizar el estado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110217Store): void {
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