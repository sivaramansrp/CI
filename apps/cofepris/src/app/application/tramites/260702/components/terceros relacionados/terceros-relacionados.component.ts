import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { TEXTOS } from '../../constants/constantes.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { Destinatario } from '../../models/destinatario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.css',
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

  /** Datos de la tabla de destinatarios */
  tableData: Destinatario[] = [];

  /** Configuración de las columnas de la tabla */
  destinatarioConfiguracionTabla: ConfiguracionColumna<Destinatario>[] = [
    {
      encabezado: 'Nombre/denominación o razón social',
      clave: (fila) => fila?.nombre || 'N/A',
      orden: 1,
    },
    {
      encabezado: 'R.F.C.',
      clave: (fila) => fila?.rfc || '---',
      orden: 2,
    },
    {
      encabezado: 'CURP',
      clave: (fila) => fila?.curp || '---',
      orden: 3,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila?.telefono || 'N/A',
      orden: 4,
    },
    {
      encabezado: 'Correo electrónico',
      clave: (fila) => fila?.correoElectronico || 'N/A',
      orden: 5,
    },
    {
      encabezado: 'Calle',
      clave: (fila) => fila?.calle || 'N/A',
      orden: 6,
    },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila?.numeroExterior || 'N/A',
      orden: 7,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila?.numeroInterior || 'N/A',
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (fila) => fila?.pais || 'N/A',
      orden: 9,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila?.colonia || '---',
      orden: 10,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila?.municipio || '---',
      orden: 11,
    },
    {
      encabezado: 'Localidad',
      clave: (fila) => fila?.localidad || '---',
      orden: 12,
    },
    {
      encabezado: 'Estado',
      clave: (fila) => fila?.estado || '---',
      orden: 13,
    },
    {
      encabezado: 'Estado',
      clave: (fila) => fila?.estado2 || '---',
      orden: 14,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila?.codigopostal || 'N/A',
      orden: 15,
    },
  ];

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
        map((seccionState: any) => {
          this.agregarDestinatarioState = seccionState;
        })
      )
      .subscribe();

    this.crearFormTransporte();
    this.getPaisData();
  }

  /**
   * Obtiene los datos del catálogo de países.
   */
  getPaisData() {
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
    const modalElement = document.getElementById('datoseliminadosModal');
    if (modalElement) {
      const datosEliminadosModal = new Modal(modalElement);
      datosEliminadosModal.show();
    }
  }

  /**
   * Limpia los datos del formulario.
   */
  limpiarFormulario() {
    this.destinatarioForm.reset();
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
    (this.solicitud260702Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
