import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { AlertComponent, Catalogo, CatalogosSelect, ConfiguracionColumna, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { DESTINATARIO_CONFIGURACION_TABLA } from '../../constants/column-config.enum';
import { TEXTOS, TIPO_PERSONA_RADIO_OPTIONS } from '../../constants/constantes.enum';
import { Destinatario } from '../../models/destinatario.model';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';

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
    InputRadioComponent,
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
  selectedRow: any = null;

  /** Estado del destinatario que se está agregando */
  agregarDestinatarioState!: Solicitud260915State;

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
    private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService,
    private solicitud260915Store: Solicitud260915Store,
    private solicitud260915Query: Solicitud260915Query
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
    this.solicitud260915Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState: any) => {
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
  getPaisData() {
    this.permisosanitariodisposivos
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.paisData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Getter para obtener el tipo de persona seleccionado.
   */
  get selectedTipoPersona() {
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
  onGuardar() {
    const formData = this.destinatarioForm.value;
    if (formData.agregarDestinatario) {
      const destinatario = {
        ...formData.agregarDestinatario,
        ...formData.datosPersonales, // Combina objetos anidados en una estructura plana
        pais: this.getPaisName(formData.datosPersonales.pais), // Mapea el id de `pais` a su descripción
      };
      this.tableData.push(destinatario);
    }
    this.destinatarioForm.reset();
  }

  /**
   * Obtiene el nombre del país a partir de su ID.
   * @param paisId ID del país.
   * @returns Nombre del país o 'N/A' si no se encuentra.
   */
  private getPaisName(paisId: string): string {
    const pais = this.paisData.catalogos.find(
      (catalogo) => catalogo.id === Number(paisId)
    );
    return pais ? pais.descripcion : 'N/A';
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
      const selectedId = Array.from(this.selectedRows)[0];
      const selectedRowData = this.tableData.find(
        (row) => row.id === selectedId
      );

      if (selectedRowData) {
        this.destinatarioForm.patchValue({
          agregarDestinatario: {
            tipoPersona: selectedRowData.tipoPersona,
          },
          datosPersonales: {
            nombre: selectedRowData.nombre,
            primerApellido: selectedRowData.primerApellido,
            segundoApellido: selectedRowData.segundoApellido,
            denominacion: selectedRowData.denominacion,
            pais: selectedRowData.pais,
            domicilio: selectedRowData.domicilio,
            estado: selectedRowData.estado,
            codigopostal: selectedRowData.codigopostal,
            calle: selectedRowData.calle,
            numeroExterior: selectedRowData.numeroExterior,
            numeroInterior: selectedRowData.numeroInterior,
            lada: selectedRowData.lada,
            telefono: selectedRowData.telefono,
            correoElectronico: selectedRowData.correoElectronico,
          },
        });

        this.esFormularioVisible = true;
      }
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
    const modalElement = document.getElementById('datoseliminadosModal');
    if (modalElement) {
      const datosEliminadosModal = new Modal(modalElement);
      datosEliminadosModal.show();
    }
    this.abrirModal();
  }

  /**
   * Limpia los datos del formulario.
   */
  limpiarFormulario() {
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
    metodoNombre: keyof Solicitud260915Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260915Store[metodoNombre] as (value: any) => void)(VALOR);
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
