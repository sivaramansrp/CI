import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

import { DatosEmpresaComponent } from '../../component/datos-empresa/datos-empresa.component';
import { DomicilioDelEstablecimientoComponent } from '../../component/domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { PagoDeDerechosComponent } from '../../component/pago-de-derechos/pago-de-derechos.component';
import { TercerosRelacionadosVistaComponent } from '../../component/terceros-relacionados/terceros-relacionados-vista.component.ts';
import { TramitesAsociadoComponent } from '../../component/tramites-asociado/tramites-asociado.component';

import { Solocitud260912Service } from '../../services/service260912.service';



/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  emitirSeleccionEstablecimiento: boolean = false;
  /** 
   * Evento que se emite cuando cambia la pestaña activa.
   * Comunica al componente padre el índice de la nueva pestaña seleccionada.
   */
  @Output() tabChanged = new EventEmitter<number>();

  /** Referencia al componente de datos de la solicitud del trámite 260912 */
  @ViewChild(DatosEmpresaComponent)
  datosDeLaSolicitudComponent!: DatosEmpresaComponent;

  /** Referencia al componente de domicilio del establecimiento para el trámite 260912 */
  @ViewChild(DomicilioDelEstablecimientoComponent)
  domicilioDelEstablecimientoComponent!: DomicilioDelEstablecimientoComponent;

  /** Referencia al componente de vista de terceros relacionados */
  @ViewChild(TercerosRelacionadosVistaComponent)
  tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;

  /** Referencia al componente de pago de derechos */
  @ViewChild(PagoDeDerechosComponent)
  pagoDeDerechosComponent!: PagoDeDerechosComponent;

  /** Referencia al componente de trámites asociados */
  @ViewChild(TramitesAsociadoComponent)
  tramitesAsociadoComponent!: TramitesAsociadoComponent;

  /** Tipo de trámite seleccionado por el usuario */
  selectedTipoTramite: string = '';
  
  /** Bandera que indica si hay un radio button seleccionado globalmente */
  isRadioButtonSelectedGlobal: boolean = false;

  /** Índice privado de la pestaña actual */
  private _indice: number = 1;

  /**
   * Setter para el índice de la subpestaña activa.
   * Emite un evento cuando el valor cambia.
   * @param value - Nuevo índice de la subpestaña
   */
  @Input()
  set subTabIndex(value: number) {
    if (value && value !== this._indice) {
      this._indice = value;
      this.tabChanged.emit(this._indice);
    }
  }

  /**
   * Getter para obtener el índice actual de la subpestaña.
   * @returns El índice de la pestaña activa
   */
  get subTabIndex(): number {
    return this._indice;
  }

  /** Bandera que indica si los datos de respuesta están disponibles */
  esDatosRespuesta: boolean = false;
  
  /** Subject para manejar la destrucción de suscripciones */
  destroyNotifier$: Subject<void> = new Subject<void>();
  
  /** Estado actual de la consulta */
  consultaioState!: ConsultaioState;

  /**
   * Constructor del componente.
   * @param consultaQuery - Servicio de consulta para obtener el estado
   * @param Solocitud260912Service - Servicio para gestionar la modificación del permiso sanitario
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260912Service: Solocitud260912Service
  ) {}

  /**
   * Hook de inicialización del componente.
   * Configura la suscripción al estado de consulta y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaioState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaioState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Maneja el cambio de tipo de trámite seleccionado.
   * @param tipo - Nuevo tipo de trámite seleccionado
   */
  onTipoTramiteChange(tipo: string): void {
    this.selectedTipoTramite = tipo;
  }

  /**
   * Maneja el cambio en la selección global de radio buttons.
   * @param selected - Estado de selección del radio button
   */
  onRadioButtonSelectedChange(selected: boolean): void {
    this.isRadioButtonSelectedGlobal = selected;
  }

  /**
   * Guarda los datos del formulario utilizando el servicio de modificación.
   * Se suscribe al servicio para obtener los datos y actualizar el estado del formulario.
   */
  guardarDatosFormulario(): void {
    this.solocitud260912Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260912Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña específica y emite el evento de cambio.
   * @param i - Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this._indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * Valida los campos requeridos de todos los subcomponentes en paso-uno.
   * Retorna false si algún campo requerido está faltando.
   * @returns true si todos los campos requeridos son válidos, false en caso contrario
   */
  public validateRequiredFields(): boolean {
    let isValid = true;

    if (this.datosDeLaSolicitudComponent?.validateRequiredFields) {
      isValid = this.datosDeLaSolicitudComponent.validateRequiredFields() && isValid;
    }

    if (this.domicilioDelEstablecimientoComponent?.validateRequiredFields) {
      isValid = this.domicilioDelEstablecimientoComponent.validateRequiredFields() && isValid;
    }

    if (this.tercerosRelacionadosVistaComponent?.validateRequiredFields) {
      isValid = this.tercerosRelacionadosVistaComponent.validateRequiredFields() && isValid;
    }

    if (this.tramitesAsociadoComponent?.validateRequiredFields) {
      isValid = this.tramitesAsociadoComponent.validateRequiredFields() && isValid;
    }

    return isValid;
  }

  /**
   * Marca todos los campos como tocados en todos los subcomponentes de paso-uno.
   * Esto ayuda a mostrar errores de validación en la interfaz de usuario.
   */
  public markAllFieldsTouched(): void {
    if (this.datosDeLaSolicitudComponent?.markAllFieldsTouched) {
      this.datosDeLaSolicitudComponent.markAllFieldsTouched();
    }
    if (this.domicilioDelEstablecimientoComponent?.markAllFieldsTouched) {
      this.domicilioDelEstablecimientoComponent.markAllFieldsTouched();
    }
    if (this.tercerosRelacionadosVistaComponent?.markAllFieldsTouched) {
      this.tercerosRelacionadosVistaComponent.markAllFieldsTouched();
    }
    if (this.tramitesAsociadoComponent?.markAllFieldsTouched) {
      this.tramitesAsociadoComponent.markAllFieldsTouched();
    }
  }

  /**
   * Devuelve la instancia actual del componente `PagoDeDerechosComponent`.
   * 
   * @returns {PagoDeDerechosComponent | undefined} La instancia del componente si está disponible, de lo contrario `undefined`.
   */
  public getPagoDeDerechosComponent(): PagoDeDerechosComponent | undefined {
  return this.pagoDeDerechosComponent;
}
mostrarAlgoDesdeElPadre(selected: boolean): void {
    this.emitirSeleccionEstablecimiento = selected;
    // ...existing code...
  }
  /**
   * Hook de destrucción del componente.
   * Completa el subject para cancelar todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}