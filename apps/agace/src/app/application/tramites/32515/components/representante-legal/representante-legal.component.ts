import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformationGeneralSolicitanteState, Tramite32515Store } from '../../estados/tramite32515.store';
import { 
  CategoriaMensaje, 
  Notificacion, 
  NotificacionesComponent, 
  TipoNotificacionEnum 
} from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { REPRESENTANTE_LEGAL } from '../../constantes/modificacion-aviso-seguro-global.enum';
import { Tramite32515Query } from '../../estados/tramite32515.query';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, NotificacionesComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {

  /** Datos de configuración para el formulario del representante legal */
  public datosDelSolicitanteolFormData = REPRESENTANTE_LEGAL;

  /** Estado general del solicitante, provisto por el query */
  public informationGeneralState!: InformationGeneralSolicitanteState;

  /** Subject utilizado para cancelar suscripciones al destruir el componente */
  private destroy$ = new Subject<void>(); 
  
  /** Notificación para mostrar mensajes al usuario */
  public nuevaNotificacion: Notificacion | null = null;
  
  /** Flag to prevent duplicate RFC notifications */
  private rfcNotificationShown: boolean = false;

/**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;
  /** Formulario principal que contiene un subgrupo de controles */
  public forma: FormGroup = new FormGroup({
    /** Subformulario que puede contener datos específicos del representante legal */
    ninoFormGroup: new FormGroup({})
  });

  /**
   * Constructor del componente
   * @param tramiteQuery32515 Provee acceso reactivo al estado del trámite
   * @param tramiteStore32515 Permite modificar el estado del trámite
   * @param consultaQuery Provee acceso a la consulta de estado del usuario
   */
  constructor(
    private tramiteQuery32515: Tramite32515Query,
    public tramiteStore32515: Tramite32515Store,
    public consultaQuery: ConsultaioQuery
  ) {}

  /**
   * Getter para acceder al subformulario 'ninoFormGroup'
   * @returns FormGroup correspondiente al subgrupo
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }  
  
  /**
   * Maneja el evento de cambio en un campo del formulario dinámico
   * @param event Objeto con el nombre del campo y su nuevo valor
   */
  establecerCambioDeValor(event: { campo: string; valor: string }): void {
    if (event) {
      this.cambioEnValoresStore(event.campo, event.valor);
      
      // Verificar si es el campo RFC
      if (event.campo === 'rfc') {
        if (event.valor && event.valor.trim() !== '') {
          this.rfcNotificationShown = false;
        }
        
      }
    }
  }
  /**
   * Actualiza el estado del store con el nuevo valor de un campo
   * @param campo Campo modificado
   * @param value Nuevo valor que se asigna
   */
  public cambioEnValoresStore(campo: string, value: unknown): void {
    this.tramiteStore32515.establecerDatos(campo, value);
  }

  /**
   * Configura el monitoreo del campo RFC con múltiples estrategias
   */
  private configurarMonitoreoRfc(): void {
    const rfcControl = this.ninoFormGroup.get('rfc');
    if (rfcControl) {
      
      const originalMarkAsTouched = rfcControl.markAsTouched.bind(rfcControl);
      rfcControl.markAsTouched = (opts?: any) => {
        const result = originalMarkAsTouched(opts);
        
        setTimeout(() => {
          if (rfcControl.errors?.['required'] && !this.rfcNotificationShown) {
            this.mostrarNotificacionRfc();
          }
        }, 10);
        
        return result;
      };
    } 
  }
  
  /**
   * Muestra la notificación cuando el campo RFC es requerido pero está vacío
   */
  private mostrarNotificacionRfc(): void {    
    if (this.rfcNotificationShown) {
      return;
    }

    this.rfcNotificationShown = true;
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'Debes ingresar un RFC',
      cerrar: true,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  
  /**
   * Hook de ciclo de vida - se ejecuta al iniciar el componente
   * Se suscribe al estado general del solicitante
   */
  ngOnInit(): void {
    this.tramiteQuery32515.select$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.informationGeneralState = seccionState as InformationGeneralSolicitanteState;
        })
      )
      .subscribe();
            this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {          
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
    
    setTimeout(() => {
      this.configurarMonitoreoRfc();
    }, 500);
  }

  /**
   * Hook de ciclo de vida - se ejecuta al destruir el componente
   * Cancela las suscripciones activas para evitar fugas de memoria
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
