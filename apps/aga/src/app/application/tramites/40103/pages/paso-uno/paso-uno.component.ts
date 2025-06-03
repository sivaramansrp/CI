
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ConsultaioQuery, FormularioDinamico,SolicitanteComponent} from '@ng-mf/data-access-user';
import {DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,PERSONA_MORAL_NACIONAL} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Store } from '../../estados/chofer40103.store';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
 * Referencia al componente hijo `SolicitanteComponent` dentro de la plantilla.
 * Permite acceder a las propiedades y métodos públicos del componente hijo.
 *
 * @type {SolicitanteComponent}
 */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  /**
   * Representa el tipo de persona asociado.
   * 
   * @type {number}
   * @remarks
   * Este valor puede ser utilizado para determinar el tipo de persona
   * (por ejemplo, física o moral) en el contexto de la aplicación.
   */
  tipoPersona!: number;


  /**
   * Arreglo que contiene objetos de tipo FormularioDinamico.
   * Representa la información relacionada con una persona en el formulario dinámico.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Arreglo que contiene los formularios dinámicos relacionados con el domicilio fiscal.
   * Este arreglo se utiliza para almacenar y gestionar los datos del formulario
   * en el paso uno del trámite.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice que representa un número inicial o posición en un flujo o proceso.
   * Se utiliza para controlar el estado o paso actual en la lógica de la aplicación.
   */
  indice: number = 1;

  /**
   * Indica si la validación es exitosa o no.
   * 
   * @type {boolean}
   * @default false
   */
  validacion: boolean = false;

  /**
   * Propiedad de entrada que representa el número de pedimento.
   * Este valor es proporcionado desde el componente padre y se utiliza
   * para mostrar o procesar información relacionada con el pedimento.
   */
  @Input() datosNroPedimento!: string;
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  /**
   * Gancho de ciclo de vida angular que se llama después de que la vista del componente se haya inicializado por completo.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }
  /**
   * Selecciona una pestaña.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   *
   */
  constructor(        
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query,
    private chofer40103Store: Chofer40103Store,
    private consultaQuery: ConsultaioQuery
  ) {
    
  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$), 
      map((seccionState) => {
        if( seccionState.update ) {
          this.chofer40103Service.getDirectorGeneralData().subscribe((data) => {
          // Actualiza el estado del chofer40103Store con los datos del director general
          
          this.chofer40103Service.updateStateDirectorGeneralData(data);
          });
        }
    })).subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Se utiliza para limpiar recursos y evitar fugas de memoria.
   */
  ngOnDestroy(): void {

    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
