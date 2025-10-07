import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FieldConfig } from '../../models/representate-legal-exportador.model';
import { REPRESENTATE_LEGAL_EXPORTADOR_CONFIG } from '../../constantes/representate-legal-exportador-config.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ValidarInicialmenteCertificadoService } from '../../../tramites/110221/services/validar-inicialmente-certificado.service';

/**
 * @descripcion
 * El componente `RepresentanteLegalExportadorComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el representante legal del exportador en el formulario.
 */
@Component({
  selector: 'app-representante-legal-exportador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    CatalogoSelectComponent,
    TituloComponent
  ],
  templateUrl: './representante-legal-exportador.component.html',
  styleUrl: './representante-legal-exportador.component.scss',
})

/**
 * @Component
 * @description
 * Componente para gestionar el formulario del representante legal del exportador,
 * incluyendo modo solo lectura, y guarda los valores ingresados en el store.
 */
export class RepresentanteLegalExportadorComponent
  implements OnDestroy, OnInit
{
  /**
   * @property procedimiento
   * @description Identificador del procedimiento actual.
   * Este valor es requerido y se utiliza para determinar la configuración del formulario.
   * @type {string}
   */
  @Input() procedimiento!: string;

  /**
   * @property form
   * @description FormGroup que contiene los controles del formulario.
   * Se inicializa en el método ngOnInit.
   * @type {FormGroup}
   */
  @Input()
  form!: FormGroup;

  /**
   * @property campos
   * @description Arreglo de configuraciones de campos para el formulario.
   * Se carga en el método ngOnInit basado en el procedimiento.
   * @type {FieldConfig[]}
   */
  campos: FieldConfig[] = [];

  /**
   * @property paisDestinoCatalog
   * @description Catálogo de países de destino para el campo correspondiente.
   * Se obtiene desde el servicio ValidarInicialmenteCertificadoService.
   * @type {Catalogo[]}
   */
  paisDestinoCatalog!: Catalogo[];

  /**
   * Datos del formulario para inicializar los valores
   * @type {Record<string, any>}
   */
  @Input() datosForm: Record<string, any> = {};

  /**
   * Evento que se emite cuando cambian los datos del formulario del destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDatosDelDestinatarioEvent: EventEmitter<{
    formGroupName: string;
    campo: string;
    valor: undefined;
    metodoNombre: string;
  }> = new EventEmitter<{
    formGroupName: string;
    campo: string;
    valor: undefined;
    metodoNombre: string;
  }>();

  /**
   * Subject para manejar la destrucción de suscripciones
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {ValidarInicialmenteCertificadoService} ValidarInicialmenteCertificadoService - Servicio para obtener datos relacionados con el certificado.
   */
  constructor(
    private fb: FormBuilder,
    private ValidarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService
  ) {}

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Configura el formulario y obtiene los catálogos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {
    this.campos =
      REPRESENTATE_LEGAL_EXPORTADOR_CONFIG[this.procedimiento] || [];

    this.form = this.fb.group({});
    this.crearFormulario();

    this.obtenerPaisDestinoCatalogo();
  }

  /**
   * @descripcion
   * Crea los controles del formulario basados en la configuración de campos.
   * Si el formulario ya existe, no hace nada.
   * @returns {void}
   */
  crearFormulario(): void {
    if (!this.form) {
      this.form = this.fb.group({});
    }

    this.campos.forEach((campo) => {
      if (!this.form.contains(campo.nombre)) {
        const valorInicial = this.datosForm?.[campo.nombre] ?? '';
        this.form.addControl(
          campo.nombre,
          this.fb.control(
            valorInicial,
            campo.required ? [Validators.required] : []
          )
        );
      }
    });
  }

  /**
   * @descripcion
   * Obtiene el catálogo de países de destino desde el servicio.
   * @returns {void}
   */
  obtenerPaisDestinoCatalogo(): void {
    this.ValidarInicialmenteCertificadoService.getPaisDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.paisDestinoCatalog = resp.data as Catalogo[];
        }
      });
  }

  /**
   * @descripcion
   * Maneja el cambio en el campo de país de destino.
   * Actualiza el estado del formulario en el store.
   * @returns {void}
   */
  cambioPaisDestino(): void {
    this.setValoresStore('form', 'paisDestino', 'setPaisDestino');
  }

  /**
   * @descripcion
   * Actualiza el estado del store con los datos del formulario.
   * Emite un evento con el campo y valor actualizado.
   * @param formGroupName - Nombre del grupo de formulario.
   * @param campo - Nombre del campo que ha cambiado.
   * @param metodoNombre - Nombre del método en el store para actualizar el valor.
   * @returns {void}
   */
  setValoresStore(
    formGroupName: string,
    campo: string,
    metodoNombre: string
  ): void {
    const VALOR = this.form.get(campo)?.getRawValue();
    this.formDatosDelDestinatarioEvent.emit({
      formGroupName,
      campo,
      valor: VALOR,
      metodoNombre,
    });
  }

  /**
   * @description
   * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}