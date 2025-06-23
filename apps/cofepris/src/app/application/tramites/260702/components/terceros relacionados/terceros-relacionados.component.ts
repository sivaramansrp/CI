import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';

import { TEXTOS, TIPO_PERSONA_RADIO_OPTIONS } from '../../constants/constantes.enum';

import { AlertComponent, Notificacion, NotificacionesComponent, Pedimento } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

import { Destinatario } from '../../models/destinatario.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, CatalogosSelect } from '@ng-mf/data-access-user';
import { ReplaySubject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

import {
  Solicitud260702State,
  Solicitud260702Store,
} from '../../estados/tramites260702.store';
import{ InputRadioComponent} from '@libs/shared/data-access-user/src';

import { DESTINATARIO_CONFIGURACION_TABLA } from '../../constants/column-config.enum';


/**
 * Componente para gestionar los terceros relacionados en el trámite.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TercerosRelacionadosComponent,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    NotificacionesComponent,
    InputRadioComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosrelacionadosComponent implements OnInit, OnDestroy {
  /** Constantes de texto utilizadas en el componente */
  TEXTOS = TEXTOS;

  /** Formulario reactivo para gestionar los datos del destinatario */
  destinatarioForm!: FormGroup;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Conjunto de filas seleccionadas en la tabla */
  selectedRows: Set<number> = new Set();

  /** Fila seleccionada actualmente */
  selectedRow = null;

  /** Estado del destinatario que se está agregando */
  agregarDestinatarioState!: Solicitud260702State;

  /** Configuración para la selección de filas en la tabla */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Lista de destinatarios seleccionados */
  selectedDestinatario: Destinatario[] = [];

  /** Indica si el formulario es visible */
  esFormularioVisible = false;

  /** Datos del catálogo de países */
  public paisData: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  
  /**
   * Variable para almacenar el tipo de persona seleccionada (por ejemplo, 'fisica' o 'moral').
   */
  tipoPersonaSeleccionada: string = '';


    /**
   * Variable para almacenar el tipo de público.
   */
    tipoDePublicos: string = '';
   /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
   tipoPersonaRadioOptions = TIPO_PERSONA_RADIO_OPTIONS;
/** 
 * Notificación actual que se mostrará en el componente.
 */
public nuevaNotificacion!: Notificacion;

/** 
 * Índice del elemento que se eliminará de la lista.
 */
elementoParaEliminar!: number;

/** 
 * Lista de pedimentos gestionados en el componente.
 */
pedimentos: Array<Pedimento> = [];
  /** Datos de la tabla de destinatarios */
  tableData: Destinatario[] = [];

   /** Configuración de las columnas de la tabla */
   destinatarioConfiguracionTabla = DESTINATARIO_CONFIGURACION_TABLA;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param registrarsolicitudmcp Servicio para registrar solicitudes MCP.
   * @param solicitud260702Store Almacén de estado para el trámite 260702.
   * @param solicitud260702Query Consulta de estado para el trámite 260702.
   */
  constructor(
    private fb: FormBuilder,
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
    private solicitud260702Store: Solicitud260702Store,
    private solicitud260702Query: Solicitud260702Query
  ) {
    this.crearFormTransporte();
  }

  /**
   * Crea el formulario reactivo para gestionar los datos del destinatario.
   */
  crearFormTransporte(): void {
    this.destinatarioForm = this.fb.group({
      agregarDestinatario: this.fb.group({
        tipoPersona: [
          this.agregarDestinatarioState?.tipoPersona,
          Validators.required,
        ],
      }),
      datosPersonales: this.fb.group({
        nombre: [this.agregarDestinatarioState?.nombre, Validators.required],
        primerApellido: [
          this.agregarDestinatarioState?.primerApellido,
          Validators.required,
        ],
        segundoApellido: [
          this.agregarDestinatarioState?.segundoApellido,
          Validators.required,
        ],
        denominacion: [
          this.agregarDestinatarioState?.denominacion,
          Validators.required,
        ],
        pais: [this.agregarDestinatarioState?.pais, Validators.required],
        domicilio: [
          this.agregarDestinatarioState?.domicilio,
          Validators.required,
        ],
        estado: [this.agregarDestinatarioState?.estado, Validators.required],
        codigopostal: [
          this.agregarDestinatarioState?.codigopostal,
          Validators.required,
        ],
        calle: [this.agregarDestinatarioState?.calle, Validators.required],
        numeroExterior: [
          this.agregarDestinatarioState?.numeroExterior,
          Validators.required,
        ],
        numeroInterior: [
          this.agregarDestinatarioState?.numeroInterior,
          Validators.required,
        ],
        lada: [this.agregarDestinatarioState?.lada],
        telefono: [this.agregarDestinatarioState?.telefono],
        correoElectronico: [this.agregarDestinatarioState?.correoElectronico],
      }),
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.solicitud260702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.agregarDestinatarioState = seccionState;
        })
      )
      .subscribe();
    this.crearFormTransporte();
    this.getPaisData();
  }
/**
 * Elimina un pedimento de la lista.
 * @param borrar Indica si se debe proceder con la eliminación.
 */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
      this.eliminarMercancias(); // Call the deletion logic
      this.abrirModal(0, true);

    }
  }
/**
 * Abre un modal para mostrar una notificación.
 * @param i Índice del elemento seleccionado (por defecto 0).
 * @param isDeleted Indica si se debe mostrar la notificación de éxito tras la eliminación.
 */
  abrirModal(i: number = 0, isDeleted: boolean = false): void {
    if (isDeleted) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'success',
        modo: 'action',
        titulo: '',
        mensaje: 'Datos eliminados correctamente',
        cerrar: false,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      
    } else if (this.selectedRows && this.selectedRows.size > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: '¿Confirma la eliminación?',
        cerrar: false,
        tiempoDeEspera: 0,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.elementoParaEliminar = i;
    }
  }
 
  /**
   * Obtiene los datos del catálogo de países.
   */
  getPaisData(): void {
    this.registrarsolicitudmcp
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.paisData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Getter para obtener el tipo de persona seleccionado.
   */
  get selectedTipoPersona():void {
    return this.agregarDestinatario.get('tipoPersona')?.value;
  }

  /**
   * Getter para obtener el formulario de agregar destinatario.
   */
  get agregarDestinatario(): FormGroup {
    return this.destinatarioForm.get('agregarDestinatario') as FormGroup;
  }

  /**
   * Guarda los datos del formulario en la tabla.
   */
  onGuardar():void {
    const FORM_DATA = this.destinatarioForm.value;
    if (FORM_DATA.agregarDestinatario) {
      const DESTINATARIO = {
        ...FORM_DATA.agregarDestinatario,
        ...FORM_DATA.datosPersonales, // Combina objetos anidados en una estructura plana
        pais: this.getPaisName(FORM_DATA.datosPersonales.pais), // Mapea el id de `pais` a su descripción
      };
      this.tableData.push(DESTINATARIO);
    }
    this.destinatarioForm.reset();
  }

  /**
   * Obtiene el nombre del país a partir de su ID.
   * @param paisId ID del país.
   * @returns Nombre del país o 'N/A' si no se encuentra.
   */
  private getPaisName(paisId: string): string {
    const PAISES = this.paisData.catalogos.find(
      (catalogo) => catalogo.id === Number(paisId)
    );
    return PAISES ? PAISES.descripcion : 'N/A';
  }

  /**
   * Maneja el cambio de filas seleccionadas en la tabla.
   * @param selectedRows Filas seleccionadas.
   */
  onSelectedRowsChange(selectedRows: Destinatario[]): void {
    this.selectedRows = new Set(selectedRows.map((row) => row.id));
    this.esFormularioVisible = false;
  }

  /**
   * Elimina las mercancías seleccionadas de la tabla.
   */
  eliminarMercancias(): void {
    if (this.selectedRows.size > 0) {
      this.tableData = this.tableData.filter(
        (row) => !this.selectedRows.has(row.id)
      );

      this.selectedRows.clear();
    }
  }

  /**
   * Abre el formulario para modificar las mercancías seleccionadas.
   */
  openModificarMercancias(): void {
    if (this.selectedRows.size === 1) {
      const SELECTED_ID = Array.from(this.selectedRows)[0];
      const SELECTED_ROW_DATA = this.tableData.find(
        (row) => row.id === SELECTED_ID
      );

      if (SELECTED_ROW_DATA) {
        this.destinatarioForm.patchValue({
          agregarDestinatario: {
            tipoPersona: SELECTED_ROW_DATA.tipoPersona,
          },
          datosPersonales: {
            nombre: SELECTED_ROW_DATA.nombre,
            primerApellido: SELECTED_ROW_DATA.primerApellido,
            segundoApellido: SELECTED_ROW_DATA.segundoApellido,
            denominacion: SELECTED_ROW_DATA.denominacion,
            pais: SELECTED_ROW_DATA.pais,
            domicilio: SELECTED_ROW_DATA.domicilio,
            estado: SELECTED_ROW_DATA.estado,
            codigopostal: SELECTED_ROW_DATA.codigopostal,
            calle: SELECTED_ROW_DATA.calle,
            numeroExterior: SELECTED_ROW_DATA.numeroExterior,
            numeroInterior: SELECTED_ROW_DATA.numeroInterior,
            lada: SELECTED_ROW_DATA.lada,
            telefono: SELECTED_ROW_DATA.telefono,
            correoElectronico: SELECTED_ROW_DATA.correoElectronico,
          },
        });

        this.esFormularioVisible = true;
      } else {
        console.error('Selected row data not found.');
      }
    } else {
      console.warn('Please select exactly one row to modify.');
    }
  }

  /**
   * Abre el formulario para agregar nuevas mercancías.
   */
  agregarMercancias(): void {
    this.esFormularioVisible = true;
    this.destinatarioForm.reset();
  }

  /**
   * Cancela la visualización del formulario.
   */
  cancelarFormulario(): void {
    this.esFormularioVisible = false;
  }

  /**
   * Confirma la eliminación de las mercancías seleccionadas.
   */
  onConfirmarEliminacion(): void {
    this.eliminarMercancias();
    const MODAL_ELEMENT = document.getElementById('datoseliminadosModal');
    if (MODAL_ELEMENT) {
      const DATOS_ELIMINADOS_MODAL = new Modal(MODAL_ELEMENT);
      DATOS_ELIMINADOS_MODAL.show();
    }
    this.abrirModal();
  }

  /**
   * Limpia los datos del formulario.
   */
  limpiarFormulario():void {
    this.destinatarioForm.reset();
    
  }

  /**
 * Maneja la acción de eliminación de las filas seleccionadas.
 * Si hay filas seleccionadas, abre un modal para confirmar la eliminación.
 */
  onDeleted(): void {
    if (this.selectedRows.size > 0) {
      this.abrirModal(); 
    }
  }

  /**
   * Establece valores en el store a partir del formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud260702Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Establece el tipo de persona seleccionado.
   * @param value Valor seleccionado (cadena o número).
   */
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
