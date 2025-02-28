import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';

import regimenValues from 'libs/shared/theme/assets/json/220201/regimen.json';
import tratdosValues from 'libs/shared/theme/assets/json/110101/tratdos-dropdown.json';
import nombreValues from 'libs/shared/theme/assets/json/220202/nombre.json';
import subproductoValues from 'libs/shared/theme/assets/json/220202/nombre.json';

import { DescripcionDelCupoService } from 'libs/shared/data-access-user/src/core/services/120402/descripcion-del-cupo/descripcionDelCupo.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NgIf,
  ],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})

/**
 * Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
export class SeleccionDelCupoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la selección del cupo.
   */
  seleccionForm!: FormGroup;

  /**
   * Lista de opciones para el campo de régimen aduanero.
   */
  regimen: Catalogo[] = regimenValues.data;

  /**
   * Lista de opciones para el campo de tratado o bloque comercial.
   */
  tratado: Catalogo[] = tratdosValues.tratado;

  /**
   * Lista de opciones para el campo de nombre de producto.
   */
  producto: Catalogo[] = nombreValues.data;

  /**
   * Lista de opciones para el campo de nombre de subproducto.
   */
  subproducto: Catalogo[] = subproductoValues.data;

  /**
   * Datos de la selección del cupo obtenidos desde el servicio.
   */
  seleccionDelCupo: any;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb - Servicio de FormBuilder para manejar formularios reactivos.
   * @param service - Servicio para obtener la selección del cupo desde el backend.
   */
  constructor(
    private fb: FormBuilder,
    private service: DescripcionDelCupoService
  ) {}

  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es inicializado.
   * Inicializa el formulario y carga los datos de la selección del cupo.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadSeleccionDelCupo();
  }

  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es destruido.
   * Libera recursos y evita fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Inicializa el formulario de selección del cupo con validaciones requeridas.
   */
  private initializeForm(): void {
    this.seleccionForm = this.fb.group({
      regimen: ['', Validators.required],
      tratado: ['', Validators.required],
      producto: ['', Validators.required],
      subproducto: ['', Validators.required],
    });
  }

  /**
   * Maneja el cambio en el campo de régimen aduanero.
   * @param event - Evento de cambio.
   */
  public regimenOnChange(event: Event): void {
    // Lógica para manejar cambio de régimen
  }

  /**
   * Maneja el cambio en el campo de tratado o bloque comercial.
   * @param event - Evento de cambio.
   */
  public tratadoOnChange(event: Event): void {
    // Lógica para manejar cambio de tratado
  }

  /**
   * Maneja el cambio en el campo de nombre del producto.
   * @param event - Evento de cambio.
   */
  public productoOnChange(event: Event): void {
    // Lógica para manejar cambio de producto
  }

  /**
   * Maneja el cambio en el campo de nombre del subproducto.
   * @param event - Evento de cambio.
   */
  public subproductoOnChange(event: Event): void {
    // Lógica para manejar cambio de subproducto
  }

  /**
   * Carga los datos de la selección del cupo desde el servicio.
   * Los datos obtenidos se asignan a la variable `seleccionDelCupo`.
   */
  loadSeleccionDelCupo(): void {
    this.service
      .getSeleccionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.seleccionDelCupo = data;
        console.log(this.seleccionDelCupo, 'table json');
      });
  }
}
