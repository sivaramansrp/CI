import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DomiciliosDePlantasTabla } from '@libs/shared/data-access-user/src/core/models/90202/expansion-de-productores.model';
import DomiciliosTabla from '@libs/shared/theme/assets/json/90202/domicilios-de-plantas-tabla.json';
import { map, Subject, takeUntil } from 'rxjs';
/**
 * Componente que representa la sección de domicilios de plantas en el formulario.
 * Este componente incluye un formulario reactivo y una tabla dinámica para mostrar los domicilios.
 *
 * @export
 * @class DomiciliosDePlantasComponent
 */
@Component({
  selector: 'app-domicilios-de-plantas',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, ReactiveFormsModule],
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss',
})
export class DomiciliosDePlantasComponent implements OnInit, OnDestroy {
  /**
   * Un grupo de formularios que representa los domicilios de las plantas.
   * Este formulario se utiliza para capturar y validar la información de los domicilios.
   */
  public formDomiciliosDePlantas!: FormGroup;

  /**
   * Configuración de la tabla para los domicilios de plantas.
   *
   * Esta configuración define las columnas que se mostrarán en la tabla,
   * incluyendo el encabezado, la clave para acceder al valor en cada fila
   * y el orden en que se mostrarán las columnas.
   *
   * @type {ConfiguracionColumna<any>[]} configuracionTabla - Arreglo de configuraciones de columnas.
   * @property {string} encabezado - El texto que se mostrará en el encabezado de la columna.
   * @property {Function} clave - Función que recibe un elemento y devuelve el valor correspondiente a la columna.
   * @property {number} orden - El orden en que se mostrará la columna en la tabla.
   */
  public configuracionTabla: ConfiguracionColumna<DomiciliosDePlantasTabla>[] =
    [
      {
        encabezado: 'Calle',
        clave: (item: DomiciliosDePlantasTabla) => item.calle,
        orden: 1,
      },
      {
        encabezado: 'Número exterior',
        clave: (item: DomiciliosDePlantasTabla) => item.numero,
        orden: 2,
      },
      {
        encabezado: 'Número interior',
        clave: (item: DomiciliosDePlantasTabla) => item.interior,
        orden: 3,
      },
      {
        encabezado: 'Código postal',
        clave: (item: DomiciliosDePlantasTabla) => item.postal,
        orden: 4,
      },
      {
        encabezado: 'Colonia',
        clave: (item: DomiciliosDePlantasTabla) => item.colonia,
        orden: 5,
      },
      {
        encabezado: 'Municipio o alcaldía',
        clave: (item: DomiciliosDePlantasTabla) => item.municipio,
        orden: 6,
      },
      {
        encabezado: 'Estado',
        clave: (item: DomiciliosDePlantasTabla) => item.estado,
        orden: 7,
      },
      {
        encabezado: 'País',
        clave: (fila: DomiciliosDePlantasTabla) => fila.pais,
        orden: 8,
      },
      {
        encabezado: 'Registro',
        clave: (fila: DomiciliosDePlantasTabla) => fila.registro,
        orden: 9,
      },
      {
        encabezado: 'Registro federal de contribuyentes',
        clave: (fila: DomiciliosDePlantasTabla) =>
          fila.registroFederalDeContribuyentes,
        orden: 10,
      },
      {
        encabezado: 'Razón social',
        clave: (fila: DomiciliosDePlantasTabla) => fila.razonSocial,
        orden: 11,
      },
      {
        encabezado: 'Domicilio fiscal del solicitante',
        clave: (fila: DomiciliosDePlantasTabla) =>
          fila.domicilioFiscalDelSolicitante,
        orden: 12,
      },
    ];

  /**
   * Un arreglo de objetos `DomiciliosDePlantasTabla` que representa la tabla de domicilios.
   * Inicializado con los valores de `DomiciliosTabla`.
   */
  public domiciliosTabla: DomiciliosDePlantasTabla[] = DomiciliosTabla;

  /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Bandera para determinar si el formulario es de actualización.
   * Inicialmente establecido en `false`.
   *
   * @description Esta bandera se utiliza para controlar la lógica de actualización del formulario.
   */
  private esFormularioActualizacion: boolean = false;

  /**
   * Un Subject que se utiliza para notificar la destrucción del componente.
   * Se usa para limpiar las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de DomiciliosDePlantasComponent.
   * Inicializa el formulario para domicilios de plantas.
   *
   * @param fb - Una instancia de FormBuilder utilizada para crear el formulario.
   */
  constructor(
    private fb: FormBuilder,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.establecerFormDomiciliosDePlantas();
    // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioActualizacion = seccionState.update;
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama a `inicializarEstadoFormulario` para establecer el estado del formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de estados.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      // Si el formulario es editable, se inicializa el formulario.
    }
  }

  /**
   * Carga datos y deshabilita el formulario si es solo lectura.
   */
  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formDomiciliosDePlantas.disable();
    } else {
      this.formDomiciliosDePlantas.enable();
    }
  }

  /**
   * Inicializa el grupo de formularios para "Domicilios de Plantas" con valores predeterminados y campos deshabilitados.
   *
   * El grupo de formularios contiene los siguientes controles:
   * - `representacionFederal`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   * - `actividadProductiva`: Un control de formulario deshabilitado con una cadena vacía como valor predeterminado.
   */
  public establecerFormDomiciliosDePlantas(): void {
    this.formDomiciliosDePlantas = this.fb.group({
      representacionFederal: [{ value: '', disabled: true }],
      actividadProductiva: [{ value: '', disabled: true }],
    });
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Limpia las suscripciones y libera recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
