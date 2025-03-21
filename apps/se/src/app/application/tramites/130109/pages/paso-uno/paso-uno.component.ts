import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * @description Componente que representa el primer paso de un proceso de formulario.
 * Gestiona la información del solicitante y su domicilio fiscal para personas morales nacionales.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Referencia al componente hijo SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Almacena el tipo de persona seleccionada.
   */
  tipoPersona!: number;
  
  /**
   * Arreglo que contiene la configuración del formulario para la persona.
   */
  persona: FormularioDinamico[] = [];
  
  /**
   * Arreglo que contiene la configuración del formulario para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];
  
  /**
   * Indica el índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;
  
  /**
   * Mantiene la referencia a la suscripción de los parámetros de consulta de la ruta.
   */
  private queryParamSubscription!: Subscription;
  
  /**
   * Constructor del componente
   * @param route Servicio para acceder a los parámetros de la ruta actual
   */
  constructor(private route: ActivatedRoute) { 
     // Constructor del componente
  }
  
  /**
   * Inicializa el componente y se suscribe a los parámetros de consulta
   * para obtener el valor del parámetro 'indice' si existe.
   */
  ngOnInit(): void {
    this.queryParamSubscription = this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line dot-notation
      if (params['indice']) {
      
      // eslint-disable-next-line dot-notation
        this.indice = Number(params['indice']); 
      }
    });
  }
  
  /**
   * Se ejecuta después de que Angular ha inicializado las vistas del componente.
   * Configura los formularios dinámicos para persona moral nacional y domicilio fiscal.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Cambia el índice de la pestaña actualmente seleccionada.
   * @param i Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
  /**
   * Se ejecuta cuando el componente está siendo destruido.
   * Cancela la suscripción a los parámetros de consulta para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }
}