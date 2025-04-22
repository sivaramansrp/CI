/**
 * Componente que gestiona los datos del tipo de propietario para el trámite 630303.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CatalogoSelectComponent,SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Catalogo, ModeloDeFormaDinamica, REGEX_NOMBRE } from '@libs/shared/data-access-user/src';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { FORMULARIO_DATOS_NOMBRE } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';



@Component({
  selector: 'app-datos-del-nombre',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, CatalogoSelectComponent,SolicitanteComponent, TituloComponent, ReactiveFormsModule, SolicitanteComponent],
  templateUrl: './datos-del-nombre.component.html',
  styleUrl: './datos-del-nombre.component.scss',
})
export class DatosDelNombreComponent implements OnInit,OnDestroy {


  public consultarPorRFCOpcionseleccionada : boolean = false;
 consultarPorRFC: Catalogo[]= [];

 tipoDeRepresentanteOpciones: Catalogo[] = [];

 /**
  * Opciones de tipos de propietarios obtenidas desde un catálogo.
  */
 tipoDePropietarioOpciones: Catalogo[] = [];

 /**
  * Formulario dinámico para gestionar los datos del tipo de propietario.
  */
 formularioDatosTipoPropietario: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_NOMBRE;

 /**
  * Formulario reactivo para gestionar los datos del tipo de propietario.
  */
 datisDelNombre!: FormGroup;

 /**
  * Estado seleccionado del trámite 630303.
  */
 estadoSeleccionado!: Tramite630104State;

 /**
  * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
  */
 private destroyed$ = new Subject<void>();

 /**
  * Constructor del componente.
  * 
  * @param fb - Constructor de formularios reactivos.
  * @param tramite630104Store - Store para manejar el estado del trámite.
  * @param tramite630104Query - Query para consultar el estado del trámite.
  * @param retornoImportacionTemporalService - Servicio para obtener datos de catálogos.
  */
    constructor(private fb: FormBuilder,private tramite630104Store: Tramite630104Store,
        private tramite630104Query: Tramite630104Query,private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService) {
     //
    }
   
    /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inicializarFormulario();
    this.getconsultarPorRFC();
    this.getTipoDeRepresentante();
    this.getPais();
    this.ajustarValidadoresSegunValor();
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datisDelNombre = this.fb.group({
      consultarPorRFC: [this.estadoSeleccionado?.['consultarPorRFC'] || '', Validators.required],
      tipoDeRepresentante: [this.estadoSeleccionado?.['tipoDeRepresentante'] || '', Validators.required],
      nombre: [this.estadoSeleccionado?.['nombre'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      apellidoPaterno: [this.estadoSeleccionado?.['apellidoPaterno'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      apellidoMaterno: [this.estadoSeleccionado?.['apellidoMaterno'] || '', Validators.pattern(REGEX_NOMBRE)],
      razonSocial: [this.estadoSeleccionado?.['razonSocial'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],
      rfc :[this.estadoSeleccionado?.['rfc'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]]
    });
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Obtiene las opciones de propietarios desde el servicio.
   */
  getconsultarPorRFC(): void {
    this.equipoEInstrumentosMusicalesService
    .getconsultarPorRFC()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.consultarPorRFC = data;
   });
  }

  /**
   * Obtiene las opciones de tipos de propietarios desde el servicio.
   */
  getTipoDeRepresentante(): void {
    this.equipoEInstrumentosMusicalesService
      .getTipoDeRepresentante()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tipoDeRepresentanteOpciones = data;
        });
  }

  /**
   * Obtiene las opciones de países desde el servicio.
   */
  getPais(): void {
    this.equipoEInstrumentosMusicalesService
      .getPais()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const PAIS_FIELD = this.formularioDatosTipoPropietario.find((field) => field.id === 'pais');
        if (PAIS_FIELD) {
          PAIS_FIELD.opciones = data;
        }
      });
  }

  
  continuar(): void {
    this.consultarPorRFCOpcionseleccionada = this.datisDelNombre.get('consultarPorRFC')?.value === '1';
  }
  /**
   * Establece un cambio de valor en el store basado en un evento.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
  }

  /**
   * Establece validadores a un conjunto de campos del formulario.
   * 
   * @param campos - Lista de nombres de los campos.
   * @param validador - Validador o lista de validadores a aplicar.
   */
  establecerValidadores(campos: string[], validador: ValidatorFn | ValidatorFn[]): void {
    campos.forEach((nombreCampo) => {
      const CAMPO = this.datisDelNombre.get(nombreCampo);
      CAMPO?.setValidators(validador);
      CAMPO?.updateValueAndValidity();
    });
  }

  /**
   * Elimina todos los validadores de un conjunto de campos del formulario.
   * 
   * @param campos - Lista de nombres de los campos.
   */
  limpiarValidadores(campos: string[]): void {
    campos.forEach((nombreCampo) => {
      const CAMPO = this.datisDelNombre.get(nombreCampo);
      CAMPO?.clearValidators();
      CAMPO?.updateValueAndValidity();
    });
  }

  /**
   * Ajusta los validadores según el valor seleccionado.
   */
  ajustarValidadoresSegunValor(): void {
    const TIPO_DE_PROPIETARIO = this.datisDelNombre.get('tipoDePropietario')?.value;
    if (TIPO_DE_PROPIETARIO === '1') {
      this.limpiarValidadores(['razonSocial']);
      this.establecerValidadores(['nombre', 'apellidoPaterno'], Validators.required);
    } else if (TIPO_DE_PROPIETARIO === '2') {
      this.limpiarValidadores(['nombre', 'apellidoPaterno']);
      this.establecerValidadores(['razonSocial'], Validators.required);
    }
  }



  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }  
}
  
