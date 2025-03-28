import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogosSelect, TableComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';
import { Solicitud290201State, Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { TituloComponent } from '@libs/shared/data-access-user/src';
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
  isFormVisible = true;

  /**
   * Estado actual del trámite obtenido del store.
   */
  public destinatarioState!: Solicitud290201State;

  /**
   * Datos de la tabla, incluyendo encabezados y cuerpo.
   */
  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /**
   * Datos del catálogo de países.
   */
  public paisData: CatalogosSelect = {
    labelNombre: 'Pais',
    required: true,
    primerOpcion: 'Selecciona un medio de transporte',
    catalogos: [],
  };

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona: any;

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
        correoelectronica: [
          this.destinatarioState?.correoelectronica,
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
  isPaisDataLoaded = false;

  /**
   * Método para obtener los datos del catálogo de países.
   */
  getPaisData() {
    this.registrarsolicitud
      .getPaisData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.paisData.catalogos = data as Catalogo[];
        this.isPaisDataLoaded = true;
      });
  }

  /**
   * Método para manejar el envío del formulario.
   */
  onSubmit() {
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
    this.changeDetectorRef.markForCheck();

    this.destinatarioForm.reset();
    this.isFormVisible = false;
    this.selectedRow = null;
  }

  /**
   * Método para limpiar el formulario.
   */
  onLimpiar() {
    this.destinatarioForm.reset();
  }

  /**
   * Método para seleccionar una fila de la tabla.
   * @param item Fila seleccionada.
   * @param event Evento del checkbox.
   */
  onSelectRow(item: any, event: any) {
    if (event.target.checked) {
      this.selectedRow = item;
    } else {
      this.selectedRow = null;
    }
  }

  /**
   * Método para modificar los datos de una fila seleccionada.
   */
  onModify() {
    if (!this.isPaisDataLoaded) {
      console.warn('Los datos del catálogo de países aún no están cargados');
      return;
    }
    if (this.selectedRow) {
      const paisId = this.paisData.catalogos.find(
        (item: Catalogo) => item.descripcion === this.selectedRow.pais
      )?.id;

      this.destinatarioForm.patchValue({
        ...this.selectedRow,
        pais: paisId,
      });

      this.isFormVisible = true;
    }
  }

  /**
   * Método para eliminar una fila seleccionada.
   */
  onDelete() {
    if (this.selectedRow) {
      const index = this.newDestinatarioData.indexOf(this.selectedRow);
      if (index !== -1) {
        this.newDestinatarioData.splice(index, 1);
      }
      this.selectedRow = null;
    }
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
