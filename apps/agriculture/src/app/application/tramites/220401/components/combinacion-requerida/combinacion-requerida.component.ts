/* eslint-disable sort-imports */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogosSelect } from '@ng-mf/data-access-user';

import {
  CatalogoSelectComponent,

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
import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';
import { map, Subject, takeUntil } from 'rxjs';
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

export class CombinacionRequeridaComponent implements OnInit, OnDestroy {
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
  private destroyNotifier$: Subject<void> = new Subject();
    public solicitudState!: solicitud220401State;
  
    constructor(private fb: FormBuilder,
                private validacionesService: ValidacionesFormularioService,
                private agregar220401Store: Agregar220401Store,
                private agregarQuery: AgregarQuery,
                private _pantallas220401Service: Pantallas220401Service
    ) {
      this.crearFormCombinacion();
    }
  
    ngOnInit(): void {
this.agregarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.crearFormCombinacion();
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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public isValid(field: string) {
      return this.validacionesService.isValid(this.formCombinacion,field);
    }

    /**
     * @description createFormMerge se utiliza para crear el formulario denominado formCombinacion
     * 
     */

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public crearFormCombinacion() {
      this.formCombinacion = this.fb.group({
        especie:[''],
        funcionZootecnica:[''],
        mercancia:[''],
        paisDestino:[''],
        nombreEstablecimiento:[''],
        tipoActividad:[''],
        otro : [this.solicitudState?.otro],
        aduanaSalida:[''],
        oisaSalida:[''],
        regimenMercancia:[''],
        paisOrigen:[''],
        puntoIngreso:[this.solicitudState?.puntoIngreso,[Validators.maxLength(200)]],
        nombreEstablecimientoCheck:[this.solicitudState?.nombreEstablecimientoCheck],
        numeroAutorizacionCheck:[this.solicitudState?.numeroAutorizacionCheck],
        tipoActividadCheck:[this.solicitudState?.tipoActividadCheck],
        otroCheck:[this.solicitudState?.otroCheck],
        fechaArribo:[this.solicitudState?.fechaArribo]
        
      });
    }

    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
      const VALOR = form.get(campo)?.value;
      (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
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
   * @method crearFormCombinacion
   * @description Método para crear el formulario formCombinacion.
   */
  
   ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }


  /**
   * @method docSeleccionado
   * @description Método placeholder para la funcionalidad de documento seleccionado.
   */
 
}
