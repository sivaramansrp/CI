import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud11201State } from '../../../../estados/tramites/tramite11201.store';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite11201Query } from '../../../../estados/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../estados/tramites/tramite11201.store';

/**
 * Componente para gestionar el formulario del solicitante.
 */

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule]
})
export class SolicitanteComponent implements OnInit, OnDestroy {
  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  constructor(public fb: FormBuilder,
    public tramite11201Store: Tramite11201Store,
    // eslint-disable-next-line no-empty-function
    private tramite11201Query: Tramite11201Query) {

  }

  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  solicitudForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  public derechoState: Solicitud11201State = {} as Solicitud11201State;
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * Datos simulados que representan a un solicitante con varios atributos.
   *
   * @property {string} rfc - El RFC (Registro Federal de Contribuyentes) del solicitante.
   * @property {string} denominacion - El nombre o denominación del negocio del solicitante.
   * @property {string} actividadEconomica - La actividad económica o sector empresarial del solicitante.
   * @property {string} correoElectronico - La dirección de correo electrónico del solicitante.
   */

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario `solicitudForm` con los campos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite11201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();
    this.solicitudForm = this.fb.group({
      rfc: [''],
      denominacion: [''],
      actividadEconomica: [''],
      correoElectronico: [''],
    });
    this.setFormValues();
  }

  /**
   * Establece los valores del formulario `solicitudForm` utilizando datos simulados.
   *
   * Este método llena los siguientes campos en el formulario:
   * - rfc: El RFC (Registro Federal de Contribuyentes).
   * - denominacion: La denominación o razón social.
   * - actividadEconomica: La actividad económica.
   * - correoElectronico: La dirección de correo electrónico.
   *
   * @remarks
   * Este método asume que `mockData` contiene los campos necesarios
   * y que `solicitudForm` está correctamente inicializado.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setFormValues() {
    this.solicitudForm.get('rfc')?.setValue(this.derechoState.rfc);
    this.solicitudForm.get('denominacion')?.setValue(this.derechoState.denominacion);
    this.solicitudForm
      .get('actividadEconomica')
      ?.setValue(this.derechoState.actividadEconomica);
    this.solicitudForm
      .get('correoElectronico')
      ?.setValue(this.derechoState.correoElectronico);
  }
  continuar(): void {
    this.continuarEvento.emit('');
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
