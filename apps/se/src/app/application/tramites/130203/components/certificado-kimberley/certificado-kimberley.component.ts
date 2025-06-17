import {
  Catalogo,
  ConsultaioQuery,
  REG_X,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import {
  Tramite130203State,
  Tramite130203Store,
} from '../../estados/tramites/tramites130203.store';
import { CatalogoSelectComponent, } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ExportacionDeDiamantesEnBrutoService } from '../../services/exportacion-de-diamantes-en-bruto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite130203Query } from '../../estados/queries/tramite130203.query';

/**
 * @description
 * Componente para gestionar el formulario del Certificado Kimberley.
 * Este componente es standalone y utiliza Reactive Forms para la gestión de formularios.
 */
@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.scss',
})
export class CertificadoKimberleyComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario principal para la empresa.
   */
  public formularioEmpresa!: FormGroup;

  /**
   * @description
   * Estado actual del trámite.
   */
  public solicitudState!: Tramite130203State;

  /**
   * @description
   * Lista de países emisores.
   */
  public paisesEmisores: Catalogo[] = [];

  /**
   * @description
   * Lista de nombres en inglés.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public nombresIngles: any[] = [];

  /**
   * @description
   * Formulario para los datos del exportador.
   */
  datosDelExportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos del importador.
   */
  datosDelImportador!: FormGroup;

  /**
   * @description
   * Formulario para los datos de la remesa.
   */
  datosDeLaRemesa!: FormGroup;

  /**
   * @description
   * Formulario para los datos de los diamantes.
   */
  datosDeLosDiamantes!: FormGroup;

  /**
   * @description
   * Observable para manejar la destrucción del componente.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Identificador del país emisor seleccionado.
   * Puede ser un número o `null` si no se ha seleccionado ninguno.
   */
  paisId: number | null = null;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Estado interno de la sección actual del trámite 130110.
   * Utilizado para gestionar y almacenar la información relacionada con esta sección.
   * Propiedad privada.
   */
  private seccionState!: Tramite130203State;
 
  /**
   * @description
   * Constructor del componente.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param tramite130203Store Store para gestionar el estado del trámite.
   * @param tramite130203Query Query para obtener datos del estado del trámite.
   * @param exportacionDeDiamantesEnBrutoService Servicio para obtener datos relacionados con la exportación.
   * @param consultaioQuery Query para obtener datos de consulta.
   */
  constructor(
    private fb: FormBuilder,
    private tramite130203Store: Tramite130203Store,
    private tramite130203Query: Tramite130203Query,
    private exportacionDeDiamantesEnBrutoService: ExportacionDeDiamantesEnBrutoService,
    private consultaioQuery: ConsultaioQuery
  ) {
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
   * @description
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadData();
    this.subscribeToState();
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
   * @method
   * @name guardarDatosFormulario
   * @description
   * Inicializa los formularios y obtiene los datos de la tabla.
   * Dependiendo del modo de solo lectura (`esFormularioSoloLectura`),
   * deshabilita o habilita todos los formularios del componente.
   * Si el formulario está en modo solo lectura, todos los formularios se deshabilitan para evitar modificaciones.
   * Si no está en modo solo lectura, todos los formularios se habilitan para permitir la edición.
   *
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formularioEmpresa.disable();
      this.datosDelExportador.disable();
      this.datosDelImportador.disable();
      this.datosDeLaRemesa.disable();
      this.datosDeLosDiamantes.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formularioEmpresa.enable();
      this.datosDelExportador.enable();
      this.datosDelImportador.enable();
      this.datosDeLaRemesa.enable();
      this.datosDeLosDiamantes.enable();
    }
  }

  /**
   * @description
   * Se suscribe al estado del store y actualiza los formularios con los valores del estado.
   */
   subscribeToState(): void {
    this.tramite130203Query.selectSolicitud$
    .pipe(takeUntil(this.destroyed$))
      .subscribe((seccionState) => {
        this.formularioEmpresa.patchValue({
          especifique: seccionState.especifique,
          numero: seccionState.numero,
          nombre: seccionState.nombre,
          tipoEmpresa: seccionState.tipoEmpresa,
          paisOrigen: seccionState.paisOrigen,
          lineaCheckbox: seccionState.lineaCheckbox
        });
        this.datosDelExportador.patchValue({
          direccionExportador: seccionState.direccionExportador,
        });
        this.datosDelImportador.patchValue({
          nombreImportador: seccionState.nombreImportador,
          direccionImportador: seccionState.direccionImportador,
        });
        this.datosDeLaRemesa.patchValue({
          numeroEnLetraDeLosLotes: seccionState.numeroEnLetraDeLosLotes,
          numeroEnLetraDeLosLotesEnIngles:
          seccionState.numeroEnLetraDeLosLotesEnIngles,
          numeroDeFactura: seccionState.numeroDeFactura,
       });  
        this.datosDeLosDiamantes.patchValue({
          cantidadEnQuilates: seccionState.cantidadEnQuilates,
          valorDeLosDiamantes: seccionState.valorDeLosDiamantes,
        });        
      });
  }

  /**
   * @description
   * Carga los datos iniciales desde el servicio.
   */
  loadData(): void {
    this.exportacionDeDiamantesEnBrutoService
      .getPaisesEmisores()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paises) => {
        this.paisesEmisores = paises;
      });

    this.exportacionDeDiamantesEnBrutoService
      .getNombresIngles()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((nombres) => {
        this.nombresIngles = nombres;
      });

      this.exportacionDeDiamantesEnBrutoService.getNombreExporter()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((nombreExportador) => {
        this.datosDelExportador.patchValue({
          nombreExportador: nombreExportador,
        });
      });
  }

  /**
   * @description
   * Inicializa el formulario principal.
   */
  public inicializarFormulario(): void {
    this.subscription.add(
      this.tramite130203Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.seccionState = seccionState;
          })
        )
        .subscribe()
    );
    this.formularioEmpresa = this.fb.group({
      especifique: [
        { value: this.seccionState?.especifique, disabled: true },
        [Validators.maxLength(20)],
      ],
      numero: [this.seccionState?.numero, [Validators.required]],
      tipoEmpresa: [this.seccionState?.tipoEmpresa, [Validators.required]],
      nombre: [this.seccionState?.nombre, [Validators.required]],
      lineaCheckbox: this.seccionState?.lineaCheckbox,
      paisOrigen: [this.seccionState?.paisOrigen, [Validators.required]],
    });

    this.datosDelExportador = this.fb.group({
      nombreExportador: [
        { value: this.seccionState?.nombreExportador, disabled: true },
      ],
      direccionExportador: [
        this.seccionState?.direccionExportador,
        [Validators.required],
      ],
    });

    this.datosDelImportador = this.fb.group({
      nombreImportador: [
        this.seccionState?.nombreImportador,
        [Validators.required],
      ],
      direccionImportador: [
        this.seccionState?.direccionImportador,
        [Validators.required],
      ],
    });

    this.datosDeLaRemesa = this.fb.group({
      numeroEnLetraDeLosLotes: [
        this.seccionState?.numeroEnLetraDeLosLotes,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      numeroEnLetraDeLosLotesEnIngles: [
        this.seccionState?.numeroEnLetraDeLosLotesEnIngles,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      numeroDeFactura: [
        this.seccionState?.numeroDeFactura,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
    });

    this.datosDeLosDiamantes = this.fb.group({
      cantidadEnQuilates: [
        this.seccionState?.cantidadEnQuilates,
        [Validators.required],
      ],
      valorDeLosDiamantes: [
        this.seccionState?.valorDeLosDiamantes,
        [Validators.required],
      ],
    });
  }

  /**
   * @description
   * Actualiza el nombre en inglés basado en el ID del país.
   * @param paisId ID del país seleccionado.
   */
  public updateNombreIngles(paisId: number): void {
    this.paisId = paisId;
    const MATCHING_ITEMS = this.nombresIngles.filter(
      (item) => item.idDelPais === this.paisId
    );
    const NOMBRE = MATCHING_ITEMS.length > 0 ? MATCHING_ITEMS[0].name : '';

    this.formularioEmpresa.get('nombre')?.setValue(NOMBRE);
    this.setValoresStore(this.formularioEmpresa, 'nombre');
  }

  /**
   * @description
   * Actualiza el valor en el store basado en el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   */
  setValoresStore( form: FormGroup, campo: string ): void {
    const VALOR = form.get(campo)?.value;
    this.tramite130203Store.actualizarEstado({ [campo]: VALOR });
    if(campo === 'tipoEmpresa'){
      this.updateNombreIngles(Number(VALOR));
    }
  }

  /**
   * @description
   * Verifica si un control del formulario es inválido.
   * @param controlName Nombre del control.
   * @returns `true` si el control es inválido, de lo contrario `false`.
   */
  isInvalid(controlName: string): boolean {
    const CONTORL = this.formularioEmpresa.get(controlName);
    return CONTORL
      ? CONTORL.invalid && (CONTORL.dirty || CONTORL.touched)
      : false;
  }

  /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.datosDeLaRemesa.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @description
   * Obtiene el nombre del exportador desde el formulario y lo guarda en el store.
   */
  getNombreExportador(): void {
    const NOMBRE_EXPORTADOR =
      this.datosDelExportador.get('nombreExportador')?.value;
    this.tramite130203Store.actualizarEstado(NOMBRE_EXPORTADOR);
  }

  /**
   * @description
   * Obtiene la dirección del exportador desde el formulario y la guarda en el store.
   */
  getDireccionExportador(): void {
    const DIRECCION_EXPORTADOR = this.datosDelExportador.get(
      'direccionExportador'
    )?.value;
    this.tramite130203Store.actualizarEstado(DIRECCION_EXPORTADOR);
  }

  /**
   * @description
   * Obtiene el nombre del importador desde el formulario y lo guarda en el store.
   */
  getNombreImportador(): void {
    const NOMBRE_IMPORTADOR =
      this.datosDelImportador.get('nombreImportador')?.value;
    this.tramite130203Store.actualizarEstado(NOMBRE_IMPORTADOR);
  }

  /**
   * @description
   * Obtiene la dirección del importador desde el formulario y la guarda en el store.
   */
  getDireccionImportador(): void {
    const DIRECCION_IMPORTADOR = this.datosDelImportador.get(
      'direccionImportador'
    )?.value;
    this.tramite130203Store.actualizarEstado(DIRECCION_IMPORTADOR);
  }

  /**
   * @description
   * Obtiene el número en letra de los lotes desde el formulario y lo guarda en el store.
   */
  getNumeroEnLetraDeLosLotes(): void {
    const NUMERO_EN_LETRA_DE_LOS_LOTES = this.datosDeLaRemesa.get(
      'numeroEnLetraDeLosLotes'
    )?.value;
    this.tramite130203Store.actualizarEstado(
      NUMERO_EN_LETRA_DE_LOS_LOTES
    );
  }
  /**
   * @description
   * Obtiene el número en letra de los lotes en inglés desde el formulario y lo guarda en el store.
   */
  getNumeroEnLetraDeLosLotesEnIngles(): void {
    const NUMERO_EN_LETRA_DE_LOS_LOTES_EN_INGLES = this.datosDeLaRemesa.get(
      'numeroEnLetraDeLosLotesEnIngles'
    )?.value;
    this.tramite130203Store.actualizarEstado(
      NUMERO_EN_LETRA_DE_LOS_LOTES_EN_INGLES
    );
  }
  /**
   * @description
   * Obtiene el número de factura desde el formulario y lo guarda en el store.
   */
  getNumeroDeFactura(): void {
    const NUMERO_DE_FACTURA =
      this.datosDeLaRemesa.get('numeroDeFactura')?.value;
    this.tramite130203Store.actualizarEstado(NUMERO_DE_FACTURA);
  }

  /**
   * @description
   * Obtiene la cantidad en quilates desde el formulario y la guarda en el store.
   */
  getCantidadEnQuilates(): void {
    const CANTIDAD_EN_QUILATES =
      this.datosDeLosDiamantes.get('cantidadEnQuilates')?.value;
    this.tramite130203Store.actualizarEstado(CANTIDAD_EN_QUILATES);
  }

  /**
   * @description
   * Obtiene el valor de los diamantes desde el formulario y lo guarda en el store.
   */
  getValorDeLosDiamantes(): void {
    const VALOR_DE_LOS_DIAMANTES = this.datosDeLosDiamantes.get(
      'valorDeLosDiamantes'
    )?.value;
    this.tramite130203Store.actualizarEstado(VALOR_DE_LOS_DIAMANTES);
  }

  /**
   * @description
   * Método para limpiar las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
