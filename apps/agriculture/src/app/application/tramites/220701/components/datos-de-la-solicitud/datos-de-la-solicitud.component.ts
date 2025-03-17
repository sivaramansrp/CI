/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { AlertComponent } from "@libs/shared/data-access-user/src/tramites/components/alert/alert.component";
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from "@angular/forms";

@Component({
  selector: 'datos-de-la-solicitud',
  standalone: true,
  imports: [AlertComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit {

    /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
    forma!: FormGroup;
      /**
   * Grupo de formularios anidado para los datos de la solicitud.--220201
   * @property {FormGroup} datosDelaSolicitud
   */
  datosDelaSolicitud!: FormGroup;

  colapsable: boolean = false;
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }
  /**
   * Configuración para el select de aduana de ingreso. --220701
   * @property {Catalogo} aduanaDeIngreso
   */
  aduanaDeIngreso: Catalogo[] = [];

    /**
   * Configuración para el select de sanidad agropecuaria. --220701
   * @property {CatalogosSelect} sanidadAgropecuaria
   */
    sanidadAgropecuaria: Catalogo[] = [];
  /**
   * Configuración para el select de punto de inspección.--220701
   * @property {CatalogosSelect} puntoInspeccion
   */
  puntoInspeccion: Catalogo[] = [];

  /**
   * Configuración para el select de establecimiento TIF.--220701
   * @property {CatalogosSelect} establecimientoTIF
   */
  establecimientoTIF: Catalogo[] = [];

  /**
   * Configuración para el select de veterinario.--220701
   * @property {CatalogosSelect} veterinario
   */
  veterinario: Catalogo[] = [];
  id?: number;
  descripcion: string = '';
  tam?: string;
  dpi?: string

  /**
   * Configuración para el select de régimen.--220701
   * @property {CatalogosSelect} regimen
   */
  regimen: Catalogo[] = [];
  selectedValue: string = 'no';

          /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220701
   */
          constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) { 
            this.crearFormulario();
             this.initActionFormBuild();
          }
            /**
           * Crea el grupo de formularios principal.
           * @method crearFormulario
           */
            crearFormulario(): void {
              this.forma = this.fb.group({
                datosDelaSolicitud: this.fb.group({}),
              });
            }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerListasDesplegables();
  }
    /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
    obtenerListasDesplegables() {
      this.obtenerIngresoSelectList();
      this.obtenerSanidadAgropecuariaList();
      this.obtenerPuntoInspeccionList();
      this.obtenerEstablecimientoList();
      this.obtenerVeterinarioList();
      this.obtenerRegimenList();
    }
    /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
    obtenerIngresoSelectList() {
      this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/aduana_de_ingreso.json').subscribe((data): void => {
        const DATOS = data?.data;
        this.aduanaDeIngreso = DATOS;
      });
    }

      /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/oficina_de_inspeccion.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/punto.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/establecimiento.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */

  obtenerVeterinarioList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/nombre.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList() {
    this.httpServicios.get<RespuestaCatalogos>('/assets/json/220701/regimen.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }

    /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
    initActionFormBuild() {
      this.datosDelaSolicitud = this.fb.group({
        aduanaIngreso: ['', Validators.required],
        oficinaInspeccion: ['', Validators.required],
        puntoInspeccion: ['', Validators.required],
        claveUCON: ['', [Validators.required]],
        establecimientoTIFs: [''],
        nombreVeterinario: ['', Validators.required],
        numeroGuia: [''],
        certficacion: [''],
        regimen: ['', Validators.required]
      });
      this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
    }

}
