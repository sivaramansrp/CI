import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { AprovechamientoTextos, FECHA_INICIAL, FECHA_PAGO, RADIO_OPCIONS, RADIO_PARCIAL, RADIO_TOTAL } from '../constantes/adace32508.enum';
import { AdaceService } from '../services/adace.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Tramite32508Store } from '../state/Tramite32508.store';
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
export class AvisoComponent implements OnInit {
  avisoForm!: FormGroup;
  radioOpcions = RADIO_OPCIONS;
  radioPartial = RADIO_PARCIAL;
  radioTotal = RADIO_TOTAL;
  valorSeleccionado: string = '';
  fechaInitialInput: InputFecha = FECHA_INICIAL;
  fechaPagoInput: InputFecha = FECHA_PAGO;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  textoParcial = AprovechamientoTextos.PARCIAL;
  textoTotal = AprovechamientoTextos.TOTAL;
  public nuevaNotificacion!: Notificacion;
  public elementoParaEliminar!: number;
  public pedimentos: Array<Pedimento> = [];
  cargarArchivo: boolean = false;
  nombreArchivo: string = '';

  public anoCatalogo: CatalogosSelect = {
    labelNombre: 'Año del periodo reportado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };
  public mesCatalogo: CatalogosSelect = {
    labelNombre: 'Mes del periodo reportado',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  constructor(private adace: AdaceService,
    public fb: FormBuilder,
    private store: Tramite32508Store,
    private query: Tramite32508Query,
    private validacionesService: ValidacionesFormularioService
  ) { }
  ngOnInit(): void {
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
  alSeleccionarArchivo(event: any) {
    const FILE = event.target.files[0];
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
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
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.avisoForm, 'fechaInitial', 'setFechaInitial');
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

  /**
   * Inicializa el formulario con los valores actuales del estado.
   */
  donanteDomicilio(): void {
    this.avisoForm = this.fb.group({
      
    });
  }
}
