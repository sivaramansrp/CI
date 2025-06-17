import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { COMPLEMENTO_DE_PLANTA } from '../../constantes/complementar-planta.enum';
import { FECHA_DE_FIN_DE_VIGENCIA } from '../../constantes/complementar-planta.enum';
import { FECHA_DE_FIRMA } from '../../constantes/complementar-planta.enum';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { map, Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar la información complementaria de planta.
 * @class ComplementarPlantaComponent
 */
@Component({
  selector: 'app-complementar-planta',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './complementar-planta.component.html',
  styleUrl: './complementar-planta.component.scss',
})
export class ComplementarPlantaComponent {
  
   complementarForm!: FormGroup;
   /**
   * Constructor de la clase ComplementarPlantaComponent.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(private ubicaccion: Location, private fb: FormBuilder,private complementarStore: ComplementarStore,
    private complementarQuery: ComplementarQuery,) {
    this.inicializarFormulario()
  }
  /**
   * Configuración de la fecha de firma.
   * @property {InputFecha} fetchaDeFirma
   */
  fetchaDeFirma: InputFecha = FECHA_DE_FIRMA;

  /**
   * Configuración de la fecha de fin de vigencia.
   * @property {InputFecha} fetchaDeFinDeVigencia
   */
  fetchaDeFinDeVigencia: InputFecha = FECHA_DE_FIN_DE_VIGENCIA;

  /**
   * Opciones disponibles para mercancía programa.
   * @property {Array} permaneceraMercanciaProgramaOptions
   */
   permaneceraMercanciaProgramaOptions =[{ "id": 1, "descripcion": "GUADALAJARA" }];


  /**
   * Opciones disponibles para documentos.
   * @property {Array} documentoOptions
   */
  documentoOptions =[{ "id": 1, "descripcion": "GUADALAJARA" }];


  /**
   * Tipo de selección para la tabla de complemento de planta.
   * @property {TablaSeleccion} complecomplementoDePlantaTableSelection
   */
  complecomplementoDePlantaTableSelection = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de complemento de planta.
   * @property {any} complementoDePlantaEncabezado
   */
  complementoDePlantaEncabezado = COMPLEMENTO_DE_PLANTA;
  /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: ComplementarState;
  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Datos para la tabla de complemento de planta.
   * @property {Array} complementoDePlantaDatos
   */
  complementoDePlantaDatos = [];
   inicializarFormulario(): void {
     this.complementarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as ComplementarState;
        })
      )
      .subscribe();
      this.complementarForm = this.fb.group({
      permanecera: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaDeFirma: ['', Validators.required],
      fetchaDeFinDeVigencia: ['', Validators.required],
    });
  }
 /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambioFechaFinal(nuevo_valor: string): void {
    this.complementarForm.patchValue({
      fechaDeFirma: nuevo_valor,
    });
    this.complementarStore.setFechaDeFirma(nuevo_valor);
  }
   /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambioFechaFinale(nuevo_valor: string): void {
    this.complementarForm.patchValue({
      fetchaDeFinDeVigencia: nuevo_valor,
    });
    this.complementarStore.setFetchaDeFinDeVigencia(nuevo_valor);
  }
  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }

/**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof ComplementarStore): void {
    const VALOR = form.get(campo)?.value;
    (this.complementarStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }
    
}
