import {
  BtnContinuarComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  DatosPasos,
  InputFecha,
  ListaPasosWizard,
  PASOS,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { ColumnasTabla, FECHA_FINAL, FECHAI_NICIAL } from '../../models/certificado.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud110219State, Tramite110219Store } from '../../estados/Tramite110219.store';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { CertificadoService } from '../../services/certificado.service';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from "@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { TablaDinamicaComponent } from "@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component";
import { Tramite110219Query } from '../../estados/Tramite110219.query';
/** 
 * Texto de alerta que se muestra para indicar los certificados disponibles.
 */
const TERCEROS_TEXTO_DE_ALERTA = 'Certificados Disponibles';

/**
 * Componente para gestionar la cancelación de certificados.
 */
@Component({
  selector: 'app-cancelacion-de-certificado',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
export class CancelacionDeCertificadoComponent implements OnInit, OnDestroy {
  /** Formulario para la cancelación de certificados. */
  cancelacionForm!: FormGroup;

  /** Sujeto para manejar la destrucción del componente. */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Datos de la tabla de certificados disponibles. */
  public certificadoDisponsiblesTablaDatos: ColumnasTabla[] = [];

  /** Evento para emitir datos al componente padre. */
  @Output() dataEvent = new EventEmitter<number>();

  @Output() isNumeroCertificado = new EventEmitter<boolean>();
  @Output() isNumeroCertificadoPattern = new EventEmitter<boolean>();

  @Output() certificadoOriginEnable = new EventEmitter<boolean>();


  /** Texto de alerta para mostrar en el componente. */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /** Fecha inicial para el formulario. */
  fechaInicialInput: InputFecha = FECHAI_NICIAL;

  /** Fecha final para el formulario. */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /** Estado de la solicitud actual. */
  public solicitudState!: Solicitud110219State;

  /** Lista de pasos del asistente. */
  pasos: ListaPasosWizard[] = PASOS;

  /** Selección de la tabla. */
  TablaSeleccion = TablaSeleccion;
  /** Indica si se deben mostrar errores en el formulario. */
  mostrarErrores: boolean = true;
  /** Indica si se está buscando un certificado. */
  estaBuscando: boolean = true;

  isCertificadoOriginEnable: boolean = false;
  /** Catálogo de tratados. */
  tratado!: CatalogosSelect;

  /** Catálogo de países. */
  pais!: CatalogosSelect;

  /** Índice del paso actual. */
  indice: number = 1;
  /** Mensaje de error a mostrar. */
  mensajeError: string = '';

  /** Datos de los pasos del asistente. */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /** Configuración del catálogo de tratados. */
  public tratadoCatalogo: CatalogosSelect = {
    labelNombre: 'Tratado / Acuerdo:',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /** Configuración del catálogo de países. */
  public paisCatalogo: CatalogosSelect = {
    labelNombre: 'País / Bloque:',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Constructor del componente.
   * @param certificadoService Servicio para gestionar certificados.
   * @param fb Constructor de formularios.
   * @param validacionesService Servicio para validar formularios.
   * @param store Almacén de datos del trámite.
   * @param query Consulta de datos del trámite.
   */
  constructor(
    private certificadoService: CertificadoService,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private store: Tramite110219Store,
    private query: Tramite110219Query
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /** Inicializa el componente. */
  ngOnInit(): void {
    this.getTratadoData();
    this.getPaisdata();
    this.getSolicitudesTabla();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
  }

  /** Encabezados de la tabla de certificados disponibles. */
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    { encabezado: 'Número de certificado', clave: (ele: ColumnasTabla) => ele.numeroCertificado, orden: 1 },
    { encabezado: 'Pais/Bloque', clave: (ele: ColumnasTabla) => ele.pais, orden: 2 },
    { encabezado: 'Tratado / Acuerdo', clave: (ele: ColumnasTabla) => ele.tratado, orden: 3 },
    { encabezado: 'Fecha expedición', clave: (ele: ColumnasTabla) => ele.fechaExpedicion, orden: 4 },
    { encabezado: 'Fecha vencimíento', clave: (ele: ColumnasTabla) => ele.fechaVencimiento, orden: 5 },
  ];

  /**
   * Cambia la fecha inicial en el formulario.
   * @param nuevo_fechaIncial Nueva fecha inicial.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechaInicial');
  }

  /**
   * Cambia la fecha final en el formulario.
   * @param nuevo_fechaFinal Nueva fecha final.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.cancelacionForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });

    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechaFinal');
  }

  /** Valida el formulario del destinatario. */
  validarDestinatarioFormulario(): void {
    if (this.cancelacionForm.invalid) {
      this.cancelacionForm.markAllAsTouched();
    }
  }

  /** Activa el estado de búsqueda. */
  alBuscarClic(): void {

    const control = this.cancelacionForm.get('validacionForm.numeroCertificado')?.value;
    if (!control) {
      this.estaBuscando = true;
      this.isNumeroCertificado.emit(this.estaBuscando);

    } else if(control){
      this.estaBuscando = false;
      this.certificadoDisponsiblesTablaDatos[0].numeroCertificado = (this.cancelacionForm.get('validacionForm.numeroCertificado')?.value);
      this.isNumeroCertificado.emit(this.estaBuscando);
    }   

    if (control.invalid) {
      this.mensajeError = '1.(Número de certificado) es un campo requerido';
    }

    const certificadoExiste = this.buscarCertificado(control.value);

    if (!certificadoExiste) {
      this.mensajeError = 'El certificado de origen no existe';
    }

    
    if((this.cancelacionForm.get('validacionForm.numeroCertificado')?.hasError('pattern')) && !(this.cancelacionForm.get('validacionForm.numeroCertificado')?.hasError('required'))){
         this.mostrarErrores = true;
         this.isNumeroCertificadoPattern.emit(this.mostrarErrores);
    } else {
      this.mostrarErrores = false;
         this.isNumeroCertificadoPattern.emit(this.mostrarErrores);
    }

    this.mensajeError = '';
  }

  /**
   * Busca un certificado en la tabla de certificados disponibles.
   * @param numeroCertificado Número de certificado a buscar.
   * @returns `true` si el certificado existe, de lo contrario `false`.
   */
  buscarCertificado(numero: string): boolean {
    return false;
  }

  /** Obtiene los datos del catálogo de tratados. */
  getTratadoData(): void {
    this.certificadoService
      .getTratadoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.tratadoCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /** Obtiene los datos del catálogo de países. */
  getPaisdata(): void {
    this.certificadoService
      .getTratadoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.paisCatalogo.catalogos = resp as Catalogo[];
      });
  }

  /** Obtiene los datos de la tabla de solicitudes. */
  public getSolicitudesTabla(): void {
    this.certificadoService.getSolicitudesTabla().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.certificadoDisponsiblesTablaDatos = data;
    });
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario.
   * @param field Campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece valores en el almacén de datos.
   * @param form Formulario.
   * @param campo Campo del formulario.
   * @param metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110219Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /** Obtiene el formulario de validación. */
  get validacionForm(): FormGroup {
    return this.cancelacionForm.get('validacionForm') as FormGroup;
  }

  /** Inicializa el formulario con los datos del estado de la solicitud. */
  donanteDomicilio(): void {
    this.cancelacionForm = this.fb.group({
      validacionForm: this.fb.group({
        numeroCertificado: [this.solicitudState?.numeroCertificado, [Validators.required, Validators.pattern(/^\d{14}$/)]],
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fechaInicial: [this.solicitudState?.fechaInicial, [Validators.required]],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
      }),
    });
  }

  /** Emite un evento al hacer clic en un botón. */
  emitirEventoClick(): void {
    this.dataEvent.emit(3);
  }

  get numeroCertificado()  {
    this.cancelacionForm.get('validacionForm.numeroCertificado');

    return

  }


  onTablaDblClick(evt: MouseEvent): void {
    // 1️⃣ ¿Dónde hizo dblclick? Busca el <td>
    const td = (evt.target as HTMLElement).closest('td');
    if (!td) { return; }

    // 2️⃣ ¿En qué columna? Compara el índice del <td> con tu headers[]
    const tr = td.parentElement;
    if (!tr) { return; }
    const clickedColIndex = Array.from(tr.children).indexOf(td);
    const targetColIndex = this.headers .findIndex(h => h.encabezado === 'Número de certificado');

    if (clickedColIndex !== targetColIndex) {
      // no es la columna “Certificado”
      return;
    }

    // 3️⃣ Extrae el valor mostrado en la celda y busca el objeto
    const valor = td.textContent ? td.textContent.trim() : '';
    const match = this.certificadoDisponsiblesTablaDatos
      .find(item => String(item.numeroCertificado) === valor);

    if (match) {
      this.isCertificadoOriginEnable = true;
      this.certificadoOriginEnable.emit(this.isCertificadoOriginEnable);
      this.handleCertificadoDblClick(match);
    }
  }

 private handleCertificadoDblClick(cert: ColumnasTabla) {
    // Aquí tu lógica: navegar, abrir modal, etc.
    console.log('DblClick en certificado:', cert);
    // p.ej. this.router.navigate(['/detalle', cert.numeroCertificado]);
  }

  /** Limpia los recursos al destruir el componente. */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
