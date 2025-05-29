import { AlertComponent, Catalogo, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs';

import { AgregarMercanciaComponent } from '../agregar-mercancia/agregar-mercancia.component';
import { MercanciaTabla } from '../../models/medio-transporte.model';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/sagarpa.enum';
import { SagarpaService } from '../../services/sagarpa/sagarpa.service';
import { Solicitud220501Query } from '../../estados/tramites220501.query';
import { Solicitud220501State } from '../../estados/tramites220501.store';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
import { TEXTOS } from '../../constantes/texto-enum';
import mercanciaTable from '@libs/shared/theme/assets/json/220501/mercancia-table.json';

/**
 * Componente para seleccionar el medio de transporte.
 */
@Component({
  selector: 'app-medio-transporte',
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, TituloComponent, CommonModule, CatalogoSelectComponent,
    InputRadioComponent, AlertComponent, TableComponent, AgregarMercanciaComponent
  ],
})
/**
 * Componente que permite seleccionar el medio de transporte para una solicitud.
 * Utiliza Reactive Forms para la gestión del formulario y RxJS para la gestión de datos asíncronos.
 * 
 * @class MedioTransporteComponent
 */
export class MedioTransporteComponent implements OnInit, OnDestroy {
  /**
   * Evento emitido cuando se selecciona un medio de transporte.
   */
  @Output() transporteSeleccionado = new EventEmitter<boolean>();

  /**
   * Formulario para seleccionar el medio de transporte.
   */
  medioTransporteForm!: FormGroup;

  /**
   * Lista de catálogos de medio de transporte
   */
  medioDeTransporte!: Catalogo[];

  /**
  * Indica si se debe mostrar una advertencia.
  */
  mostrarAdvertencia: boolean = false;

  /**
   * Indica si es una solicitud de ferrocarril.
   */
  esSolicitudFerrosValor!: number | string;

  /**
   * Constantes de texto.
   */
  TEXTOS = TEXTOS;

  /**
   * Indica si se debe mostrar el componente de agregar mercancía.
   */
  mostrarAgregarMercancia: boolean = false;

  /**
   * Array que contiene los datos del encabezado para la tabla de mercancías.
   */
  public mercanciaHeaderData: string[] = [];

  /**
   * Variable que contiene los datos del cuerpo para la tabla de mercancías.
   * El tipo se establece como unknown para permitir flexibilidad en la estructura de los datos.
   */
  public mercanciaBodyData = [
    {
      /**
       * Datos de la mercancía en formato de tabla.
       * @type {string[]}
       */
      tbodyData: [] as string[],
    },
  ];

  /**
   * Variable que contiene los datos para la tabla de mercancías.
   * Estos datos se importan desde un archivo JSON externo.
   */
  public getMercanciaTableData = mercanciaTable;

  /**
    * Subject para desuscribirse de los observables.
    * @type {Subject<void>}
    */
  private destroyed$ = new Subject<void>();

  /** 
   * Estado de la solicitud 220501. 
   * Se inicializa como un objeto vacío con la estructura de Solicitud220501State.
   */
  solicitud220501State: Solicitud220501State = {} as Solicitud220501State;

  /** 
   * Variable que almacena las opciones disponibles para el botón de radio. 
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param sagarpaService Servicio para obtener datos de SAGARPA.
   * @param SagarpaStore Almacén de estado para el trámite 220501.
   */
  constructor(
    private fb: FormBuilder,
    private sagarpaService: SagarpaService,
    public solicitud220501Store: Solicitud220501Store,
    public solicitud220501Query: Solicitud220501Query
  ) {
    // Constructor vacío
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * 1. Inicializa los catálogos necesarios para el formulario.
   * 2. Obtiene los datos de las mercancías.
   * 3. Selecciona el medio de transporte.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.solicitud220501Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((data: Solicitud220501State) => {
          this.solicitud220501State = data;
          this.medioTransporteForm.patchValue({
            medioDeTransporte: this.solicitud220501State.medioDeTransporte,
            identificacionTransporte: this.solicitud220501State.identificacionTransporte,
            esSolicitudFerros: this.solicitud220501State.esSolicitudFerros,
            totalGuias: this.solicitud220501State.totalGuias,
          });
          this.mercanciaBodyData = [
            {
              tbodyData: this.solicitud220501State.mercanciaTablaDatos,
            }
          ]
          if (this.solicitud220501State.esSolicitudFerros === '1') {
            this.esSolicitudFerrosValor = '1';
            this.mostrarAgregarMercancia = this.solicitud220501State.mostrarAgregarMercancia;
          }
        })
      )
      .subscribe();
    this.inicializaCatalogos();
    this.obtenerMercancia();
  }

  /**
   * Método para crear el formulario de medio de transporte.
   */
  crearFormulario(): void {
    this.medioTransporteForm = this.fb.group({
      medioDeTransporte: new FormControl(this.solicitud220501State.medioDeTransporte, [Validators.required]),
      identificacionTransporte: new FormControl(this.solicitud220501State.identificacionTransporte, [Validators.maxLength(30)]),
      esSolicitudFerros: new FormControl(this.solicitud220501State.esSolicitudFerros, [Validators.required]),
      totalGuias: new FormControl(this.solicitud220501State.totalGuias, [Validators.maxLength(50)]),
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const MEDIODETRANSPORTE$ = this.sagarpaService
      .getMediodetransporte()
      .pipe(
        takeUntil(this.destroyed$),
        map((resp) => {
          this.medioDeTransporte = resp.data;
        })
      );
    merge(MEDIODETRANSPORTE$).subscribe();
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
    if (this.solicitud220501State.mercanciaTablaDatos.length <= 0) {
      this.mercanciaBodyData = this.getMercanciaTableData.tableBody;
    }
    this.solicitud220501Store.setMercanciaTablaDatos(this.mercanciaBodyData[0].tbodyData);
  }

  /**
   * Método para actualizar los datos de la mercancía en la tabla.
   * 
   * @param datos Datos de la mercancía a actualizar.
   */
  actualizarMercanciaEnTabla(datos: MercanciaTabla): void {
    this.mercanciaBodyData[0].tbodyData = [
      datos.fraccionArancelaria,
      datos.descripcionFraccion,
      datos.nico,
      datos.descripcion,
      datos.saldoACapturar,
      datos.unidaddeMedidaDeUMT,
      datos.cantidadTotalUMT,
      datos.saldoPendiente
    ];
    this.solicitud220501Store.setMercanciaTablaDatos(this.mercanciaBodyData[0].tbodyData);
    this.mostrarAgregarMercancia = false;
  }

  /**
   * Selecciona la clasificación de régimen.
   */
  medioDeTransporteSeleccion(event: Catalogo): void {
    this.solicitud220501Store.setMedioDeTransporte(event.id);
  }

  /**
   * Método para establecer la selección de solicitud de ferrocarril.
   * @param e Evento de cambio del input.
   */
  estableceSeleccionSolicitudFerro(value: number | string): void {
    this.esSolicitudFerrosValor = value;
    if (this.esSolicitudFerrosValor === '1') {
      this.transporteSeleccionado.emit(true);
    } else if (this.esSolicitudFerrosValor === '0') {
      this.transporteSeleccionado.emit(false);
    }
    this.mostrarAgregarMercancia = false;
    this.solicitud220501Store.setMostrarAgregarMercancia(this.mostrarAgregarMercancia)
    this.solicitud220501Store.setEsSolicitudFerros(this.esSolicitudFerrosValor)
  }

  /**
   * Método para modificar los saldos de mercancía.
   */
  modificarSaldosMercancia(): void {
    this.obtenerMercancia();
    this.mostrarAgregarMercancia = true;
    this.solicitud220501Store.setMostrarAgregarMercancia(this.mostrarAgregarMercancia)
  }

  /**
   * Método para manejar el evento de agregar mercancía.
   * @param e Valor booleano que indica si se debe mostrar el componente de agregar mercancía.
   */
  obtenerAgregarMercanciaEvent(e: boolean): void {
    this.mostrarAgregarMercancia = e;
    this.solicitud220501Store.setMostrarAgregarMercancia(this.mostrarAgregarMercancia)
  }

  /** 
   * Obtiene el valor de la identificación del transporte desde el formulario 
   * y actualiza el store con dicho valor.
   */
  getIdentificacionTransporte(): void {
    const VALUE = this.medioTransporteForm.get('identificacionTransporte')?.value;
    this.solicitud220501Store.setIdentificacionTransporte(VALUE);
  }

  /** 
   * Obtiene el valor del total de guías amparadas desde el formulario 
   * y actualiza el store con dicho valor.
   */
  getTotalGuiasAmparadas(): void {
    const VALUE = this.medioTransporteForm.get('totalGuias')?.value;
    this.solicitud220501Store.setTotalGuias(VALUE);
  }

  /**
  * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
  * Desuscribe el componente de todos los observables.
  * @returns {void}
  */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}