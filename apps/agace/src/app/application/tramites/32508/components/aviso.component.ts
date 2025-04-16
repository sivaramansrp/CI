import { ANO_CATALOGO, AprovechamientoTextos, FECHA_INICIAL, FECHA_PAGO, MES_CATALOGO, RADIO_OPCIONS, RADIO_PARCIAL, RADIO_TOTAL } from '../constantes/adace32508.enum';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud32508State, Tramite32508Store } from '../state/Tramite32508.store';
import { AdaceService } from '../services/adace.service';
import { CommonModule } from '@angular/common';
import { Tramite32508Query } from '../state/Tramite32508.query';
@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  providers: [AdaceService],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css',
  
})
export class AvisoComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  avisoForm!: FormGroup;
  radioOpcions = RADIO_OPCIONS;
  radioPartial = RADIO_PARCIAL;
  radioTotal = RADIO_TOTAL;
  fechaInitialInput: InputFecha = FECHA_INICIAL;
  fechaPagoInput: InputFecha = FECHA_PAGO;
  textoParcial = AprovechamientoTextos.PARCIAL;
  textoTotal = AprovechamientoTextos.TOTAL;
  public anoCatalogo = ANO_CATALOGO;
  public mesCatalogo = MES_CATALOGO;
  public solicitudState!: Solicitud32508State;
  public pedimentos: Array<Pedimento> = [];
  public nuevaNotificacion!: Notificacion;
  public elementoParaEliminar!: number;
  cargarArchivo: boolean = false;
  valorSeleccionado: string = '';
  nombreArchivo: string = '';
  

  constructor(private adace: AdaceService,
    public fb: FormBuilder,
    private store: Tramite32508Store,
    private query: Tramite32508Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // Constructor utilizado para la creación de objetos requeridos en el componente
  }

  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.obtenerDatosAnoPeriodo();
    this.obtenerDatosMesPeriodo();
  }

  obtenerDatosAnoPeriodo(): void {
    this.adace
      .obtenerDatosAno()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.anoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  obtenerDatosMesPeriodo(): void {
    this.adace
      .obtenerDatosMes()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.mesCatalogo.catalogos = resp as Catalogo[];
      });
  }
  alSeleccionarArchivo(event: Event) {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
    this.avisoForm.patchValue({
      archivo: FILE,
    });
  }
  cargaArchivo() {
    this.cargarArchivo = true;
    this.abrirModal();
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }

  }
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Se realizo la carga correctamente',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.avisoForm.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.avisoForm, 'fechaPago', 'setFechaPago');
  }

  cambioFechaInitial(nuevo_fechaPago: string): void {
    this.avisoForm.patchValue({
      fechaElaboracion: nuevo_fechaPago,
    });
    this.setValoresStore(this.avisoForm, 'fechaElaboracion', 'setFechaElaboracion');
  }

  validarDestinatarioFormulario(): void {
    if (this.avisoForm.invalid) {
      this.avisoForm.markAllAsTouched();
    }
  }
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32508Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  donanteDomicilio(): void {
    this.avisoForm = this.fb.group({
      claveFiscalizado: [this.solicitudState?.claveFiscalizado, [Validators.required]],
      tipoDictamen: [this.solicitudState?.tipoDictamen, [Validators.required]],
      rfc: [this.solicitudState?.rfc, [Validators.required]],
      numeroInscripcion: [this.solicitudState?.numeroInscripcion, [Validators.required]],
      ano: [this.solicitudState?.ano, [Validators.required]],
      mes: [this.solicitudState?.mes, [Validators.required]],
      radioPartial: [this.solicitudState?.radioPartial, [Validators.required]],
      radioTotal: [this.solicitudState?.radioTotal, [Validators.required]],
      saldoPendiente: [this.solicitudState?.saldoPendiente, [Validators.required]],
      aprovechamiento: [this.solicitudState?.aprovechamiento, [Validators.required]],
      disminucionAplicada: [this.solicitudState?.disminucionAplicada, [Validators.required]],
      saldoPendienteDisminuir: [this.solicitudState?.saldoPendienteDisminuir, [Validators.required]],
      cantidad: [this.solicitudState?.cantidad, [Validators.required]],
      llaveDePago: [this.solicitudState?.llaveDePago, [Validators.required]],
      fechaElaboracion: [this.solicitudState?.fechaElaboracion, [Validators.required]],
      fechaPago: [this.solicitudState?.fechaPago, [Validators.required]],
      archivo: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
