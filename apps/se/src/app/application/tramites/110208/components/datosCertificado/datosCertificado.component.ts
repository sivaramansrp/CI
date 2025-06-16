import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';

/**
 * Componente que gestiona los datos del certificado en el trámite 110208.
 */
@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './datosCertificado.component.html',
  styleUrl: './datosCertificado.component.css',
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;
  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo para gestionar los datos del certificado.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Lista de catálogos de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param service - Servicio para validar inicialmente y obtener datos.
   * @param tramite110208Store - Store del trámite 110208.
   * @param tramite110208Query - Query para obtener datos del trámite 110208.
   */
  constructor(
    private readonly fb: FormBuilder,
    private service: ValidarInicalmenteService,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerEstadoList();

  }
  /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
  inicializarEstadoFormulario(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.formDatosCertificado = this.fb.group({
      observaciones: [this.solicitudState?.observaciones],
      idioma: [this.solicitudState?.idioma, Validators.required],
      entidadFederativa: [this.solicitudState?.entidadFederativaCertificado, Validators.required],
      representacionFederal: [this.solicitudState?.representacionFederal, Validators.required],
      entidadFederativaCertificado: [this.solicitudState?.entidadFederativaCertificado, Validators.required],
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.formDatosCertificado.controls).forEach((key) => {
        this.formDatosCertificado.get(key)?.disable();
      });
    } else {
      Object.keys(this.formDatosCertificado.controls).forEach((key) => {
        this.formDatosCertificado.get(key)?.enable();
      });
    }
  }

  /**
   * Establece valores en el store a partir de un formulario.
   * 
   * @param form - Formulario reactivo con los datos.
   * @param campo - Nombre del campo en el formulario.
   * @param metodoNombre - Nombre del método en el store para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    this.service.obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Método llamado al destruir el componente.
   * Libera los recursos y completa los observables.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}