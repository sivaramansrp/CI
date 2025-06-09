/**
 * Importaciones necesarias para el funcionamiento del componente.
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoResponse, CatalogoSelectComponent, InputFecha, InputFechaComponent } from '@libs/shared/data-access-user/src';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { PagoDeDerechosEntradaService } from '../../services/pago-de-derechos-entrada.service';
import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../../estados/permiso-importacion-biologica.store';

import { PermisoImportacionBiologicaQuery } from '../../estados/permiso-importacion-biologica.query';

import { map, Observable, Subject, takeUntil } from 'rxjs';
import { FECHA_PAGO, PAGO , MAXLENGTH } from '../../constantes/permiso-importacion-biologica.enum';
import { REQUIRED_BANCO } from '../../constantes/datos-solicitud.enum';

import {ConsultaioQuery} from '@ng-mf/data-access-user'
/**
 * Componente que gestiona el pago de derechos.
 * Utiliza un formulario reactivos para recopilar datos del usuario.
 */
@Component({
  selector: 'app-pago-de-derechos-entrada',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent
  ],
  templateUrl: './pago-de-derechos-entrada.component.html',
  styleUrls: ['./pago-de-derechos-entrada.component.scss',],
})
export class PagoDeDerechosEntradaComponent implements OnInit, OnDestroy {

  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();


  /**
   * @observable selectedBanco$
   * @description Observable que representa el banco seleccionado en el contexto del componente.
   * @type {Observable<CatalogoResponse | null>}
   * @remarks Este observable se suscribe al estado del query `permisoImportacionBiologicaQuery` 
   * para obtener el banco seleccionado. Puede emitir un valor de tipo `CatalogoResponse` 
   * o `null` si no hay un banco seleccionado.
   */
  selectedBanco$: Observable<CatalogoResponse | null> =
    this.permisoImportacionBiologicaQuery.selectedBanco$;

  /**
   * @observable claveDeReferncia$
   * @description Representa un observable que emite la clave de referencia seleccionada
   * en el contexto del trámite 260402.
   */
  claveDeReferncia$ = this.permisoImportacionBiologicaQuery.selectedClaveDeReferncia$

  /**
   * @observable cadenaDeLaDependencia$
   * @description Representa un observable que emite la cadena de la dependencia seleccionada
   * en el contexto del trámite 260402.
   */
  cadenaDeLaDependencia$ = this.permisoImportacionBiologicaQuery.selectedCadenaDeLaDependencia$

  /**
   * @observable llaveDePago$
   * @description Observable que representa la llave de pago seleccionada 
   * en el contexto del trámite 260402. Este flujo de datos se utiliza 
   * para rastrear y reaccionar a los cambios en la llave de pago seleccionada.
   */
  llaveDePago$ = this.permisoImportacionBiologicaQuery.selectedLlaveDePago$

  /**
   * @descripcion Un observable que emite la fecha de pago seleccionada
   * desde el estado del query `permisoImportacionBiologicaQuery`.
   */
  fechaDePago$ = this.permisoImportacionBiologicaQuery.selectedFechaDePago$

  /**
   * @observable importeDePago$
   * @description Observable que representa el importe de pago seleccionado
   * en el contexto del trámite 260402. Este observable se utiliza para
   * rastrear y reaccionar a los cambios en el importe de pago asociado.
   */
  importeDePago$ = this.permisoImportacionBiologicaQuery.selectedImporteDePago$


  /**
   * @descripcion Arreglo que contiene los datos del catálogo para el componente.
   * @tipo {CatalogoResponse[]}
   */
  dropdownData: CatalogoResponse[] = [];

  /**
  * Identificador del procedimiento recibido como entrada desde un componente padre.
  * @type {number}
  */
  @Input() public idProcedimiento!: number;

  public requiredLabel:boolean = true;

  public maxLength!: { [key: string]: number };

  /**
   * @observable fechaFinalInput
   * @description Representa un objeto de tipo InputFecha que contiene la fecha final
   * utilizada en el contexto del trámite 260402.
   */
  fechaFinalInput!: InputFecha;

   esFormularioSoloLectura: boolean = false;

    public solicitudState!: PermisoImportacionBiologicaState;
  /**
 * Constructor del componente.
 * Inyecta el FormBuilder y el servicio de pago de derechos.
 * 
 * @param fb Constructor de formularios para crear el formulario reactivos.
 * @param pagoDeDerechosEntradaService Servicio que proporciona datos para el componente.
 */
  constructor(
    private fb: FormBuilder,
    private pagoDeDerechosService: PagoDeDerechosEntradaService,
    private permisoImportacionBiologicaStore: PermisoImportacionBiologicaStore,
    private permisoImportacionBiologicaQuery: PermisoImportacionBiologicaQuery,
     private consultaioQuery: ConsultaioQuery,

  ) {
    //La lógica del constructor se puede agregar aquí si es necesario

    
  this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly
        })
      )
      .subscribe()

  }

  /**
   * Formulario reactivos para el pago de derechos.
   * Cada campo es obligatorio.
   */
 public pagoDerechos: FormGroup = this.fb.group({
  claveDeReferncia: [''],
  cadenaDeLaDependencia: [''],
  banco: [''],
  llaveDePago: [''],
  fechaDePago: [''],
  importeDePago:['']

 });

  /**
   * Ciclo de vida que se ejecuta al iniciar el componente.
   * Obtiene los datos para el selector de opciones desde el servicio.
   */
  ngOnInit(): void {

    this.inicializarCertificadoFormulario();
  }

  /**
   * Actualiza el formulario de certificado.
   * Si el formulario es solo de lectura, guarda los datos del formulario.
   * De lo contrario, inicializa el formulario.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

    /**
     * Actualiza los datos del formulario.
     * Si el formulario es solo de lectura, deshabilita el formulario.
     * De lo contrario, habilita el formulario.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.pagoDerechos.disable();
      } else {
        this.pagoDerechos.enable();
      }
    }

  /**
   * Inicializa el formulario y sus valores a partir del estado y servicios.
   * 
   * Este método obtiene los datos necesarios para los selectores y campos del formulario,
   * y suscribe los valores del estado para mantener el formulario sincronizado.
   * También configura las propiedades de validación y longitud máxima según el procedimiento.
   */
  inicializarFormulario():void {
    this.pagoDeDerechosService.getData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.dropdownData = data;
    });

    this.selectedBanco$.pipe(takeUntil(this.destroy$)).subscribe((selectedBanco) => {
      if (selectedBanco) {
        this.pagoDerechos.get('banco')?.setValue(selectedBanco);
      }
    });

    this.claveDeReferncia$.pipe(takeUntil(this.destroy$)).subscribe((claveDeReferncia) => {
      if (claveDeReferncia) {
        this.pagoDerechos.get('claveDeReferncia')?.setValue(claveDeReferncia);
      }
    });

    this.cadenaDeLaDependencia$.pipe(takeUntil(this.destroy$)).subscribe((cadenaDeLaDependencia) => {
      if (cadenaDeLaDependencia) {
        this.pagoDerechos.get('cadenaDeLaDependencia')?.setValue(cadenaDeLaDependencia);
      }
    });
    this.llaveDePago$.pipe(takeUntil(this.destroy$)).subscribe((llaveDePago) => {
      if (llaveDePago) {
        this.pagoDerechos.get('llaveDePago')?.setValue(llaveDePago);
      }
    });
    this.fechaDePago$.pipe(takeUntil(this.destroy$)).subscribe((fechaDePago) => {
      if (fechaDePago) {
        this.pagoDerechos.get('fechaDePago')?.setValue(fechaDePago);
      }
    });
    this.importeDePago$.pipe(takeUntil(this.destroy$)).subscribe((importeDePago) => {
      if (importeDePago) {
        this.pagoDerechos.get('importeDePago')?.setValue(importeDePago);
      }
    });

    this.requiredLabel = REQUIRED_BANCO.includes(this.idProcedimiento) ? false : true;

    this.fechaFinalInput = REQUIRED_BANCO.includes(this.idProcedimiento) ? PAGO : FECHA_PAGO;

    this.maxLength = REQUIRED_BANCO.includes(this.idProcedimiento) ? MAXLENGTH : {
    };
   
  }

  /**
   * Actualiza el valor de claveDeReferncia en el tramiteEntradaHumanaStore.
   * 
   * Este método obtiene el valor de 'claveDeReferncia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramiteEntradaHumanaStore'.
   * 
   * @comdoc
   */
  updateClaveDeReferncia(): void {
    const CORREO = this.pagoDerechos.get('claveDeReferncia')?.value;
    this.permisoImportacionBiologicaStore.setClaveDeReferncia(CORREO);
  }

  /**
   * Actualiza el valor de cadenaDeLaDependencia en el tramiteEntradaHumanaStore.
   * 
   * Este método obtiene el valor de 'cadenaDeLaDependencia' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramiteEntradaHumanaStore'.
   * 
   * @comdoc
   */
  updateCadenaDeLaDependencia(): void {
    const CORREO = this.pagoDerechos.get('cadenaDeLaDependencia')?.value;
    this.permisoImportacionBiologicaStore.setCadenaDeLaDependencia(CORREO);
  }

  /**
   * Actualiza el valor de llaveDePago en el tramiteEntradaHumanaStore.
   * 
   * Este método obtiene el valor de 'llaveDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramiteEntradaHumanaStore'.
   * 
   * @comdoc
   */
  updateLlaveDePago(): void {
    const CORREO = this.pagoDerechos.get('llaveDePago')?.value;
    this.permisoImportacionBiologicaStore.setLlaveDePago(CORREO);
  }

  /**
   * Actualiza el valor de fechaDePago en el tramiteEntradaHumanaStore.
   * 
   * Este método obtiene el valor de 'fechaDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramiteEntradaHumanaStore'.
   * 
   * @comdoc
   */
  updateFechaDePago(): void {
    const CORREO = this.pagoDerechos.get('fechaDePago')?.value;
    this.permisoImportacionBiologicaStore.setFechaDePago(CORREO);
  }

  /**
   * Actualiza el valor de importeDePago en el tramiteEntradaHumanaStore.
   * 
   * Este método obtiene el valor de 'importeDePago' del control de formulario 
   * 'pagoDerechos' y lo establece en el 'tramiteEntradaHumanaStore'.
   * 
   * @comdoc
   */
  updateImporteDePago(): void {
    const CORREO = this.pagoDerechos.get('importeDePago')?.value;
    this.permisoImportacionBiologicaStore.setImporteDePago(CORREO);
  }

  /**
 * Obtiene el estado seleccionado del formulario y lo guarda en el store
 */
  getMunicipios(): void {
    const SELECTED_BANCO = this.pagoDerechos.get('banco')?.value;
    this.permisoImportacionBiologicaStore.setBanco(SELECTED_BANCO);
  }

  /**

 * Método para cambiar la fecha final.

 * @param nuevo_valor Nuevo valor de la fecha final.

 */
  cambioFechaDePago(nuevo_valor: string): void {
    this.pagoDerechos.patchValue({
      fechaDePago: nuevo_valor,
    });
    this.permisoImportacionBiologicaStore.setFechaDePago(nuevo_valor);
  }

   /**
   * @method onReset
   * @description Limpia todos los campos del formulario de pago de derechos.
   */
  onReset(): void {
    this.pagoDerechos.reset();
  }

  /*
  * Método del ciclo de vida de Angular - destruye el componente
  */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
