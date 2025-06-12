import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo, InputFecha, TituloComponent } from '@libs/shared/data-access-user/src';

import { ReplaySubject, map, takeUntil } from 'rxjs';

import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { CommonModule } from '@angular/common';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';

import { BANCO_DATA } from '../../constants/catalogs.enum';
import { Solicitud260915Query } from '../../estados/tramites260915.query';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente para gestionar el pago de derechos en el trámite 260915.
 * Permite capturar, mostrar y validar la información relacionada con el pago de derechos,
 * incluyendo la selección de banco, fecha y monto de pago, así como el manejo de estados
 * de solo lectura y la integración con el store de la solicitud.
 *
 * @selector app-pago-de-derecho
 * @standalone true
 * @imports [
 *   CommonModule,
 *   ReactiveFormsModule,
 *   TituloComponent,
 *   CatalogoSelectComponent,
 *   InputFechaComponent
 * ]
 * @templateUrl ./pago-de-derecho.component.html
 * @styleUrl ./pago-de-derecho.component.scss
 */
@Component({
  selector: 'app-pago-de-derecho',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
})
export class PagoDeDerechoComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario está en modo solo lectura.
   * Se actualiza automáticamente según el estado de la consulta.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Formulario reactivo para gestionar los datos del pago de derechos.
   */
  pagoDeDerechosForm!: FormGroup;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   * Se completa en el método ngOnDestroy.
   * @private
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Estado del pago de derechos que se está gestionando.
   * Se utiliza para almacenar y manipular la información de la solicitud 260915.
   */
  pagoDeDerechosState!: Solicitud260915State;

  /**
   * Datos del catálogo de bancos.
   * Se utiliza para poblar el selector de bancos en el formulario.
   */
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
   * Constructor del componente.
   * Inicializa las dependencias y suscribe el estado de solo lectura.
   *
   * @param permisosanitariodisposivos Servicio para obtener datos de bancos.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param cdr ChangeDetectorRef para detectar cambios.
   * @param solicitud260915Store Almacén de estado para el trámite 260915.
   * @param solicitud260915Query Consulta de estado para el trámite 260915.
   * @param consultaioQuery Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private solicitud260915Store: Solicitud260915Store,
    private solicitud260915Query: Solicitud260915Query,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe el estado de la solicitud y prepara el formulario y los datos de bancos.
   */
  ngOnInit(): void {
    this.solicitud260915Query.selectSolicitud260915$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosState = seccionState;
        })
      )
      .subscribe();

    this.inicializarEstadoFormulario();
    this.getBancoData();
  }

  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();

    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    } else {
      this.pagoDeDerechosForm.enable();
    }
  }

  /**
   * Obtiene los datos del catálogo de bancos desde el servicio correspondiente.
   * Actualiza el catálogo de bancos utilizado en el formulario.
   */
  getBancoData(): void {
    this.permisosanitariodisposivos
      .getBancoData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.bancoData.catalogos = data as Catalogo[];
      });
  }

  /**
   * Crea el formulario reactivo para gestionar los datos del pago de derechos.
   * Inicializa los controles y sus validaciones.
   */
  crearFormulario(): void {
    this.pagoDeDerechosForm = this.fb.group({
      pagoDeDerechos: this.fb.group({
        clavedereferencia: [this.pagoDeDerechosState?.clavedereferencia, Validators.required],
        cadenadeladependencia: [this.pagoDeDerechosState?.cadenadeladependencia, Validators.required],
        banco: [this.pagoDeDerechosState?.banco, Validators.required],
        llavedepago: [this.pagoDeDerechosState?.llavedepago, Validators.required],
        fechadepago: [this.pagoDeDerechosState?.fechadepago, Validators.required],
        importedepago: [this.pagoDeDerechosState?.importedepago, Validators.required],
      }),
    });
  }

  /**
   * Método para seleccionar la fecha de inicio.
   * Actualiza la fecha de pago en el store con el evento recibido.
   * @param evento Fecha seleccionada en formato de cadena.
   */
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260915Store.getValue().fechadepago = evento;
  }

  /**
   * Limpia los datos del formulario, manteniendo el valor seleccionado del banco.
   */
  clearForm(): void {
    const BANCO_VALUE = this.pagoDeDerechos.get('banco')?.value; 
    this.pagoDeDerechosForm.reset();
    this.pagoDeDerechos.get('banco')?.setValue(BANCO_VALUE); 
  }

  /**
   * Getter para obtener el formulario de pago de derechos.
   * Permite acceder a los controles internos del formulario.
   */
  get pagoDeDerechos(): FormGroup {
    return this.pagoDeDerechosForm.get('pagoDeDerechos') as FormGroup;
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo del cual se obtiene el valor.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValoresStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.solicitud260915Store.setTramite260915State({
      [control]: VALOR
    });
  }

  /**
   * Hook de ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}