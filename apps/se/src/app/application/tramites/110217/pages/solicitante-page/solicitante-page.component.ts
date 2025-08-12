import { AlertComponent, BtnContinuarComponent, DatosPasos } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { AccionBoton } from '../../models/certificado-origen.model';
import { ERROR_FORMA_ALERT } from '../../constants/certificado-origen.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/certificado-origen.enum';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Subject } from 'rxjs';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { WizardComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente para gestionar la página del solicitante.
 * 
 * Este componente permite al usuario navegar entre los pasos del wizard y gestionar
 * las acciones relacionadas con el trámite, como avanzar o retroceder entre los pasos.
 */
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
  standalone:true,
  imports: [
    WizardComponent,PasoUnoComponent,PasoTresComponent,BtnContinuarComponent,AlertComponent
  ]
})
export class SolicitantePageComponent implements OnInit, OnDestroy {
  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;

  /**
    * Lista de pasos del wizard.
    * 
    * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan
    * los pasos del wizard.
    */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso activo en el wizard.
   * 
   * Esta propiedad indica el paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Textos utilizados en el componente.
   * 
   * Esta propiedad contiene textos como instrucciones o mensajes que se muestran
   * en la interfaz del usuario.
   */
  TEXTOS = AVISO;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite110217State;

  /**
   * Referencia al componente `WizardComponent`.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * del wizard dentro de la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Datos relacionados con los pasos del wizard.
   * 
   * Esta propiedad contiene información como el número total de pasos, el índice
   * del paso actual y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * 
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite y actualiza la propiedad `tramiteState`
   * con los datos obtenidos.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
  }
  /**
     * Método para manejar las acciones de los botones del wizard.
     * 
     * Este método actualiza el índice del paso activo y avanza o retrocede en el wizard
     * dependiendo de la acción recibida. También valida los formularios antes de permitir
     * continuar al siguiente paso.
     * 
     * @param {AccionBoton} e - Objeto que contiene la acción (`cont` o `atras`) y el valor del índice.
     */
  getValorIndice(e: AccionBoton): void {
    // Si la acción es continuar, validar formularios del paso actual
    if (e.accion === 'cont') {
      let isValid = true;
      
      // Validar formularios del paso 1 antes de continuar
      if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarTodosLosFormularios();
      }
      
      // Si los formularios no son válidos, mostrar error y no continuar
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }
      
      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      
      // Avanzar al siguiente paso
      this.wizardComponent.siguiente();
      this.store.setPasoActivo(this.indice);
      return;
    }

    // Para botón "Anterior" - actualizar índice sin validación
    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();
    this.store.setPasoActivo(this.indice);
  }

  /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
  onTabChanged(): void {
    this.esFormaValido = false;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
