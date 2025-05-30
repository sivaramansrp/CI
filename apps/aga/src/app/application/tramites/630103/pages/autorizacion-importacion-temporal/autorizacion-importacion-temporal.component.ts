/**
 * Componente que representa la página de retorno de importación temporal.
 * Permite gestionar los pasos del asistente y la navegación entre ellos.
 */

import { AutorizacionImportacionTemporalService } from '../../services/autorizacion-importacion-temporal.service';
import { Subject } from 'rxjs';

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AVISO, ConsultaioQuery, ConsultaioState, DatosPasos, PASOS_REGISTRO, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { WizardComponent } from '@ng-mf/data-access-user';

import { map, takeUntil } from 'rxjs';

/**
 * Interfaz que representa la acción de un botón.
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-autorizacion-importacion-temporal',
  templateUrl:'./autorizacion-importacion-temporal.component.html',
  standalone:false
})
export class AutorizacionImportacionTemporalComponent implements OnInit,OnDestroy,AfterViewInit{


  /**
   * Mensaje de información para la alerta.
   */
  public infoAlert = 'alert-info';

  /**
   * Textos de aviso utilizados en el componente.
   */
  TEXTOS = AVISO.Aviso;
  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;
/**
     * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
     */
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;
  
    /** Subject para notificar la destrucción del componente. */
    private destroyNotifier$: Subject<void> = new Subject();
    public consultaState!:ConsultaioState;
  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;
   constructor(
        private autorizacionImportacionTemporalService: AutorizacionImportacionTemporalService,
        private consultaQuery: ConsultaioQuery,
       
      ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
      }
    ngOnInit(): void {
       this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
             this.consultaState = seccionState;
         })).subscribe();
       if(this.consultaState.update) {
         this.guardarDatosFormulario();
       } else {
         this.esDatosRespuesta = true;
       }
     }
   
     /**
      * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
      * Luego reinicializa el formulario con los valores actualizados desde el store.
      */
  
   guardarDatosFormulario(): void {
      this.autorizacionImportacionTemporalService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.esDatosRespuesta = true;
        this.autorizacionImportacionTemporalService.actualizarEstadoFormulario(resp);
      });
    }
   
     

  /**
   * Datos para los pasos en el asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

   /**
      * Se ejecuta después de que la vista ha sido inicializada.
      * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
      * para establecer el tipo de persona como MORAL_NACIONAL.
      */
     ngAfterViewInit(): void {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }
   
     ngOnDestroy(): void {
       this.destroyNotifier$.next();
       this.destroyNotifier$.complete();
     }  
}
