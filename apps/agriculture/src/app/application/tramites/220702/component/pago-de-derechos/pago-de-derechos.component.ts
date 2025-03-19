import { CatalogoSelectComponent, CatalogosSelect, InputFecha, InputFechaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagoDeDerechos, PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { Subject, takeUntil } from 'rxjs';
import { FECHA_DE_PAGO } from '../../constantes/acuicola.enum';
import { FitosanitarioService } from '../../service/fitosanitario.service';



@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {


  /** Formulario reactivo para la captura y visualización de datos de pago de derechos. */
  pagosDeDerechosForm!: FormGroup;

  /** Catálogo de bancos para selección en el formulario. */
  banco!: CatalogosSelect;

  /** Configuración de la fecha de inicio para el campo de fecha en el formulario. */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /** Subject utilizado para gestionar la desuscripción de observables. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb Servicio para la creación de formularios reactivos.
   * @param fitosanitarioService Servicio para interactuar con la lógica de negocio relacionada con la acuicultura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly fitosanitarioService: FitosanitarioService,
  
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
  }

  /**
   * Inicializa el formulario reactivo con los controles y validaciones necesarias.
   */
  iniciarFormulario(): void {
    this.pagosDeDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: ['', Validators.required],
      llaveDePago: ['', Validators.required],
      fechaInicio: ['', Validators.required],
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
   * Carga los datos de pago de derechos desde el servicio y los asigna al formulario.
   */
  pagoDeCargarDatos(): void {
    this.fitosanitarioService
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
    this.fitosanitarioService.getBancoDatos().subscribe((resp) => {
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
    this.fitosanitarioService
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
