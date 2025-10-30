import { CommonModule } from '@angular/common';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { TablaDinamicaComponent, TablePaginationComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import {ConsultaioQuery } from "@ng-mf/data-access-user";

import { CertificadoTecnicoJaponService } from '../../service/certificadotecnicojapon.service';

import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

import { Solicitud110218State, Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { CERTIFICADO_TABLA } from '../../models/certificado-tecnico-japon.enum';
import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';
import { MercanciasSeleccionadasFormComponent } from '../mercancias-seleccionadas-form/mercancias-seleccionadas-form.component';
import { Modal } from 'bootstrap';

/**
 * Componente para mostrar y manejar los datos del certificado técnico de Japón.
 *
 * Este componente permite a los usuarios:
 * - Visualizar los datos del certificado en una tabla dinámica.
 * - Seleccionar y modificar filas de la tabla.
 * - Navegar a otras secciones relacionadas con el trámite.
 * - Interactuar con formularios reactivos para capturar información relevante.
 *
 * El componente utiliza servicios y stores para mantener el estado sincronizado y
 * facilitar la comunicación con el backend.
 */
@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule, TituloComponent, 
    ReactiveFormsModule, TablaDinamicaComponent,
    MercanciasSeleccionadasFormComponent,
    TablePaginationComponent],
  templateUrl: './datos-certificado.component.html',
  styleUrl: './datos-certificado.component.scss',
})
export class DatosCertificadoComponent implements OnInit, OnDestroy {
  /**
   * Referencia al modal de alerta de selección de mercancía.
   * Permite mostrar u ocultar el modal cuando el usuario realiza acciones de selección.
   */
  @ViewChild('modalSeleccionMercancia') modalSeleccionMercanciaElemento!: ElementRef;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Si es verdadero, el usuario no puede editar los campos del formulario.
   * Si es falso, el usuario puede modificar los datos.
   */
  esSoloLectura!: boolean;
  /**
   * Formulario reactivo para los datos del certificado.
   * Incluye los campos 'lugar' y 'observaciones', ambos obligatorios.
   */
  datosDelCertificado!: FormGroup;

  /**
   * Estado seleccionado del trámite 110218.
   * Contiene los valores actuales almacenados en el estado global y se actualiza
   * mediante suscripción al store.
   */
  estadoSeleccionado!: Solicitud110218State;

  /**
   * Configuración para la tabla de datos del certificado.
   * Define las columnas y propiedades que se mostrarán en la tabla dinámica.
   */
  arregloConfiguracionTabla = CERTIFICADO_TABLA;

  /**
   * Tipo de selección de la tabla (radio).
   * Permite seleccionar una sola fila a la vez en la tabla.
   */
  radioDeMesa = TablaSeleccion.RADIO;

  /**
   * Datos para la tabla.
   * Contiene un arreglo de objetos de tipo `CompliMentaria` que representan los registros del certificado.
   */
  datos: CompliMentaria[] = [];

  /**
   * Fila seleccionada en la tabla.
   * Se actualiza cuando el usuario selecciona una fila para modificar o consultar.
   */
  filaSeleccionada!: CompliMentaria;

  /**
   * Catálogo para el tipo de factura.
   * Utilizado para poblar opciones en el formulario relacionadas con el tipo de factura.
   */
  tipodeFactura: Catalogo[] = [];

  /**
   * Catálogo para la unidad de medida de comercialización.
   * Utilizado para poblar opciones en el formulario relacionadas con la unidad de medida.
   */
  unidaddeMedidadeComercializacion: Catalogo[] = [];

  /**
   * Subject para la destrucción del componente.
   * Utilizado para manejar la limpieza de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Datos seleccionados previamente en la tabla, obtenidos desde el store.
   * Permite mantener la selección entre diferentes vistas o acciones.
   */
  tablaSeleccionadaDeLaTienda: CompliMentaria | null = null;

  /**
   * Índice utilizado para propósitos internos del componente.
   * Puede servir para navegación o lógica de presentación.
   */
  indice: number = 5;


  /**
   * Referencia al elemento del DOM identificado como 'mercanciasSeleccionadas'.
   * Utilizado para acceder y manipular directamente el elemento desde el componente.
   */
  @ViewChild('mercanciasSeleccionadas') mercanciasSeleccionadasElemento!: ElementRef;

  /**
   * Constructor del componente.
   *
   * @param formBuilder Constructor de formularios reactivos.
   * @param service Servicio para manejar operaciones relacionadas con certificados.
   * @param tramite110218Store Store para manejar el estado relacionado con el Trámite 110218.
   * @param tramite110218Query Query para recuperar datos relacionados con el Trámite 110218.
   * @param consultaQuery Query para consultar datos adicionales.
   */
  constructor(
    public formBuilder: FormBuilder,
    private service: CertificadoTecnicoJaponService,
    private tramite110218Store: Tramite110218Store,
    private tramite110218Query: Tramite110218Query,
    private consultaQuery: ConsultaioQuery,
  ) {}

  /**
   * Crea y configura el formulario para los datos del certificado.
   * Inicializa los controles 'lugar' y 'observaciones' con los valores actuales del estado.
   * Ambos campos son obligatorios.
   */
  inicializarFormulario(): void {
    this.datosDelCertificado = this.formBuilder.group({
      /**
       * El lugar donde se emite el certificado.
       * Este campo es obligatorio.
       */
      lugar: [this.estadoSeleccionado?.lugar, Validators.required],

      /**
       * Observaciones o comentarios relacionados con el certificado.
       * Este campo es obligatorio.
       */
      observaciones: [this.estadoSeleccionado?.observaciones, Validators.required],
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene los datos de la tabla, se suscribe a los cambios en el store
   * y configura el formulario.
   */
  ngOnInit(): void {

    this.obtenerDatosDeTabla();
    this.getValorStore();
    this.inicializarFormulario();
     this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((estadoConsulta) => {
        this.esSoloLectura = estadoConsulta.readonly;
        this.habilitarDeshabilitarFormulario();
      });
  }

  /**
   * Habilita o deshabilita el formulario según el modo de solo lectura.
   * Si `esSoloLectura` es verdadero, deshabilita el formulario para evitar ediciones.
   * Si es falso, habilita el formulario para permitir modificaciones.
   */
  habilitarDeshabilitarFormulario(): void {
    if (this.esSoloLectura) {
      this.datosDelCertificado.disable();
    } else {
      this.datosDelCertificado.enable();
    }
  }

  /**
   * Obtiene los datos de la tabla desde el servicio.
   * Actualiza la propiedad `datos` con los datos obtenidos.
   */
  obtenerDatosDeTabla(): void {
    this.service
      .getDatosCertificado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: { [key: string]: string | number | boolean }) => {
        this.datos = Array.isArray(data) ? (data as CompliMentaria[]) : [];
      });
  }

  /**
   * Maneja la selección de una fila en la tabla.
   * Actualiza la propiedad `filaSeleccionada` con la fila seleccionada.
   *
   * @param fila Fila seleccionada en la tabla.
   */
  manejarFilaSeleccionada(fila: CompliMentaria): void {
    this.filaSeleccionada = fila; // Actualiza la fila seleccionada
  }

  /**
   * Navega a la sección de mercancías seleccionadas del formulario.
   * Almacena los valores de la fila seleccionada en el store y emite un evento para modificar el certificado.
   */
  enModificarFormulario(): void {
    if (this.filaSeleccionada) {
      if (this.mercanciasSeleccionadasElemento) {
        const MODAL_INSTANCIA = new Modal(
          this.mercanciasSeleccionadasElemento?.nativeElement,
          { backdrop: false }
        );
        MODAL_INSTANCIA.show();
      }
    }
  }

  /**
   * Maneja el click en Modificar.
   * Muestra el modal de alerta si no hay selección de fila.
   */
  onModificarClick(): void {
    if (!this.filaSeleccionada) {
      const MODAL_ELEMENT = document.getElementById('modalSeleccionMercancia');
      if (MODAL_ELEMENT) {
        const MODAL_INSTANCE = new Modal(MODAL_ELEMENT);
        MODAL_INSTANCE.show();
      }
      return;
    }
    this.enModificarFormulario();
  }

  /**
   * Cierra el modal de selección de mercancía si existe una instancia activa.
   */
  cerrarSeleccionMercanciaModal(): void {
    const MODAL_ELEMENT = this.modalSeleccionMercanciaElemento?.nativeElement;
    if (MODAL_ELEMENT) {
      const MODAL_INSTANCE = Modal.getInstance(MODAL_ELEMENT);
      if (MODAL_INSTANCE) {
        MODAL_INSTANCE.hide();
      }
    }
  }
    /**
     * Cierra el modal asociado al elemento de registro de mercancía, si existe una instancia activa.
     * Utiliza la instancia del modal obtenida a través del elemento nativo y llama al método `hide()` para ocultarlo.
     */
  modalCancelar(): void {
  const ELEMENTO_MODAL = this.mercanciasSeleccionadasElemento;
  if (ELEMENTO_MODAL) {
    const MODAL_INSTANCIA = Modal.getInstance(ELEMENTO_MODAL.nativeElement);
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }
}

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite110218Store.setTramite110218State({
      [control]: VALOR,
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Suscribe al observable del estado y actualiza la propiedad `estadoSeleccionado`.
   */
  getValorStore(): void {
    this.tramite110218Query.selectTramite110218State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }
    /**
     * Maneja los datos modificados recibidos del formulario hijo y actualiza la tabla.
     * Mezcla los datos existentes de la fila seleccionada con los valores modificados.
     */
  onDatosModificados(valores: CompliMentaria): void {
    // Mezclar los datos existentes de la fila seleccionada con los valores modificados del formulario
    if (this.filaSeleccionada) {
      this.filaSeleccionada = {
        ...this.filaSeleccionada,
        ...valores
      };
      
    }
  }
}