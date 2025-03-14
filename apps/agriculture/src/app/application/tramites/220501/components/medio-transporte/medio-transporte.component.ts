import { CATALOGOS_ID } from '../../constantes/constantes';
import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MedioTransporte } from '../../models/medio-transporte.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { SagarpaQuery } from '../../estados/sagarpa.query';
import { SagarpaService } from '../../services/sagarpa/sagarpa.service';
import { SagarpaStore } from '../../estados/sagarpa.store';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/texto-enum';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import mercanciaTable from '../../../../../../../../../libs/shared/theme/assets/json/220501/mercancia-table.json';
import { merge } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para seleccionar el medio de transporte.
 */
@Component({
  selector: 'app-medio-transporte',
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss',
})
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
  esSolicitudFerrosValor! : number;

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
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param sagarpaService Servicio para obtener datos de SAGARPA.
   * @param SagarpaStore Almacén de estado para el trámite 220501.
   */
  constructor(
    private fb: FormBuilder,
    private sagarpaService: SagarpaService,
    private store: SagarpaStore,
    private query: SagarpaQuery
  ) {
    this.crearFormulario();
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

      this.query.seleccionarMedioTransporte$
        .pipe(
          takeUntil(this.destroyed$),
          map((data: MedioTransporte) => {
            this.medioTransporteForm.patchValue({
              medioDeTransporte: data.medioDeTransporte,
              identificacionTransporte: data.identificacionTransporte,
              esSolicitudFerros: data.esSolicitudFerros,
              totalGuias: data.totalGuias,
            });
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
      medioDeTransporte: new FormControl('', [Validators.required]),
      identificacionTransporte: new FormControl('', [Validators.maxLength(30)]),
      esSolicitudFerros: new FormControl('', [Validators.required]),
      totalGuias: new FormControl('', [Validators.maxLength(50)]),
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const MEDIODETRANSPORTE$ = this.sagarpaService
      .getMediodetransporte(CATALOGOS_ID.CAT_MEDIO_DE_TRANSPORTE)
      .pipe(
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
    this.mercanciaBodyData = this.getMercanciaTableData.tableBody;
  }

  /**
   * Selecciona la clasificación de régimen.
   */
  medioDeTransporteSeleccion(event: Catalogo): void {
    this.store.actualizarMedioDetransporte(event.descripcion);
  }

  /**
   * Método para establecer la selección de solicitud de ferrocarril.
   * @param e Evento de cambio del input.
   */
  estableceSeleccionSolicitudFerro(e: Event): void {
    const TARGET = e.target as HTMLInputElement;
    this.esSolicitudFerrosValor = Number(TARGET.value);

    if (this.esSolicitudFerrosValor === 1) {
      this.transporteSeleccionado.emit(true);
    } else {
      this.transporteSeleccionado.emit(false);
    }
    this.mostrarAgregarMercancia = false;
    this.store.actualizarFerrocarrilPorPartes(this.esSolicitudFerrosValor);
  }

  /**
 * Método para modificar los saldos de mercancía.
 */
  modificarSaldosMercancia(): void {
    this.obtenerMercancia();
    this.mostrarAgregarMercancia = true;
  }

  /**
 * Método para manejar el evento de agregar mercancía.
 * @param e Valor booleano que indica si se debe mostrar el componente de agregar mercancía.
 */
  obtenerAgregarMercanciaEvent(e: boolean): void {
    this.mostrarAgregarMercancia = e;
  }

  /** 
   * Obtiene el valor de la identificación del transporte desde el formulario 
   * y actualiza el store con dicho valor.
   */
  getIdentificacionTransporte(): void {
    const VALUE = this.medioTransporteForm.get('identificacionTransporte')?.value;
    this.store.actualizarIdentificacionDelTransporte(VALUE);
  }

  /** 
   * Obtiene el valor del total de guías amparadas desde el formulario 
   * y actualiza el store con dicho valor.
   */
  getTotalGuiasAmparadas(): void {
    const VALUE = this.medioTransporteForm.get('totalGuias')?.value;
    this.store.actualizarTotalDeGuiasAmparadas(VALUE);
  }


      /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Desuscribe el componente de todos los observables.
   * @returns {void}
   * */
      ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
      }
}
