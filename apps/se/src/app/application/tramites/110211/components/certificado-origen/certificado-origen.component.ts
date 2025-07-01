import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { Catalogo, ConsultaioQuery, SeccionLibQuery, SeccionLibState } from '@libs/shared/data-access-user/src';
import { Observable, Subject, delay, map, of, takeUntil } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DestinatarioComponent } from '../../../110201/components/destinatario/destinatario.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { MercanciaComponent } from '../mercancia/mercancia.component';
import { Modal } from 'bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

/**
 * @descripcion
 * El componente `CertificadoOrigenComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de certificado de origen en el módulo CAM.
 */
@Component({
  selector: 'app-certificado-origen',
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CertificadoDeOrigenComponent,
      DestinatarioComponent,
    MercanciaComponent]
})
export class CertificadoOrigenComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * @descripcion
   * Lista de estados disponibles.
   */
  estado: Catalogo[] = [];

  /**
   * @descripcion
   * Lista de países disponibles.
   */
  pais: Catalogo[] = [];

  /**
   * @descripcion
   * Lista de datos disponibles relacionados con mercancías.
   */
  disponiblesDatos: Mercancia[] = [];

  /**
   * @descripcion
   * Indica si el operador está activo.
   */
  operador: boolean = true;

  /**
   * @descripcion
   * Datos seleccionados para modificación.
   */
  datosSeleccionados!: Mercancia;

  /**
   * @descripcion
   * Instancia del modal de modificación.
   */
  modalInstance!: Modal;

  /**
   * @descripcion
   * Evento para indicar si se seleccionó una fila en la tabla.
   */
  tablaSeleccionEvent: boolean = false;

  /**
   * @descripcion
   * Observable para los datos de la tabla.
   */
  datosTabla$: Observable<Mercancia[]> = of([]);

  /**
   * @descripcion
   * Valores actuales del formulario de certificado.
   */
  formCertificadoValues!: { [key: string]: unknown};

  /**
   * @descripcion
   * Estado actual del certificado.
   */
  private certificadoState!: CamState;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @descripcion
   * Referencia al elemento del modal de modificación.
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;


  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   *
   * @type {boolean}
   * @memberof CertificadoOrigenComponent
   * @compodoc
   * @description
   * Esta propiedad controla si el formulario es solo de lectura (`true`) o editable (`false`).
   */
  esFormularioSoloLectura:boolean = false;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param camCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param store - Almacén para gestionar el estado del formulario de certificado.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private camCertificadoService: CamCertificadoService,
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    private seccionQuery: SeccionLibQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.query.formCertificado$
      .pipe(takeUntil(this.destroyNotifier$), delay(100))
      .subscribe((estado) => {
        this.formCertificadoValues = estado;
      });
        this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.query.selectCam$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.certificadoState = state as CamState;
        })
      )
      .subscribe();

    this.estadoOpcion();
    this.paisOpcion();
    this.datosTabla$ = this.query.selectmercanciaTabla$
  }

  /**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de certificado.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStore(event: { formGroupName: string, campo: string, valor: string | number | boolean | object | null | undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormCertificadoGenric({ [CAMPO]: VALOR });
}

  /**
   * @descripcion
   * Obtiene la lista de estados disponibles.
   */
  estadoOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('estados.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (data) => {
        this.estado = data as Catalogo[];
      },
      error: (_error: HttpErrorResponse) => {
        this.estado = [];
      },
    });
  }

  /**
   * @descripcion
   * Obtiene la lista de países disponibles.
   */
  paisOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('pais.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (data) => {
        this.pais = data as Catalogo[];
      },
      error: (_error: HttpErrorResponse) => {
        this.pais = [];
      },
    });
  }

  /**
   * @descripcion
   * Obtiene los datos disponibles relacionados con mercancías.
   */
  conseguirDisponiblesDatos(): void {
    this.camCertificadoService.obtenerTablaDatos('disponibles-datos.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (response: Mercancia[]) => {
        if (response && Array.isArray(response)) {
          this.disponiblesDatos = response as Mercancia[];
        }
        else {
          this.disponiblesDatos = [];
        }
      },
      error: (_error: HttpErrorResponse) => {
        this.disponiblesDatos = [];
      },
    });
  }

  /**
   * @descripcion
   * Actualiza el almacén con los datos del formulario.
   * @param e - Los datos del formulario a almacenar.
   */
  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado seleccionado.
   * @param estado - El estado seleccionado.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  /**
   * @descripcion
   * Actualiza el almacén con el bloque seleccionado.
   * @param estado - El bloque seleccionado.
   */
  tipoSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }

  /**
   * @descripcion
   * Abre el modal de modificación con los datos seleccionados.
   * @param disponiblesDatos - Los datos seleccionados para modificación.
   */
  abrirModificarModal(disponiblesDatos: Mercancia): void {
    this.datosSeleccionados = disponiblesDatos;
    this.store.setFormMercancia({ ...disponiblesDatos });
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * @descripcion
   * Cierra el modal de modificación.
   */
  cerrarModificarModal(): void {
    if (this.modalInstance) {
      this.tablaSeleccionEvent = true;
      this.modalInstance.hide();
    }
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de que la vista del componente se haya inicializado.
   * Inicializa el modal de modificación.
   */
  ngAfterViewInit(): void {
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación del formulario.
   * @param valida - El estado de validación del formulario.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ certificado: valida });
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}