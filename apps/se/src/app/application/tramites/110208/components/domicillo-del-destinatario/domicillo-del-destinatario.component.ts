import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';

/**
 * Componente que gestiona el formulario de domicilio del destinatario.
 */
@Component({
  selector: 'app-domicillo-del-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './domicillo-del-destinatario.component.html',
  styleUrl: './domicillo-del-destinatario.component.css',
})
export class DomicilloDelDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud obtenido desde el store.
   * @type {Solicitud110208State}
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo para gestionar los datos del domicilio del destinatario.
   * @type {FormGroup}
   */
  domicilioDestinatario!: FormGroup;

  /**
   * Lista de catálogos de estados.
   * @type {Catalogo[]}
   */
  estado: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {ValidarInicalmenteService} service - Servicio para validar datos iniciales.
   * @param {Tramite110208Store} tramite110208Store - Store para gestionar el estado del trámite.
   * @param {Tramite110208Query} tramite110208Query - Query para obtener datos del estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private service: ValidarInicalmenteService,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.obtenerEstadoList();

    this.domicilioDestinatario = this.fb.group({
      ciudad: [this.solicitudState?.ciudad, Validators.required],
      calle: [this.solicitudState?.calle, Validators.required],
      numeroLetra: [this.solicitudState?.numeroLetra, Validators.required],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono],
      fax: [this.solicitudState?.fax],
      correoElectronico: [this.solicitudState?.correoElectronico, Validators.required],
      paisDestino: [this.solicitudState?.paisDestino]
    });
  }

  /**
   * Establece valores en el store a partir de un formulario.
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo del formulario.
   * @param {keyof Tramite110208Store} metodoNombre - Método del store para actualizar el valor.
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
   * Método que se ejecuta al destruir el componente.
   * Libera recursos y evita pérdidas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}