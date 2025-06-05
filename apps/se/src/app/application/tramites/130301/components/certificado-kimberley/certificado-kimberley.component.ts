import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud130301State, Tramite130301Store } from '../../../../estados/tramites/tramite130301.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoKimberleyForma } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudProrrogaService } from '../../services/solicitudProrroga/solicitud-prorroga.service';
import { Tramite130301Query } from '../../../../estados/queries/tramite130301.query';

/**
 * Componente para gestionar el formulario del Certificado Kimberley.
 */
@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.css',
})
export class CertificadoKimberleyComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para el Certificado Kimberley.
   */
  certificadoKimberley!: FormGroup;

  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
    esFormularioSoloLectura: boolean = false;

  /**
   * Notificador para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Datos del formulario del Certificado Kimberley.
   */
  certificadoKimberleyDatos: CertificadoKimberleyForma[] = [];

  /**
   * Lista de estados obtenidos del servicio.
   */
  estado: Catalogo[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud130301State;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param service Servicio para obtener datos del Certificado Kimberley.
   * @param tramite130301Store Almacén de estado para el trámite 130301.
   * @param tramite130301Query Consulta de estado para el trámite 130301.
   */
  constructor(
    private fb: FormBuilder,
    private service: SolicitudProrrogaService,
    public tramite130301Store: Tramite130301Store,
    private tramite130301Query: Tramite130301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerEstadoList();
    this.obtenerFormDatos();
  }

  /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
  inicializarEstadoFormulario(): void {
    this.tramite130301Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      Object.keys(this.certificadoKimberley.controls).forEach((key) => {
        this.certificadoKimberley.get(key)?.disable();
      });
    } else {
      Object.keys(this.certificadoKimberley.controls).forEach((key) => {
        this.certificadoKimberley.get(key)?.enable();
      });
    }
  }

 /**
   * Crea y configura un formulario reactivo para gestionar los datos del Certificado Kimberley con campos deshabilitados y validaciones requeridas.
  */
  crearFormulario():void{
    this.certificadoKimberley = this.fb.group({
      certificadosEmitidos: [{ value: '', disabled: true }],
      numeroCertificadokimberley: [{ value: '', disabled: true }],
      paisEmisorCertificado: [this.solicitudState?.paisEmisorCertificado],
      nombreIngles: [{ value: '', disabled: true }],
      mixed: [this.solicitudState?.mixed],
      paisDeOrigen: [this.solicitudState?.paisDeOrigen],
      nombreExportador: [{ value: '', disabled: true }],
      direccionExportador: [{ value: '', disabled: true }],
      nombreImportador: [{ value: '', disabled: true }, Validators.required],
      direccionImportador: [{ value: '', disabled: true }, Validators.required],
      numeroEnLetra: [{ value: '', disabled: true }, Validators.required],
      numeroEnLetraIngles: [{ value: '', disabled: true }, Validators.required],
      numeroFactura: [{ value: '', disabled: true }, Validators.required],
      cantidadQuilates: [{ value: '', disabled: true }, Validators.required],
      valorDiamantes: [{ value: '', disabled: true }, Validators.required],
    });
  }

  /**
   * Obtiene los datos del formulario desde el servicio.
   */
  obtenerFormDatos(): void {
    this.service
      .obtenerCertificadoKimberleyFormDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.certificadoKimberleyDatos = data?.data;
        this.certificadoKimberley.patchValue({
          certificadosEmitidos: this.certificadoKimberleyDatos[0].certificadosEmitidos,
          numeroCertificadokimberley: this.certificadoKimberleyDatos[0].numeroCertificadokimberley,
          nombreIngles: this.certificadoKimberleyDatos[0].nombreIngles,
          nombreExportador: this.certificadoKimberleyDatos[0].nombreExportador,
          direccionExportador: this.certificadoKimberleyDatos[0].direccionExportador,
          nombreImportador: this.certificadoKimberleyDatos[0].nombreImportador,
          direccionImportador: this.certificadoKimberleyDatos[0].direccionImportador,
          numeroEnLetra: this.certificadoKimberleyDatos[0].numeroEnLetra,
          numeroEnLetraIngles: this.certificadoKimberleyDatos[0].numeroEnLetraIngles,
          numeroFactura: this.certificadoKimberleyDatos[0].numeroFactura,
          cantidadQuilates: this.certificadoKimberleyDatos[0].cantidadQuilates,
          valorDiamantes: this.certificadoKimberleyDatos[0].valorDiamantes,
        });
      });
  }

  /**
   * Obtiene la lista de estados desde el servicio.
   */
  obtenerEstadoList(): void {
    this.service
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130301Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}