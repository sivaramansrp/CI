import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CatalogoSelectComponent, InputFechaComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { MercanciasModalComponent } from "../../../110204/components/mercancias-modal/mercancias-modal.component";
import { ToastrService } from "ngx-toastr";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Tramite110217State, Tramite110217Store } from "../../../../estados/tramites/tramite110217.store";
import { CertificadosOrigenService } from "../../services/certificadosOrigen.service";
import { Tramite110217Query } from "../../../../estados/queries/tramite110217.query";
import { map, Subject, takeUntil } from "rxjs";

/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
*/
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

/**
 * Componente para gestionar los certificados de origen.
 * Se encarga de manejar los formularios, la carga de catálogos, la validación y la interacción con el store.
 */
@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    MercanciasModalComponent
],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent  {
 
    /**
   * Formulario reactivo utilizado para la gestión de los datos del certificado.
   * @type {FormGroup}
   */
    formCertificado!: FormGroup;

    public solicitudState!: Tramite110217State;

    destroyNotifier$: Subject<void> = new Subject();
    registroFormulario!: FormGroup;
  estaDeshabilitado: boolean=false;

  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService
    // eslint-disable-next-line no-empty-function
  ) { }

  ngOnInit(): void {
    
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.initFormulario();
    
  }
 
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110217Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  get grupoOperador(): FormGroup {
    return this.registroFormulario.get('grupoOperador') as FormGroup;
  }
 

  initFormulario(): void {
    this.formCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      grupoOperador: this.fb.group({
        nombre: [this.solicitudState?.grupoOperador?.nombre],
        apellidoPrimer: [this.solicitudState?.grupoOperador?.apellidoPrimer],
        apellidoSegundo: [this.solicitudState?.grupoOperador?.apellidoSegundo],
        numeroFiscal: [this.solicitudState?.grupoOperador?.numeroFiscal, Validators.required],
        razonSocial: [this.solicitudState?.grupoOperador?.razonSocial, ],
      }),
    });
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  onClick(): void {
    this.estaDeshabilitado = true;
  }
}
