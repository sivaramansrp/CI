import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  InputFecha,
  InputFechaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Solicitud32101State, Tramite32101Store } from '../../../../estados/tramites/tramite32101.store';
import { Tramite32101Query } from '../../../../estados/queries/tramite32101.query';
import { datosDeLaTabla, TramiteList } from '../../models/datos-tramite.model';
import { Router } from '@angular/router';

/**
 * Componente que gestiona la solicitud del trámite 31803.
 * Contiene la lógica para inicializar el formulario, manejar eventos y comunicarse con el estado global.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  providers: [ConsultaAvisoAcreditacionService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit {
  /**
   * Observable para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  registroForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32101State;

  /**
   * Sujeto utilizado como notificador para la destrucción del componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones o liberar recursos asociados.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de la tabla de selección.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos configurados para la tabla.
   */
  configuracionTablaDatos: datosDeLaTabla[] = [];

  tramiteList: {
    catalogos: TramiteList[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Lista de aduanas.
   */
  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  selectedRows: datosDeLaTabla[] = [];

  public encabezadoDeTabla: ConfiguracionColumna<datosDeLaTabla>[] = [
    {
      encabezado: 'Tipo de inversión',
      clave: (artículo) => artículo.tipoDeInversion,
      orden: 1,
    },
    {
      encabezado: 'Descripción general',
      clave: (artículo) => artículo.descripcionGeneral,
      orden: 2,
    },
    {
      encabezado: 'Valor en pesos',
      clave: (artículo) => artículo.valorEnPesos,
      orden: 3,
    },
    {
      encabezado: 'Forma Adquisicion',
      clave: (artículo) => artículo.formaAdquisicion,
      orden: 4,
    },
    {
      encabezado: 'Comprobante de pago',
      clave: (artículo) => artículo.comprobanteDePago,
      orden: 5,
    },
  ];

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   *
   * @param registroSolicitud Servicio para obtener datos relacionados con la solicitud.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén global para gestionar el estado del trámite.
   * @param query Consulta para obtener el estado actual del trámite.
   * @param validacionesService Servicio para validar campos del formulario.
   */
  constructor(
    private consultaAvisoAcreditacionService: ConsultaAvisoAcreditacionService,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    public tramite32101Store: Tramite32101Store,
    private tramite32101Query: Tramite32101Query,
    private router: Router,
  ) {
    this.tramiteList = {
      catalogos: [],
      labelNombre: 'Tipo de inversión',
      primerOpcion: 'Seleccione un valor',
    };
    this.aduana = {
      catalogos: [],
      labelNombre: 'Forma de adquisicion',
      primerOpcion: 'Selecciona el tipo de Trámite',
    };
  }

  ngOnInit(): void {
    this.tramite32101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.fetchListaDeDocumentos();
    this.fetchListaDeInversion();
  }

  inicializarFormulario(): void {
    this.registroForm = this.fb.group({
      tipoDeInversion: [
        this.solicitudState?.listaDeDocumentos,
        [Validators.required],
      ],
      valorEnPesos: [this.solicitudState?.valorEnPesos, [Validators.required]],
      descripcionGeneral: [
        this.solicitudState?.descripcionGeneral,
        [Validators.required],
      ],
      listaDeDocumentos: [this.solicitudState?.listaDeDocumentos],
    });
  }

  /**
   * Obtiene el grupo de formulario 'tipoDeInversion' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'tipoDeInversion'.
   */
  get tipoDeInversion(): FormGroup {
    return this.registroForm.get('tipoDeInversion') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get valorEnPesos(): FormGroup {
    return this.registroForm.get('valorEnPesos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get descripcionGeneral(): FormGroup {
    return this.registroForm.get('descripcionGeneral') as FormGroup;
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32101Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  fetchListaDeDocumentos() {
    this.consultaAvisoAcreditacionService
      .getListaDeDocumentos('listaDeInversion')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.tramiteList.catalogos = respuesta.data;
        console.log(this.tramiteList.catalogos);
      });
  }

  fetchListaDeInversion() {
    this.consultaAvisoAcreditacionService
      .getListaDeDocumentos('listaDeDocumentos')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.aduana.catalogos = respuesta.data;
        console.log(this.tramiteList.catalogos);
      });
  }

  poblarTabla(): void {
    const FORM_VALUES = this.registroForm.value;
    const newRow: datosDeLaTabla = {
      id: this.configuracionTablaDatos.length + 1,
      tipoDeInversion: this.getDropdownLabel(
        FORM_VALUES.tipoDeInversion,
        this.tramiteList.catalogos
      ),
      descripcionGeneral: FORM_VALUES.descripcionGeneral,
      formaAdquisicion: this.getDropdownLabel(
        FORM_VALUES.listaDeDocumentos,
        this.aduana.catalogos
      ),
      valorEnPesos: FORM_VALUES.valorEnPesos,
      comprobanteDePago: 'N/A',
    };
    this.configuracionTablaDatos.push(newRow);
    this.tramite32101Store.setDatosDelContenedor(this.configuracionTablaDatos);
    this.registroForm.reset();
    this.registroForm.markAsUntouched();
    this.registroForm.markAsPristine();
  }

  getDropdownLabel(selectedId: number, catalog: Catalogo[]): string {
    const selectedItem = catalog.find(
      (item) => item.descripcion === item.descripcion
    );
    return selectedItem ? selectedItem.descripcion : 'N/A';
  }

  onCheckboxClicked(row: datosDeLaTabla | null): void {
    if (row) {
      // Add the selected row to the selectedRows array if it's not already present
      if (!this.selectedRows.includes(row)) {
        this.selectedRows.push(row);
      }
      console.log('Checkbox checked, row data:', row);
    } else {
      // Remove the row from the selectedRows array if it is unchecked
      this.selectedRows = this.selectedRows.filter(
        (selectedRow) => selectedRow !== row
      );
      console.log('Checkbox unchecked');
    }
    console.log('Current selected rows:', this.selectedRows);
  }

  // modify selected row in other component
  modificarFilaSeleccionada(): void {
    console.log(this.selectedRows);
    if (this.selectedRows.length !== 1) {
      window.alert('Please select exactly one row to modify.');
      return;
    }

    // Get the selected row
    const selectedRow = this.selectedRows[0];

    // Send the selected row data to the shared service
    this.consultaAvisoAcreditacionService.setSelectedRow(selectedRow);


    setTimeout(() => {
      this.router.navigate(['/pago/consulta-aviso-acreditacion/actualizacion']);
    }, 100);

    console.log('Selected row sent to shared service:', selectedRow);
  }

  // Delete selected rows
  eliminarFilasSeleccionadas(): void {
    if (this.selectedRows.length === 0) {
      window.alert('No rows selected for deletion.');
      return;
    }

    // Filter out the selected rows from the table data
    this.configuracionTablaDatos = this.configuracionTablaDatos.filter(
      (row) => !this.selectedRows.includes(row)
    );

    // Update the store (if needed)
    this.tramite32101Store.setDatosDelContenedor(this.configuracionTablaDatos);

    // Clear the selected rows
    this.selectedRows = [];

    console.log('Updated Table Data:', this.configuracionTablaDatos);
  }

  formularioDeActualizacion() {
    const formData = this.registroForm.value;
    this.consultaAvisoAcreditacionService.setSelectedRow(formData);
    console.log('Data sent:', formData);
  }
}
