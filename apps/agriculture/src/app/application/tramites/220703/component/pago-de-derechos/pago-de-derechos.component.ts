import { Catalogo, CatalogoSelectComponent, CatalogosSelect, InputFecha, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoDeDerechos, PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { map, takeUntil } from 'rxjs';
import { AcuicolaService } from '../../service/acuicola.service';
import { FECHA_DE_PAGO } from '../../constantes/acuicola.enum';
import { Subject } from 'rxjs';
import { TramiteState } from '../../estados/tramite220703.store';
import { TramiteStore } from '../../estados/tramite220703.store';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';


@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {


  /** Formulario reactivo para la captura y visualización de datos de pago de derechos. */
  pagosDeDerechosForm!: FormGroup;

  /** Catálogo de bancos para selección en el formulario. */
  banco: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: '',
    catalogos: [],
  };

  /**
  * @type {TramiteState}
  * @description Variable que almacena el estado inicial de un trámite. Se inicializa como un objeto vacío y se fuerza su tipo a TramiteState.
  */
  tramiteState: TramiteState = {} as TramiteState;

  /** Configuración de la fecha de inicio para el campo de fecha en el formulario. */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /** Subject utilizado para gestionar la desuscripción de observables. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb Servicio para la creación de formularios reactivos.
   * @param acuicolaService Servicio para interactuar con la lógica de negocio relacionada con la acuicultura.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para acceder al estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para gestionar el estado del trámite.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario, carga los datos del banco y los datos de pago de derechos.
   */
  ngOnInit(): void {
    this.iniciarFormulario();
    this.getBancoDatos();
    this.pagoDeCargarDatos();
    this.pagoDerechosRevision();

    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((datos: TramiteState) => {
        this.tramiteState = datos;
        this.pagosDeDerechosForm.patchValue({
          fechaInicioInput: datos.fechaInicioInput,
          banco: datos.banco
        });
      })
    )
      .subscribe();

  }

  /**
   * Inicializa el formulario reactivo con los controles y validaciones necesarias.
   */
  iniciarFormulario(): void {
    this.pagosDeDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: [{ value: this.tramiteState.banco }, Validators.required],
      llaveDePago: [{ value: '', disabled: true }, Validators.required],
      fechaInicioInput: [{ value: this.tramiteState.fechaInicioInput }, Validators.required],
      importeDePago: [{ value: '', disabled: true }, Validators.required],
      claveDeReferenciaRevision: [{ value: '', disabled: true }, Validators.required],
      cadenaDependenciaRevision: [{ value: '', disabled: true }, Validators.required],
      bancoRevision: [{ value: '', disabled: true }, Validators.required],
      llaveDePagoRevision: [{ value: '', disabled: true }, Validators.required],
      fechaInicioRevision: [{ value: '', disabled: true }, Validators.required],
      importeDePagoRevision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  /**
   * Maneja el cambio del banco seleccionado.
   * @param {Catalogo} event - El objeto de tipo `Catalogo` que contiene el ID del banco.
   * @returns {void}
   */
  cambioBanco(event: Catalogo): void {
    this.tramiteStore.setBanco(event.id);
  }

  /**
   * Maneja el cambio de la fecha final en el formulario.
   * @param {Event} event - El evento de cambio generado por el input.
   * @returns {void}
   */
  cambioFechaFinal(event: Event): void {
    const FECHA = (event.target as HTMLInputElement).value;
    this.tramiteStore.setFechaInicio(FECHA);
  }

  /**
   * Carga los datos de pago de derechos desde el servicio y los asigna al formulario.
   */
  pagoDeCargarDatos(): void {
    this.acuicolaService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechos) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
  }

  /**
   * Obtiene los datos del banco desde el servicio y los asigna al catálogo de bancos.
   */
  getBancoDatos(): void {
    this.acuicolaService.getBancoDatos()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.banco = {
            labelNombre: 'Banco*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Carga los datos de revisión de pago de derechos desde el servicio y los asigna al formulario.
   */
  pagoDerechosRevision(): void {
    this.acuicolaService
      .getPagoDerechosRevision()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechosRevision) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se encarga de desuscribir los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }

}
