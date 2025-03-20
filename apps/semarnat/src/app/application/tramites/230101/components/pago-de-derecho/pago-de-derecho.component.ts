import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MediodetransporteService } from '../../services//medio-de-transporte.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Solicitud230101Query } from '../../estados/queries/tramites230101.query';
import { Solicitud230101State } from '../../estados/tramites/tramites230101.store';
import { Solicitud230101Store } from '../../estados/tramites/tramites230101.store';
import { Subject } from 'rxjs';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';



@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
     * Estado de la transporte.
     */
  public derechoState!: Solicitud230101State;

  private destroyNotifier$: Subject<void> = new Subject();

  FormSolicitud!: FormGroup;

  respuesta: string = '';

  bancoSeleccionado!: Catalogo;

  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  constructor(
    private fb: FormBuilder,
    private captuaservice: CapturaSolicitudeService,
    private solicitud230101Store: Solicitud230101Store,
    private solicitud230101Query: Solicitud230101Query,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService
  ) {
    this.fetchBancoData();
  }

  /**
   * @method fetchBancoData
   * @description Obtiene los datos del catálogo de bancos desde el servicio de medio de transporte
   * y los asigna al catálogo de bancos en el componente.
   * 
   * @returns {void}
   * 
   * @example
   * this.fetchBancoData();
   * 
   * @remarks
   * Este método utiliza el servicio `mediodetransporteService` para obtener los datos
   * y se asegura de limpiar las suscripciones utilizando el operador `takeUntil` con `destroyed$`.
   */
  fetchBancoData(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }
  /**
   * Hook del ciclo de vida de Angular que se llama después de que la vista del componente se ha inicializado completamente.
   *
   * Este método realiza las siguientes acciones:
   * - Llama al método `getMercancia` para inicializar el objeto `mercancia`.
   * - Inicializa el grupo de formularios `FormSolicitud` con controles de formulario anidados y validadores.
   */

  ngOnInit(): void {
    this.solicitud230101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();

    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        claveDeReferencia: [this.derechoState?.claveDeReferencia, Validators.required],
        cadenaDependencia: [{ value: this.derechoState?.cadenaDependencia, disabled: true }, Validators.required],
        banco: [this.derechoState?.banco, Validators.required],
        llaveDePago: [this.derechoState?.llaveDePago, Validators.required],
        fechaPago: [this.derechoState?.fechaPago, Validators.required],
        importePago: [this.derechoState?.importePago, Validators.required],
      }),
    });

  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
       * Establece los valores en el store de tramite5701.
       *
       * @param {FormGroup} form - El formulario del cual se obtiene el valor.
       * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
       * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
       * @returns {void}
       */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud230101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud230101Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
  }

  /**
* Obtiene el grupo de formulario 'datosImportadorExportador' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'datosImportadorExportador'.
*/
  get datosImportadorExportador(): FormGroup {
    return this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
