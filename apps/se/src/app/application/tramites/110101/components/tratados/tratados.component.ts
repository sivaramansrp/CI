/* eslint-disable @nx/enforce-module-boundaries */
import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { MENSAJE_ALERTA_TRATADOS } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { TratadosQuery } from '../../estados/queries/tratados110101.query';
import { TratadosStore } from '../../estados/tramites/tratados110101.store';
import tratadosDropdown from 'libs/shared/theme/assets/json/110101/tratdos-dropdown.json';
import tratadosTable from 'libs/shared/theme/assets/json/110101/tratados-table.json';

/**
 * Componente Tratados que se utiliza para mostrar y gestionar los tratados.
 * 
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * TableComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 * 
 * @component
 */
@Component({
  selector: 'app-tratados',
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    TableComponent,
    AlertComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ]
})
export class TratadosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los tratados.
   * 
   * @property {FormGroup} formularioTratados - El formulario reactivo que contiene los campos para los tratados.
   */
  formularioTratados!: FormGroup;

  /**
  * **Subject utilizado para manejar la destrucción de suscripciones**
  * 
  * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
  * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();


  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private tratadosStore: TratadosStore,
    private tratadosQuery: TratadosQuery
    // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Llama al método `inicializarFormularioTratados` para configurar el formulario reactivo.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.inicializarFormularioTratados();
    this.restaurarValoresFormulario();
    this.formularioTratados.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.actualizarEstado());
  }

  /**
   * Inicializa el formulario reactivo para los tratados.
   * 
   * Este método configura el formulario reactivo con los campos `pais`, `tratado` y `origen`,
   * todos ellos con validadores requeridos.
   * 
   * @method inicializarFormularioTratados
   */

  inicializarFormularioTratados(): void {
    this.formularioTratados = this.fb.group({
      pais: ['', Validators.required],
      tratado: ['', Validators.required],
      origen: ['', Validators.required]
    });
  }

  /**
   * Mensaje de alerta para tratados.
   * 
   * @property {string} alert - El mensaje de alerta que se mostrará en el componente.
   */

  alerta = MENSAJE_ALERTA_TRATADOS;



  /**
   * Configuraciones de los menús desplegables.
   * 
   * @property {Array} configuracionesDropdown - Array de objetos que contienen los catálogos para los menús desplegables.
   */
  configuracionesDropdown = [
    { catalogos: tratadosDropdown.pais },
    { catalogos: tratadosDropdown.tratado },
    { catalogos: tratadosDropdown.origen }
  ];



  /**
   * Método para seleccionar un tratado.
   * 
   * Este método actualmente no tiene implementación. Puede ser implementado según los requisitos
   * o eliminado si no es necesario.
   * 
   * @method seleccionar
   */
  // eslint-disable-next-line class-methods-use-this
  seleccionar(): void {
    // Implementar el método o eliminarlo si no es necesario
  }

  /**
   * Encabezados comunes de la tabla de tratados.
   * 
   * @property {string[]} encabezadosComunesTabla - Array de cadenas de encabezados de tabla.
   */
  encabezadosComunesTabla = tratadosTable.tableHeader;

  /**
   * Cuerpo de la tabla de tratados.
   * 
   * @property {any[]} cuerpoTabla - Array de datos del cuerpo de la tabla.
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cuerpoTabla: any[] = tratadosTable.tableBody;


  // eslint-disable-next-line class-methods-use-this
  /**
   * Agrega un nuevo tratado a la tabla.
   * 
   * Este método verifica si el formulario es válido, y si lo es, agrega el nuevo tratado
   * al cuerpo de la tabla y reinicia el formulario.
   * 
   * @method agregarTratado
   */
  agregarTratado(): void {
    if (this.formularioTratados.valid) {
      this.formularioTratados.reset();
    }
  }


  /**
   * **Restaura los valores del formulario a partir del estado de la tienda**
   * 
   * Suscribe a `selectTratados$` para actualizar la tabla y el formulario con el último tratado almacenado.
   * - Si hay tratados en el estado, se asigna el último al formulario.
   * - Si no hay tratados, se restablece el formulario.
   * - La suscripción se gestiona con `takeUntil(this.destroy$)` para evitar fugas de memoria.
   */
  private restaurarValoresFormulario(): void {
    this.tratadosQuery.selectTratados$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tratados) => {
        this.cuerpoTabla = tratados;

        if (tratados.length > 0) {
          const ULTIMOTRATADO = tratados[tratados.length - 1];
          this.formularioTratados.patchValue(ULTIMOTRATADO, { emitEvent: false });
        } else {
          this.formularioTratados.reset();
        }
      });
  }


  /**
   * **Actualiza el estado de la tienda con los valores del formulario**
   * 
   * Obtiene los valores actuales del formulario y actualiza el último tratado en la tienda de estado.
   * Esto permite reflejar los cambios en tiempo real sin necesidad de validar el formulario completo.
   */
  private actualizarEstado(): void {
    const NUEVOTRATADO = this.formularioTratados.value;
    this.tratadosStore.updateTratado(NUEVOTRATADO);
  }


  /**
   * **Ciclo de vida: OnDestroy**
   * 
   * Este método se ejecuta cuando el componente se destruye. 
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   * 
   * - Envía un valor a `destroy$` para notificar a los observables que deben completarse.
   * - Completa `destroy$` para liberar los recursos asociados.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
