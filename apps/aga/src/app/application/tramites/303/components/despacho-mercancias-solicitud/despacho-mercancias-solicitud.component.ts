import { Catalogo, Notificacion } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { Tramite303Store, Tramite303StoreService } from '../../../../core/estados/tramites/tramite303.store';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';
import { TransportistaService } from '../../../../core/services/303/trasportista.service';

@Component({
  selector: 'despacho-mercancias-solicitud',
  templateUrl: './despacho-mercancias-solicitud.component.html',
  styleUrl: './despacho-mercancias-solicitud.component.scss'
})
export class DespachoMercanciasSolicitudComponent implements OnInit, OnDestroy {
  /** Formulario para la solicitud de despacho de mercancías */
  formDespacho!: FormGroup;
  /** Notificación a mostrar al usuario */
  public nuevaNotificacion!: Notificacion;
  /** Indica si se debe mostrar el select de IMMEX */
  mostrarSelectImmex = true;
  /** Indica si se deben mostrar los checkboxes de IMMEX */
  mostrarCheckboxesImmex = false;
  /** Catálogo de números IMMEX */
  catNumeroIMMEX!: Catalogo[];
  /** Variable para almacenar el valor del campo */
  valor!: string;
  /** Notificador para destruir las suscripciones y evitar fugas de memoria */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado del trámite 303 consultado */
  public tramiteConsultado?: Tramite303Store;
  /** Subject para destruir las suscripciones. */
  private destruirSuscripcion$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tramite303State: Tramite303StoreService,
    private tramite303Query: Tramite303Query,
    private transportistaService: TransportistaService
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga el catálogo de números IMMEX y asigna el valor a la variable `catNumeroIMMEX`.
   */
  ngOnInit(): void {
    this.tramite303Query.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.tramiteConsultado = seccionState;
          this.mostrarCheckboxesImmex = seccionState?.mostrarCheckboxesImmex || false;
          this.mostrarSelectImmex = seccionState?.mostrarSelectImmex ?? true;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.createFormulario();
    this.ObtenerDatosCatalogoImmex();
  }

  ObtenerDatosCatalogoImmex(): void {
    this.transportistaService.obtenerDatosImmex()
      .pipe(
        map((data) => {
          if (data) {
            this.catNumeroIMMEX = data;
          }
        }),
        catchError((_error) => {
          console.error('Error al consultar catálogo IMMEX', _error);
          return of([]);
        }),
        takeUntil(this.destruirSuscripcion$)
      )
      .subscribe();
  }

  /**
   * Crea el formulario para la solicitud de despacho de mercancías.
   */
  createFormulario(): void {
    this.formDespacho = this.fb.group({
      cumplimiento: [this.tramiteConsultado?.cumplimiento, Validators.required],
      autorizar: [this.tramiteConsultado?.autorizar, Validators.required],
      listado: [this.tramiteConsultado?.listado, Validators.required],
      certificados: [this.tramiteConsultado?.certificados, Validators.required],
      art17: [this.tramiteConsultado?.art17, Validators.required],
      buzon: [this.tramiteConsultado?.buzon, Validators.required],
      cuentaImmex: [this.tramiteConsultado?.cuentaImmex, Validators.required],
      checkboxImportacion1: [this.tramiteConsultado?.checkboxImportacion1 || false],
      checkboxImportacion2: [this.tramiteConsultado?.checkboxImportacion2 || false],
      immex: [this.tramiteConsultado?.cuentaImmex, Validators.required],
    });
    this.monitorValores();
  }

  /**
   * Monitorea los cambios en los valores de los controles del formulario.
   * Si se detecta un cambio en ciertos controles, se invoca la función `notificaciones`.
   */
  monitorValores(): void {
    Object.keys(this.formDespacho.controls).forEach(controlName => {
      this.formDespacho.get(controlName)?.valueChanges.subscribe(value => {
        if ((controlName === 'cumplimiento' || controlName === 'autorizar' || controlName === 'certificados' || controlName === 'buzon') && value === 'aa') {
          this.notificaciones();
        } else if ((controlName === 'listado' || controlName === 'art17') && value === 'a') {
          this.notificaciones();
        } else if (controlName === 'cuentaImmex') {
          if (value === 'a') {
            this.mostrarSelectImmex = true;
            this.mostrarCheckboxesImmex = false;
            this.tramite303State.setSelectImmex(true);
            this.tramite303State.setCheckboxesImmex(false);
          } else if (value === 'aa') {
            this.mostrarSelectImmex = false;
            this.mostrarCheckboxesImmex = true;
            this.tramite303State.setSelectImmex(false);
            this.tramite303State.setCheckboxesImmex(true);
          }
        }
      });
    });
  }

  /**
   * Muestra una notificación al usuario con información relevante.
   * Esta función se invoca cuando se cumplen ciertas condiciones en los controles del formulario.
   */
  notificaciones(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'info',
      modo: 'action',
      titulo: '',
      mensaje: 'Es un requisito necesario para acceder al Registro de Despacho de Mercancías de las empresas, de conformidad con la regla 7.5.1. de las.G.C.E.',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Método para establecer los valores en el store del trámite 303.
   * @param form Formulario del componente.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método en el store para actualizar el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite303StoreService): void {
    const VALOR = form.get(campo)?.value;

    // Forzar conversión a boolean si el campo es checkbox
    const ISCHECKBOX = campo === 'checkboxImportacion1' || campo === 'checkboxImportacion2';

    if (ISCHECKBOX) {
      (this.tramite303State[metodoNombre] as (value: boolean) => void)(Boolean(VALOR));
    } else {
      (this.tramite303State[metodoNombre] as (value: string) => void)(VALOR);
    }
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
