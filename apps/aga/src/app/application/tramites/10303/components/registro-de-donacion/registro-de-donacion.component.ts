import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, merge } from 'rxjs';
import { Modal } from 'bootstrap';

import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';
import mercanciaTable from 'libs/shared/theme/assets/json/10303/mercancia-table.json';

import { BasicRequerimientos, BasicRequerimientosRespuesta, Manifiestos, ManifiestosRespuesta } from '../../models/donaciones-extranjeras.model';
import { CATALOGOS_ID, Catalogo } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { FECHA_CADUCIDAD, OpcionesDeBotonDeRadio, PANELS, TEXTOS } from '../../constantes/donaciones-extranjeras.enum';

/**
 * Componente para gestionar el registro de donación.
 */
@Component({
  selector: 'app-registro-de-donacion',
  templateUrl: './registro-de-donacion.component.html',
  styleUrl: './registro-de-donacion.component.scss'
})
export class RegistroDeDonacionComponent implements OnInit {
  /**
   * Formulario reactivo para agregar mercancías.
   */

  agregarMercanciasForm!: FormGroup;

  /**
   * Lista de manifiestos obtenidos desde el servicio.
   */
  manifiestos: Manifiestos[] = [];

  /**
   * Lista de requerimientos básicos obtenidos desde el servicio.
   */
  basicoRequerimientos: BasicRequerimientos[] = [];

  /**
   * Lista de estados de los manifiestos seleccionados.
   */
  manifiestosSeleccionados: boolean[] = [];

  /**
   * Lista de estados de los manifiestos seleccionados para mostrar.
   */
  manifiestoSeleccionado: boolean[] = [];

  /**
   * Lista de aduanas obtenida desde el servicio.
   */
  aduana!: Catalogo[];

  /**
   * Lista de destinos de donación obtenida desde el servicio.
   */
  destinoDonacion!: Catalogo[];

  /**
   * Lista de tipos de mercancía obtenida desde el servicio.
   */
  tipoDeMercancia!: Catalogo[];

  /**
   * Lista de unidades de medida obtenida desde el servicio.
   */
  unidadMedida!: Catalogo[];

  /**
   * Lista de unidades de medida de tarifa obtenida desde el servicio.
   */
  UMT!: Catalogo[];

  /**
   * Lista de países de procedencia obtenida desde el servicio.
   */
  paisProcedenciaOtro!: Catalogo[];

  /**
   * Lista de condiciones de mercancía obtenida desde el servicio.
   */
  condicionMercancia!: Catalogo[];

  /**
   * Lista de países de origen de medicamentos obtenida desde el servicio.
   */
  paisOrigenMedicamento!: Catalogo[];

  /**
   * Lista de países de procedencia de medicamentos obtenida desde el servicio.
   */
  paisProcedenciaMedicamento!: Catalogo[];

  /**
   * Encabezado de la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: unknown = [];

  /**
   * Datos de la tabla de mercancía.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
   * Paneles de la interfaz de usuario.
   */
  panels = PANELS;

  /**
   * Estado del modal.
   */
  modal: string = 'modal';

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al botón de cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OpcionesDeBotonDeRadio;

  /**
   * Archivo de medicamentos seleccionado.
   */
  archivoMedicamentos: File | null = null;

  /**
   *  Fecha de caducidad.
   */
  fechaCaducidad: InputFecha = FECHA_CADUCIDAD;

  /**
   * Etiqueta del archivo seleccionado.
   */
  etiquetaDeArchivo: string = TEXTOS.ETIQUETA_DE_ARCHIVO;

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param donacionesExtranjerasService Servicio para gestionar las donaciones extranjeras.
   */
  constructor(
    private donacionesExtranjerasService: DonacionesExtranjerasService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario principal
    this.crearFormSolicitud();
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.obtenerManifiestos();
    this.obtenerBasicoRequerimientos();
    this.obtenerMercancia();
  }

  /**
   * Getter para obtener el control de formulario
   */
  get descripcionMercanciaOtro(): FormControl {
    return this.agregarMercanciasForm.get('datosMercancia.descripcionMercanciaOtro') as FormControl;
  }

  /**
   * Inicializa el formulario reactivo
   * @returns {void}
   */
  crearFormSolicitud(): void {
    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        numeroConsecutivo: [
          { value: '1', disabled: true },
          [Validators.required, Validators.maxLength(5)]
        ],
        destinoDonacion: [
          '',
          Validators.required
        ],
        posibleFraccion: ['', [Validators.maxLength(10)]],
        descripcionFraccion: [
          { value: '', disabled: true }
        ],
        justificacionMerca: [
          '',
          [
            Validators.required,
            Validators.maxLength(400)
          ]
        ],
        descripcionMercanciaOtro: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/),
            Validators.maxLength(400)
          ]
        ],
        tipoDeMercancia: ['', Validators.required],
        cantidadUMC: ['', [Validators.required, Validators.maxLength(5)]],
        cantidadUMT: ['', [Validators.required, Validators.maxLength(5)]],
        unidadMedida: ['', Validators.required],
        UMT: ['', Validators.required],
        paisProcedenciaOtro: ['', Validators.required],
        condicionMercanciaA: ['', Validators.required]
      }),
      datosCofepris: this.fb.group({
        ingredienteActivo: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ],
        ],
        tipoMedicamento: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ],
        presentacionFarma: [
          '',
          [Validators.required, Validators.maxLength(100)]
        ],
        paisOrigenMedicamento: [
          '',
          Validators.required
        ],
        paisProcedenciaMedicamento: [
          '',
          [
            Validators.required
          ]
        ]
      })
    });
  }

  /**
   * Inicializa los catálogos de países y documentos de residencia.
   * @returns {void}
   */
  private inicializaCatalogos(): void {
    const ADUANA$ = this.donacionesExtranjerasService
      .getAduana(CATALOGOS_ID.CAT_ADUANA)
      .pipe(
        map((resp) => {
          this.aduana = resp.data;
        })
      );

    const DESTINO_DONACION$ = this.donacionesExtranjerasService
      .getDestinoDonacion(CATALOGOS_ID.CAT_DESTINO_DONACION)
      .pipe(
        map((resp) => {
          this.destinoDonacion = resp.data;
        })
      );

    const TIPO_DE_MERCANCIA$ = this.donacionesExtranjerasService
      .getTipoDeMercancia(CATALOGOS_ID.CAT_TIPO_DE_MERCANCIA)
      .pipe(
        map((resp) => {
          this.tipoDeMercancia = resp.data;
        })
      );

    const UNIDAD_MEDIDA$ = this.donacionesExtranjerasService
      .getUnidadMedida(CATALOGOS_ID.CAT_UMC)
      .pipe(
        map((resp) => {
          this.unidadMedida = resp.data;
        })
      );

    const UMT$ = this.donacionesExtranjerasService
      .getUmt(CATALOGOS_ID.CAT_UMT)
      .pipe(
        map((resp) => {
          this.UMT = resp.data;
        })
      );

    const PAIS_PROCEDENCIA_OTRO$ = this.donacionesExtranjerasService
      .getProcedenciaOtro(CATALOGOS_ID.CAT_PROCEDENCIA_OTRO)
      .pipe(
        map((resp) => {
          this.paisProcedenciaOtro = resp.data;
        })
      );

    const CONDICION_MERCANCIA$ = this.donacionesExtranjerasService
      .getCondicionMercancia(CATALOGOS_ID.CAT_CONDICION_MERCANCIA)
      .pipe(
        map((resp) => {
          this.condicionMercancia = resp.data;
        })
      );

    const PAIS_ORIGEN_MEDICAMENTO$ = this.donacionesExtranjerasService
      .getPaisOrigenMedicamento(CATALOGOS_ID.CAT_PAIS_ORIGEN_MEDICAMENTO)
      .pipe(
        map((resp) => {
          this.paisOrigenMedicamento = resp.data;
        })
      );

    const PAIS_PROCEDENCIA_MEDICAMENTO$ = this.donacionesExtranjerasService
      .getPaisProcedenciaMedicamento(CATALOGOS_ID.CAT_PAIS_PROCEDENCIA_MEDICAMENTO)
      .pipe(
        map((resp) => {
          this.paisProcedenciaMedicamento = resp.data;
        })
      );

    merge(
      ADUANA$,
      DESTINO_DONACION$,
      TIPO_DE_MERCANCIA$,
      UNIDAD_MEDIDA$,
      UMT$,
      PAIS_PROCEDENCIA_OTRO$,
      CONDICION_MERCANCIA$,
      PAIS_ORIGEN_MEDICAMENTO$,
      PAIS_PROCEDENCIA_MEDICAMENTO$
    ).subscribe();
  }

  /**
   * Obtiene los manifiestos y los guarda en `manifiestos`.
   * Inicializa `manifiestosSeleccionados` con valores `false`.
   */
  obtenerManifiestos(): void {
    this.donacionesExtranjerasService.getManifiestos().subscribe({
      next: (result: ManifiestosRespuesta) => {
        this.manifiestos = result?.data;
      }
    });
    this.manifiestosSeleccionados = this.manifiestos.map(() => false);
  }

  /**
   * Obtiene los requerimientos básicos y los guarda en `basicoRequerimientos`.
   * @returns {void}
   */
  obtenerBasicoRequerimientos(): void {
    this.donacionesExtranjerasService.getBasicoRequerimientos().subscribe({
      next: (result: BasicRequerimientosRespuesta) => {
        this.basicoRequerimientos = result?.data;
      }
    });
  }

  /**
   * Método para obtener los datos de las mercancías.
   * 
   * Este método asigna los datos del encabezado y del cuerpo de la tabla de mercancías
   * a las propiedades correspondientes del componente.
   * 
   * @returns {void}
   */
  public obtenerMercancia(): void {
    this.mercanciaHeaderData = this.getMercanciaTableData.tableHeader;
    this.mercanciaBodyData = this.getMercanciaTableData.tableBody;
  }

  /**
   * Genera un identificador para el manifiesto basado en el índice.
   * 
   * @param {number} index - Índice del manifiesto.
   * @returns {string} El identificador del manifiesto.
   */
  getManifiestoId(index: number): string {
    return `manifiesto-${index}`;
  }

  /**
   * Cambia el estado de la casilla de verificación según el índice.
   * 
   * @param {number} index - Índice de la casilla de verificación.
   * 
   * @returns {void}
   */
  onCheckboxCambiar(index: number): void {
    this.manifiestoSeleccionado[index] = !this.manifiestoSeleccionado[index];
  }

  /**
   * Muestra u oculta el panel colapsable.
   * 
   * @param index El índice del panel a mostrar u ocultar.
   * 
   * @returns {void}
   */
  mostrar_colapsable(index: number): void {
    const IS_CURRENTLY_OPEN = this.panels[index].isCollapsed;
    this.panels.forEach((panel, i) => {
      panel.isCollapsed = i === index ? !IS_CURRENTLY_OPEN : true;
    });
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable_fabricante
   * 
   * @returns {void}
   */
  mostrar_colapsable_fabricante(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método para abrir dialogo mercancías.
   * 
   * @returns {void}
   */
  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal.
   * 
   * @returns {void}
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Agrega mercancías al formulario y cierra el modal.
   * @returns {void}
   */
  agregarMercancias(): void {
    if (!this.agregarMercanciasForm.valid) {
      return;
    }
    const MERCANCIA = this.agregarMercanciasForm.value;
    this.getMercanciaTableData.tableBody.push(MERCANCIA);
    this.agregarMercanciasForm.reset();
    this.cerrarModal();
  }

  /**
   * Maneja el cambio de archivo en el input de archivo.
   * 
   * @param event Evento de cambio de archivo.
   * 
   * @returns {void}
   */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.files && TARGET.files.length > 0) {
      this.archivoMedicamentos = TARGET.files[0];
      this.etiquetaDeArchivo = this.archivoMedicamentos.name;
    } else {
      this.etiquetaDeArchivo = TEXTOS.ETIQUETA_DE_ARCHIVO;
    }
  }

  /**
   * Elimina el archivo de medicamento seleccionado.
   * @returns {void}
   */
  eliminacionMedicamento(): void {
    this.archivoMedicamentos = null;
    this.etiquetaDeArchivo = TEXTOS.ETIQUETA_DE_ARCHIVO;
  }

  /**
   * Activa la selección del archivo de medicamentos.
   * @returns {void}
   */
  activarSeleccionArchivo(): void {
    const ENTRADA_ARCHIVO = document.getElementById('archivoMedicamentos') as HTMLInputElement;
    if (ENTRADA_ARCHIVO) {
      ENTRADA_ARCHIVO.click();
    }
  }

  /**
   * Carga el archivo de acuerdo al tipo especificado.
   * 
   * @param tipo Tipo de archivo a cargar.
   */
  cargarArchivo(tipo: string): void { }

  /**
   * Limpia la información de las mercancías.
   */
  limpiarMercancias(): void { }

  /**
   * Obtiene la fracción correspondiente.
   */
  obtenerFraccion(): void { }

  /**
   * Maneja el evento de cambio de valor.
   * 
   * @param event Evento de cambio de valor.
   */
  enCambioDeValor(event: any): void { }
}