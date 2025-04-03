import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CatalogoSelectComponent, InputFecha, InputFechaComponent, REGEX_SOLO_NUMEROS, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from "@libs/shared/data-access-user/src";
import { Tramite32503State, Tramite32503Store } from "../../../../estados/tramites/tramite32503.store";
import { Tramite32503Query } from "../../../../estados/queries/tramite32503.query";
import { AvisoTrasladoService } from "../../services/aviso-traslado.service";
import { map, Subject, takeUntil } from "rxjs";
import { FECHA_INGRESO } from "../../constants/aviso-traslado.enum";
import { Catalogo, CatalogoLista, ColumnasTabla, RespuestaCatalogos } from "../../models/aviso-traslado.model";


@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent,
    CatalogoSelectComponent, TablaDinamicaComponent
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit, OnDestroy {
  avisoFormulario!: FormGroup;
  public destroyNotifier$: Subject<void> = new Subject();
  public tramiteState!: Tramite32503State;
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  entidadFederativa: Catalogo[] = [];
  delegacionMunicipio: Catalogo[] = [];
  colonia: Catalogo[] = [];
  tablaSeleccion = TablaSeleccion;
  tablaDeDatos: {
    encabezadas: {
      encabezado: string,
      clave: (ele: ColumnasTabla) => string,
      orden: number
    }[],
    datos: [],
  } = {
      encabezadas: [
        { encabezado: 'RFC', clave: (ele: ColumnasTabla) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: ColumnasTabla) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: ColumnasTabla) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: ColumnasTabla) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: ColumnasTabla) => ele.colonia,
          orden: 5,
        },
      ],
      datos: []
    };


  constructor(
    public fb: FormBuilder,
    public store: Tramite32503Store,
    public tramiteQuery: Tramite32503Query,
    public avisoTrasladoService: AvisoTrasladoService,
    private validacionesService: ValidacionesFormularioService,
    // eslint-disable-next-line no-empty-function
  ) { }
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarFederativa();
    this.cargarMunicipio();
    this.cargarColonias();
  }
  public cargarFederativa(): void {
    this.avisoTrasladoService
      .obtenerFederativa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.entidadFederativa = datos.datos;
        }
      );
  }
  public cargarMunicipio(): void {
    this.avisoTrasladoService
      .obtenerMunicipio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.delegacionMunicipio = datos.datos;
        }
      );
  }
  public cargarColonias(): void {
    this.avisoTrasladoService
      .obtenerColonias()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (datos: CatalogoLista) => {
          this.colonia = datos.datos;
        }
      );
  }
  inicializarFormulario(): void {
    this.avisoFormulario = this.fb.group({
      adaceFormulario: this.fb.group({
        adace: [{ value: 'Centro', disabled: true }, [Validators.required]]
      }),
      datosEmpresa: this.fb.group({
        valorProgramaImmex: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        valorAnioProgramaImmex: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      }),
      datosAviso: this.fb.group({
        tipoAviso: ['', [Validators.required]],
        idTransaccion: ['', [Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        motivoProrroga: ['', [Validators.required, Validators.maxLength(250)]],
        fechaTranslado: [{ value: '', disabled: true }, Validators.required],
      }),
      direccionOrigen: this.fb.group({
        nombreComercial: ['', [Validators.maxLength(250)]],
        claveEntidadFederativa: ['', [Validators.required]],
        claveDelegacionMunicipio: ['', [Validators.required]],
        claveColonia: ['', [Validators.required]],
        calle: ['', [Validators.required, Validators.maxLength(250)]],
        numeroExterior: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        numeroInterior: ['', [Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        codigoPostal: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      }),
      tipoCarga: ['', [Validators.required]],


    });
  }
  get adaceFormulario(): FormGroup {
    return this.avisoFormulario.get('adaceFormulario') as FormGroup;
  }
  get datosEmpresa(): FormGroup {
    return this.avisoFormulario.get('datosEmpresa') as FormGroup;
  }
  get datosAviso(): FormGroup {
    return this.avisoFormulario.get('datosAviso') as FormGroup;
  }
  get direccionOrigen(): FormGroup {
    return this.avisoFormulario.get('direccionOrigen') as FormGroup;
  }

  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.datosAviso.get('fechaTranslado')?.setValue(nuevo_valor);
    this.datosAviso.get('fechaTranslado')?.markAsUntouched();
  }

  verificaRadioTipo(): void {
    const TIPOAVISO = this.avisoFormulario.get('tipoAviso')?.value;
    if (TIPOAVISO === 'TIPAVI.INI') {
    } else if (TIPOAVISO === 'TIPAVI.PRO') {
    }
  }

  sanitizeAlphanumeric(control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(/[^a-zA-Z0-9]/g, '');
    this.avisoFormulario.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  sanitizeAlphanumericWithSpace(control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(/[^a-zA-Z0-9 ]/g, '');
    this.avisoFormulario.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }
  sanitizeNumeric(control: string, event: Event): void {
    const INPUT = event?.target as HTMLInputElement;
    const REEMPLAZAR = INPUT?.value.replace(/[^0-9]/g, '');
    this.avisoFormulario.get(control)?.setValue(REEMPLAZAR, { emitEvent: false });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}