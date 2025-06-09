import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260605State, Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import {Subject, Subscription, map, takeUntil } from 'rxjs';
import { Aduana } from '../../models/aduaneras-informaciones.model';
import { CommonModule } from '@angular/common';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
/**
 * Componente para gestionar el formulario de información aduanera.
 * 
 * @export
 * @class AduanerasInformacionesComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
/**
 * Componente para gestionar la información aduanera en el formulario de trámites.
 * 
 * Este componente permite seleccionar, agregar y remover aduanas disponibles,
 * así como gestionar el estado del formulario reactivo relacionado con la información aduanera.
 * 
 * @export
 * @class AduanerasInformacionesComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-aduaneras-informaciones',
  standalone: true,
  templateUrl: './aduaneras-informaciones.component.html',
  styleUrls: ['./aduaneras-informaciones.component.scss'],
  imports: [CommonModule, FormsModule,ReactiveFormsModule]
})
export class AduanerasInformacionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la información aduanera.
   * 
   * @type {FormGroup}
   * @memberof AduanerasInformacionesComponent
   */
  aduanerasInformacionesForm!: FormGroup;

  /**
   * Aduanas seleccionadas.
   * 
   * @type {{ id: number; name: string }[]}
   * @memberof AduanerasInformacionesComponent
   */
  aduanasSeleccionadas: { id: number; name: string }[] = [];

  /**
   * Aduanas disponibles.
   * 
   * @type {{ id: number; name: string }[]}
   * @memberof AduanerasInformacionesComponent
   */
  aduanasDisponibles:Aduana[] = [];

  /**
   * Índice seleccionado para agregar o remover aduanas.
   * 
   * @type {number}
   * @memberof AduanerasInformacionesComponent
   */
  indiceSeleccionado: number = 0;

  /**
   * Índice para remover aduanas.
   * 
   * @type {number}
   * @memberof AduanerasInformacionesComponent
   */
  indiceRemover: number = 0;

  /**
   * Suscripción a los cambios en el formulario.
   * 
   * @private
   * @type {Subscription}
   * @memberof AduanerasInformacionesComponent
   */
  private subscription: Subscription = new Subscription();

  /**
   * Sujeto para notificar la destrucción del componente.
   * 
   * @private
   * @type {Subject<void>}
   * @memberof AduanerasInformacionesComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud.
   * 
   * @type {Solicitud260605State}
   * @memberof AduanerasInformacionesComponent
   */
  public solicitudState!: Solicitud260605State;

  /**
   * Indica si el formulario es válido.
   * 
   * @type {boolean}
   * @memberof AduanerasInformacionesComponent
   */
  esFormularioValido: boolean = false;

  /**
   * Crea una instancia de AduanerasInformacionesComponent.
   * 
   * @param {FormBuilder} fb - Instancia de FormBuilder.
   * @param {Tramite260605Store} tramite260605Store - Store para gestionar el estado.
   * @param {Tramite260605Query} tramite260605Query - Query para obtener el estado.
   * @memberof AduanerasInformacionesComponent
   */
  constructor(
    private fb: FormBuilder,
    private tramite260605Store: Tramite260605Store,
    private tramite260605Query: Tramite260605Query,
    private modificatNoticeService: ModificatNoticeService
  ) {
    // Initialization logic if needed
  }

  /**
   * Inicializa el componente.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  ngOnInit(): void {
    this.subscription.add(
      this.tramite260605Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );

    this.aduanerasInformacionesForm = this.fb.group({
      numeroDePermiso: [this.solicitudState?.numeroDePermiso, Validators.required],
      cstumbresAtuales: [this.solicitudState?.costumbresActuales, Validators.required],
    });
    this.obteneraduanasDisponiblesdatos();
  }


  /**
   * Obtiene la lista de aduanas disponibles desde el servicio `modificatNoticeService`
   * y actualiza la propiedad `aduanasDisponibles` con la respuesta obtenida.
   *
   * @returns {void} No retorna ningún valor.
   */
  public obteneraduanasDisponiblesdatos(): void {
    this.modificatNoticeService.obteneraduanasDisponiblesdatos().subscribe((response) => {
     this.aduanasDisponibles = response;
    });
  }


  /**
   * Método ejecutado cuando se envía el formulario.
   * Establece la variable `esFormularioValido` a `true`.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  enEnviar(): void {
    this.esFormularioValido = true;
  }

  /**
   * Establece valores en el store.
   * 
   * @param {FormGroup} form - El grupo de formularios.
   * @param {string} campo - El nombre del campo.
   * @param {keyof Tramite260605Store} metodoNombre - El nombre del método del store.
   * @memberof AduanerasInformacionesComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260605Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260605Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Establece el índice seleccionado.
   * 
   * @param {number} indice - El índice a establecer.
   * @param {string} tipo - El tipo de operación ('add' o 'remove').
   * @memberof AduanerasInformacionesComponent
   */
  setIndiceSeleccionado(indice: number, tipo: string): void {
    if (tipo === 'add') {
      this.indiceSeleccionado = indice;
    } else if (tipo === 'remove') {
      this.indiceRemover = indice;
    }
  }

  /**
   * Agrega todas las aduanas disponibles a las aduanas seleccionadas.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  agregarTodasAduanas(): void {
    while (this.aduanasDisponibles.length) {
      const ADUANA = this.aduanasDisponibles.at(0);
      if (ADUANA) {
        this.aduanasSeleccionadas.push(ADUANA);
      }
      this.aduanasDisponibles.splice(0, 1);
    }
  }

  /**
   * Agrega aduanas seleccionadas a las aduanas seleccionadas.
   * 
   * @param {number[]} indicesSeleccionados - Los índices de las aduanas a agregar.
   * @memberof AduanerasInformacionesComponent
   */
  agregarAduanasSeleccionadas(indicesSeleccionados: number[]): void {
    indicesSeleccionados.sort((a, b) => b - a).forEach(indice => {
      const ADUANA = this.aduanasDisponibles.at(indice);
      if (ADUANA) {
        this.aduanasSeleccionadas.push(ADUANA);
      }
      this.aduanasDisponibles.splice(indice, 1);
    });
  }

  /**
   * Remueve aduanas seleccionadas de las aduanas seleccionadas.
   * 
   * @param {number[]} indicesSeleccionados - Los índices de las aduanas a remover.
   * @memberof AduanerasInformacionesComponent
   */
  removerAduanasSeleccionadas(indicesSeleccionados: number[]): void {
    indicesSeleccionados.sort((a, b) => b - a).forEach(indice => {
      const ADUANA = this.aduanasSeleccionadas.at(indice);
      if (ADUANA) {
        this.aduanasDisponibles.push(ADUANA);
      }
      this.aduanasSeleccionadas.splice(indice, 1);
    });
  }

  /**
   * Remueve todas las aduanas seleccionadas.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  removerTodasAduanas(): void {
    while (this.aduanasSeleccionadas.length) {
      const ADUANA = this.aduanasSeleccionadas.at(0);
      if (ADUANA) {
        this.aduanasDisponibles.push(ADUANA);
      }
      this.aduanasSeleccionadas.splice(0, 1);
    }
  }

  /**
   * Establece las aduanas seleccionadas en el store.
   * 
   * @param {keyof Tramite260605Store} metodoNombre - El nombre del método del store.
   * @param {{ id: number; name: string }[]} values - Las aduanas seleccionadas.
   * @memberof AduanerasInformacionesComponent
   */
  setAduanasSeleccionadas(metodoNombre: keyof Tramite260605Store, values: { id: number; name: string }[]): void {
    (this.tramite260605Store[metodoNombre] as (value: { id: number; name: string }[]) => void)(values);
  }

  /**
   * Destruye el componente.
   * 
   * @memberof AduanerasInformacionesComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}