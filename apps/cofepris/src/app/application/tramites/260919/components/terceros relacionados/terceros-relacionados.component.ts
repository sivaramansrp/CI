import { AlertComponent, Catalogo, CatalogosSelect, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { DESTINATARIO_CONFIGURACION_TABLA } from '../../constants/column-config.enum';
import { FilaTablaData } from '../../models/fila-modal';
import { ImportarDeRemediosHerbalsService } from '../../services/importar-de-remedios-herbals.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { TERCEROS_NACIONALIDAD_RADIO_OPTIONS, TEXTOS, TIPO_PERSONA_RADIO_OPTIONS } from '../../constants/constantes.enum';
import { map, takeUntil } from 'rxjs/operators';
import { Solicitud260919State, Solicitud260919Store } from '../../estados/tramites260919.store';
import { Solicitud260919Query } from '../../estados/tramites260919.query';
/**
 * Componente para gestionar los terceros relacionados en el trámite.
 * Este componente permite obtener y mostrar datos relacionados con destinatarios,
 * fabricantes, proveedores y facturadores, utilizando servicios para realizar las solicitudes.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
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
/** 
 * Formulario reactivo para gestionar los datos del destinatario.
 */
  destinatarioForm!: FormGroup;
  
  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Configuración para la selección de filas en la tabla */
  destinatarioSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de las columnas de la tabla */
  destinatarioConfiguracionTabla = DESTINATARIO_CONFIGURACION_TABLA;

  /** Datos de los destinatarios */
  destinatarioDatos: FilaTablaData[] = [];

  /** Datos de los fabricantes */
  fabricanteDatos: FilaTablaData[] = [];

  /** Datos de los proveedores */
  proveedorDatos: FilaTablaData[] = [];

  /** Datos de los facturadores */
  facturadorDatos: FilaTablaData[] = [];

   /** Conjunto de filas seleccionadas en la tabla */
  selectedRows: Set<number> = new Set();

  /** Fila seleccionada actualmente */
  selectedRow: any = null;

  /**
     * Variable para almacenar el tipo de persona seleccionada (por ejemplo, 'fisica' o 'moral').
     */
    tipoPersonaSeleccionada: string = '';
  
  
      /**
     * Variable para almacenar el tipo de público.
     */
      tipoDePublicos: string = '';

      /**
     * Variable para almacenar el tipo de público.
     */
      tipoDePublicos1: string ='';
     /**
     * Opciones de radio para seleccionar el tipo de persona.
     */
     tipoPersonaRadioOptions = TIPO_PERSONA_RADIO_OPTIONS;
    /**
 * Opciones de radio para seleccionar la nacionalidad de los terceros.
 */
tercerosNacionalidadRadioOptions = TERCEROS_NACIONALIDAD_RADIO_OPTIONS;
  /** 
  /** Indica si el formulario está visible */
  esFormularioVisible = false;
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

/** Datos del catálogo de países */
  public paisData: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  /** Estado del destinatario que se está agregando */
    agregarDestinatarioState!: Solicitud260919State;

   /** 
 * Datos de la tabla que se mostrarán en el componente.
 */
tableData: FilaTablaData[] = [];

/** 
 * Identificador único para las filas de la tabla.
 */
private nextId = 1;
  /**
   * Constructor del componente.
   * @param importarDeRemediosHerbals - Servicio para obtener datos relacionados con terceros.
   */
  constructor(
    private importarDeRemediosHerbals: ImportarDeRemediosHerbalsService,
     private fb: FormBuilder,
        private solicitud260919Store: Solicitud260919Store,
        private solicitud260919Query: Solicitud260919Query
  ) {
    this.crearFormTransporte();

  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener los datos de destinatarios, fabricantes, proveedores y facturadores.
   */
  ngOnInit(): void {
     this.solicitud260919Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyed$),
            map((seccionState: any) => {
              this.agregarDestinatarioState = seccionState;
            })
          )
          .subscribe();
    this.getFabricanteData();
    this.getDestinatarioData();
    this.getFacturadorData();
    this.getProveedorData();
    this.getPaisData();
  }
/**
 * Crea el formulario reactivo para gestionar los datos del destinatario.
 * Incluye los campos necesarios con sus validaciones correspondientes.
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
        rfc: [{ value: this.agregarDestinatarioState?.rfc, disabled: true }], 
        curp: [{ value: this.agregarDestinatarioState?.curp, disabled: true }], 
      }),
    });
  }

  /**
   * Método para obtener los datos de los fabricantes.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los fabricantes.
   * Los datos obtenidos se asignan a la propiedad `fabricanteDatos`.
   */
  getFabricanteData(): void {
    this.importarDeRemediosHerbals
      .getFabricanteData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.fabricanteDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los destinatarios.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los destinatarios.
   * Los datos obtenidos se asignan a la propiedad `destinatarioDatos`.
   */
  getDestinatarioData(): void {
    this.importarDeRemediosHerbals
      .getDestinatarioData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.destinatarioDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los proveedores.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los proveedores.
   * Los datos obtenidos se asignan a la propiedad `proveedorDatos`.
   */
  getProveedorData(): void {
    this.importarDeRemediosHerbals
      .getProveedorData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.proveedorDatos = data as unknown as FilaTablaData[];
      });
  }

  /**
   * Método para obtener los datos de los facturadores.
   * Realiza una solicitud al servicio `ImportarDeRemediosHerbalsService` para obtener los datos de los facturadores.
   * Los datos obtenidos se asignan a la propiedad `facturadorDatos`.
   */
  getFacturadorData(): void {
    this.importarDeRemediosHerbals
      .getFacturadorData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.facturadorDatos = data as unknown as FilaTablaData[];
      });
  }
  /** Elimina un pedimento de la lista.*/
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
      this.eliminarMercancias(); 
      this.abrirModal(0, true);

    }
  }
  /**
 * Abre un modal para mostrar una notificación.
 * Si `isDeleted` es verdadero, muestra un mensaje de éxito indicando que los datos fueron eliminados.
 * Si hay filas seleccionadas, muestra un mensaje de confirmación para la eliminación.
 * 
 * @param i Índice del elemento a eliminar (por defecto 0).
 * @param isDeleted Indica si se debe mostrar el mensaje de éxito por eliminación.
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
   * Maneja el evento de cambio de filas seleccionadas en la tabla.
   * Actualiza el conjunto de filas seleccionadas y oculta el formulario si es visible.
   * 
   * @param selectedRows Filas seleccionadas en la tabla.
   */
onSelectedRowsChange(selectedRows: FilaTablaData[]): void {
    this.selectedRows = new Set(selectedRows.map((row) => row.id));
    this.esFormularioVisible = false;
  }

  /**
   * Maneja el evento de eliminación de filas seleccionadas.
   */
  onDeleted(): void {
    if (this.selectedRows.size > 0) {
      this.abrirModal(); 
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
     * Obtiene los datos del catálogo de países.
     */
    getPaisData(): void {
      this.importarDeRemediosHerbals
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
     * Getter para obtener el nacionalidad seleccionado.
     */
    get selectedNacionalidad() {
      return this.agregarDestinatario.get('nacionalidad')?.value;
    }
  /**
   * Establece el tipo de persona seleccionado.
   * @param value Valor seleccionado (cadena o número).
   */
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }
  /**
   * Establece la nacionalidad seleccionada.
   * @param value Valor seleccionado (cadena o número).
   */
  setNacionalidad(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
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
    onGuardar(): void {
      const formData = this.destinatarioForm.value;
    
      if (this.selectedRow) {
        const rowIndex = this.tableData.findIndex(row => row.id === this.selectedRow.id);
        if (rowIndex !== -1) {
          this.tableData[rowIndex] = {
            ...this.tableData[rowIndex],
            ...formData.agregarDestinatario,
            ...formData.datosPersonales,
            pais: this.getPaisName(formData.datosPersonales.pais), // Map the country ID to its description
          };
          }
    
        const fabricanteIndex = this.fabricanteDatos.findIndex(row => row.id === this.selectedRow.id);
    
        if (fabricanteIndex !== -1) {
          this.fabricanteDatos[fabricanteIndex] = {
            ...this.fabricanteDatos[fabricanteIndex],
            ...formData.agregarDestinatario,
            ...formData.datosPersonales,
            pais: this.getPaisName(formData.datosPersonales.pais), 
          };
    
        }
    
        this.selectedRow = null;
      } else {
        const newRow = {
          id: this.nextId++, 
          ...formData.agregarDestinatario,
          ...formData.datosPersonales,
          pais: this.getPaisName(formData.datosPersonales.pais), 
        };
    
        this.tableData.push(newRow);
        this.fabricanteDatos.push(newRow); 
      }
    
      this.destinatarioForm.reset();
      this.esFormularioVisible = false;
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
   * Elimina las mercancías seleccionadas de la tabla.
   */
eliminarMercancias(): void {
  if (this.selectedRows.size > 0) {
    this.tableData = this.tableData.filter(
      (row) => !this.selectedRows.has(row.id)
    );

    this.fabricanteDatos = this.fabricanteDatos.filter(
      (row) => !this.selectedRows.has(row.id)
    );

    this.selectedRows.clear();
  }
}
 /**
   * Limpia los datos del formulario.
   */
 limpiarFormulario(): void {
  this.destinatarioForm.reset();
  
}

/**
 * Cancela la visualización del formulario.
 */
cancelarFormulario(): void {
  this.esFormularioVisible = false;
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
    metodoNombre: keyof Solicitud260919Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud260919Store[metodoNombre] as (value: any) => void)(VALOR);
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Marca el observable `destroyed$` como completado para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}