import { CatalogoSelectComponent, InputRadioComponent, REGEX_POSTAL, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { AvisoOpcionesDeRadio } from '../../models/aviso-catalogo.model';
import { CommonModule } from '@angular/common';
import { DatoSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { DatoSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { DatosResiduosPeligrososComponent } from '../datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { EstadoDatoSolicitud } from '../../models/datos-solicitud.model';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Modal } from 'bootstrap';
import { TEXTOS } from '../../constantes/aviso-retorno.enum';
import rawData from '@libs/shared/theme/assets/json/231002/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Componente que representa la sección de datos de la solicitud.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    TableComponent,
    InputRadioComponent,
    DatosResiduosPeligrososComponent
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss'
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /** Referencia al modal de agregar mercancías */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /** Formulario principal de solicitud */
  solicitudForm!: FormGroup;

  /** Formulario con los datos de la empresa recicladora */
  formularioEmpresaReciclaje!: FormGroup;

  /** Formulario con los datos del lugar de reciclaje */
  formularioLugarReciclaje!: FormGroup;

  /** Formulario con los datos de la empresa transportista */
  formularioEmpresaTransportista!: FormGroup;

  /** Formulario con las precauciones de manejo */
  formularioPrecaucionesManejo!: FormGroup;

  /** Opciones de radio generales */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /** Observable para destrucción de suscripciones */
  private destroyed$ = new Subject<void>();

  /** Opciones de radio para aviso */
  avisoOpcionesDeRadio: AvisoOpcionesDeRadio = {} as AvisoOpcionesDeRadio;

  /** Tipo de aviso actual */
  tipoAviso: string | number = 'por defecto';

  /** Texto estático de la vista */
  TEXTOS = TEXTOS;

  /** Datos del JSON usados en etiquetas */
  etiquetasForm = RADIO_OPCIONES;

  /**
   * Constructor que inyecta dependencias necesarias.
   */
  constructor(
    public fb: FormBuilder,
    private datoSolicitudStore: DatoSolicitudStore,
    private datoSolicitudQuery: DatoSolicitudQuery,
    public mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService
  ) {
    this.obtenerAvisoOpcionesDeRadio();
  }

  /**
   * Inicializa los formularios al cargar el componente.
   */
  ngOnInit(): void {
    this.inicializarSolicitudForm();
    this.inicializarFormularioEmpresaReciclaje();
    this.inicializarFormularioLugarReciclaje();
    this.inicializarFormularioEmpresaTransportista();
    this.inicializarFormularioPrecaucionesManejo();
    this.recuperarValoresDesdeStore();
  }

  /**
   * Inicializa el formulario principal de solicitud.
   */
  private inicializarSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      ideGenerica1: ['', Validators.required],
      numeroRegistroAmbiental: ['', Validators.required],
      descripcionGenerica1: ['', Validators.required],
      numeroProgramaImmex: ['', Validators.required],
      domicilio: ['', Validators.required]
    });
  }

  /**
   * Inicializa el formulario de empresa recicladora.
   */
  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = this.fb.group({
      requiereEmpresa: ['Si', Validators.required],
      nombreEmpresa: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Inicializa el formulario de lugar de reciclaje.
   */
  private inicializarFormularioLugarReciclaje(): void {
    this.formularioLugarReciclaje = this.fb.group({
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      destinoDomicilio: ['', Validators.required],
      codigoPostal: [
        '',
        [Validators.required, Validators.pattern(REGEX_POSTAL), Validators.maxLength(8)]
      ]
    });
  }

  /**
   * Inicializa el formulario de empresa transportista.
   */
  private inicializarFormularioEmpresaTransportista(): void {
    this.formularioEmpresaTransportista = this.fb.group({
      nombreEmpresaTransportistaResiduos: ['', Validators.required],
      numeroAutorizacionSemarnat: ['', Validators.required]
    });
  }

  /**
   * Inicializa el formulario de precauciones de manejo.
   */
  private inicializarFormularioPrecaucionesManejo(): void {
    this.formularioPrecaucionesManejo = this.fb.group({
      clave: ['', Validators.required],
      precaucionesManejo: ['', Validators.required]
    });
  }

  /**
   * Habilita o deshabilita campos dependiendo del valor seleccionado.
   * @param valor Valor de la opción seleccionada ("Si" o "No")
   */
  onRequiereEmpresaChange(valor: string): void {
    const DEBE_HABILITAR = valor === 'Si';
    const CAMPOS = ['nombreEmpresa', 'representanteLegal', 'telefono', 'correoElectronico'];

    CAMPOS.forEach(campo => {
      const CONTROL = this.formularioEmpresaReciclaje.get(campo);
      if (CONTROL) {
        if (DEBE_HABILITAR) {
          CONTROL.enable();
        } else {
          CONTROL.disable();
        }
      }
    });
  }

  /**
   * Recupera los valores almacenados en el store y los aplica a los formularios.
   */
  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.datoSolicitudQuery.getValue();

    this.solicitudForm.patchValue(ESTADO.solicitudForm, { emitEvent: false });
    this.formularioEmpresaReciclaje.patchValue(ESTADO.empresaReciclaje, { emitEvent: false });
    this.formularioLugarReciclaje.patchValue(ESTADO.lugarReciclaje, { emitEvent: false });
    this.formularioEmpresaTransportista.patchValue(ESTADO.empresaTransportista, { emitEvent: false });
    this.formularioPrecaucionesManejo.patchValue(ESTADO.precaucionesManejo, { emitEvent: false });
  }

  /**
   * Actualiza el campo del formulario principal en el store.
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoSolicitudForm(campo: keyof EstadoDatoSolicitud['solicitudForm']): void {
    const VALOR = this.solicitudForm.get(campo)?.value;
    this.datoSolicitudStore.actualizarSolicitudForm({
      ...this.solicitudForm.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza el campo del formulario de empresa recicladora en el store.
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaReciclaje(campo: keyof EstadoDatoSolicitud['empresaReciclaje']): void {
    const VALOR = this.formularioEmpresaReciclaje.get(campo)?.value;

    if (campo === 'requiereEmpresa') {
      this.onRequiereEmpresaChange(VALOR);
    }

    this.datoSolicitudStore.actualizarEmpresaReciclaje({
      ...this.formularioEmpresaReciclaje.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza el campo del formulario de empresa transportista en el store.
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaTransportista(campo: keyof EstadoDatoSolicitud['empresaTransportista']): void {
    const VALOR = this.formularioEmpresaTransportista.get(campo)?.value;
    this.datoSolicitudStore.actualizarEmpresaTransportista({
      ...this.formularioEmpresaTransportista.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Actualiza el campo del formulario de precauciones de manejo en el store.
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoPrecaucionesManejo(campo: keyof EstadoDatoSolicitud['precaucionesManejo']): void {
    const VALOR = this.formularioPrecaucionesManejo.get(campo)?.value;
    this.datoSolicitudStore.actualizarPrecaucionesManejo({
      ...this.formularioPrecaucionesManejo.getRawValue(),
      [campo]: VALOR
    });
  }

  /**
   * Muestra el modal de agregar operación de importación.
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Establece el tipo de aviso seleccionado.
   * @param evento Valor del aviso seleccionado
   */
  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
  }

  /**
   * Consulta opciones de aviso de radio desde el servicio.
   */
  obtenerAvisoOpcionesDeRadio(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoOpcionesDeRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoOpcionesDeRadio) => {
          this.avisoOpcionesDeRadio = respuesta;
        }
      });
  }

  /**
   * Finaliza todas las suscripciones activas al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
