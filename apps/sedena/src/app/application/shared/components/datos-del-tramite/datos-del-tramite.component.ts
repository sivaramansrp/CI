import { CROSLISTA_ADUANAS_DISPONIBLES, DATOS_DEL_TRAMITE_MAP, FETCHA_PAGO, MANIFIESTOS_DECLARACIONES, PAISE_DENTINO_EITIQUETA, PERIODO_DOS_SEMESTRE, PERIODO_SEMESTRE_HABILITADO, PERIODO_UNO_SEMESTRE, PERMISO_ADUNA_TITULO, PERMISO_DEFINITIVO_TITULO } from '../../constants/datos-del-tramilte.enum';
import { CrossListLable, InputCheckComponent, InputRadioComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosDelTramiteFormState } from '../../models/datos-del-tramite.model';
import { EventEmitter } from '@angular/core';
import { FECHA_DE_PAGO } from '../../models/datos-del-tramite.model';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { MANIFIESTOS_DECLARACION } from '../../models/datos-del-tramite.model';
import { MERCANCIA_ENCABEZADO_DE_TABLA } from '../../models/datos-del-tramite.model';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * @title Datos del Trámite
 * @description Componente que gestiona el formulario de datos del trámite como permisos, uso final y selección de aduanas.
 * @summary Componente utilizado para capturar y emitir los datos del trámite.
 */

@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent,
    InputFechaComponent
],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
 * @property {number} idProcedimiento
 * Identificador único del procedimiento asociado a la solicitud.
 * Este valor es recibido como un input desde el componente padre.
 *
 * @decorador @Input
 */
  @Input() public idProcedimiento!: number;

  public estaOculto = false;
  public paisEtiqueta = PAISE_DENTINO_EITIQUETA;
  public periodoHabilitado = false;
  public esAduna = false;
  public manifiestosDeclaraciones = false;
  public fetchaPago = false;
  public periodoUnoSemestreOpciones = PERIODO_UNO_SEMESTRE;
  public periodoUnoSemestreRadioOpciones = PERIODO_DOS_SEMESTRE;

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();
  /**
   * Lista de aduanas disponibles para mostrar en el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponibles
   */
  public seleccionarAduanasDisponibles = CROSLISTA_ADUANAS_DISPONIBLES;

  /**
   * Aduanas seleccionadas por el usuario desde el componente Crosslist.
   * @property {string[]} seleccionarAduanasDisponiblesDatos
   */
  public seleccionarAduanasDisponiblesDatos: string[] = [];

  /**
   * Etiquetas que se utilizan en el componente Crosslist para mostrar los títulos de los listados.
   * @property {CrossListLable} aduanasDisponiblesLabel
   */
  public aduanasDisponiblesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };

  /**
   * Grupo de formularios principal para capturar los datos del trámite.
   * @property {FormGroup} form
   */
  form!: FormGroup;

  /**
 * Texto de los manifiestos.
 */
    manifiestosTexto: string = '';
  /**
   * @property {InputFecha} fechaInicioInput
   * Objeto con la configuración de la fecha inicial del componente.
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  onReset(): void {
    this.form.reset();
  }

  /**
   * @method onFechaCambiada
   * @description Actualiza la Fecha única de pago en el formulario.
   *
   * @param {string} fecha - Fecha seleccionada en el componente `InputFecha`.
   */
  onFechaCambiada(fecha: string): void {
    this.form.patchValue({ fechaPago: fecha });
  }

  /**
   * Estado inicial del formulario del trámite, recibido desde el componente padre.
   * @property {DatosDelTramiteFormState} datosDelTramiteFormState
   */
  @Input() datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Lista de datos de mercancías que se utilizan en la tabla dinámica.
   * @property {MercanciaDetalle[]} datosMercanciaTabla
   */
  @Input() datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
   * Configuración utilizada para construir la tabla dinámica de mercancías.
   * @property {any} mercanciaTablaConfiguracion
   */
  public mercanciaTablaConfiguracion = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: MERCANCIA_ENCABEZADO_DE_TABLA,
    datos: [],
  };

  /**
   * Evento que emite los datos actualizados del formulario hacia el componente padre.
   * @event updateDatosDelTramiteFormulario
   */
  @Output() updateDatosDelTramiteFormulario =
    new EventEmitter<DatosDelTramiteFormState>();

  /**
   * Constructor del componente.
   * @method constructor
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   * @param {ActivatedRoute} activatedRoute - Ruta activa utilizada para navegación relativa.
   * @param {Router} router - Servicio de enrutamiento.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router // eslint-disable-next-line no-empty-function
  ) {}
  /**
   * Crea el formulario reactivo `agregarDestinatarioFinal` utilizando `FormBuilder`.
   * Define los campos y sus validaciones.
   *
   */
  crearFormaulario(): void {
    this.form = this.fb.group({
      permisoGeneral: ['', Validators.required],
      paisDestino: [
        { value: 'MEXICO (ESTADOS UNIDOS MEXICANOS)', disabled: true },
      ],
      usoFinal: ['', Validators.required],
      fechaPago: [
        this.datosDelTramiteFormState?.fechaPago || '',
        Validators.required,
      ],
      unoSemestre: [this.datosDelTramiteFormState.unoSemestre ?? null],
      dosSemestre: [this.datosDelTramiteFormState.dosSemestre ?? null],
      anoEnCurso: [this.datosDelTramiteFormState.anoEnCurso ?? false],
      informacionConfidencial: [this.datosDelTramiteFormState.informacionConfidencial ?? false],
    });
  }

  /**
   * Maneja el evento de cambio en la selección de aduanas.
   * @method aduanasDisponiblesSeleccionadasChange
   * @param {string[]} events - Lista de aduanas seleccionadas.
   * @returns {void}
   */
  aduanasDisponiblesSeleccionadasChange(events: string[]): void {
    this.seleccionarAduanasDisponiblesDatos = events;
  }

  /**
   * Navega hacia el path de acciones relativo especificado.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa hacia la sección de acciones.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Inicializa el formulario con los valores actuales del estado del trámite
   * y escucha los cambios para emitir actualizaciones.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormaulario();
    this.manifiestosTexto = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.form.patchValue({
      permisoGeneral: this.datosDelTramiteFormState.permisoGeneral,
      usoFinal: this.datosDelTramiteFormState.usoFinal,
    });
    
    if (this.idProcedimiento) {
      this.actualizarFormControlsById();
    }

    this.seleccionarAduanasDisponiblesDatos =
      this.datosDelTramiteFormState.aduanasSeleccionadas;

    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue) => {
        const DATOS_DEL_TRAMITE: DatosDelTramiteFormState = {
          permisoGeneral: formValue.permisoGeneral,
          paisDestino: formValue.paisDestino,
          usoFinal: formValue.usoFinal,
          aduanasSeleccionadas: this.seleccionarAduanasDisponiblesDatos,
          anoEnCurso: formValue.anoEnCurso,
          fechaPago: formValue.fechaPago,
          informacionConfidencial: formValue.informacionConfidencial,
          dosSemestre: formValue.dosSemestre,
          unoSemestre: formValue.unoSemestre,
        };
        this.updateDatosDelTramiteFormulario.emit(DATOS_DEL_TRAMITE);
      });

      this.estaOculto = PERMISO_DEFINITIVO_TITULO.includes(this.idProcedimiento);
      this.esAduna = PERMISO_ADUNA_TITULO.includes(this.idProcedimiento);
      this.periodoHabilitado = PERIODO_SEMESTRE_HABILITADO.includes(this.idProcedimiento);
      this.manifiestosDeclaraciones = MANIFIESTOS_DECLARACIONES.includes(this.idProcedimiento);
      this.fetchaPago = FETCHA_PAGO.includes(this.idProcedimiento);
  }

  /**
   * @method actualizarFormControlsById
   * @description Actualiza los controles del formulario basándose en el identificador del procedimiento.
   * Agrega controles adicionales al formulario si no existen y están asociados al identificador actual.
   * @returns {void}
   */
  actualizarFormControlsById(): void {
    Object.entries(DATOS_DEL_TRAMITE_MAP).forEach(([control, idsDeProcedimiento]) => {
      if (idsDeProcedimiento.includes(this.idProcedimiento)) {
        if (!this.form.contains(control)) {
          const KEY = control as keyof DatosDelTramiteFormState;
          this.form.addControl(control, new FormControl(this.datosDelTramiteFormState[KEY]));
        }
      }
    });
  }

  /**
   * @method actualizarUnoSemestre
   * @description Actualiza el valor del campo `unoSemestre` en el formulario reactivo.
   * @param {string | number} event - Valor seleccionado para el campo `unoSemestre`.
   * @returns {void}
   */
  actualizarUnoSemestre(event: string | number): void {
    this.form.patchValue({
      unoSemestre: event,
    });
  }

  /**
   * @method actualizarDosSemestre
   * @description Actualiza el valor del campo `dosSemestre` en el formulario reactivo.
   * @param {string | number} event - Valor seleccionado para el campo `dosSemestre`.
   * @returns {void}
   */
  actualizarDosSemestre(event: string | number): void {
    this.form.patchValue({
      dosSemestre: event,
    });
  }

  /**
   * @method ngOnDestroy
   * @description Hook de destrucción del componente. Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
