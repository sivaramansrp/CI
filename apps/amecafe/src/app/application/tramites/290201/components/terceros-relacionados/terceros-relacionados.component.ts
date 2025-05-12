import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

import {
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
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
import { FilaData, FilaData2 } from '../../models/fila-model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
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
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
})
export class TercerosRelacionadosComponent implements OnInit {
  /**
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Notificador para limpiar suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario reactivo para capturar los datos del destinatario.
   */
  destinatarioForm!: FormGroup;

  /**
   * Fila seleccionada en la tabla.
   */
  selectedRow: any = null;

  /**
   * Bandera para mostrar u ocultar el formulario.
   */
  esFormularioVisible = true;

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
  tipoPersona: any;

  /**
   * Método para manejar el cambio de selección de tipo de persona.
   */
  selectedRows: Set<number> = new Set();

  /**
   * Método para manejar el cambio de selección de tipo de persona.
   */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Lista que almacena los datos de los destinatarios registrados.
   */
  newDestinatarioData: Array<any> = [];

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
    private solicitud290201Query: Solicitud290201Query
  ) {
    this.getPaisData();
  }

  /**
   * Configuración de la tabla para mostrar los datos de los destinatarios.
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaData2>[] = [
    {
      encabezado: 'Tipo persona',
      clave: (fila) => fila.datosDelTramiteRealizar.tipoPersona,
      orden: 1,
    },
    {
      encabezado: 'Denominación/razón social',
      clave: (fila) => fila.datosDelTramiteRealizar.denominacion,
      orden: 2,
    },
    {
      encabezado: 'Domicilio',
      clave: (fila) => fila.datosDelTramiteRealizar.domicilio,
      orden: 3,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila.datosDelTramiteRealizar.pais,
      orden: 4,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.datosDelTramiteRealizar.codigopostal,
      orden: 5,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila.datosDelTramiteRealizar.telefono,
      orden: 6,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila.datosDelTramiteRealizar.correoelectronico,
      orden: 7,
    },
  ];

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.solicitud290201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.destinatarioState = seccionState;
        })
      )
      .subscribe();

    this.createForm();
  }

  /**
   * Método para crear el formulario reactivo.
   */
  createForm() {
    this.destinatarioForm = this.fb.group({
      datosDelTramiteRealizar: this.fb.group({
        tipoPersona: [
          this.destinatarioState?.tipoPersona,
          [Validators.required],
        ],
        denominacion: [
          this.destinatarioState?.denominacion,
          [Validators.required],
        ],
        domicilio: [this.destinatarioState?.domicilio, [Validators.required]],
        pais: [this.destinatarioState?.pais, [Validators.required]],
        codigopostal: [
          this.destinatarioState?.codigopostal,
          [Validators.required],
        ],
        telefono: [this.destinatarioState?.telefono, [Validators.required]],
        correoelectronico: [
          this.destinatarioState?.correoelectronico,
          [Validators.required],
        ],
      }),
    });
  }

  /**
   * Getter para obtener el tipo de persona seleccionado.
   */
  get selectedTipoPersona() {
    return this.destinatarioForm.get('tipoPersona')?.value;
  }

  /**
   * Bandera para verificar si los datos del catálogo de países están cargados.
   */
  isPaisdatoscargados = false;

  /**
   * Método para obtener los datos del catálogo de países.
   */
  getPaisData() {
    this.registrarsolicitud
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisData.catalogos = data as Catalogo[];
        this.isPaisdatoscargados = true;
      });
  }

  /**
   * Método para manejar el envío del formulario.
   */
  enEnviar() {
    const formData = this.destinatarioForm.value;

    if (!formData || Object.keys(formData).length === 0) {
      console.error('Los datos del formulario son nulos o están vacíos');
      return;
    }

    const paisDataValue = this.paisData.catalogos.find(
      (item: Catalogo) =>
        String(item.id) === String(formData.datosDelTramiteRealizar.pais)
    )?.descripcion;

    formData.datosDelTramiteRealizar.pais = paisDataValue;

    if (this.selectedRow) {
      const index = this.newDestinatarioData.indexOf(this.selectedRow);
      if (index !== -1) {
        this.newDestinatarioData[index] = { ...formData };
      }
    } else {
      this.newDestinatarioData.push({ ...formData });
    }
    this.tableData = [...this.newDestinatarioData];
    this.changeDetectorRef.markForCheck();
    this.destinatarioForm.reset();
    this.esFormularioVisible = false;
    this.selectedRow = null;
  }

  /**
   * Método para limpiar el formulario.
   */
  onLimpiar() {
    this.destinatarioForm.reset();
    this.destinatarioForm.patchValue({
      datosDelTramiteRealizar: {
        pais: 'Selecciona un medio de transporte',
      },
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
  enModificar() {
    if (!this.isPaisdatoscargados) {
      console.warn('Los datos del catálogo de países aún no están cargados');
      return;
    }
    /**
     * Método para modificar los datos de una fila seleccionada.
     * @param item Fila seleccionada.
     * @param event Evento del checkbox.
     * @returns void
     */

    if (this.selectedRow) {
      const paisId = this.paisData.catalogos.find(
        (item: Catalogo) =>
          item.descripcion === this.selectedRow.datosDelTramiteRealizar.pais
      )?.id;
      this.destinatarioForm.patchValue({
        datosDelTramiteRealizar: {
          tipoPersona: this.selectedRow.datosDelTramiteRealizar.tipoPersona,
          denominacion: this.selectedRow.datosDelTramiteRealizar.denominacion,
          domicilio: this.selectedRow.datosDelTramiteRealizar.domicilio,
          pais: paisId || '', // Use the `paisId` or an empty string if not found
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
  onRowClick(rowData: any) {
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
    (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método para limpiar los observables al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
