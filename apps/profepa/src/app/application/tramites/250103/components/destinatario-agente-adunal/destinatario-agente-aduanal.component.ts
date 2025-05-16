import {
  AGREGAR_MIEMBRO_TABLA,
  Adunal,
  Destinatarios,
  TABLA_AGENT_ADUNALDATA,
  TablaDatos,
} from '../../models/embalaje-de-madera.models';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/embalaje-de-madera.enum';
import { DistinatarioService } from '../../../250103/services/distinatario.service';
import { ModalComponent } from '../modal/modal.component';
import { Tramite250103Query } from '../../estados/tramite250103.query';
import { Tramite250103Store } from '../../estados/tramite250103.store';

/**
 * Componente encargado de gestionar los destinatarios y agentes aduanales dentro del trámite 250103.
 */
@Component({
  selector: 'app-destinatario-agente-aduanal',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './destinatario-agente-aduanal.component.html',
  styleUrl: './destinatario-agente-aduanal.component.scss',
})
export class DestinatarioAgenteAduanalComponent implements OnInit ,OnDestroy {
  /** Sujeto para limpieza de suscripciones. */
  public destroy$ = new Subject<void>();
  /** Configuración de la tabla de destinatarios. */
  public tablaDestinatariosData: ConfiguracionColumna<Destinatarios>[] =
    AGREGAR_MIEMBRO_TABLA;
    
  /** Configuración de la tabla de agentes aduanales. */
  public tablaAgenteAduanalData: ConfiguracionColumna<Adunal>[] =
    TABLA_AGENT_ADUNALDATA;
    
  /** Datos de destinatarios en la tabla. */
  public agregarDestinatariosTablaDatos: Destinatarios[] = [];
   /** Datos de agentes aduanales en la tabla. */
  public agregarAgenteAduanalTablaDatos: Adunal[] = [];
   /** Modo de selección de tabla (CHECKBOX). */
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /** Formulario para datos de destinatarios. */
  public formDestinatariosModal!: FormGroup;
  /** Formulario para datos de agentes aduanales. */
  public formAgenteAduanal!: FormGroup;
  /** Visibilidad del modal de destinatarios. */
  showDestinatarioModal = false;
   /** Opciones de radio para destinatarios. */
  destinatarioOpcionDeBotonDeRadio = DESTINATARIO_OPCIONES_DE_BOTON_DE_RADIO;
   /** Visibilidad de la sección de tabla. */
  showTableDiv = true;
   /** Datos de países. */
  paisData: Catalogo[] = [];
   /** Datos de entidades federativas. */
  estadoData: Catalogo[] = [];
   /** Filas de la tabla de destinatarios. */
  tablaDestinatarioFilaDatos: TablaDatos[] = [];
  /** Filas de la tabla de agentes aduanales. */
  tablaAgenteAduanaFilaDatos: TablaDatos[] = [];
   /** Visibilidad del modal de confirmación. */
  showAceptarModal = false;
    /** Visibilidad del modal de agentes aduanales. */
  showAgenteModal = false;
  /** Filas seleccionadas de destinatarios. */
  public selectedDestinatarioRows: Destinatarios[] = [];
   /** Filas seleccionadas de agentes aduanales. */
  public selectedAgenteAduanalRows: Adunal[] = [];
   /** Indica si el destinatario es nacional. */
  public esNacional = true;
   /** Indica si el destinatario es extranjero. */
  public esExtranjero = false;

   /**
   * Constructor.
   * @param fb Construye formularios reactivos.
   * @param tramite250103Store Almacén de estado del trámite.
   * @param tramite250103Query Consulta el estado del trámite.
   * @param destinatarioService Obtiene datos de países y entidades.
   */
  constructor(
    private fb: FormBuilder,
    private tramite250103Store: Tramite250103Store,
    private tramite250103Query: Tramite250103Query,
    private destinatarioService: DistinatarioService
  ) {
    //
  }
   /**
   * Inicializa el componente, carga datos y configura formularios.
   */

  ngOnInit(): void {
    this.obtenerPaisData();
    this.obtenerEstadoData();
    this.tramite250103Query.selectDestinatarioRowData$
    .pipe(takeUntil(this.destroy$))
    .subscribe((rowData) => {
      this.agregarDestinatariosTablaDatos = rowData.map((item: TablaDatos) => ({
        nombre: item.Datosdeltabledata[0],
        pais: item.Datosdeltabledata[1],
        ciudad: item.Datosdeltabledata[2],
        entidadfederativa: item.Datosdeltabledata[3],
        domicilio: item.Datosdeltabledata[4],
        codigopostal: item.Datosdeltabledata[5],
      }));
    });

    this.tramite250103Query.selectAgenteAduanalRowData$
    .pipe(takeUntil(this.destroy$))
    .subscribe((rowData) => {
      this.agregarAgenteAduanalTablaDatos = rowData.map(
        (item: TablaDatos) => ({
          nombre: item.Datosdeltabledata[0],
          primerapellido: item.Datosdeltabledata[1],
          segundoapellido: item.Datosdeltabledata[2],
          patente: item.Datosdeltabledata[3],
        })
      );
    });
    this.establecerFormDestinatariosModal();
    this.establecerFormAgenteAduanal();
    this.formDestinatariosModal.get('destinatarioRadio')?.setValue('1'); 
    this.formDestinatariosModal.get('destinatarioRadio')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.esNacional = value === '1';
        this.esExtranjero = value === '2';
      });
  }
 
    /**
   * Configura el formulario de destinatarios con validaciones.
   */
  establecerFormDestinatariosModal(): void {
    this.formDestinatariosModal = this.fb.group({
      destinatarioRadio: new FormControl('1', [
        Validators.required,
      ]),
      destinatarioRazonSocial: new FormControl('', [
        Validators.required,
        Validators.maxLength(120),
      ]),
      paisNacionalDestinatario: new FormControl('', [Validators.required]),
      entidadFederativaDestinatario: new FormControl('', [
        Validators.required,
        Validators.maxLength(120),
      ]),
      ciudadNacionalDestinatario: new FormControl('', [Validators.required]),
      codigoPostalDestinatario: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      domicilioDestinatario: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

   /**
   * Configura el formulario de destinatarios con validaciones.
   */
  establecerFormAgenteAduanal(): void {
    this.formAgenteAduanal = this.fb.group({
      nombreAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(28),
      ]),
      primerApellidoAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      segundoApellidoAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      patenteAgenteAduanal: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
      ]),
    });
  }

   /**
   * Procesa y agrega datos de agente aduanal a la tabla.
   */
  enviarAgenteAduanalFormulario(): void {
    const AGENTE_ADUANAL_FILA = {
      Datosdeltabledata: [
        this.formAgenteAduanal.value.nombreAgenteAduanal,
        this.formAgenteAduanal.value.primerApellidoAgenteAduanal,
        this.formAgenteAduanal.value.segundoApellidoAgenteAduanal,
        this.formAgenteAduanal.value.patenteAgenteAduanal,
      ],
    };
    this.tablaAgenteAduanaFilaDatos.push(AGENTE_ADUANAL_FILA);
    this.tramite250103Store.establecerAgenteAduanal(
      this.tablaAgenteAduanaFilaDatos
    );
    this.showTableDiv = !this.showTableDiv;
    this.showAgenteModal = !this.showAgenteModal;
    this.limparAgenteAduana();
  }
 /**
   * Procesa y agrega datos de destinatario a la tabla.
   */
  enviarDestinatarioFormulario(): void {
    const PAIS_VALOR = this.paisData.find(
      (item: Catalogo) =>
        item.id === this.formDestinatariosModal.value.paisNacionalDestinatario
    )?.descripcion;

    const ENTIDAD_FEDERATIVA_VALOR = this.estadoData.find(
      (item: Catalogo) =>
        item.id ===
        this.formDestinatariosModal.value.entidadFederativaDestinatario
    )?.descripcion;

      const DESTINATARIO_FILA = {
        Datosdeltabledata: [
          this.formDestinatariosModal.value.destinatarioRazonSocial,
          PAIS_VALOR,
          this.formDestinatariosModal.value.ciudadNacionalDestinatario || '',
          ENTIDAD_FEDERATIVA_VALOR,
          this.formDestinatariosModal.value.domicilioDestinatario,
          this.formDestinatariosModal.value.codigoPostalDestinatario,
        ],
      };

    this.tablaDestinatarioFilaDatos.push(DESTINATARIO_FILA);
    this.tramite250103Store.establecerDestinatario(
      this.tablaDestinatarioFilaDatos
    );

    this.showTableDiv = !this.showTableDiv;
    this.limparAgenteAduana()
  }

   /**
   * Carga datos de países.
   */
   obtenerPaisData(): void {
    this.destinatarioService.obtenerPaisData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.paisData = data;
      });
  }
  
   /**
   * Carga datos de entidades federativas.
   */
   obtenerEstadoData(): void {
    this.destinatarioService.obtenerEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estadoData = data;
      });
  }

   /**
   * Alterna visibilidad del modal de destinatarios.
   */
  cambiarDestinatario(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showDestinatarioModal = !this.showDestinatarioModal;
  }

   /**
   * Alterna visibilidad del modal de agentes aduanales.
   */
  cambiarAgenteAduanal(): void {
    this.showTableDiv = !this.showTableDiv;
    this.showAgenteModal = !this.showAgenteModal;
  }
  
 /**
   * Abre el modal de confirmación.
   */
  openAceptarModal(): void {
    this.showDestinatarioModal = !this.showDestinatarioModal;
    this.showAceptarModal = true;
  }

   /**
   * Confirma la adición de un destinatario.
   */
  confirmAgregar(): void {
    this.enviarDestinatarioFormulario();
    this.showAceptarModal = false;
    this.limparDestinatario();
  }
 
 /**
   * Actualiza filas seleccionadas de destinatarios.
   * @param filas Filas seleccionadas.
   */
  onSeleccionDestinatario(filas: Destinatarios[]): void {
    this.selectedDestinatarioRows = filas;
  }

  /**
   * Actualiza filas seleccionadas de agentes aduanales.
   * @param filas Filas seleccionadas.
   */
  onSeleccionAgenteAduanal(filas: Adunal[]): void {
    this.selectedAgenteAduanalRows = filas;
  }

/**
   * Elimina destinatarios seleccionados.
   */
  eliminarUbicacionDetinatario(): void {
    if (!this.selectedDestinatarioRows.length)
      {
         return;
      }
    this.agregarDestinatariosTablaDatos = this.agregarDestinatariosTablaDatos.filter(
      (fila) => !this.selectedDestinatarioRows.includes(fila)
    );
    this.tablaDestinatarioFilaDatos = this.agregarDestinatariosTablaDatos.map((item) => ({
      Datosdeltabledata: [
        item.nombre,
        item.pais,
        item.ciudad,
        item.entidadfederativa,
        item.domicilio,
        item.codigopostal,
      ],
    }));
    this.tramite250103Store.establecerDestinatario(this.tablaDestinatarioFilaDatos);
    this.selectedDestinatarioRows = [];
  }

  /**
   * Elimina agentes aduanales seleccionados.
   */
  eliminarAgenteAduanal(): void {
    if (!this.selectedAgenteAduanalRows.length)
      { return;
      }

    this.agregarAgenteAduanalTablaDatos = this.agregarAgenteAduanalTablaDatos.filter(
      (fila) => !this.selectedAgenteAduanalRows.includes(fila)
    );

    this.tablaAgenteAduanaFilaDatos = this.agregarAgenteAduanalTablaDatos.map((item) => ({
      Datosdeltabledata: [
        item.nombre,
        item.primerapellido,
        item.segundoapellido,
        item.patente,
      ],
    }));

    this.tramite250103Store.establecerAgenteAduanal(this.tablaAgenteAduanaFilaDatos);
    this.selectedAgenteAduanalRows = [];
  }

   /**
   * Restablece el formulario de destinatarios.
   */
  limparDestinatario(): void {
    this.formDestinatariosModal.reset();
    this.formDestinatariosModal.get('destinatarioRadio')?.setValue('1');
  }

  /**
   * Restablece el formulario de agentes aduanales.
   */
  limparAgenteAduana(): void {
    this.formAgenteAduanal.reset();
  }

    /**
   * Limpia suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
 
}
