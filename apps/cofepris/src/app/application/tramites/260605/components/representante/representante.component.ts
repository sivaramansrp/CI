import { AlertComponent, Aviso, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260605State, Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { ReprestantanteData } from '../../models/aduaneras-informaciones.model';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';


@Component({
  selector: 'app-represtantante', // Selector del componente en la plantilla HTML
  templateUrl: './representante.component.html', // Ruta a la plantilla HTML
  styleUrl: './representante.component.scss', // Ruta al archivo de estilos SCSS
  standalone: true, // Define que el componente puede funcionar de forma independiente (sin módulo específico)
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule, AlertComponent], // Módulos y componentes necesarios
})
/**
 * Componente para gestionar el formulario reactivo de los datos del representante.
 * Implementa las interfaces OnInit y OnDestroy para manejar el ciclo de vida del componente.
 * 
 * @class
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export class RepresentanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del representante.
   * 
   * @type {FormGroup}
   * @memberof RepresentanteComponent
   */
  representante!: FormGroup;

  /**
   * Estado de la solicitud.
   * 
   * @type {Solicitud260605State}
   * @memberof RepresentanteComponent
   */
  public solicitudState!: Solicitud260605State;

  /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   * 
   * @type {Aviso}
   * @memberof RepresentanteComponent
   */
  public ADVERTENCIA = Aviso;

  /**
   * Sujeto para notificar la destrucción del componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof RepresentanteComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Suscripción a los cambios en el formulario reactivo.
   * 
   * @private
   * @type {Subscription}
   * @memberof RepresentanteComponent
   */
  private subscription: Subscription = new Subscription();

  /**
   * Datos de prueba del representante.
   * 
   * @type {ReprestantanteData}
   * @memberof RepresentanteComponent
   */
  ReprestantanteData: ReprestantanteData = {
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: ''
  };

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder para la creación de formularios.
   * @param {Tramite260605Store} tramite260605Store - Store para gestionar el estado del trámite.
   * @param {Tramite260605Query} tramite260605Query - Query para obtener el estado del trámite.
   * @memberof RepresentanteComponent
   */
  constructor(
    private fb: FormBuilder,
    private tramite260605Store: Tramite260605Store,
    private tramite260605Query: Tramite260605Query,
    private modificatNoticeService: ModificatNoticeService
  ) {
    // Lógica de inicialización si es necesario
  }

  

  /**
   * Método que se ejecuta al iniciar el componente.
   * 
   * @memberof RepresentanteComponent
   */
  ngOnInit(): void {
    this.subscription.add(
      this.tramite260605Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );
    this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [this.solicitudState?.nombre, Validators.required],
      apellidoPaterno: [this.solicitudState?.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.solicitudState?.apellidoMaterno, Validators.required],
    });
    this.representante.get('nombre')?.disable();
    this.representante.get('apellidoPaterno')?.disable();
    this.representante.get('apellidoMaterno')?.disable();
  }


  /**
   * Método para obtener los datos disponibles de los representantes.
   * Realiza una solicitud al servicio `modificatNoticeService` para recuperar
   * la información de los representantes y la asigna a la propiedad `ReprestantanteData`.
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  public obtenerAduanasDisponiblesDatos(): void { 
    this.modificatNoticeService.ObtenerReprestantanteData()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((response) => {
      this.representante.patchValue({
        nombre: response.nombre,
        apellidoPaterno: response.apellidoPaterno,
        apellidoMaterno: response.apellidoMaterno
      });
    });
  }

  /**
   * Establece valores en el store.
   * 
   * @param {FormGroup} form - El grupo de formularios.
   * @param {string} campo - El nombre del campo.
   * @param {keyof Tramite260605Store} metodoNombre - El nombre del método del store.
   * @memberof RepresentanteComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260605Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260605Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * @memberof RepresentanteComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}