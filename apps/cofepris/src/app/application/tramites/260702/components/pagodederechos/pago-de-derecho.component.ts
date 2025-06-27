
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


import { ReplaySubject, map, takeUntil } from 'rxjs';


import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputFecha,
  InputFechaComponent,
  REGEX_REEMPLAZAR,
  REGEX_SOLO_DIGITOS,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';

import {
  Solicitud260702State,
  Solicitud260702Store,
} from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

import { BANCO_DATA } from '../../constants/catalogs.enum';

/**
 * Componente para gestionar el pago de derechos en el trámite.
 */
@Component({
  selector: 'app-pago-de-derecho',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para gestionar los datos del pago de derechos */
  pagoDeDerechosForm!: FormGroup;

  /** Observable para manejar la destrucción del componente */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Estado del pago de derechos que se está gestionando */
  pagoDeDerechosState!: Solicitud260702State;

  /** Datos del catálogo de bancos disponibles */
  public bancoData = BANCO_DATA;
  /**
   * Configuración para el campo de selección de la fecha de pago.
   */
  fechaPago: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: false,
    habilitado: true,
  };
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param registrarsolicitudmcp Servicio para registrar solicitudes MCP.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param cdr ChangeDetectorRef para detectar cambios.
   * @param solicitud260702Store Almacén de estado para el trámite 260702.
   * @param solicitud260702Query Almacén de estado para el trámite 260702.
   * @param consultaioQuery Consulta de estado para el trámite 260702
   */
  constructor(
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private solicitud260702Store: Solicitud260702Store,
    private solicitud260702Query: Solicitud260702Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.solicitud260702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosState = seccionState;
        })
      )
      .subscribe();

    this.crearFormulario();
    this.getBancoData();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Obtiene los datos del catálogo de bancos.
   */
  getBancoData(): void {
    this.registrarsolicitudmcp
      .getBancoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.bancoData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Crea el formulario reactivo para gestionar los datos del pago de derechos.
   */
  crearFormulario(): void {
    this.pagoDeDerechosForm = this.fb.group({
      pagoDeDerechos: this.fb.group({
        clavedereferencia: [
          this.pagoDeDerechosState?.clavedereferencia,
          [Validators.required, Validators.pattern(REGEX_REEMPLAZAR)],
        ],
        cadenadeladependencia: [
          this.pagoDeDerechosState?.cadenadeladependencia,
         [Validators.pattern(REGEX_REEMPLAZAR)],
        ],
        banco: [this.pagoDeDerechosState?.banco],
        llavedepago: [
          this.pagoDeDerechosState?.llavedepago,
         [Validators.pattern(REGEX_REEMPLAZAR)],
        ],
        fechadepago: [
          this.pagoDeDerechosState?.fechadepago,
          Validators.required,
        ],
        importedepago: [
          this.pagoDeDerechosState?.importedepago,
          [Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
      }),
    });
  }
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260702Store.setFechadePago(evento);
  }

  /**
   * Limpia los datos del formulario.
   */
  clearForm(): void {
    this.pagoDeDerechosForm.reset();
  }

  /**
   * Getter para obtener el formulario de pago de derechos.
   */
  get pagoDeDerechos(): FormGroup {
    return this.pagoDeDerechosForm.get('pagoDeDerechos') as FormGroup;
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
    (this.solicitud260702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
