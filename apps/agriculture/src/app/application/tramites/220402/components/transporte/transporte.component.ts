import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil, Subject, map } from 'rxjs';
import { CatalogosSelect } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { HttpCoreService } from 'libs/shared/data-access-user/src/core/services/shared/http/http.service';
import { ValidacionesFormularioService } from 'libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Transporte220402State, Transporte220402Store } from '../../estados/tramites/transporte220402.store';
import { MediodetransporteService } from 'libs/shared/data-access-user/src/core/services/220402/medio-de-transporte.service';
import { Transporte220402Query } from '../../estados/queries/transporte220402.query';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
     * Estado de la transporte.
     */
  public transporteState!: Transporte220402State;

  private destroyNotifier$: Subject<void> = new Subject();

  transporteForm!: FormGroup;
  public tiposDocumentos: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * constructor de la clase
   * Fetch the fetchTiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private httpCoreService: HttpCoreService,
    private mediodetransporteService: MediodetransporteService,
    private transporte220402Store: Transporte220402Store,
    private transporte220402Query: Transporte220402Query
  ) {
    this.fetchTiposDocumentos();
  }

   /**
     * Método que se ejecuta al inicializar el componente.
     * 
     * Este método realiza las siguientes acciones:
     * 1. Inicializa los catálogos necesarios para el formulario.
     * 
     * @returns {void}
     */
    ngOnInit(): void {
      this.transporte220402Query.selectTransporte$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.transporteState = seccionState;
          })
        )
        .subscribe();
  
        // Inicializar el formulario principal
      this.crearFormTransporte();
      
    }

  /**
   * Este método se utiliza para crear la forma del transporte. - 220401
   */
  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: [this.transporteState?.mediodeTransporte, [Validators.required]],
      identificationDelTransporte: [this.transporteState?.identificationDelTransporte]
    });
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  validarTransporteFormulario() {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
      return;
    }
  }
  /**
   * Este método se utiliza para obtener los datos de los medios de transporte.
   */
  fetchTiposDocumentos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.tiposDocumentos.catalogos = data as Catalogo[];
      });
  }

  /**
     * Establece los valores en el store de tramite5701.
     *
     * @param {FormGroup} form - El formulario del cual se obtiene el valor.
     * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
     * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
     * @returns {void}
     */
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Transporte220402Store): void {
      const valor = form.get(campo)?.value;
      (this.transporte220402Store[metodoNombre] as (value: any) => void)(valor);
    }

  /**
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
} // Initialize any properties or start any processes here
