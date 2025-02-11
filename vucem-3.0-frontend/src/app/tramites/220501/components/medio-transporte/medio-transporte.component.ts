import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SagarpaService } from '../../../../core/services/220501/sagarpa/sagarpa.service';
import { TEXTOS } from '../../../../shared/constantes/220501/texto-enum';

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
   * Datos del catálogo de medios de transporte.
   */
  datosMediodetransporte!: CatalogosSelect;

  /**
   * Medio de transporte seleccionado.
   */
  medioTransporteSeleccionada!: Catalogo;

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
   */
  constructor(
    private fb: FormBuilder,
    private sagarpaService: SagarpaService
  ) {
    this.crearFormulario();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.obtenerMercanciasDatos();
    this.getMediodetransporte();
  }

  /**
   * Método para crear el formulario de medio de transporte.
   */
  crearFormulario() {
    this.medioTransporteForm = this.fb.group({
      transporteIdMedio: new FormControl('', [Validators.required]),
      identificacionTransporte: new FormControl('', [Validators.maxLength(30)]),
      esSolicitudFerros: new FormControl('', [Validators.required]),
      totalGuias: new FormControl('')
    });
  }

  /**
   * Método para obtener los datos del catálogo de medios de transporte.
   */
  getMediodetransporte(): void {
    this.sagarpaService
      .getMediodetransporte()
      .subscribe((resp) => {
        if (resp.code == 200) {
          const response = resp.data;

          this.datosMediodetransporte = {
            labelNombre: 'Medio de transporte',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: response,
          };
        }
      });
  }

  /**
 * Método para seleccionar el medio de transporte.
 * @param e Medio de transporte seleccionado.
 */
  medioTransporte(e: Catalogo): void {
    this.medioTransporteSeleccionada = e;
  }

  /**
 * Método para establecer la selección de solicitud de ferrocarril.
 * @param e Evento de cambio del input.
 */
  estableceSeleccionSolicitudFerro(e: any) {
    const target = e.target as HTMLInputElement;
    this.esSolicitudFerrosValor = target.value;

    if (this.esSolicitudFerrosValor == 1)
      this.transporteSeleccionado.emit(true);
    else
      this.transporteSeleccionado.emit(false);
    this.mostrarAgregarMercancia = false;
  }

  /**
 * Método para modificar los saldos de mercancía.
 */
  modificarSaldosMercancia() {
    this.obtenerMercanciasDatos();
    this.mostrarAgregarMercancia = true;
  }

  /**
 * Método para obtener los datos de mercancías.
 * @returns Datos de mercancías.
 */
  obtenerMercanciasDatos() {
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
  obtenerAgregarMercanciaEvent(e: boolean) {
    this.mostrarAgregarMercancia = e;
  }
}
