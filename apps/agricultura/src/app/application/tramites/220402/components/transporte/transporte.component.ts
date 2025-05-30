import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { HttpCoreService } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import { Catalogo } from '@ng-mf/data-access-user';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnDestroy, OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
     * Estado de la transporte.
     */
  public transporteState!: Solicitud220402State;

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
    private solicitud220402Store: Solicitud220402Store,
    private solicitud220402Query: Solicitud220402Query
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
      this.solicitud220402Query.selectSolicitud$
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
  crearFormTransporte(): void {
    this.transporteForm = this.fb.group({
      mediodeTransporte: [this.transporteState?.mediodeTransporte, [Validators.required]],
      identificacionDelTransporte: [this.transporteState?.identificacionDelTransporte]
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
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  validarTransporteFormulario(): void {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
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
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud220402Store): void {
      const VALOR = form.get(campo)?.value;
      (this.solicitud220402Store[metodoNombre] as (value: any) => void)(VALOR);
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
