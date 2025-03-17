/**
 * @component
 * @name ModificarPartidaComponent
 * @description Este componente se utiliza para modificar los datos de una partida seleccionada. Proporciona un formulario reactivo para manejar los datos de la partida y funcionalidades de navegación.
 * @selector app-modificar-partida
 * @standalone true
 * @imports CommonModule, ReactiveFormsModule, TituloComponent
 * @templateUrl ./modificar-partida.component.html
 * @styleUrl ./modificar-partida.component.scss
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Partida } from '../../models/partida.model';
import { Subscription } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';

@Component({
  selector: 'app-modificar-partida',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './modificar-partida.component.html',
  styleUrl: './modificar-partida.component.scss',
})
export class ModificarPartidaComponent implements OnInit {
  /**
   * @property {FormGroup} form
   * @description Formulario reactivo para la modificación de partida.
   */
  form!: FormGroup;

  /**
   * @property {Object} filaSeleccionada
   * @description Fila seleccionada de la tabla, utilizada para rellenar los datos iniciales del formulario.
   */
  filaSeleccionada: { tbodyData: string[] } | null = null;
  /**
   * @property {string[]} partidaData
   * @description Datos de la partida seleccionada.
   */
  partidaData: string[] = [];

  /**
   * @property {Subscription} subscription
   * @description Gestión de suscripciones para manejar la selección de datos.
   */
  private subscription: Subscription = new Subscription();

  /**
   * @constructor
   * @description Constructor que inicializa los servicios necesarios.
   * @param {FormBuilder} fb Constructor para manejar formularios reactivos.
   * @param {ActivatedRoute} route Ruta activa del Angular Router.
   * @param {Router} router Servicio para manejar navegación.
   * @param {HttpClient} http Cliente HTTP para manejar solicitudes de datos.
   * @param {Tramite130109Query} tramite130109Query Proveedor de datos relacionados con partidas.
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private tramite130109Query: Tramite130109Query
  ) {
    // Constructor necesario para la inyección de dependencias
  }

  /**
   * @method ngOnInit
   * @description Ciclo de vida de Angular que inicializa el formulario y carga los datos de la fila seleccionada.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.maxLength(18),
        ],
      ],
      valorPartidaUSD: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(20)],
      ],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.loadSelectedRow();
  }
  /**
   * @method esInvalido
   * @description Verifica si un control del formulario es inválido.
   * @param {string} nombreControl Nombre del control que se debe verificar.
   * @returns {boolean} Devuelve `true` si el control es inválido.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * @method loadSelectedRow
   * @description Carga los datos de la fila seleccionada y los asigna al formulario.
   */
  loadSelectedRow(): void {
    this.subscription.add(
      this.tramite130109Query.filaSeleccionada$.subscribe(
        (partida: Partida | null) => {
          if (partida) {
            this.filaSeleccionada = partida;
            this.form.patchValue({
              cantidad: this.filaSeleccionada.tbodyData[0] ?? '',
              descripcion: this.filaSeleccionada.tbodyData[3] ?? '',
              valorPartidaUSD: this.filaSeleccionada.tbodyData[5] ?? '',
            });
          }
        }
      )
    );
  }
  /**
   * @method navegar
   * @description Redirige al usuario a la página anterior con parámetros específicos.
   */
  navegar(): void {
    this.router.navigate(['/pago/importacion/vehiculos-usados-adaptados'], {
      queryParams: { indice: 2 },
    });
  }
}
