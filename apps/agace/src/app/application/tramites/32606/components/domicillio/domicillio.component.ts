import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, ConsultaioState, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DOMICILIO_CATALOGO, DOMICILLIO_TABLA, ENTIDAD_CATALOGO, ENTIDAD_TABLA, RADIO_07, TIPO_INSTALACION_CATALOGO } from '../../constantes/adace32606.enum';
import { Domicillio, EntidadFederativa } from '../../models/adace.model';
import { EconomicoService } from '../../services/economico.service';
import { Tramite32606Query } from '../../state/Tramite32606.query';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-domicillio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TablaDinamicaComponent, InputRadioComponent, TituloComponent,
    NotificacionesComponent],
  templateUrl: './domicillio.component.html',
  styleUrl: './domicillio.component.css',
})
export class DomicillioComponent implements OnInit, OnDestroy {

  public domicillioForm!: FormGroup;
  public domicillio = DOMICILIO_CATALOGO;
  public tipoDeInstalacion = TIPO_INSTALACION_CATALOGO;
  public entidadFederativa = ENTIDAD_CATALOGO;
  public TablaSeleccion = TablaSeleccion;
  public domicillioTabla = DOMICILLIO_TABLA;
  public entidadTabla = ENTIDAD_TABLA;
  public domicillioDatos: Domicillio[] = [];
  radioOpcions07 = RADIO_07;
  nombreArchivo: string = '';
  nombreArchivo2: string = '';
  public nuevaNotificacion!: Notificacion;
  public elementoParaEliminar!: number;
  public pedimentos: Array<Pedimento> = [];
  @ViewChild('modalAgregar') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModalButton!: ElementRef;
  public entidadTablaDatos: EntidadFederativa[] = [];
  seleccionarDomiciliosDatos: Domicillio[] = [] as Domicillio[];
  @ViewChild('modalInstalacionesPrincipales', { static: false })
  modalInstalacionesPrincipalesElement!: ElementRef;
  @Output() instalacionesPrincipales = new EventEmitter<Domicillio>();
  soloLectura: boolean = false;
  public solicitudState!: Solicitud32606State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  consultaDatos!: ConsultaioState;

  constructor(private economico: EconomicoService,
    public query: Tramite32606Query,
    public store: Tramite32606Store,
    private fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.domicillioDatos = [];
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
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
    this.inicializarEstadoFormulario();
    this.obtenerDomicillio();
    this.obtenerEntidad();
    this.obtenerTablaEntidad();
    this.obtenerTablaDomicillio();

  }


  /**
 * Determina el estado inicial del formulario según el modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura, llama a `guardarDatosDelFormulario()` para deshabilitar los campos.
 * Si no está en modo solo lectura, llama a `datosDeAvisoForm()` para aplicar la configuración correspondiente.
 */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
 * Habilita o deshabilita el formulario de acuerdo al modo de solo lectura.
 * 
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es `true`), 
 * deshabilita todos los campos del formulario para evitar modificaciones.
 * En caso contrario, habilita los campos para permitir la edición.
 */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.domicillioForm.disable();
    } else {
      this.domicillioForm.enable();
    }
  }


  public seleccionarModificar(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(
        this.modalInstalacionesPrincipalesElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
    this.abrirModal();
  }

  eliminarDomiciliosDatos(): void {
    if (this.seleccionarDomiciliosDatos.length > 0) {
      this.seleccionarDomiciliosDatos.forEach((elemento) => {
        const INDICE = this.domicillioDatos.findIndex(
          (inv) => inv.tipoInstalacion === elemento.tipoInstalacion
        );
        if (INDICE !== -1) {
          this.domicillioDatos.splice(INDICE, 1);
        }
      });
    }
  }


  public onAgregarClick(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
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
      mensaje: 'No se encontró información',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

  obtenerDomicillio(): void {
    this.economico
      .obtenerDomicillio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.domicillio.catalogos = resp as Catalogo[];
      });
  }

  obtenerEntidad(): void {
    this.economico
      .obtenerEntidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.entidadFederativa.catalogos = resp as Catalogo[];
      });
  }

  public obtenerTablaEntidad(): void {
    this.economico
      .obtenerTablaEntidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadTablaDatos = data;
      });
  }

  public obtenerTablaDomicillio(): void {
    this.economico
      .obtenerTablaDomicillio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.domicillioDatos = data;
      });
  }

  /**
    * Marca todos los campos del formulario como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.domicillioForm.invalid) {
      this.domicillioForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   *
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el almacén para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32606Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  donanteDomicilio(): void {
    this.domicillioForm = this.fb.group({
      domicillio: [{ value: this.solicitudState?.domicillio, disabled: this.soloLectura }, [Validators.required]],
      entidadFederativa: [{ value: this.solicitudState?.entidadFederativa, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio12: [{ value: this.solicitudState?.tipoRadio12, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio13: [{ value: this.solicitudState?.tipoRadio13, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio27: [{ value: this.solicitudState?.tipoRadio27, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio28: [{ value: this.solicitudState?.tipoRadio28, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio29: [{ value: this.solicitudState?.tipoRadio29, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio30: [{ value: this.solicitudState?.tipoRadio30, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio31: [{ value: this.solicitudState?.tipoRadio31, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio32: [{ value: this.solicitudState?.tipoRadio32, disabled: this.soloLectura }, [Validators.required]],
      tipoRadio33: [{ value: this.solicitudState?.tipoRadio33, disabled: this.soloLectura }, [Validators.required]],
      file1: [{ value: this.solicitudState?.file1, disabled: this.soloLectura }, [Validators.required]],
      file2: [{ value: this.solicitudState?.file2, disabled: this.soloLectura }, [Validators.required]],
      actualmente: [{ value: this.solicitudState?.actualmente, disabled: this.soloLectura }, [Validators.required]],
      actualmente2: [{ value: this.solicitudState?.actualmente2, disabled: this.soloLectura }, [Validators.required]],
      municipio: [{ value: this.solicitudState?.municipio, disabled: this.soloLectura }, [Validators.required]],
      tipoDeInstalacion: [{ value: this.solicitudState?.tipoDeInstalacion, disabled: this.soloLectura }, [Validators.required]],
      registroSESAT: [{ value: this.solicitudState?.registroSESAT, disabled: this.soloLectura }, [Validators.required]],
      descripcion: [{ value: this.solicitudState?.descripcion, disabled: this.soloLectura }, [Validators.required]],
      codigoPostal: [{ value: this.solicitudState?.codigoPostal, disabled: this.soloLectura }, [Validators.required]],

    });
  }

  alSeleccionarArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo: FILE,
    });
  }

  alSeleccionarArchivo2(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE = TARGET?.files ? TARGET.files[0] : null;
    this.nombreArchivo2 = FILE ? FILE.name : '';
    this.domicillioForm.patchValue({
      archivo2: FILE,
    });
  }

  seleccionarDomiciliosDato(evento: Domicillio[]): void {
    this.seleccionarDomiciliosDatos = evento;
  }

  aceptarInstalacionesPrincipales(): void {
    const OBJETO_JSON: Domicillio = {
      instalacionPrincipal: this.domicillioForm.get('principales')?.value,
      tipoInstalacion: this.domicillioForm.get('tipoDeInstalacion')?.value,
      entidadFederativa: this.domicillioForm.get('entidadFederativa')?.value,
      municipioDelegacion: this.domicillioForm.get('municipio')?.value,
      direccion: this.domicillioForm.get('descripcion')?.value,
      codigoPostal: this.domicillioForm.get('codigoPostal')?.value,
      registroSESAT: this.domicillioForm.get('registroSESAT')?.value,
      procesoProductivo: this.domicillioForm.get('procesoProductivo')?.value,
      acreditaInmueble: this.domicillioForm.get('goceDelInmueble')?.value,
      operacionesCExt: this.domicillioForm.get('comercioExterior')?.value,
      instalacionCtpat: '',
      instalacionPerfil: '',
      instalacionPerfilRFE: '',
      instalacionPerfilAuto: '',
      instalacionPerfilFerro: '',
      instalacionPerfilRf: '',
      instalacionPerfilMensajeria: '',
    };

    this.instalacionesPrincipales.emit(OBJETO_JSON);
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
