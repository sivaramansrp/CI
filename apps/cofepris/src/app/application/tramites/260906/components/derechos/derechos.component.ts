import { Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FECHA_DE_PAGO } from '../../models/solicitud-datos.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { Permiso260906Query } from '../../../../estados/queries/permiso260906.query';
import { ReactiveFormsModule } from '@angular/forms';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { SanitarioService } from '../../services/sanitario.service';
import { Solicitud260906State } from '../../../../estados/tramites/sanitario260906.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que gestiona la sección de derechos en el trámite 260906.
 * Este componente permite la visualización y edición de los datos relacionados con los derechos.
 */
@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './derechos.component.html',
  styleUrls: ['./derechos.component.css'],
})
export class DerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los datos de los derechos.
   */
  derechosForm!: FormGroup;

  /**
   * Notificador para gestionar la destrucción de suscripciones de RxJS.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de derechos obtenida desde el servicio.
   */
  public derechosList!: Catalogo[];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260906State;

  /**
   * Fecha inicial para el componente de entrada de fecha.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener datos relacionados con los derechos.
   * @param sanitario260906Store Almacén de estado para el trámite sanitario 260906.
   * @param permiso260906Query Consulta para obtener el estado de la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private service: SanitarioService,
    private sanitario260906Store: Sanitario260906Store,
    private permiso260906Query: Permiso260906Query
  ) {
    // Inicialización adicional si es necesario
  }

  /**
   * Método de inicialización del componente.
   * Configura el formulario y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.permiso260906Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.derechosForm = this.fb.group({
      referencia: [this.solicitudState?.referencia],
      cadenaDependencia: [this.solicitudState?.cadenaDependencia],
      llave: [this.solicitudState?.llave],
      banco: [this.solicitudState?.banco],
      tipoFetch: [this.solicitudState?.tipoFetch],
      importe: [this.solicitudState?.importe],
    });

    this.loadComboUnidadMedida();
  }

  /**
   * Método para establecer valores en el store desde el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store que será invocado.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Sanitario260906Store): void {
    const VALOR = form.get(campo)?.value;
    (this.sanitario260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método para cargar la lista de unidades de medida desde el servicio.
   */
  loadComboUnidadMedida(): void {
    this.service.getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.derechosList = data as Catalogo[];
      });
  }

  /**
   * Método de limpieza al destruir el componente.
   * Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Método para manejar el cambio de fecha en el formulario.
   * @param fecha Nueva fecha seleccionada.
   */
  onFechaCambiada(fecha: string): void {
    this.derechosForm.patchValue({ tipoFetch: fecha });
  }
}