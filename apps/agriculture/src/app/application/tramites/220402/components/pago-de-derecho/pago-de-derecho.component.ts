import { Component, OnInit } from '@angular/core';
import { CapturaSolicitudeService } from '../../services/captura-solicitud.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediodetransporteService } from '../../services//medio-de-transporte.service';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
})
export class PagoDeDerechoComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
     * Estado de la transporte.
     */
  public derechoState!: Solicitud220402State;

  private destroyNotifier$: Subject<void> = new Subject();

  FormSolicitud!: FormGroup;

  respuesta: string = '';

  public mercanciaCatalogo!: CatalogosSelect;

  bancoSeleccionado!: Catalogo;

  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  constructor(
    private fb: FormBuilder,
    private captuaservice: CapturaSolicitudeService,
    private solicitud220402Store: Solicitud220402Store,
    private solicitud220402Query: Solicitud220402Query,
    private validacionesService: ValidacionesFormularioService,
    private mediodetransporteService: MediodetransporteService
  ) {
    this.fetchBancoData();
  }

  actualizarBanco(e: Catalogo): void {
    this.bancoSeleccionado = e;
  }

  fetchBancoData(): void {
    this.mediodetransporteService
      .getMedioDeTransporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }
  /**
   * Hook del ciclo de vida de Angular que se llama después de que la vista del componente se ha inicializado completamente.
   *
   * Este método realiza las siguientes acciones:
   * - Llama al método `getMercancia` para inicializar el objeto `mercancia`.
   * - Inicializa el grupo de formularios `FormSolicitud` con controles de formulario anidados y validadores.
   */

  ngOnInit(): void {
    this.getMercancia();

    this.solicitud220402Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();

    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: [this.derechoState?.exentoDePago, Validators.required],
        nombreImportExport: [this.derechoState?.nombreImportExport, Validators.required],
        justificacion: [this.derechoState?.justificacion, Validators.required],
        claveDeReferencia: [this.derechoState?.claveDeReferencia, Validators.required],
        cadenaDependencia: [this.derechoState?.cadenaDependencia, Validators.required],
        banco: [this.derechoState?.banco, Validators.required],
        llaveDePago: [this.derechoState?.llaveDePago, Validators.required],
        fechaPago: [this.derechoState?.fechaPago, Validators.required],
        importePago: [this.derechoState?.importePago, Validators.required],
      }),
    });
    // Activa la lógica cuando el formulario se ha inicializado

    this.actualizarCamposDeFormularioBasadosEnExentoDePago('No');

    // Escuchar los cambios en el campo 'exentoDePago'
    this.FormSolicitud.get(
      'datosImportadorExportador.exentoDePago'
    )?.valueChanges.subscribe((value) => {
      this.actualizarCamposDeFormularioBasadosEnExentoDePago(value);
    });
  }

  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   *
   * Si el valor es 'No', establece valores específicos en los campos del formulario y los desactiva.
   * De lo contrario, restablece y desactiva los campos del formulario.
   *
   * @param value - El valor de 'exentoDePago' para determinar las actualizaciones de los campos del formulario.
   */

  actualizarCamposDeFormularioBasadosEnExentoDePago(value: string): void {
    if (value === 'No') {
      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.setValue('454000554');
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.setValue(
        '594.0'
      );

      this.FormSolicitud.get(
        'datosImportadorExportador.justificacion'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.importePago'
      )?.disable();
    } else {
      this.FormSolicitud.get(
        'datosImportadorExportador.justificacion'
      )?.reset();
      this.FormSolicitud.get(
        'datosImportadorExportador.cadenaDependencia'
      )?.reset();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.reset();

      this.FormSolicitud.get(
        'datosImportadorExportador.claveDeReferencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.cadenaDependencia'
      )?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.importePago'
      )?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
      this.FormSolicitud.get(
        'datosImportadorExportador.llaveDePago'
      )?.disable();
    }
  }
  /**
   * Inicializa el objeto `mercancia` con propiedades y valores predefinidos.
   *
   * El objeto `mercancia` contiene las siguientes propiedades:
   * - `labelNombre`: Una cadena de texto que se establece en 'Mercancía', utilizada como etiqueta o título.
   * - `required`: Un valor booleano que se establece en `true`, indicando que este campo es obligatorio.
   * - `primerOpcion`: Una cadena de texto que se establece en 'Seleccione un valor', utilizada como opción predeterminada o de marcador de posición en un menú desplegable.
   * - `catalogos`: Un arreglo de objetos que representan las opciones en el catálogo. Cada objeto tiene:
   *   - `id`: Un identificador único para la opción.
   *   - `descripcion`: Una cadena de texto que describe la opción. Actualmente, ambas opciones tienen la misma descripción 'Opción 1'.
   */

  public getMercancia(): void {
    this.mercanciaCatalogo = {
      labelNombre: 'Mercancía',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        },
      ],
    };
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string) {
    return this.validacionesService.isValid(form, field);
  }

  /**
       * Establece los valores en el store de tramite5701.
       *
       * @param {FormGroup} form - El formulario del cual se obtiene el valor.
       * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
       * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
       * @returns {void}
       */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud220402Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud220402Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
* Obtiene el grupo de formulario 'datosImportadorExportador' del formulario principal 'FormSolicitud'.
*
* @returns {FormGroup} El grupo de formulario 'datosImportadorExportador'.
*/
  get datosImportadorExportador(): FormGroup {
    return this.FormSolicitud.get('datosImportadorExportador') as FormGroup;
  }

}
