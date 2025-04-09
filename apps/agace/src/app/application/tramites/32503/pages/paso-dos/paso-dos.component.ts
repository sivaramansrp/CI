import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, TituloComponent, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { CatalogoLista, TipoDocumento } from "../../models/aviso-traslado.model";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { TEXTOS, TIPO_DOCUMENTO } from "../../constants/aviso-traslado.enum";
import { Tramite32503State, Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs";
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { map } from "rxjs";
import { takeUntil } from "rxjs";


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
  ],
})
export class PasoDosComponent implements OnInit, OnDestroy, AfterViewInit {
  requisitosOpcionalesFormulario!: FormGroup;
  public tramiteState!: Tramite32503State;
  public destroyNotifier$: Subject<void> = new Subject();
  TEXTOS = TEXTOS;
  infoAlert = 'alert-info';
  tipoDocumento: CatalogosSelect = TIPO_DOCUMENTO;
  @ViewChild('controlarCajaTodo') controlarCajaTodo!: ElementRef;
  tablaDatos: TipoDocumento[] = [];
  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
    private validacionesService: ValidacionesFormularioService,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }


  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.tablaDatos = [...this.tramiteState.tipoTablaDatos];

    this.inicializarFormulario();
    this.cargarTipoDocumento();
  }
  ngAfterViewInit(): void {
    this.controlarCajaTodo.nativeElement.checked = this.tablaDatos.every((el) => el.controlarCaja);
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32503Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  inicializarFormulario(): void {
    this.requisitosOpcionalesFormulario = this.fb.group({
      tipoDocumento: [this.tramiteState?.tipoDocumento, [Validators.required]],
    });
  }
  public cargarTipoDocumento(): void {
    this.avisoTrasladoService
      .obtenerTipoDocumento()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.tipoDocumento.catalogos = datos.datos;
        }
      );
  }
  seleccionarFila(e: TipoDocumento): void {
    e.controlarCaja = !e.controlarCaja;
    this.controlarCajaTodo.nativeElement.checked = this.tablaDatos.every((el) => el.controlarCaja);
    this.setTipoTablaDatos();
  }
  seleccionarFilaTodo(e: Event): void {
    this.tablaDatos.forEach((el) => {
      el.controlarCaja = (e.target as HTMLInputElement).checked;
    });
    this.setTipoTablaDatos();
  }
  validarRequisitosOpcionalesFormulario(): void {
    this.requisitosOpcionalesFormulario.markAllAsTouched();
  }
  eliminarFilaSeleccionada(): void {
    this.tablaDatos = this.tablaDatos.filter((el) => el.controlarCaja === false);
    this.controlarCajaTodo.nativeElement.checked = false;
    this.setTipoTablaDatos();
  }
  agregarFila(): void {
    const TIPO = this.requisitosOpcionalesFormulario.get('tipoDocumento')?.value;
    const EL = this.tipoDocumento.catalogos.find((el) => el.id.toString() === TIPO);
    if (TIPO && EL) {
      this.tablaDatos.push({ ...EL, controlarCaja: false });
      this.controlarCajaTodo.nativeElement.checked = false;
      this.setTipoTablaDatos();
    }
  }

  setTipoTablaDatos(): void {
    this.store.setTipoTablaDatos(this.tablaDatos);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
