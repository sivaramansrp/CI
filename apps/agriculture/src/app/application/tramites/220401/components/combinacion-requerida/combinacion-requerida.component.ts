/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import {
  CatalogoSelectComponent,
  CatalogosSelect,
} from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TercerosRelacionadosComponent } from '../terceros-relacionados/terceros-relacionados.component';
import { Pantallas220401Service } from '../pantallas220401.service';

/**
 * @component CombinacionRequeridaComponent
 * @description Este componente gestiona la combinación requerida en el formulario.
 */
@Component({
  selector: 'app-combinacion-requerida',
  templateUrl: './combinacion-requerida.component.html',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TercerosRelacionadosComponent,
    CatalogoSelectComponent,
  ],
  styleUrl: './combinacion-requerida.component.scss',
})
export class CombinacionRequeridaComponent {
  /** Listas de catálogos para el formulario */
  public especie!: Catalogo[];
  public funcionZootecnica!: Catalogo[];
  public mercancia!: Catalogo[];
  public paisDestino!: Catalogo[];
  public nombreEstablecimiento!: Catalogo[];
  public tipoActividad!: Catalogo[];
  public aduanaSalida!: Catalogo[];
  public oisaSalida!: Catalogo[];
  public regimenMercancia!: Catalogo[];
  public paisOrigen!: Catalogo[];

  /** Formulario para la combinación requerida */
  public formCombinacion!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private _pantallas220401Service: Pantallas220401Service
  ) {
    this.crearFormCombinacion();
  }

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.loaddatEspecieData();
    this.loadFuncionZootecnica();
    this.loadMercancia();
    this.laodPaisDestino();
    this.loadNombreEstablecimiento();
    this.loadTipoActividad();
    this.loadAduanaSalida();
    this.loadOisaSalida();
    this.loadRegimenMercancia();
    this.loadPaisOrigen();
  }

  /** Métodos para cargar datos desde el servicio */

  loaddatEspecieData(): void {
    this._pantallas220401Service.getEspecieData().subscribe((data) => {
      this.especie = data;
    });
  }

  loadFuncionZootecnica(): void {
    this._pantallas220401Service.getFuncionZootecnica().subscribe((data) => {
      this.funcionZootecnica = data;
    });
  }

  loadMercancia(): void {
    this._pantallas220401Service.getMercancia().subscribe((data) => {
      this.mercancia = data;
    });
  }

  laodPaisDestino(): void {
    this._pantallas220401Service.getlaodPaisDestino().subscribe((data) => {
      this.paisDestino = data;
    });
  }

  loadNombreEstablecimiento(): void {
    this._pantallas220401Service.getNombreEstablecimiento().subscribe((data) => {
      this.nombreEstablecimiento = data;
    });
  }

  loadTipoActividad(): void {
    this._pantallas220401Service.getTipoActividad().subscribe((data) => {
      this.tipoActividad = data;
    });
  }

  loadAduanaSalida(): void {
    this._pantallas220401Service.getAduanaSalida().subscribe((data) => {
      this.aduanaSalida = data;
    });
  }

  loadOisaSalida(): void {
    this._pantallas220401Service.getOisaSalida().subscribe((data) => {
      this.oisaSalida = data;
    });
  }

  loadRegimenMercancia(): void {
    this._pantallas220401Service.getRegimenMercancia().subscribe((data) => {
      this.regimenMercancia = data;
    });
  }

  loadPaisOrigen(): void {
    this._pantallas220401Service.getPaisOrigen().subscribe((data) => {
      this.paisOrigen = data;
    });
  }

  /**
   * @method isValid
   * @description Verifica si un campo específico del formulario es válido.
   * @param field Nombre del campo a validar.
   * @returns Boolean indicando la validez del campo.
   */
  public isValid(field: string) {
    return this.validacionesService.isValid(this.formCombinacion, field);
  }

  /**
   * @method crearFormCombinacion
   * @description Método para crear el formulario formCombinacion.
   */
  public crearFormCombinacion() {
    this.formCombinacion = this.fb.group({
      especie: [''],
      funcionZootecnica: [''],
      mercancia: [''],
      paisDestino: [''],
      nombreEstablecimiento: [''],
      tipoActividad: [''],
      otro: [''],
      aduanaSalida: [''],
      oisaSalida: [''],
      regimenMercancia: [''],
      paisOrigen: [''],
      fechaArribo: [''],
      puntoIngreso: ['', [Validators.maxLength(200)]],
    });
  }

  /**
   * @method docSeleccionado
   * @description Método placeholder para la funcionalidad de documento seleccionado.
   */
  docSeleccionado(): void {
    // Método pendiente de implementación
  }
}
