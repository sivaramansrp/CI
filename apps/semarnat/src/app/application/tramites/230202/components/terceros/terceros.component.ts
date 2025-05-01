import { Catalogo, Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import {
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DESTINARIO_INFO, DESTINATARIO_TABLA_CONFIGURACION, DestinatarioConfiguracionItem, NACIONALIDAD_OPCIONES, TIPO_PERSONA_OPCIONES } from '../../../230202/enum/destinatario-tabla.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MetaInfo } from '../../models/datos-tramite.model';
import { Modal } from 'bootstrap';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { Tramite230202Query } from '../../estados/tramite230202.query';

/**
 * Componente que gestiona los datos relacionados con terceros en el trámite "230202".
 * Incluye la configuración de formularios, tablas dinámicas y la interacción con servicios
 * relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
  standalone: true,
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TituloComponent, 
      TablaDinamicaComponent,
      InputRadioComponent,
      CatalogoSelectComponent
    ],
})
export class TercerosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar la entidad federativa del destinatario.
   */
  formularioDestinatario!: FormGroup;

  agregarMercanciasForm!: FormGroup;

  /**
   * Estado actual de la solicitud "230202".
   * Este estado se actualiza al suscribirse al observable selectSolicitud$.
   */
  estadoSolicitud!: Solicitud230202State;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   */
  notificadorDestruccion$ = new Subject<void>();

  /**
   * Indica si el popup está abierto.
   */
  popupAbierto = false;

  /**
   * Indica si el popup está cerrado.
   */
  popupCerrado = true;

  /**
   * Configuración de las columnas de la tabla de terceros.
   * Define cómo se mostrarán los datos en la tabla.
   */
  configuracionColumnas: ConfiguracionColumna<DestinatarioConfiguracionItem>[] = DESTINATARIO_TABLA_CONFIGURACION;

  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos que se mostrarán en la tabla de terceros.
   * Inicialmente está vacío y se llena al cambiar la entidad federativa.
   */
  datosTabla: DestinatarioConfiguracionItem[] = [];

  /**
   * Indica si el botón de modificar está habilitado.
   */
  botonModificarHabilitado: boolean = false;
  
    /**
     * Datos de catálogo de países.
     * @property {Catalogo[]} paisesDatos
     */
    public paisesDatos: Catalogo[] = [];
  
    
  @ViewChild('modalAgregarMercancias', { static: false }) modalRef!: ElementRef;


  tipoPersona1 = TIPO_PERSONA_OPCIONES;
  nacionalidad = NACIONALIDAD_OPCIONES;
  
  metaInfo: MetaInfo = DESTINARIO_INFO;


  /**
   * Constructor del componente TercerosComponent.
   * Inicializa los servicios y dependencias necesarias para gestionar el estado
   * y los datos relacionados con terceros.
   */
  constructor(
    private phytosanitaryReexportacionService: PhytosanitaryReexportacionService,
    private tramite230202Store: Tramite230202Store,
    private tramite230202Query: Tramite230202Query,
    private formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí.
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa los catálogos de datos de terceros, se suscribe al estado de la solicitud
   * y crea el formulario del destinatario.
   */
  ngOnInit(): void {
    this.tramite230202Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud = state;
      });

    this.crearFormularioDestinatario();
    this.cargarDatos();
    // this.manejarCambioEntidadFederativa();
  }

    /**
   * Recupera varias listas de datos del servicio `materialesPeligrososService` y
   * las asigna a propiedades locales. Se desuscribe automáticamente en el hook de
   * destrucción usando `takeUntil(this.unsubscribe$)`.
   * @method cargarDatos
   * @returns {void}
   */
    cargarDatos(): void {
      
      this.phytosanitaryReexportacionService
      .getMetaInfo()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((req) => {
        this.metaInfo = req.datos;
      });
  
      this.phytosanitaryReexportacionService
        .getPais()
        .pipe(takeUntil(this.notificadorDestruccion$))
        .subscribe((req) => {
          this.paisesDatos = req.data;
        });

      // this.phytosanitaryReexportacionService
      //   .obtenerListaPaises()
      //   .pipe(takeUntil(this.notificadorDestruccion$))
      //   .subscribe((data) => {
      //     this.paisesDatos = data;
      //   });
  
      // this.materialesPeligrososService
      //   .obtenerListaEstados()
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe((data) => {
      //     this.estadosDatos = data;
      //   });
  
      // this.materialesPeligrososService
      //   .obtenerListaMunicipios()
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe((data) => {
      //     this.municipiosDatos = data;
      //   });
  
      // this.materialesPeligrososService
      //   .obtenerListaLocalidades()
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe((data) => {
      //     this.localidadesDatos = data;
      //   });
  
      // this.materialesPeligrososService
      //   .obtenerListaColonias()
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe((data) => {
      //     this.coloniasDatos = data;
      //   });
    }


  // personaMoral() {
  //   this.formularioDestinatario.get('nacionalidad')?.setValue(this.destinatario.nacional);
  //   this.formularioDestinatario.get('tipoPersona')?.setValue(this.tipoPersona.moral);
  // }

  // personaFisica() {
  //   this.formularioDestinatario.get('nacionalidad')?.setValue(this.destinatario.nacional);
  //   this.formularioDestinatario.get('tipoPersona')?.setValue(this.tipoPersona.fisica);
  // }

  /**
   * Crea el formulario reactivo para capturar la entidad federativa del destinatario.
   * Inicializa el valor del formulario con el estado actual de la solicitud.
   */
  crearFormularioDestinatario(): void {
    this.formularioDestinatario = this.formBuilder.group({

      // entidadFederativa: [
      //   this.estadoSolicitud.entidadFederativa,
      //   Validators.required,
      // ],
    });

    this.agregarMercanciasForm = this.formBuilder.group({
        nacionalidad: [{ value: 'nacional', disabled: true }, Validators.required],
        tipoPersona: ['', Validators.required],
        razonSocial: ['', Validators.maxLength(250)],
        nombre: ['', Validators.maxLength(200)],
        apellidoPaterno: ['', Validators.maxLength(200)],
        apellidoMaterno: ['', ],
        codigoPostal: ['', [Validators.required, Validators.maxLength(15)]],
        paisSinMexico: [''],
        pais: [''],
        descripcionPais: [''],
        ciudad: ['', [Validators.required, Validators.maxLength(120)]],
        domicilio: ['', Validators.required]
      })
  }

  
  onTipoPersonaChange(event: unknown) {
    const IS_FISICA = event === 'fisica';
    const NOMBRES = this.agregarMercanciasForm.get('nombre');
    const PRIMER_APELLIDO = this.agregarMercanciasForm.get('apellidoPaterno');
    const SEGUNDO_APELLIDO = this.agregarMercanciasForm.get('segundoApellido');
    const DENOMINACION_RAZON = this.agregarMercanciasForm.get('razonSocial');
    if (IS_FISICA) {
      NOMBRES?.setValidators([Validators.required,Validators.maxLength(200)]);
      PRIMER_APELLIDO?.setValidators([Validators.required,Validators.maxLength(200)]);
      SEGUNDO_APELLIDO?.setValidators([Validators.required,Validators.maxLength(200)]);
      DENOMINACION_RAZON?.clearValidators();
    } else {
      NOMBRES?.clearValidators();
      PRIMER_APELLIDO?.clearValidators();
      SEGUNDO_APELLIDO?.clearValidators();
      DENOMINACION_RAZON?.setValidators([Validators.required, Validators.maxLength(250)]);
    }

    NOMBRES?.updateValueAndValidity();
    PRIMER_APELLIDO?.updateValueAndValidity();
    SEGUNDO_APELLIDO?.updateValueAndValidity();
    DENOMINACION_RAZON?.updateValueAndValidity();
  }

  /**
   * Maneja los cambios en la entidad federativa seleccionada.
   * Actualiza el estado del almacén y agrega una entrada a la tabla de datos
   * si la entidad federativa es válida y la tabla está vacía.
   */
  manejarCambioEntidadFederativa(): void {
        // if (this.selectedRows && this.selectedRows.length > 0) {
          // this.agregarMercanciasForm.patchValue(this.selectedRows);
          if (this.modalRef) {
            const MODEL = new Modal(this.modalRef.nativeElement);
            MODEL.show();
          }
        // } else {
        //   if (this.modalConfirmacion) {
        //     const MODEL = new Modal(this.modalConfirmacion.nativeElement);
        //     MODEL.show();
        //   }
        // }

  }

  /**
   * Maneja la fila seleccionada en la tabla de terceros.
   * Habilita o deshabilita el botón de modificar según la selección.
   */
  manejarFilaSeleccionada(filaSeleccionada: DestinatarioConfiguracionItem[]): void {
    this.botonModificarHabilitado = filaSeleccionada.length > 0;
  }

  /**
   * Abre el popup si el botón de modificar está habilitado.
   */
  abrirPopup(): void {
    if (this.botonModificarHabilitado) {
      this.popupAbierto = true;
      this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    }
  }

  /**
   * Abre el popup si el botón de modificar está habilitado.
   */
  addPopup(): void {
    // if (this.botonModificarHabilitado) {
      this.popupAbierto = true;
      this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    // }
  }

  /**
   * Cierra el popup.
   */
  cerrarPopup(): void {
    this.popupAbierto = false;
    this.popupCerrado = false;
    this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    this.tramite230202Store.setTercerosPopupState(this.popupCerrado);
  }

  cancelar() {
   
    //this.agregarMercanciasForm.reset();
  }

  guardarDestinatario() {
    this.agregarMercanciasForm.markAllAsTouched();
    this.agregarMercanciasForm.updateValueAndValidity();

    if(this.agregarMercanciasForm.valid) {
      if(this.datosTabla.length === 0) {
        this.datosTabla.push(this.agregarMercanciasForm.value)
      }
    }
    
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}