import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ValidacionesFormularioService } from '@ng-mf/data-access-user';

import { HttpCoreService } from '@ng-mf/data-access-user';

import { ReplaySubject, Subject,map, takeUntil } from 'rxjs';

import { Catalogo } from '@ng-mf/data-access-user';

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';

/**
 * Este componente se utiliza para mostrar la forma del transporte. - 220401
 * @param transporteForm: Forma del transporte
 * @returns Validations of the form
 */
@Component({
  selector: 'app-transporte',
  providers: [HttpCoreService],
  templateUrl: './transporte.component.html'
})

export class TransporteComponent implements OnDestroy, OnInit {
  /**
   * Esta variable se utiliza para destruir la suscripción.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Esta variable se utiliza para crear la forma del transporte.
   */
  transporteForm!: FormGroup;
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: solicitud220401State;
  esFormularioSoloLectura: boolean = false;

  public tiposTransporte: Catalogo[] = [];
  /**
   * constructor de la clase
   * Fetch the fetchtiposDocumentos datos
   * Crea el formulario
   * @param fb: constructor de formularios
   * @param validacionesService: Validaciones comunes del formulario.
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private httpCoreService: HttpCoreService,
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,
     private consultaioQuery: ConsultaioQuery,
  ) {
    this.fetchtiposDocumentos();
     this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarTransporteFormulario();
      })
    )
    .subscribe()
    
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa el formulario de transporte.
   */
  ngOnInit(): void {
    this.inicializarTransporteFormulario();
  }

    /**
     * Inicializa el formulario de transporte obteniendo el estado de la solicitud.
     */
    inicializarFormulario():void {
      this.agregarQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
      this.crearFormTransporte();
    }

    /**
     * Inicializa el formulario de transporte.
     * Si el formulario es de solo lectura, guarda los datos del formulario.
     * De lo contrario, inicializa el formulario normalmente.
     */
    inicializarTransporteFormulario(): void {
      if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
      } else {
      this.inicializarFormulario();
      }  
    }

    /**
     * @function guardarDatosFormulario
     * @description
     * Inicializa el formulario de transporte y ajusta su estado de habilitación según si el formulario es de solo lectura.
     * - Si el formulario es de solo lectura, lo deshabilita.
     * - Si el formulario no es de solo lectura, lo habilita.
     * - Si ninguna de las condiciones anteriores se cumple, no realiza ninguna acción adicional.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.transporteForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.transporteForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }
  /**
   * Este método se utiliza para crear la forma del transporte. - 220401
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  crearFormTransporte() {
    this.transporteForm = this.fb.group({
      mediodeTransporte: ['', [Validators.required]],
      identificationDelTransporte: [this.solicitudState?.identificationDelTransporte],
      numerodeContenedor:[this.solicitudState?.numerodeContenedor],
      fechdeEmbarque:[this.solicitudState?.fechdeEmbarque],
      numerodeFlejes:[this.solicitudState?.numerodeFlejes],
      tipoDeTransporte:[this.solicitudState?.tipoDeTransporte],
     });
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
    const VALOR = form.get(campo)?.value;
    (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  validarTransporteFormulario() {
    if (this.transporteForm.invalid) {
      this.transporteForm.markAllAsTouched();
      // eslint-disable-next-line no-useless-return
      return;
    }
  }
/**
 * Este método se utiliza para obtener los datos de los medios de transporte.
 */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  fetchtiposDocumentos() {
    this.httpCoreService.get('assets/json/220401/mediodetransporte.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      // eslint-disable-next-line dot-notation
      this.tiposTransporte = data as Catalogo[];
    });
  }
  /**
   * Este método se utiliza para destruir la suscripción.
   * @returns destroyed$
   */
  
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}