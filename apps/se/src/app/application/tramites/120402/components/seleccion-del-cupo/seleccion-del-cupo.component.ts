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

import { SeleccionDelCupoService } from '@ng-mf/data-access-user';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';

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
  regimen: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de tratado o bloque comercial.
   */
  tratado: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de nombre de producto.
   */
  producto: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de nombre de subproducto.
   */
  subproducto: Catalogo[] = [];

  /**
   * Datos de la selección del cupo obtenidos desde el servicio.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seleccionDelCupo: any;

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  regimen$: Observable<Catalogo | null> = this.tramite120402Query.regimen$;
  tratado$: Observable<Catalogo | null> = this.tramite120402Query.tratado$;
  producto$: Observable<Catalogo | null> = this.tramite120402Query.producto$;
  subproducto$: Observable<Catalogo | null> =
    this.tramite120402Query.subproducto$;

  /**
   * Constructor del componente.
   * @param fb - Servicio de FormBuilder para manejar formularios reactivos.
   * @param service - Servicio para obtener la selección del cupo desde el backend.
   */
  constructor(
    private fb: FormBuilder,
    private service: SeleccionDelCupoService,
    private tramite120402Store: Tramite120402Store,
    private tramite120402Query: Tramite120402Query
  ) {
    // Constructor
  }

  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es inicializado.
   * Inicializa el formulario y carga los datos de la selección del cupo.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadSeleccionDelCupo();
    this.loadRegimen();
    this.loadTratado();
    this.loadProducto();

    this.regimen$.subscribe((regimen) => {
      if (regimen) {
        this.seleccionForm.get('regimen')?.setValue(regimen);
      }
    });

    this.tratado$.subscribe((tratado) => {
      if (tratado) {
        this.seleccionForm.get('tratado')?.setValue(tratado);
      }
    });

    this.producto$.subscribe((producto) => {
      if (producto) {
        this.seleccionForm.get('producto')?.setValue(producto);
      }
    });

    this.subproducto$.subscribe((subproducto) => {
      if (subproducto) {
        this.seleccionForm.get('subproducto')?.setValue(subproducto);
      }
    });
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
  loadRegimen(): void {
    this.service
      .getRegimen()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.regimen = data.data;
      });
  }

  /**
   * Maneja el cambio en el campo de tratado o bloque comercial.
   * @param event - Evento de cambio.
   */
  loadTratado(): void {
    this.service
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.tratado = data.tratado;
      });
  }

  /**
   * Maneja el cambio en el campo de nombre del producto.
   * @param event - Evento de cambio.
   */
  loadProducto(): void {
    this.service
      .getProducto()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.producto = data.data;
        this.subproducto = data.data;
      });
  }

  /**
   * Maneja el cambio en el campo de nombre del subproducto.
   * @param event - Evento de cambio.
   */

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
      });
  }

  /**
   * Obtiene el valor seleccionado del campo de régimen aduanero y lo establece en el store.
   */
  getRegimen(): void {
    const SELECTED_REGIMEN = this.seleccionForm.get('regimen')?.value;
    this.tramite120402Store.setRegimen(SELECTED_REGIMEN);
  }

  /**
   * Obtiene el valor seleccionado del campo de tratado comercial y lo establece en el store.
   */
  getTratado(): void {
    const SELECTED_TRATADO = this.seleccionForm.get('tratado')?.value;
    this.tramite120402Store.setTratado(SELECTED_TRATADO);
  }

  /**
   * Obtiene el valor seleccionado del campo de producto y lo establece en el store.
   */
  obtenerValorProducto(): void {
    const SELECTED_PRODUCTO = this.seleccionForm.get('producto')?.value;
    this.tramite120402Store.setProducto(SELECTED_PRODUCTO);
  }

  /**
   * Obtiene el valor seleccionado del campo de subproducto y lo establece en el store.
   */
  getSubproducto(): void {
    const SELECTED_SUBPRODUCTO = this.seleccionForm.get('subproducto')?.value;
    this.tramite120402Store.setSubproducto(SELECTED_SUBPRODUCTO);
  }
}
