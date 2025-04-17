import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx'; // Importa XLSX para leer archivos Excel
import { Modal } from 'bootstrap';
import {
  AlertComponent,
  InputCheckComponent,
  InputRadioComponent,
  TituloComponent,
  VALID_FILE_REGEX,
} from '@libs/shared/data-access-user/src';
import { Tramite32201Query } from '../../estados/tramite32201.query';
import { Solicitud32201State, Tramite32201Store } from '../../estados/tramite32201.store';
import { SOLICITUD_32201_ENUM } from '../../constantes/anexo';

/**
 * Componente que representa la funcionalidad de la solicitud del trámite 32201.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    AlertComponent,
    InputCheckComponent
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /**
   * Formulario reactivo para datos.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32201State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = SOLICITUD_32201_ENUM;

  /**
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al modal de error.
   */
  @ViewChild('errorModal') errorModalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite32201Store - Store para manejar el estado del trámite.
   * @param tramite32201Query - Query para obtener datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite32201Store: Tramite32201Store,
    private tramite32201Query: Tramite32201Query
  ) {
    // Constructor no vacío para evitar el error de ESLint.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit(): void {
    this.tramite32201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Inicializa el formulario reactivo con los valores del estado.
    this.solicitudForm = this.fb.group({
      regimen_0: [this.solicitudState?.regimen_0],
      regimen_1: [this.solicitudState?.regimen_1],
      regimen_2: [this.solicitudState?.regimen_2],
      regimen_3: [this.solicitudState?.regimen_3],
      manifiesto: [this.solicitudState?.manifiesto],
    });
  }

  /**
   * Método para cargar un archivo de proveedores.
   * Valida que el archivo sea de formato Excel (.xls o .xlsx) y verifica el número de columnas.
   * Si el archivo es válido, muestra un modal de confirmación; de lo contrario, muestra un modal de error.
   */
  cargarProveedores(): void {
    const FILE_INPUT = document.getElementById(
      'cargarProveedores'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      if (VALID_FILE_REGEX.test(FILE.name)) {
        const READER = new FileReader();
        READER.onload = (e): void => {
          const DATA = new Uint8Array(e.target?.result as ArrayBuffer);
          const WORKBOOK = XLSX.read(DATA, { type: 'array' });
          const JSON_DATA = XLSX.utils.sheet_to_json(
            WORKBOOK.Sheets[WORKBOOK.SheetNames[0]],
            { header: 1 }
          );

          const EXPECTED_COLUMNS = 5;  // Agregue aquí el número requerido de columnas o lógica 
          const FIRST_ROW = JSON_DATA[0] as string[];
          if (FIRST_ROW.length === EXPECTED_COLUMNS) {
            if (this.confirmarModalElement) {
              const MODAL_INSTANCE = new Modal(
                this.confirmarModalElement.nativeElement
              );
              MODAL_INSTANCE.show();
            }
          } else {
            if (this.errorModalElement) {
              const MODAL_INSTANCE = new Modal(
                this.errorModalElement.nativeElement
              );
              MODAL_INSTANCE.show();
            }
          }
        };

        READER.readAsArrayBuffer(FILE);
      }
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite32201.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32201Store
  ): void {
    const FIELD_VALUE = form.get(campo)?.value;
    (this.tramite32201Store[metodoNombre] as (value: unknown) => void)(FIELD_VALUE);
  }
}
