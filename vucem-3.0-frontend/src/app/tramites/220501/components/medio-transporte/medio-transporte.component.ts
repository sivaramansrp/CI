import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { SagarpaService } from '../../../../core/services/220501/sagarpa/sagarpa.service';
import { TEXTOS } from '../../../../shared/constantes/220501/texto-enum';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { map, merge } from 'rxjs';
import { Tramite220501Store } from '../../../../estados/tramites/tramite220501.store';

/**
 * Componente para seleccionar el medio de transporte.
 */
@Component({
  selector: 'medio-transporte',
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss'
})
export class MedioTransporteComponent implements OnInit {

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
  esSolicitudFerrosValor;

  /**
   * Constantes de texto.
   */
  TEXTOS = TEXTOS;

  /**
   * Indica si se debe mostrar el componente de agregar mercancía.
   */
  mostrarAgregarMercancia: boolean = false;

  /**
   * Datos de mercancías.
   */
  mercanciasDatos: any = [];

  /**
   * Columnas de la tabla de mercancías.
   */
  mercanciaMesaColumnas = [
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Nico',
    'Descripción nico',
    'Cantidad Solicitada en UMT',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad total UMT',
    'Saldo pendiente'
  ];

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param sagarpaService Servicio para obtener datos de SAGARPA.
   * @param tramite220501Store Almacén de estado para el trámite 220501.
   */
  constructor(
    private fb: FormBuilder,
    private sagarpaService: SagarpaService,
    private tramite220501Store: Tramite220501Store
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
    this.inicializaCatalogos();

    this.obtenerMercanciasDatos();

    this.medioDeTransporteSeleccion();
  }

  /**
   * Método para crear el formulario de medio de transporte.
   */
  crearFormulario(): void {
    this.medioTransporteForm = this.fb.group({
      medioDeTransporte: new FormControl('', [Validators.required]),
      identificacionTransporte: new FormControl('', [Validators.maxLength(30)]),
      esSolicitudFerros: new FormControl('', [Validators.required]),
      totalGuias: new FormControl('')
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const medioDeTransporte$ = this.sagarpaService
      .getMediodetransporte(CATALOGOS_ID.CAT_MEDIO_DE_TRANSPORTE)
      .pipe(
        map((resp) => {
          this.medioDeTransporte = resp.data;
        })
      );
    merge(
      medioDeTransporte$
    ).subscribe();
  }

  /**
   * Selecciona la clasificación de régimen.
   */
  medioDeTransporteSeleccion(): void {
    const medioDeTransporte = this.medioTransporteForm.get('medioDeTransporte')?.value;
    this.tramite220501Store.setMedioDeTransporte(medioDeTransporte);
  }

  /**
 * Método para establecer la selección de solicitud de ferrocarril.
 * @param e Evento de cambio del input.
 */
  estableceSeleccionSolicitudFerro(e: any): void {
    const target = e.target as HTMLInputElement;
    this.esSolicitudFerrosValor = target.value;

    if (this.esSolicitudFerrosValor == 1) {
      this.transporteSeleccionado.emit(true);
    }
    else {
      this.transporteSeleccionado.emit(false);
    }
    this.mostrarAgregarMercancia = false;
  }

  /**
 * Método para modificar los saldos de mercancía.
 */
  modificarSaldosMercancia(): void {
    this.obtenerMercanciasDatos();
    this.mostrarAgregarMercancia = true;
  }

  /**
 * Método para obtener los datos de mercancías.
 * @returns Datos de mercancías.
 */
  obtenerMercanciasDatos(): void {
    this.mercanciasDatos = [
      {
        tbodyData:
          ['01039201', 'Con pedigree o certificado de alto registro', '00', 'Con pedigree o certificado de alto', '', 'Cabeza', '1000000', '1000C'],
      }
    ];
    return this.mercanciasDatos;
  }

  /**
 * Método para manejar el evento de agregar mercancía.
 * @param e Valor booleano que indica si se debe mostrar el componente de agregar mercancía.
 */
  obtenerAgregarMercanciaEvent(e: boolean): void {
    this.mostrarAgregarMercancia = e;
  }
}
