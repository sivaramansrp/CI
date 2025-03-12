import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { TipoPersona } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.scss',
})
export class AgregarDestinatarioComponent implements OnDestroy, OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
     * Estado de la transporte.
     */
  public destinatarioState!: Solicitud220402State;

  private destroyNotifier$: Subject<void> = new Subject();

  public pais!: CatalogosSelect;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  options!: Catalogo[];

  destinatarioForm!: FormGroup;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public tiposDocumentos: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  constructor(private mediodetransporteService: MediodetransporteService,
    private solicitud220402Store: Solicitud220402Store,
    private solicitud220402Query: Solicitud220402Query,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService) {
    this.fetchTiposDocumentos()
  }

  /**
* Obtiene el grupo de formulario 'agregarDestinatario' del formulario principal 'destinatarioForm'.
*
* @returns {FormGroup} El grupo de formulario 'agregarDestinatario'.
*/
  get agregarDestinatario(): FormGroup {
    return this.destinatarioForm.get('agregarDestinatario') as FormGroup;
  }

  /**
 * Obtiene el grupo de formulario 'datosPersonales' del formulario principal 'destinatarioForm'.
 *
 * @returns {FormGroup} El grupo de formulario 'datosPersonales'.
 */
  get datosPersonales(): FormGroup {
    return this.destinatarioForm.get('datosPersonales') as FormGroup;
  }

  /**
 * Obtiene el grupo de formulario 'selectedTipoPersona' del formulario principal 'destinatarioForm'.
 *
 * @returns {FormGroup} El grupo de formulario 'selectedTipoPersona'.
 */
  get selectedTipoPersona() {
    return this.agregarDestinatario.get('tipoPersona')?.value;
  }

  ngOnInit(): void {
    this.inicializaCatalogos();
    this.solicitud220402Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.destinatarioState = seccionState;
        })
      )
      .subscribe();
    this.crearFormTransporte();
    
  }

  /**
     * Este método se utiliza para crear la forma del Destinatario. - 220402
     */
  crearFormTransporte():void {
    this.destinatarioForm = this.fb.group({
      agregarDestinatario: this.fb.group({
        tipoPersona: [this.destinatarioState?.tipoPersona, Validators.required]
      }),
      datosPersonales: this.fb.group({
        nombre: [this.destinatarioState?.nombre, Validators.required],
        primerApellido: [this.destinatarioState?.primerApellido, Validators.required],
        segundoApellido: [this.destinatarioState?.segundoApellido, Validators.required],
        denominacion: [this.destinatarioState?.denominacion, Validators.required],
        pais: [this.destinatarioState?.pais, Validators.required],
        domicilio: [this.destinatarioState?.domicilio, Validators.required],
        lada: [this.destinatarioState?.lada],
        telefono: [this.destinatarioState?.telefono],
        correoElectronico: [this.destinatarioState?.correoElectronico]
      })
    });
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
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.options = data as Catalogo[];
      });
  }
  /**
   *
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  inputChecked(checkBoxName: string): void {
    if (checkBoxName === TipoPersona.FISICA) {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

  /**
   * Este método se utiliza para marcar los controles del formulario como tocados. - 220401
   */
  validarDestinatarioFormulario(): void {
    if (this.destinatarioForm.invalid) {
      this.destinatarioForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
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
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud220402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud220402Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
