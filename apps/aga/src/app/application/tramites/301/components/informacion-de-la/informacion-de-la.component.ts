/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module InformacionDeLaComponent
 * @description Este módulo define el componente `InformacionDeLaComponent` que maneja la información de la mercancía.
*/
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud301State,
  Tramite301Store,
} from '../../../../core/estados/tramites/tramite301.store';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';
import estadofisico from 'libs/shared/theme/assets/json/130102/entidad_federativa.json';
import franccionArancelaria from 'libs/shared/theme/assets/json/301/fraccion-arancelaria-options.json';
import nico from 'libs/shared/theme/assets/json/301/nico-options.json';

@Component({
  selector: 'app-informacion-de-la',
  templateUrl: './informacion-de-la.component.html',
  styleUrl: './informacion-de-la.component.scss',
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    BtnContinuarComponent,
    CatalogoSelectComponent,
  ],
  standalone: true,
})
export class InformacionDeLaComponent implements OnInit, OnDestroy {

  /** Datos del procedimiento recibidos como entrada desde el componente padre. */
  @Input() public procedureDatos: Array<any> = [];
  
  /**
   * @property {FormGroup} informacionDeLaform - Formulario principal del componente.
   */
  informacionDeLaform!: FormGroup;

  /**
   * @property {CatalogosSelect} fraccionArancelariaOptions - Opciones del catálogo de fracción arancelaria.
   */
  fraccionArancelariaOptions: Catalogo[] = franccionArancelaria;

  /**
   * @property {CatalogosSelect} nicoOptions - Opciones del catálogo de Nico.
   */
  nicoOptions: Catalogo[] = nico;

  /**
   * @property {CatalogosSelect} estadoFisicoOptions - Opciones del catálogo de estado físico.
   */
  estadoFisicoOptions: Catalogo[] = estadofisico;

  /**
   * @property {number} indice - Índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {any} datosPasos - Datos de los pasos del formulario.
   */
  datosPasos: any = {
    indice: this.indice,
    txtBtnSig: 'Continuar',
  };

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
   * Indica si el formulario está en modo de actualización (patch).
   * Si es `true`, el formulario se utiliza para editar un registro existente.
   */
  public esFormularioActualizacion: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @param {FormBuilder} formbuilt - Instancia de FormBuilder para crear formularios.
   */
  constructor(
    private formbuilt: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioActualizacion = [
            'FLUJO_FUNCIONARIO_ATENDER_REQUERIMIENTO',
            'FLUJO_FUNCIONARIO_AUTORIZACION',
            'FLUJO_FUNCIONARIO_EVALUAR'
          ].includes(seccionState.parameter);
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.  
   * Llama a la función que determina cómo inicializar el formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioActualizacion) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );

    this.informacionDeLaform = this.formbuilt.group({
      fraccionArancelaria: [
        this.solicitudState?.fraccionArancelaria,
        Validators.required,
      ],
      descripcionFraccion: [
        { value: this.solicitudState?.descripcionFraccion, disabled: true },
      ],
      nico: [this.solicitudState?.nico, Validators.required],
      descripcionNico: [
        { value: this.solicitudState?.descripcionNico, disabled: true },
      ],
      nombreQuimico: [this.solicitudState?.nombreQuimico, Validators.required],
      nombreComercial: [
        this.solicitudState?.nombreComercial,
        Validators.required,
      ],
      numeroCAS: [this.solicitudState?.numeroCAS, Validators.required],
      estadoFisico: [this.solicitudState?.estadoFisico, Validators.required],
      acondicionamiento: [
        this.solicitudState?.acondicionamiento,
        Validators.required,
      ],
    });
    this.valorSeleccionadoFraccion(); // enable descripcionFraccion if fraccionArancelaria has value
    this.valorSeleccionadoNico(); // enable descripcionNico if nico has value
    if(this.procedureDatos.length > 0) {
      this.getProcedureDatos();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura && this.esFormularioActualizacion) {
      this.informacionDeLaform.disable();
    } else if (!this.esFormularioSoloLectura && this.esFormularioActualizacion) {
      this.informacionDeLaform.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}

  /**
   * @method valorSeleccionadoFraccion
   * @description Maneja el evento de selección de una fracción arancelaria.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoFraccion(): void {
    if (this.informacionDeLaform.get('fraccionArancelaria')?.value) {
      this.informacionDeLaform.get('descripcionFraccion')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionFraccion')?.disable();
    }
  }

  /**
   * @method valorSeleccionadoNico
   * @description Maneja el evento de selección de un Nico.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoNico(): void {
    if (this.informacionDeLaform.get('nico')?.value) {
      this.informacionDeLaform.get('descripcionNico')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionNico')?.disable();
    }
  }

  /**
   * Maneja el evento de continuar al siguiente paso.
   * @method continuar
   * @memberof InformacionDeLaComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  public getProcedureDatos(): void {
    this.informacionDeLaform.get('fraccionArancelaria')?.setValue(this.procedureDatos[0].registroPara.fraccionArancelaria);
    this.informacionDeLaform.get('descripcionFraccion')?.setValue(this.procedureDatos[0].registroPara.descripcionFraccion);
    this.informacionDeLaform.get('nico')?.setValue(this.procedureDatos[0].registroPara.nico);
    this.informacionDeLaform.get('descripcionNico')?.setValue(this.procedureDatos[0].registroPara.descripcionNico);
    this.informacionDeLaform.get('nombreQuimico')?.setValue(this.procedureDatos[0].registroPara.nombreQuimico);
    this.informacionDeLaform.get('nombreComercial')?.setValue(this.procedureDatos[0].registroPara.nombreComercial);
    this.informacionDeLaform.get('numeroCAS')?.setValue(this.procedureDatos[0].registroPara.numeroCAS);
    this.informacionDeLaform.get('estadoFisico')?.setValue(this.procedureDatos[0].registroPara.estadoFisico);
    this.informacionDeLaform.get('acondicionamiento')?.setValue(this.procedureDatos[0].registroPara.acondicionamiento);

  }

  /**
   * Maneja el evento de continuar al siguiente paso.
   * @method continuar
   * @memberof InformacionDeLaComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
