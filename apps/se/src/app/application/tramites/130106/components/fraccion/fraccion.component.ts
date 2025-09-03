/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrosslistComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud130106State, Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import { Subject, map, takeUntil } from 'rxjs';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum'
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Partidas } from '@libs/shared/data-access-user/src/core/models/130106/partidas.model';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import fraccions from '@libs/shared/theme/assets/json/130106/fraccion.json';

import { Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';

/**
 * Valida que el valor sea un número válido:
 * - Máximo 20 dígitos totales (enteros + decimales)
 * - Máximo 3 dígitos decimales
 * - Solo valores numéricos
 */
export function formFieldValidator(control: AbstractControl): ValidationErrors | null {
  const VALUE = control.value;
  if (VALUE === null || VALUE === undefined || VALUE === '') {
    return null;
  }
  
  const STRING_VALUE = VALUE.toString().trim();
  
  // Verificar que solo contenga números, punto decimal y opcionalmente signo negativo
  if (!/^-?\d+(\.\d+)?$/.test(STRING_VALUE)) {
    return { pattern: true };
  }
  
  // Separar parte entera y decimal
  const PARTS = STRING_VALUE.replace('-', '').split('.');
  const INTEGER_PART = PARTS[0];
  const DECIMAL_PART = PARTS[1];

  // Verificar que no exceda 20 dígitos totales
  if (STRING_VALUE.replace(/[.-]/g, '').length > 20) {
    return { maxLength: true };
  }
  
  // Verificar que no tenga más de 3 decimales
  if (DECIMAL_PART && DECIMAL_PART.length > 3) {
    return { tooManyDecimals: true };
  }
  
  // Verificar dígitos enteros específicos para factura (16 dígitos)
  if (INTEGER_PART.length > 16) {
    return { tooManyIntegerDigits: true };
  }
  
  return null;
}

@Component({
  selector: 'app-fraccion',
  standalone: true,
  imports: [
    CatalogoSelectComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    TituloComponent, 
    TablaDinamicaComponent, 
    CrosslistComponent,
    AlertComponent,
    CommonModule,
    NotificacionesComponent
  ],
  templateUrl: './fraccion.component.html',
  styleUrl: './fraccion.component.scss'
})
export class FraccionComponent implements OnInit, OnDestroy {
 private modalEditar!: Modal;
    private cargarArchivoInstance!: Modal;
  esFormularioSoloLectura: boolean = false;
  fraccionForm!: FormGroup;

    @ViewChild('cargarArchivoModal', { static: false }) cargarArchivoModal!: ElementRef;
    @ViewChild('modalConfirmacionRef') modalConfirmacionRef!: ElementRef;
    @ViewChild('modalEditarRef') modalEditarRef!: ElementRef;

      public archivoFormGroup: FormGroup = new FormGroup({
    archivo: new FormControl(''),
  });
  
  // Catalog data
  public fraccion: Catalogo[] = fraccions?.fraccion;
  public umt: Catalogo[] = fraccions?.UMT;
  public bloque: Catalogo[] = fraccions?.bloque;
  public entidad: Catalogo[] = fraccions?.entidad;
  public representacion: Catalogo[] = fraccions?.representacion;
  
  // State management
  public solicitudState!: Solicitud130106State;
  public destroyNotifier$: Subject<void> = new Subject();
  
  // Table and form data
  partidas: Partidas[] = [];
  
  // Notification properties
  public mostrarNotificacionError: boolean = false;
  public notificacionError: Notificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'info',
    titulo: '',
    mensaje: '',
    cerrar: true,
    tiempoDeEspera: 0,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };

  // Table configuration
  partidasDatas: ConfiguracionColumna<Partidas>[] = [
    { encabezado: 'Cantidad', clave: (item: Partidas) => item.mercanciaCantidad, orden: 1 },
    { encabezado: 'Unidad de medida', clave: (item: Partidas) => item.unidad, orden: 2 },
    { encabezado: 'Fracción arancelaria', clave: (item: Partidas) => item.fraccion, orden: 3 },
    { encabezado: 'Descripción', clave: (item: Partidas) => item.descripcion, orden: 4 },
    { encabezado: 'Precio unitario USD', clave: (item: Partidas) => item.precio, orden: 5 },
    { encabezado: 'Total USD', clave: (item: Partidas) => item.total, orden: 6 }
  ];

  TablaSeleccion = TablaSeleccion;
  public TEXTOS = AVISO;
  
  // Date and country selection
  selectRangoDias: string[] = [];
  fechasSeleccionadas: string[] = [];
  fechasDatos: string[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');

  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  paisDeProcedenciaBotones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  constructor(
    private fb: FormBuilder,
    public tramite130106Store: Tramite130106Store,
    public tramite130106Query: Tramite130106Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Agrega elementos a la lista de fechas seleccionadas dependiendo del tipo de acción.
   * @param tipo - El tipo de acción ('t' para agregar todos, otro valor para agregar una sola fecha).
   */
  agregar(tipo: string): void {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHAVALOR = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[FECHAVALOR]);
      this.fechasDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas seleccionadas dependiendo del tipo de acción.
   * @param tipo - El tipo de acción ('t' para eliminar todas, otro valor para eliminar una sola fecha).
   */
  quitar(tipo: string = ''): void {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHAVALOR = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[FECHAVALOR]);
      this.fechasSeleccionadas.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
    this.selectRangoDias = this.solicitudState?.selectRangoDias || [];
  }

  /**
   * Inicializa el formulario de solicitud.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

  /**
   * Establece valores en el store del trámite a partir de los campos del formulario.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130106Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130106Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Guarda los datos del formulario de combinación requerida.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.fraccionForm.disable();
    } else {
      this.fraccionForm.enable();
    }
  }

  /**
   * Inicializa el formulario de la solicitud con los valores del estado.
   */
  public inicializarFormulario(): void {
    this.tramite130106Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud130106State;
        })
      )
      .subscribe();

    this.fraccionForm = this.fb.group({
      fraccion: [this.solicitudState?.fraccion, Validators.required],
      cantidad: [this.solicitudState?.cantidad, [Validators.required, formFieldValidator]],
      factura: [this.solicitudState?.factura, [Validators.required, formFieldValidator]],
      umt: [this.solicitudState?.umt, Validators.required],
      mercanciaCantidad: [this.solicitudState?.cantidad, [Validators.required, formFieldValidator]],
      mercanciaFactura: [this.solicitudState?.factura, [Validators.required, formFieldValidator]],
      descripcion: [this.solicitudState?.umt, Validators.required],
      cantidadTotal: [this.solicitudState?.umt, Validators.required],
      valorTotal: [this.solicitudState?.umt, Validators.required],
      especifico: [this.solicitudState?.especifico, Validators.required],
      justificacion: [this.solicitudState?.justificacion, Validators.required],
      observaciones: [this.solicitudState?.observaciones],
      entidad: [this.solicitudState?.entidad, Validators.required],
      representacion: [this.solicitudState?.representacion, Validators.required],
      bloque: [this.solicitudState?.bloque, Validators.required],
      disponible: [this.solicitudState?.disponible],
      seleccionado: [this.solicitudState?.seleccionado, Validators.required],
    });
    
    this.fraccionForm.get('bloque')?.valueChanges.subscribe(() => {
      this.selectRangoDias = ["ESTADOS UNIDOS DE AMERICA CANADA"];
      this.tramite130106Store.updateSelectRangoDias(this.selectRangoDias);      
    });
    
    this.updateformfied();
  }

  /**
   * Actualiza los campos del formulario relacionados con fracciones.
   */
  updateformfied(): void { 
    this.fraccionForm.get('cantidadTotal')?.disable();
    this.fraccionForm.get('valorTotal')?.disable();
  }

  /**
   * Convierte los datos del formulario en una nueva partida y la agrega a la lista de partidas.
   */
  generarPartidas(): void {
    const MERCANCIA_CANTIDAD_CONTROL = this.fraccionForm.get('mercanciaCantidad');
    const MERCANCIA_FACTURA_CONTROL = this.fraccionForm.get('mercanciaFactura');

    MERCANCIA_CANTIDAD_CONTROL?.markAsTouched();
    MERCANCIA_FACTURA_CONTROL?.markAsTouched();

    if (!this.validarMercanciaCantidad(MERCANCIA_CANTIDAD_CONTROL)) { return; }
    if (!this.validarMercanciaFactura(MERCANCIA_FACTURA_CONTROL)) { return; }

    const FORMDATA = this.fraccionForm.value;

    if (!this.validarValoresNoCero(FORMDATA)) {
      return;
    }
    if (!this.validarFormatoFactura(FORMDATA)) {
      return;
    }
    if (!this.validarFormatoCantidad(FORMDATA)) {
      return;
    }

    const NEWPARTIDA: Partidas = {
      mercanciaCantidad: FORMDATA.mercanciaCantidad,
      unidad: fraccions?.UMT.find(item => item.id === Number(FORMDATA?.umt))?.descripcion,
      fraccion: fraccions?.fraccion.find(item => item.id === Number(FORMDATA?.fraccion))?.descripcion,
      descripcion: FORMDATA.descripcion,
      precio: 1.000,
      total: FORMDATA.mercanciaCantidad
    };
    
    this.partidas.push(NEWPARTIDA);
 
    const VALOR_TOTAL = this.partidas.reduce((acc, item) => acc + Number(item.mercanciaCantidad), 0);

    this.fraccionForm.patchValue({
      cantidadTotal: VALOR_TOTAL,
      valorTotal: VALOR_TOTAL,
      descripcion: '',
      mercanciaFactura: '',
      mercanciaCantidad: '',
    });
  }

  private validarMercanciaCantidad(control: AbstractControl | null): boolean {
    if (control && control.invalid) {
      if (control.errors?.['pattern']) {
        this.mostrarError('Por favor, escribe un número entero válido');
        return false;
      }
      if (control.errors?.['tooManyDecimals']) {
        this.mostrarError('La cantidad no cumple el formato especificado. Formato es máximo 14 dígitos enteros y máximo 3 decimales');
        return false;
      }
      if (control.errors?.['required']) {
        this.mostrarError('El campo cantidad es obligatorio');
        return false;
      }
    }
    return true;
  }

  private validarMercanciaFactura(control: AbstractControl | null): boolean {
    if (control && control.invalid) {
      if (control.errors?.['pattern']) {
        this.mostrarError('Por favor, escribe un número entero válido');
        return false;
      }
      if (control.errors?.['tooManyDecimals'] || control.errors?.['tooManyIntegerDigits']) {
        this.mostrarError('El Valor USD no cumple el formato especificado. Formato es máximo 16 dígitos enteros y máximo 3 decimales');
        return false;
      }
      if (control.errors?.['required']) {
        this.mostrarError('El campo Valor partida USD es obligatorio');
        return false;
      }
    }
    return true;
  }

  private validarValoresNoCero(FORMDATA: any): boolean {
    if (FORMDATA.mercanciaCantidad === 0 || FORMDATA.mercanciaCantidad === "0") {
      this.mostrarError('Debe agregar el valor en dolares de la partida.');
      return false;
    }
    if (!FORMDATA.mercanciaFactura || FORMDATA.mercanciaFactura === 0 || FORMDATA.mercanciaFactura === "0") {
      this.mostrarError('Debe agregar el valor USD de la partida.');
      return false;
    }
    return true;
  }

  private validarFormatoFactura(FORMDATA: any): boolean {
    const FACTURA_VALUE = FORMDATA.mercanciaFactura?.toString();
    if (FACTURA_VALUE) {
      if (!/^-?\d+(\.\d+)?$/.test(FACTURA_VALUE)) {
        this.mostrarError('Por favor, escribe un número entero válido');
        return false;
      }
      const FACTURA_PARTS = FACTURA_VALUE.replace('-', '').split('.');
      const INTEGER_PART = FACTURA_PARTS[0];
      const DECIMAL_PART = FACTURA_PARTS[1];
      if (INTEGER_PART.length > 16 || (DECIMAL_PART && DECIMAL_PART.length > 3)) {
        this.mostrarError('El Valor USD no cumple el formato especificado. Formato es máximo 16 dígitos enteros y máximo 3 decimales');
        return false;
      }
    }
    return true;
  }

  private validarFormatoCantidad(FORMDATA: any): boolean {
    const CANTIDAD_VALUE = FORMDATA.mercanciaCantidad?.toString();
    if (CANTIDAD_VALUE) {
      if (!/^-?\d+(\.\d+)?$/.test(CANTIDAD_VALUE)) {
        this.mostrarError('Por favor, escribe un número entero válido');
        return false;
      }
      const CANTIDAD_PARTS = CANTIDAD_VALUE.replace('-', '').split('.');
      const INTEGER_PART = CANTIDAD_PARTS[0];
      const DECIMAL_PART = CANTIDAD_PARTS[1];
      if (INTEGER_PART.length > 14 || (DECIMAL_PART && DECIMAL_PART.length > 3)) {
        this.mostrarError('La cantidad no cumple el formato especificado. Formato es máximo 14 dígitos enteros y máximo 3 decimales');
        return false;
      }
    }
    return true;
  }

  /**
   * Closes the error notification modal
   */
  cerrarNotificacionError(_evento: boolean): void {
    this.mostrarNotificacionError = false;
  }

  /**
   * Shows error notification with the provided message
   */
  private mostrarError(mensaje: string): void {
    this.notificacionError.mensaje = mensaje;
    this.mostrarNotificacionError = true;
  }

  /**
   * Maneja el cambio en el dropdown padre (Entidad federativa).
   * Limpia el valor del dropdown hijo (Representación federal) cuando cambia la entidad federativa.
   */
  onEntidadFederativaChange(): void {
    // Limpia el valor del campo representación federal
    this.fraccionForm.get('representacion')?.setValue(null);
    
    // Actualiza el store con el nuevo valor de entidad federativa
    this.setValoresStore(this.fraccionForm, 'entidad', 'setEntidad');
    
    // También limpia el valor de representación federal en el store
    this.tramite130106Store.setRepresentacion('');
  }

  /**
   * Maneja el cambio en el dropdown hijo (Representación federal).
   */
  onRepresentacionFederalChange(): void {
    this.setValoresStore(this.fraccionForm, 'representacion', 'setRepresentacion');
  }

// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
ngAfterViewInit(): void {
    if (this.cargarArchivoModal) {
      this.cargarArchivoInstance = new Modal(this.cargarArchivoModal.nativeElement);
    }

    if (this.modalEditarRef) {
      this.modalEditar = new Modal(this.modalEditarRef.nativeElement);
    }
  }


  /**
   * Opens the file upload modal
   */
  cargarArchivo(): void {
    this.cargarArchivoInstance?.show();
  }

  
  /**
   * Closes the file upload modal
   */
  cerrar(): void {
    this.cargarArchivoInstance?.hide();
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
