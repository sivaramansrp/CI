import { ReplaySubject,map,takeUntil } from 'rxjs';

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilaData2 } from '../../models/fila-model';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  Catalogo,
  CatalogosSelect,
  ConsultaioQuery,
  ConsultaioState,
  InputRadioComponent,
  REGEX_CODIGO_POSTAL,
  REGEX_CORREO_ELECTRONICO,
  REGEX_TELEFONO,
  TablaSeleccion,
  TableComponent,
} from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';

import {
  Solicitud290201State,
  Solicitud290201Store,
} from '../../../../estados/tramites/tramites290201.store';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';

import { Modal } from 'bootstrap';

import { CONFIGURACION_COLUMNAS_SOLI_2 } from '../../constants/tabla-enum';
import { TIPO_PERSONA_RADIO_OPTIONS } from '../../constants/octova-tempora.enum';
/**
 * Componente: TercerosRelacionadosComponent
 * Descripción: Componente para gestionar los datos de terceros relacionados en el trámite 290201.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputRadioComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {
  /**
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Formulario reactivo para capturar los datos del destinatario.
   */
  destinatarioForm!: FormGroup;

  /**
   * Fila seleccionada en la tabla.
   */
  selectedRow: FilaData2 | null = null;

  /**
   * Bandera para mostrar u ocultar el formulario.
   */
  esFormularioVisible = false; 
  /**
   * Estado actual del trámite obtenido del store.
   */
  public destinatarioState!: Solicitud290201State;

  /**
   * Datos de la tabla, incluyendo encabezados y cuerpo.
   */
  tableData: FilaData2[] = [];
  /**
   * Datos del catálogo de países.
   */
  public paisData: CatalogosSelect = {
    labelNombre: 'País',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };
  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona: string | null = null; // Replace 'string | null' with the appropriate type if known

  /**
   * Método para manejar el cambio de selección de tipo de persona.
   */
  selectedRows: Set<number> = new Set();

  /**
   * Estado para verificar si los datos de respuesta están disponibles.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Método para manejar el cambio de selección de tipo de persona.
   */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Lista que almacena los datos de los destinatarios registrados.
   */
  newDestinatarioData: Array<FilaData2> = [];

  /**
   * Estado de consulta de datos.
   */
   consultaDatos!: ConsultaioState;
    
      /**
       * @property {boolean} soloLectura
       * @description Indica si el formulario o los campos están en modo de solo lectura.
       * @default false
       */
      esFormularioSoloLectura: boolean = false;

  /**
   * Opciones de radio para seleccionar el tipo de persona.
   */
  tipoPersonaRadioOptions = TIPO_PERSONA_RADIO_OPTIONS;

  /**
 * @property {string} tipoPersonaSeleccionada
 * @description Almacena el tipo de persona seleccionado en el formulario.
 * Este valor se utiliza para determinar la lógica de visualización y validación.
 * @default ''
 */
tipoPersonaSeleccionada: string = '';
  /**
   * Variable para almacenar el tipo de público.
   */
  tipoDePublicos: string = '';
      
  /**
 * @propiedad {CatalogosSelect} entidadFederativaData
 * @descripción
 * Datos del catálogo para la selección de la entidad federativa.
 * Incluye el nombre de la etiqueta, si es requerido, la primera opción por defecto y los datos del catálogo.
 */
public entidadFederativaData: CatalogosSelect = {
  labelNombre: 'Entidad federativa',
  required: true,
  primerOpcion: 'Seleccione una opción',
  catalogos: [],
};

/**
* @propiedad {CatalogosSelect} alcaldiaMunicipoData
* @descripción
* Datos del catálogo para la selección de la alcaldía o municipio.
* Incluye el nombre de la etiqueta, si es requerido, la primera opción por defecto y los datos del catálogo.
*/
public alcaldiaMunicipoData: CatalogosSelect = {
  labelNombre: 'Alcaldía o Municipio',
  required: true,
  primerOpcion: 'Seleccione una opción',
  catalogos: [],
};

/**
* @propiedad {CatalogosSelect} coloniaData
* @descripción
* Datos del catálogo para la selección de la colonia.
* Incluye el nombre de la etiqueta, si es requerido, la primera opción por defecto y los datos del catálogo.
*/
public coloniaData: CatalogosSelect = {
  labelNombre: 'Colonia',
  required: true,
  primerOpcion: 'Seleccione una opción',
  catalogos: [],
};

 /**
   * Bandera para verificar si los datos del catálogo de países están cargados.
   */
 isPaisdatoscargados = false;

  /**
   * Constructor del componente.
   * @param registrarsolicitud Servicio para registrar solicitudes.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param changeDetectorRef ChangeDetectorRef para detectar cambios manualmente.
   * @param solicitud290201Store Store para gestionar el estado global del trámite.
   * @param solicitud290201Query Query para obtener datos del estado global.
   */
  constructor(
    private registrarsolicitud: RegistrarSolicitudService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private solicitud290201Store: Solicitud290201Store,
    private solicitud290201Query: Solicitud290201Query,
    private consultaioQuery: ConsultaioQuery,
    
  ) {
    this.getPaisData();

  }

  /**
   * Configuración de la tabla para mostrar los datos de los destinatarios.
   */
  configuracionColumnasoli = CONFIGURACION_COLUMNAS_SOLI_2;


  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.solicitud290201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.destinatarioState = seccionState;
        })
      )
      .subscribe();
     
      this.getDestinatarioData();
    this.createForm();
    this.getEntidadFederativaData();
    this.getAlcaldiaMunicipo();
    this.getColonia();

    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaDatos = seccionState;
        this.esFormularioSoloLectura = this.consultaDatos.readonly;
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe();
    this.inicializarEstadoFormulario();
  }
 
  /**
   * Método para crear el formulario reactivo.
   */
  createForm(): void {
    this.destinatarioForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        tipoPersona: [ this.destinatarioState?.tipoPersona,[Validators.required]],
        denominacion: [ this.destinatarioState?.denominacion, [Validators.required]],
        nombre: [ this.destinatarioState?.denominacion, [Validators.required]],
        primerApellido: [this.destinatarioState?.denominacion,[Validators.required]],
           
       segundoApellido: [ this.destinatarioState?.denominacion,[Validators.required] ],

       calle: [ this.destinatarioState?.denominacion,[Validators.required]],
       numeroExterior: [this.destinatarioState?.denominacion,[Validators.required]],
      numeroInterior: [this.destinatarioState?.denominacion, [Validators.required]],
        domicilio: [this.destinatarioState?.domicilio, [Validators.required]],
        pais: [this.destinatarioState?.pais, [Validators.required]],
        entidadFederativa: [this.destinatarioState?.entidadFederativa, Validators.required],
        alcaldiaMunicipo: [this.destinatarioState?.alcaldiaMunicipo, Validators.required],
        colonia: [this.destinatarioState?.colonia, Validators.required],
        codigopostal: [
          this.destinatarioState?.codigopostal,
          [Validators.required, Validators.maxLength(5), Validators.pattern(REGEX_CODIGO_POSTAL)]],
        telefono: [this.destinatarioState?.telefono, [Validators.required, Validators.pattern(REGEX_TELEFONO)]],
        correoelectronico: [
          this.destinatarioState?.correoelectronico,
          [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)]],
        
      }),
    });
   

  }
/**
   * Getter para obtener el tipo de persona seleccionado.
   */
get selectedTipoPersona(): string | undefined {
  return this.destinatarioForm.get('tipoPersona')?.value;
}

  /**
   * Establece el tipo de persona seleccionado.
   * @param value Valor seleccionado (cadena o número).
   */
  setTipoPersona(value: string | number): void {
    this.tipoPersonaSeleccionada = value.toString();
  }
  /**
 * @method getEntidadFederativaData
 * @descripcion
 * Este método obtiene los datos del catálogo de entidades federativas desde el servicio `AvisoDeMercanciaService`.
 * Utiliza el operador `takeUntil` para gestionar la destrucción de la suscripción y evitar fugas de memoria.
 * Los datos obtenidos se asignan a la propiedad `catalogos` del objeto `entidadFederativaData`.
 * @returns {void}
 */
  getEntidadFederativaData(): void {
    this.registrarsolicitud
      .getEntidadFederativaData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.entidadFederativaData.catalogos = data as Catalogo[];
      });
  }

  /**
 * @method getAlcaldiaMunicipo
 * @descripcion
 * Este método obtiene los datos del catálogo de alcaldías o municipios desde el servicio `AvisoDeMercanciaService`.
 * Utiliza el operador `takeUntil` para gestionar la destrucción de la suscripción y evitar fugas de memoria.
 * Los datos obtenidos se asignan a la propiedad `catalogos` del objeto `alcaldiaMunicipoData`.
 * @returns {void}
 */
  getAlcaldiaMunicipo(): void {
    this.registrarsolicitud
      .getAlcaldiaMunicipo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.alcaldiaMunicipoData.catalogos = data as Catalogo[];
      });
  }

  /**
 * @method getColonia
 * @descripcion
 * Este método obtiene los datos del catálogo de colonias desde el servicio `AvisoDeMercanciaService`.
 * Utiliza el operador `takeUntil` para gestionar la destrucción de la suscripción y evitar fugas de memoria.
 * Los datos obtenidos se asignan a la propiedad `catalogos` del objeto `coloniaData`.
 * @returns {void}
 */
  getColonia(): void {
    this.registrarsolicitud
      .getColonia()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.coloniaData.catalogos = data as Catalogo[];
      });
  }
  
 

  /**
   * Método para obtener los datos del catálogo de países.
   */
  getPaisData(): void {
    this.registrarsolicitud
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisData.catalogos = data as Catalogo[];
        this.isPaisdatoscargados = true;
      });
  }
  /**
   * Método para obtener los datos del destinatario.
   * Utiliza el servicio `registrarsolicitud` para obtener los datos y los asigna a `tableData`.
   */
  getDestinatarioData(): void {
    this.registrarsolicitud
      .getDestinatarioData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tableData = data as unknown as FilaData2[];
      });
  }

  /**
   * Método para manejar el envío del formulario.
   */
  enEnviar(): void {
    const FORM_DATA = this.destinatarioForm.value;
  
    if (!FORM_DATA || Object.keys(FORM_DATA).length === 0) {
      console.error('Form data is empty');
      return;
    }
  
    const PAIS_DATA_VALUE = this.paisData.catalogos.find(
      (item: Catalogo) =>
        String(item.id) === String(FORM_DATA.datosDelTramiteRealizar.pais)
    )?.descripcion;
  
    FORM_DATA.datosDelTramiteRealizar.pais = PAIS_DATA_VALUE;
  
    if (this.selectedRow) {
      const INDEX = this.tableData.indexOf(this.selectedRow);
      if (INDEX !== -1) {
        this.tableData[INDEX] = { ...FORM_DATA }; 
      }
    } else {
      this.tableData.push({ ...FORM_DATA }); 
    }
  
    this.tableData = [...this.tableData]; 
    this.changeDetectorRef.markForCheck(); 
    this.destinatarioForm.reset(); 
    this.esFormularioVisible = false; 
    this.selectedRow = null; 
  }
  /**
   * Método para limpiar el formulario.
   */
 /**
 * Método para limpiar el formulario.
 */
onLimpiar(): void {
  this.destinatarioForm.reset();
  this.destinatarioForm.patchValue({
    datosDelTramiteRealizar: {
      pais: 'Selecciona un medio de transporte',
    },
  });

  /**
 * Recorre todos los controles del formulario `destinatarioForm` y marca cada uno como "tocado".
 * Si el control es un `FormGroup`, también recorre sus controles secundarios y los marca como "tocados".
 * Esto asegura que todos los campos del formulario muestren mensajes de validación si no son válidos.
 */
  Object.keys(this.destinatarioForm.controls).forEach((key) => {
    const CONTROL = this.destinatarioForm.get(key);
    if (CONTROL instanceof FormGroup) {
      Object.keys(CONTROL.controls).forEach((subKey) => {
        CONTROL.get(subKey)?.markAsTouched();
      });
    } else {
      CONTROL?.markAsTouched();
    }
  });
}
  /**
   * Método para seleccionar una fila de la tabla.
   * @param item Fila seleccionada.
   * @param event Evento del checkbox.
   */

  onSelectedRowsChange(selectedRows: FilaData2[]): void {
    this.selectedRows = new Set(selectedRows.map((row) => row.id)); // Update selected rows
    this.esFormularioVisible = false;
  }

  /**
   * Método para modificar los datos de una fila seleccionada.
   */
  enModificar(): void {
       const MODAL_ELEMENT = document.getElementById('destinatarioModalLabel');
       if (MODAL_ELEMENT) {
         const MODAL_INSTANCE = new Modal(MODAL_ELEMENT); 
         MODAL_INSTANCE.show();
       }
       
    if (!this.isPaisdatoscargados) {
      console.warn('Los datos del catálogo de países aún no están cargados');
      return;
    }
    if (this.selectedRow) {
      const PAIS_ID = this.paisData.catalogos.find(
        (item: Catalogo) =>
          item.descripcion === this.selectedRow?.datosDelTramiteRealizar?.pais
      )?.id;
      this.destinatarioForm.patchValue({
        datosDelTramiteRealizar: {
          tipoPersona: this.selectedRow.datosDelTramiteRealizar.tipoPersona,
          denominacion: this.selectedRow.datosDelTramiteRealizar.denominacion,
          domicilio: this.selectedRow.datosDelTramiteRealizar.domicilio,
          pais: PAIS_ID || '', 
          codigopostal: this.selectedRow.datosDelTramiteRealizar.codigopostal,
          telefono: this.selectedRow.datosDelTramiteRealizar.telefono,
          correoelectronico:
            this.selectedRow.datosDelTramiteRealizar.correoelectronico,
        },
      });

      this.esFormularioVisible = true;
    }
  }

  /**
   * Método para eliminar una fila seleccionada.
   */
  onDeleteSelectedRows(): void {
    if (this.selectedRows && this.selectedRows.size > 0) {
      this.tableData = this.tableData.filter(
        (row: { id: number }) => !this.selectedRows.has(row.id)
      );
      this.selectedRows.clear();
      this.destinatarioForm.reset();
      this.esFormularioVisible = false;
    }
  }
  /**
   * Método para manejar el clic en una fila de la tabla.
   * @param rowData Fila seleccionada.
   */
  onRowClick(rowData: FilaData2): void {
    this.destinatarioForm.patchValue({
      datosDelTramiteRealizar: {
        tipoPersona: rowData.datosDelTramiteRealizar.tipoPersona,
        denominacion: rowData.datosDelTramiteRealizar.denominacion,
        domicilio: rowData.datosDelTramiteRealizar.domicilio,
        pais:
          this.paisData.catalogos.find(
            (item: Catalogo) =>
              item.descripcion === rowData.datosDelTramiteRealizar.pais
          )?.id || '',
        codigopostal: rowData.datosDelTramiteRealizar.codigopostal,
        telefono: rowData.datosDelTramiteRealizar.telefono,
        correoelectronico: rowData.datosDelTramiteRealizar.correoelectronico,
      },
    });
    this.selectedRow = rowData;
    this.esFormularioVisible = true;
  }

  /**
   * Getter para obtener el grupo de datos del trámite a realizar.
   */
  get datosDelTramiteRealizar(): FormGroup {
    return this.destinatarioForm.get('datosDelTramiteRealizar') as FormGroup;
  }

  /**
   * Método para inicializar el estado del formulario según si es de solo lectura o no.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.destinatarioForm?.disable();
    }
    else {
      this.destinatarioForm?.enable();
    }
}

  /**
   * Método para establecer valores en el store.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario.
   * @param metodoNombre Método del store a invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud290201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud290201Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método para limpiar los observables al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
