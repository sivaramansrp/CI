import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { map, Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CAPACITACION_EN_SEGURIDAD } from '../../constants/constantes32618.enum';
import { RubroTransporteFerrovario32618State, Tramite32618Store } from '../../estados/tramite32618.store';
import { Tramite32618Query } from '../../estados/tramite32618query';

@Component({
  selector: 'app-capacitacion-en-seguridad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capacitacion-en-seguridad.component.html',
  styleUrl: './capacitacion-en-seguridad.component.scss',
})
export class CapacitacionEnSeguridadComponent implements OnInit, OnDestroy {
  
  /** Arreglo con la configuración dinámica de los campos para el formulario de capacitación en seguridad. */
  public capacitacionEnSeguridadFormData = CAPACITACION_EN_SEGURIDAD;

  /** Inicializa el formulario principal y el grupo anidado para la capacitación en seguridad.*/
  public capacitacionEnSeguridadForm: FormGroup = new FormGroup({
      capacitacionEnSeguridadFormGroup: new FormGroup({})
  });

  /** Este getter devuelve el grupo de formularios anidado llamado `capacitacionEnSeguridadFormGroup`*/
  get capacitacionEnSeguridadFormGroup(): FormGroup {
    return this.capacitacionEnSeguridadForm.get('capacitacionEnSeguridadFormGroup') as FormGroup;
  }

  /** Estado de la solicitud de la tramite 32613.*/
  public rubroTransporteFerrovariostate!: RubroTransporteFerrovario32618State;
  
  /** Subject para notificar la destrucción del componente.*/
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;
  
  /** Constructor que inyecta los servicios necesarios para gestionar el estado y las consultas del trámite 32613. */
  constructor(
      private tramite32618Store: Tramite32618Store,
       private Tramite32618Query: Tramite32618Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    //
  }

  /** Inicializa los estados necesarios del componente suscribiéndose a los observables de consulta y rubro de transporte ferroviario. */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    this.Tramite32618Query.selectRubroTransporteFerrovario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.rubroTransporteFerrovariostate = seccionState;
        })
      )
      .subscribe();
  }

  /** Actualiza el valor dinámico de un campo en el store cuando ocurre un cambio en el formulario. */
  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    if (event) {
      this.tramite32618Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
