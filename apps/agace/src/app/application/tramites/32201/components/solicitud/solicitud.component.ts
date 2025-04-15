import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AlertComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import preOperativo from 'libs/shared/theme/assets/json/32201/preOperativo.json';
import prejson from 'libs/shared/theme/assets/json/32201/prejson.json';
import { Tramite31601Query } from '../../estados/tramite31601.query';
import {
  Solicitud31601State,
  Tramite31601Store,
} from '../../estados/tramite31601.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud32201Enum } from '../../constantes/anexo';
import * as XLSX from 'xlsx'; // Import XLSX for reading Excel files
import { Modal } from 'bootstrap';

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
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {
  /**
   * Formulario reactivo para datos preoperativos.
   */
  solicitudForm!: FormGroup;

  /**
   * Opciones para los radio buttons, cargadas desde un archivo JSON.
   */
  radioOptions = preOperativo;

  /**
   * Almacena los datos de descripción en un formato predefinido.
   */
  descriptionData = prejson;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud31601State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = Solicitud32201Enum;

  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('errorModal') errorModalElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite31601Store - Store para manejar el estado del trámite.
   * @param tramite31601Query - Query para obtener datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite31601Store: Tramite31601Store,
    private tramite31601Query: Tramite31601Query
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a los métodos para obtener datos de establecimientos, empleados, domicilios e instalaciones.
   */
  ngOnInit() {
    this.tramite31601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.solicitudForm = this.fb.group({
      regimen_0: [this.solicitudState?.regimen_0],
      regimen_1: [this.solicitudState?.regimen_1],
      regimen_2: [this.solicitudState?.regimen_2],
      regimen_3: [this.solicitudState?.regimen_3],
      manifiesto: [this.solicitudState?.manifiesto],
    });
  }

  cargarProveedores(): void {
    const FILE_INPUT = document.getElementById(
      'cargarProveedores'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const VALID_FILE_REGEX = /\.(xls|xlsx)$/i;
      if (!VALID_FILE_REGEX.test(FILE.name)) {
        alert('Por favor, cargue un archivo en formato Excel (.xlsx o .xls).');
        return;
      }

      const READER = new FileReader();
      READER.onload = (e): void => {
        const DATA = new Uint8Array(e.target?.result as ArrayBuffer);
        const WORKBOOK = XLSX.read(DATA, { type: 'array' });
        const JSON_DATA = XLSX.utils.sheet_to_json(
          WORKBOOK.Sheets[WORKBOOK.SheetNames[0]],
          { header: 1 }
        );

        const EXPECTED_COLUMNS = 5;
        const FIRST_ROW = JSON_DATA[0] as string[];
        if (FIRST_ROW.length !== EXPECTED_COLUMNS) {
          console.log('El número de columnas del archivo es incorrecto.');
          if (this.errorModalElement) {
            const MODAL_INSTANCE = new Modal(
              this.errorModalElement.nativeElement
            );
            // this.cerrarModal();
            MODAL_INSTANCE.show();
          }
        }

        console.log('Los registros se realizaron correctamente', JSON_DATA);
        if (this.confirmarModalElement) {
          const MODAL_INSTANCE = new Modal(
            this.confirmarModalElement.nativeElement
          );
          // this.cerrarModal();
          MODAL_INSTANCE.show();
        }
        // alert('Los registros se realizaron correctamente.');
      };

      READER.readAsArrayBuffer(FILE);
    } else {
      alert('Por favor, seleccione un archivo para cargar.');
    }
  }

  /**
   * Cierra el modal actual.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31601Store
  ): void {
    const valor = form.get(campo)?.value;
    (this.tramite31601Store[metodoNombre] as (value: any) => void)(valor);
  }
}
