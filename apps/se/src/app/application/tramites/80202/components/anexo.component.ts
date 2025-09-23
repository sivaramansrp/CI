import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from "@libs/shared/data-access-user/src";
import {
  FRACCION_EXPORTACION,
  IMMEX_SERVICIO,
  NICO_TABLA,
  NicoInfo,
  fraccionInfo,
  immexInfo,
} from "../models/immex-ampliacion-sensibles.model";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { Modal } from "bootstrap";
import { PermisoImmexDatosService } from "../services/permiso-immex-datos.service";
import { setTime } from "ngx-bootstrap/chronos/utils/date-setters";

@Component({
  selector: "app-anexo",
  templateUrl: "./anexo.component.html",
  styleUrls: ["./anexo.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    NotificacionesComponent,
    CatalogoSelectComponent,
  ],
})
export class AnexoComponent implements OnInit, AfterViewInit, OnDestroy {
  pagenuevaNotificacion: boolean = false;
  // Forms
  exportacionForm: FormGroup;
  importacionForm: FormGroup;
  nico: Catalogo[] = [] as Catalogo[];

  // Flags
  esFormularioSoloLectura: boolean = false;
  selectFraccionArancelaria: immexInfo = {} as immexInfo;
  // Tabla
  tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  immexTableDatos: immexInfo[] = [];
  permisoImmexTabla: ConfiguracionColumna<immexInfo>[] = IMMEX_SERVICIO;
  fraccionExportacionTabla: ConfiguracionColumna<fraccionInfo>[] =
    FRACCION_EXPORTACION;
  fraccionTablaDatos: fraccionInfo[] = [];
  nicoTablaDatos: NicoInfo[] = [];
  nicoTablaDato: NicoInfo[] = [];
  selectedNicos: NicoInfo[] = [];
   selectedExportNicos: NicoInfo[] = [];
  selectExportacion: fraccionInfo = {} as fraccionInfo;
  exportacionFormNotificacion: boolean = false;
  /**
   * @private
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para manejar la desuscripción de observables y evitar memory leaks.
   * Se emite cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {ConfiguracionColumna<NicoInfo>[]} nicoTabla
   * @description Configuración de las columnas de la tabla para NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
  /**
   * Indica si el formulario está en modo de actualización.
   * Si es `true`, el formulario está en estado de edición/actualización de datos existentes.
   * Si es `false`, el formulario está en modo de alta/nuevo registro.
   *
   * @type {boolean}
   * @memberof Anexo1Component
   */
  esFormularioActualizacion: boolean = false;
  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;

  public firstloadCompleted: boolean = false;
  public deleteMessageExportacion: boolean = false;
  public eliminarDatosTablaNicoExp: boolean = false;
  @ViewChild("mercanciaImportacionModal", { static: true })
  mercanciaImportacionModal!: ElementRef;
  modalInstance!: Modal;
  @ViewChild("mercanciaExportacionModal", { static: true })
  mercanciaExportacionModal!: ElementRef;
  modalExport!: Modal;

  constructor(
    private fb: FormBuilder,
    public permisoImmexDatosService: PermisoImmexDatosService,
  ) {
    this.exportacionForm = this.fb.group({
      id: [0, Validators.required],
      fraccionImportacion: [""],
      umt: [""],
      descripcionTigie: [""],
      fraccionExportacion: [""],
      descripcionComercialExport: [""],
      nicos: [""],
      descripcionNico: [""],
    });

    this.importacionForm = this.fb.group({
      id: [0, [Validators.required]],
      fraccionArancelaria: [""],
      umt: [""],
      descripcionTigie: [""],
      cantidadAnual: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      capacidadInstalada: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      cantidadPorPeriodo: [
        "",
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      nicos: [""],
      productoDescExportacions: [""],
      fraccionDescExportacion: [""],
    });
  }
  ngOnInit(): void {
    this.permisoImmexDatosService
      .getNicos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          this.nico = response;
        },
      });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new Modal(
      this.mercanciaImportacionModal.nativeElement,
      { backdrop: "static" },
    );
    this.modalExport = new Modal(this.mercanciaExportacionModal.nativeElement, {
      backdrop: "static",
    });
  }

  // Number-only input handler
  onNumberInput(
    event: Event,
    formGroupName: string,
    controlName: string,
  ): void {
    const INPUT = event.target as HTMLInputElement;
    INPUT.value = INPUT.value.replace(/[^0-9]/g, "");
    if (formGroupName === "exportacionForm") {
      this.exportacionForm
        .get(controlName)
        ?.setValue(INPUT.value, { emitEvent: false });
    } else if (formGroupName === "importacionForm") {
      this.importacionForm
        .get(controlName)
        ?.setValue(INPUT.value, { emitEvent: false });
    }
  }

  // Check cantidadPorPeriodo ≤ cantidadAnual / 3
  checkCantidadPorPeriodo(): boolean {
    if (
      this.importacionForm.value.cantidadAnual === "" ||
      this.importacionForm.value.cantidadPorPeriodo === "" ||
      this.importacionForm.value.capacidadInstalada === ""
    ) {
      this.mostrarNotificacion("Los campos marcados con (*) son requeridos.");
      return false;
    }
    const CANTIDAD_ANUAL = Number(
      this.importacionForm.get("cantidadAnual")?.value,
    );
    const CANTIDAD_POR_PERIODO = Number(
      this.importacionForm.get("cantidadPorPeriodo")?.value,
    );
    if (CANTIDAD_POR_PERIODO > CANTIDAD_ANUAL / 3) {
      return false;
    }
    return true;
  }

  agregarPermisoImmex(): void {
    this.firstloadCompleted = false;
    if (
      this.importacionForm &&
      this.importacionForm.value.fraccionArancelaria
    ) {
      const EXISTS = this.immexTableDatos.some(
        (row) =>
          row.fraccionArancelaria ===
          this.importacionForm.value.fraccionArancelaria,
      );
      if (!EXISTS) {
        this.importacionForm
          .get("id")
          ?.setValue(Math.floor(Math.random() * 1000));
        this.importacionForm.get("fraccionArancelaria")?.disable();
        this.importacionForm.get("umt")?.setValue("PZA", { emitEvent: false });
        this.importacionForm
          .get("descripcionTigie")
          ?.setValue(
            "Máquinas automáticas para tratamiento o procesamiento de datos, portátiles, de peso inferior o igual a 10 kg",
            { emitEvent: false },
          );
        this.pagenuevaNotificacion = false;
        this.importacionForm.get("umt")?.disable();
        this.importacionForm.get("descripcionTigie")?.disable();
        if (!document.querySelector("bs-modal-backdrop")) {
          this.modalInstance.show();
        }
      } else {
        this.pagemostrarNotificacion(
          "La fracción que intenta ingresar ya se encuentra registrada.",
        );
      }
    } else {
      this.pagemostrarNotificacion(
        "Tiene que introducir la Fracción arancelaria.",
      );
    }
  }

  guardarMercanciaImportacion(): void {
    if (this.importacionForm.valid) {
      if (this.checkCantidadPorPeriodo()) {
        const NUEVO_REGISTRO: immexInfo = {
          id:
            Number(this.importacionForm.get("id")?.value) === 0
              ? Math.floor(Math.random() * 1000)
              : Number(this.importacionForm.get("id")?.value),
          fraccionArancelaria: this.importacionForm.get("fraccionArancelaria")
            ?.value,
          umt: this.importacionForm.get("umt")?.value,
          descripcionTigie: this.importacionForm.get("descripcionTigie")?.value,
          cantidadAnual: this.importacionForm.get("cantidadAnual")?.value,
          capacidadInstalada:
            this.importacionForm.get("capacidadInstalada")?.value,
          cantidadPorPeriodo:
            this.importacionForm.get("cantidadPorPeriodo")?.value,
          nicos: this.importacionForm.get("nicos")?.value,
          productoDescExportacions: this.importacionForm.get(
            "productoDescExportacions",
          )?.value,
          numero: this.immexTableDatos.length + 1,
          nicosTable: this.nicoTablaDatos,
        };
        this.pagenuevaNotificacion = false;
        const INDEX = this.immexTableDatos.findIndex(
          (row) => row.id === NUEVO_REGISTRO.id,
        );
        if (INDEX > -1) {
          this.selectFraccionArancelaria = NUEVO_REGISTRO;
          this.immexTableDatos[INDEX] = {
            ...NUEVO_REGISTRO,
            numero: this.immexTableDatos[INDEX].numero,
          };
          this.immexTableDatos = [...this.immexTableDatos];
        } else {
          this.immexTableDatos = [...this.immexTableDatos, NUEVO_REGISTRO];
        }

        this.modalInstance?.hide();
        setTimeout(() => {
          this.importacionForm.get("id")?.setValue(0);
          this.importacionForm.get("fraccionArancelaria")?.enable();
          this.importacionForm.get("umt")?.enable();
          this.importacionForm.reset();
          this.firstloadCompleted = false;
          this.eliminarDatosTablaNicoExp = false;
          this.nuevaNotificacion = {} as Notificacion;
        }, 100);
      } else {
        this.mostrarNotificacion(
          "La capacidad instalada por periodo debe ser menor o igual a la cantidad anual.",
        );
      }
    }
    this.mostrarNotificacion("Los campos marcados con (*) son requeridos.");
  }
  cerrarModal(): void {
    this.eliminarDatosTablaNicoExp = false;
    this.importacionForm.reset();
    this.importacionForm.get("id")?.setValue(0);
    this.importacionForm.get("fraccionArancelaria")?.enable();
    this.importacionForm.get("umt")?.enable();
    this.firstloadCompleted = false;
    this.nuevaNotificacion = {} as Notificacion;
    this.modalInstance.hide();
  }
  private mostrarNotificacion(mensaje: string): void {
    this.nuevaNotificacion = {
      tipoNotificacion: "alert",
      categoria: "warning",
      modo: "action",
      titulo: "",
      mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: "Aceptar",
      txtBtnCancelar: "",
    };
    this.eliminarDatosTablaNicoExp = true;
  }
  private exportNotificacion(mensaje: string): void {
    this.nuevaNotificacion = {
      tipoNotificacion: "alert",
      categoria: "warning",
      modo: "action",
      titulo: "",
      mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: "Aceptar",
      txtBtnCancelar: "",
    };
    this.exportacionFormNotificacion = true;
  }

  private pagemostrarNotificacion(mensaje: string): void {
    this.nuevaNotificacion = {
      tipoNotificacion: "alert",
      categoria: "warning",
      modo: "action",
      titulo: "",
      mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: "Aceptar",
      txtBtnCancelar: "",
    };
    this.pagenuevaNotificacion = true;
  }

  onFilaSeleccionada(event: immexInfo): void {
    this.selectFraccionArancelaria = event;
  }

  agregarExportacion(): void {
    if (
      this.exportacionForm.getRawValue().descripcionComercialExport.trim() &&
      this.exportacionForm.getRawValue().fraccionImportacion.trim()
    ) {
      if (this.selectFraccionArancelaria) {
        if (
          this.selectFraccionArancelaria.fraccionArancelaria ===
          this.exportacionForm.getRawValue().fraccionImportacion
        ) {
          const EXISTS = this.fraccionTablaDatos.some(
            (row) =>
              row.descripcionComercialExport ===
                this.exportacionForm
                  .getRawValue()
                  .descripcionComercialExport?.toUpperCase() &&
              row.fraccionExportacion ===
                this.selectFraccionArancelaria.fraccionArancelaria,
          );
          if (!EXISTS) {
            this.fraccionTablaDatos = [
              ...this.fraccionTablaDatos,
              {
                id: Math.floor(Math.random() * 1000000) + 1,
                fraccionExportacion:
                  this.selectFraccionArancelaria.fraccionArancelaria,
                fraccionImportacion:
                  this.selectFraccionArancelaria.fraccionArancelaria,
                umt: this.selectFraccionArancelaria.umt,
                descripcionTigie: `Descripción TIGIE ${Math.floor(Math.random() * 1000)} - ${["Maquinaria", "Textiles", "Alimentos", "Químicos", "Electrónicos"][Math.floor(Math.random() * 5)]}`,
                descripcionComercialExport:
                  this.exportacionForm.value.descripcionComercialExport.toUpperCase(),
                nicos: this.exportacionForm.value.nicos,
                numero: this.fraccionTablaDatos.length + 1,
                nicosTable: this.nicoTablaDatos,
              },
            ];
            setTimeout(() => {
              this.exportacionForm.reset();
            }, 100);
          } else {
            this.pagemostrarNotificacion(
              "La fracción que intenta ingresar ya se encuentra registrada.",
            );
          }
        } else {
          this.pagemostrarNotificacion(
            "La fracción arancelaria no es válida o no esta vigente..",
          );
        }
      } else {
        this.pagemostrarNotificacion(
          "Debe seleccionar una fracción de importación.",
        );
      }
    } else {
      this.pagemostrarNotificacion(
        "Tiene que introducir la Fracción arancelaria y su descripción.",
      );
    }
  }
  onFilaSeleccionadaExportacion(event: fraccionInfo): void {
    this.selectExportacion = event;
  }

  eliminarExportacion(): void {
    if (this.selectExportacion && this.selectExportacion.id) {
      this.fraccionTablaDatos = this.fraccionTablaDatos.filter(
        (row) => row.id !== this.selectExportacion.id,
      );
      this.selectExportacion = {} as fraccionInfo;
    }
    else{
      this.pagemostrarNotificacion("Debe seleccionar una fracción de exportación.");
    }
  }
  mostrarDetalleMercancia(): void {
    if (this.selectFraccionArancelaria && this.selectFraccionArancelaria.id) {
      this.nicoTablaDatos=[];
      this.importacionForm.patchValue({
        id: this.selectFraccionArancelaria.id,
        fraccionArancelaria: this.selectFraccionArancelaria.fraccionArancelaria,
        umt: this.selectFraccionArancelaria.umt,
        descripcionTigie: this.selectFraccionArancelaria.descripcionTigie,
        cantidadAnual: this.selectFraccionArancelaria.cantidadAnual || "",
        capacidadInstalada:
          this.selectFraccionArancelaria.capacidadInstalada || "",
        cantidadPorPeriodo:
          this.selectFraccionArancelaria.cantidadPorPeriodo || "",
        nicos: this.selectFraccionArancelaria.nicos || "",
        productoDescExportacions:
          this.selectFraccionArancelaria.productoDescExportacions || "",
      });
      this.nicoTablaDatos = this.selectFraccionArancelaria.nicosTable
        ? [...this.selectFraccionArancelaria.nicosTable]
        : [];
      this.importacionForm.get("fraccionArancelaria")?.disable();
      this.importacionForm.get("umt")?.disable();
      this.importacionForm.get("descripcionTigie")?.disable();
      this.importacionForm.get("productoDescExportacions")?.disable();
      this.importacionForm.get("id")?.disable();
      this.firstloadCompleted = true;
      if (!document.querySelector("bs-modal-backdrop")) {
        this.modalInstance.show();
      }
    }
  }
  seleccionTablas(event: NicoInfo[]): void {
    this.selectedNicos = event;
  }

  descripcionNico(): void {
    this.importacionForm
      .get("productoDescExportacions")
      ?.setValue(
        `PRODUCTO-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`,
      );
  }

  agregarNico(): void {
    if (
      this.importacionForm.value.nicos &&
      this.importacionForm.getRawValue().productoDescExportacions
    ) {
      const EXISTS = this.nicoTablaDatos.some(
        (row) =>
          row.NICO_Columna_1 === this.importacionForm.getRawValue().nicos,
      );
      if (!EXISTS) {
        this.nicoTablaDatos = [
          ...this.nicoTablaDatos,
          {
            id: Math.floor(Math.random() * 1000000) + 1,
            NICO_Columna_1: this.importacionForm.value.nicos,
            NICO_Columna_2:
              this.importacionForm.getRawValue().productoDescExportacions,
            estatus: false,
          },
        ];
        this.importacionForm.get("nicos")?.setValue("");
        this.importacionForm.get("productoDescExportacions")?.setValue("");
      } else {
        this.mostrarNotificacion(
          "El NICO que intenta ingresar ya se encuentra registrado.",
        );
      }
    } else {
      this.mostrarNotificacion(
        "Tiene que introducir el NICO y su descripción.",
      );
    }
  }
  eliminarNico(): void {
    if (this.selectedNicos && this.selectedNicos.length > 0) {
      const IDS_TO_DELETE = this.selectedNicos.map((nico) => nico.id);
      this.nicoTablaDatos = this.nicoTablaDatos.filter(
        (nico) => !IDS_TO_DELETE.includes(nico.id),
      );
      this.selectedNicos = [];
    } else {
      this.mostrarNotificacion("Debe elegir al menos un nico para eliminar.");
    }
  }
  mostrarDetalleMercanciaExportacion():void{
if(this.selectExportacion && this.selectExportacion.id && this.fraccionTablaDatos.length>0){
  this.exportacionForm.patchValue({
    id: this.selectExportacion.id,
    fraccionImportacion: this.selectExportacion.fraccionImportacion,
    umt: this.selectExportacion.umt,
    descripcionTigie: this.selectExportacion.descripcionTigie,
    fraccionExportacion: this.selectExportacion.fraccionExportacion,
    descripcionComercialExport: this.selectExportacion.descripcionComercialExport,
    nicos: this.selectExportacion.nicos,
  });
  this.nicoTablaDato = this.selectExportacion.nicosTable ? [...this.selectExportacion.nicosTable]:[];
  this.exportacionForm.get("fraccionImportacion")?.disable();
  this.exportacionForm.get("umt")?.disable();
  this.exportacionForm.get("descripcionTigie")?.disable();
  this.exportacionForm.get("descripcionNico")?.disable();
  this.exportacionForm.get("id")?.disable();
  if(!document.querySelector("bs-modal-backdrop")){
    this.modalExport.show();
  }
  }
}
cerrarModalExportacion():void{
    this.modalExport.hide();
  setTimeout(() => {
  this.exportacionForm.reset();
  this.exportacionForm.get("id")?.setValue(0);
  this.exportacionForm.get("fraccionImportacion")?.enable();
  this.exportacionForm.get("umt")?.enable();
  this.exportacionForm.get("descripcionTigie")?.enable();
  this.exportacionForm.get("descripcionNico")?.enable();
  this.nuevaNotificacion = {} as Notificacion;
  },100)

}
guardarMercanciaExportacion():void{
  if(this.selectExportacion && this.selectExportacion.id){
    const NUEVO_REGISTRO: fraccionInfo = {
      id: this.selectExportacion.id || Math.floor(Math.random() * 1000000) + 1,
      fraccionExportacion: this.exportacionForm.getRawValue().fraccionImportacion,
      fraccionImportacion: this.exportacionForm.getRawValue().fraccionImportacion,
      umt: this.exportacionForm.getRawValue().umt,
      descripcionTigie: this.exportacionForm.getRawValue().descripcionTigie,
      descripcionComercialExport: this.exportacionForm.getRawValue().descripcionComercialExport.toUpperCase(),
      nicos: this.exportacionForm.getRawValue().nicos,
      numero: this.selectExportacion.numero,
      nicosTable: this.nicoTablaDato,
    };
    const INDEX = this.fraccionTablaDatos.findIndex(row => row.id === NUEVO_REGISTRO.id);
    if (INDEX > -1) {
      this.fraccionTablaDatos[INDEX] = {
        ...NUEVO_REGISTRO,
        numero: this.fraccionTablaDatos[INDEX].numero,
      };
      this.fraccionTablaDatos = [...this.fraccionTablaDatos];
    } else {
      this.fraccionTablaDatos = [...this.fraccionTablaDatos, NUEVO_REGISTRO];
    }
    this.selectExportacion = NUEVO_REGISTRO;
    this.modalExport.hide();
    setTimeout(() => {
      this.exportacionForm.reset();
      this.exportacionForm.get("id")?.setValue(0);
      this.exportacionForm.get("fraccionImportacion")?.enable();
      this.exportacionForm.get("umt")?.enable();
      this.exportacionForm.get("descripcionTigie")?.enable();
      this.exportacionForm.get("descripcionNico")?.enable();
      this.nuevaNotificacion = {} as Notificacion;
    }, 100);
  }
}
onNicoChange():void{
  if(this.exportacionForm.get("nicos")?.value){
    this.exportacionForm
      .get("descripcionNico")
      ?.setValue(
        `PRODUCTO-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`,
      );
  }
}
agregarNicoExportacion():void{
if(this.exportacionForm.getRawValue().nicos && this.exportacionForm.getRawValue().descripcionNico){
if(!this.nicoTablaDato.some(row=>row.NICO_Columna_1===this.exportacionForm.getRawValue().nicos)){
    this.exportacionFormNotificacion = false;
 this.nicoTablaDato=[...this.nicoTablaDato,
  {
    id: Math.floor(Math.random() * 1000000) + 1,
    NICO_Columna_1: this.exportacionForm.get("nicos")?.value,
    NICO_Columna_2: this.exportacionForm.get("descripcionNico")?.value,
    estatus: false,
  }]

  setTimeout(() => {
  this.exportacionForm.get("nicos")?.setValue("");
  this.exportacionForm.get("descripcionNico")?.setValue("");
  },500)
}
else{
this.exportNotificacion("El NICO que intenta ingresar ya se encuentra registrado.");
}
}
else{
this.exportNotificacion("Tiene que introducir el NICO y su descripción.");
}
}
eliminarPedimentoDatoss(berr:boolean):void{
if(berr && this.selectFraccionArancelaria && this.selectFraccionArancelaria.id){
  this.immexTableDatos = this.immexTableDatos.filter(row=>row.id!==this.selectFraccionArancelaria.id);
  this.fraccionTablaDatos = this.fraccionTablaDatos.filter(row=>row.fraccionExportacion!==this.selectFraccionArancelaria.fraccionArancelaria);
  this.selectFraccionArancelaria = {} as immexInfo;
  this.selectExportacion={} as fraccionInfo;
  this.modalInstance.hide();
  this.modalExport.hide();
  this.deleteMessageExportacion=false;
  this.firstloadCompleted = false;
  this.importacionForm.reset();
  this.importacionForm.get("id")?.setValue(0);
  this.importacionForm.get("fraccionArancelaria")?.enable();
  this.importacionForm.get("umt")?.enable();
  this.nuevaNotificacion = {} as Notificacion;
}
else{
  this.deleteMessageExportacion=false;
}
}

eliminarPermisoImmex():void{
 if(this.selectFraccionArancelaria && this.selectFraccionArancelaria.id){
 this.nuevaNotificacion = {
      tipoNotificacion: "alert",
      categoria: "warning",
      modo: "action",
      titulo: "",
      mensaje:'Al eliminar el registro de fracción arancelaria, se eliminarán las fracciones de exportación asociadas. ¿Está seguro que desea eliminar la Fracción seleccionada?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: "Aceptar",
      txtBtnCancelar: "Cancelar",
    };
    this.deleteMessageExportacion=true;
 }  
 else{
  this.pagemostrarNotificacion("Seleccione la(s) Fracción(es) de Importación a eliminar.");
 }
}
eliminarNicoExportacion():void{
  if(this.selectedExportNicos && this.selectedExportNicos.length>0){
    const IDS_TO_DELETE = this.selectedExportNicos.map((nico) => nico.id);
    this.nicoTablaDato = this.nicoTablaDato.filter(
      (nico) => !IDS_TO_DELETE.includes(nico.id),
    );
    this.selectedExportNicos = [];
  }
  else{
    this.exportNotificacion("Debe elegir al menos un nico para eliminar.");
  }
}
onNicoSeleccionado(event:NicoInfo[]):void{
  this.selectedExportNicos = event;
}
  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Se encarga de la limpieza de recursos para evitar memory leaks. Emite una señal a través de
   * destroyNotifier$ para cancelar todas las suscripciones activas y luego completa el subject.
   *
   * @returns {void}
   * @implements {OnDestroy}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
