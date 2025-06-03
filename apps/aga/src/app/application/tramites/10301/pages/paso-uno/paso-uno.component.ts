import { AfterViewInit, Component, viewChild, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Solicitud10301Service } from '../../services/solicitud10301.service';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente que representa el paso uno del trámite.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  standalone:true,
  imports:[SolicitanteComponent,CommonModule,DatosDelTramiteComponent, FormsModule, ReactiveFormsModule]
})
export class PasoUnoComponent implements AfterViewInit {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
  constructor(
    private solicitud10301Service: Solicitud10301Service,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  /**
   * Referencia al componente de solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona.
   */
  tipoPersona!: number;

  /**
   * Datos del formulario dinámico de la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Datos del formulario dinámico del domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

   ngOnInit(): void {
   this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
           this.consultaState = seccionState;
       })).subscribe();
     if(this.consultaState.update) {
       this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

     guardarDatosFormulario(): void {
    this.solicitud10301Service
      .getDatosDeTrtamitelDoc().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solicitud10301Service.actualizarEstadoFormulario(resp);
        }
      });
    }
  /**
   * Método que se ejecuta después de que la vista ha sido inicializada.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }
  /**
   * Selecciona la pestaña indicada por el índice.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
