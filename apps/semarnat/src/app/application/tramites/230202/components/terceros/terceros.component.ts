import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { DESTINATARIO_TABLA_CONFIGURACION, DESTINATARIO_TABLE_ENTRY, DestinatarioConfiguracionItem } from '../../../230202/enum/destinatario-tabla.enum';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite230202Query } from '../../estados/tramite230202.query';
import { Modal } from 'bootstrap';

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
      InputRadioComponent
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
  
  @ViewChild('modalAgregarMercancias', { static: false }) modalRef!: ElementRef;

  solicitud = {
    nacionalidad: 'Nacionalidad:',
    tipoPersona: 'Tipo de persona:',
    denominacion: "Denominación o Razón Social",
    nombre: "Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    codigoPostal: "Código Postal",
    pais: "País",
    ciudad: "Ciudad",
    domicilio: "Domicilio"
  }


  tipoPersona1 = [
    {
      label: 'Fisica',
      value: 'fisica',
    },
    {
      label: 'Moral',
      value: 'moral',
    }
  ]
  destinatario1 = [
    {
      label: 'Nacional',
      value: 'nacional',
    },
    {
      label: 'Extranjero',
      value: 'extranjero',
    }
  ]
  destinatario = {
    nacional: 'Nacional',
    extranjero: 'Extranjero',
    denominacion: "Denominación o Razón Social",
    nombre: "Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    codigoPostal: "Código Postal",
    pais: "País",
    ciudad: "Ciudad",
    domicilio: "Domicilio"
  }

  onTipoPersonaChange(event: unknown) {
    this.agregarMercanciasForm.get('tipoPersona')?.setValue(event);
  }

  /**
   * Constructor del componente TercerosComponent.
   * Inicializa los servicios y dependencias necesarias para gestionar el estado
   * y los datos relacionados con terceros.
   */
  constructor(
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
    // this.manejarCambioEntidadFederativa();
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
        apellidoMaterno: ['', Validators.maxLength(200)],
        codigoPostal: ['', [Validators.required, Validators.maxLength(15)]],
        paisSinMexico: [''],
        pais: [''],
        descripcionPais: [''],
        ciudad: ['', [Validators.required, Validators.maxLength(120)]],
        domicilio: ['', Validators.required]
      })
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
    if(this.datosTabla.length === 0) {
      this.datosTabla.push(this.agregarMercanciasForm.value)
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