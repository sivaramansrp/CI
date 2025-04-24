/**
 * Componente que gestiona los datos del tipo de propietario para el trámite 630303.
 */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CatalogoSelectComponent, SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';

import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../domicilio-fiscal/domicilio-fiscal.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { FORMULARIO_DATOS_PROPIETARIO_DIRECCION, FORMULARIO_DATOS_PROPIETARIO_NOMBRE, FORMULARIO_FISCAL_CURP } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

import { REGEX_NOMBRE } from "@libs/shared/data-access-user/src/tramites/constantes/regex.constants";

import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';




@Component({
  selector: 'app-datos-del-nombre',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, CatalogoSelectComponent, DatosGeneralesComponent, DomicilioFiscalComponent, SolicitanteComponent, TituloComponent, ReactiveFormsModule, SolicitanteComponent],
  templateUrl: './datos-del-nombre.component.html',
  styleUrl: './datos-del-nombre.component.scss',
})
export class DatosDelNombreComponent implements OnInit, OnDestroy {

  /**
   * Indicador para mostrar el formulario de personas extranjeras.
   */
  mostrarFormularioPersonaExtranjera = false;
  /**
   * Indica si se debe mostrar el tipo de propietario.
   */
  mostrarTipoPropietario = false;

  /**
   * Indica si se debe mostrar el solicitante.
   */
  mostrarSolicitante = false;

  /**
   * Opciones de propietarios obtenidas desde un catálogo.
   */
  consultarPorRFC: Catalogo[] = [];

  /**
   * Opciones de tipos de propietarios obtenidas desde un catálogo.
   */
  tipoDeRepresentanteOpciones: Catalogo[] = [];

  /**
   * Formulario dinámico para gestionar los datos del tipo de propietario.
   */
  formularioDatosPropietarioDireccion: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO_DIRECCION;

  /**
   * Formulario dinámico para gestionar los datos del nombre del propietario.
   */
  formularioDatosPropietarioNombre: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_PROPIETARIO_NOMBRE;

  formularioFiscalCurp: ModeloDeFormaDinamica[] = FORMULARIO_FISCAL_CURP

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

  public consultarPorRFCOpcionseleccionada: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param tramite630104Store - Store para manejar el estado del trámite.
   * @param tramite630104Query - Query para consultar el estado del trámite.
   * @param EquipoEInstrumentosMusicalesService - Servicio para obtener datos de catálogos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query,
    private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService
  ) { }

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
    this.cambiarPropietario();
    this.cambiarTipoPropietario();
  }

  continuar(): void {
    if (this.datisDelNombre.get('esConsultaRep')?.value === '1') {
      this.consultarPorRFCOpcionseleccionada = true;
    }
    else if (this.datisDelNombre.get('esConsultaRep')?.value === '2') {
      this.consultarPorRFCOpcionseleccionada = false
    }
  }
  /**
   * Cambia la visibilidad de los campos según el tipo de propietario seleccionado.
   */
  cambiarTipoPropietario(): void {
    const TIPO_REPRESENTANTE_VALOR = this.datisDelNombre.get('datosRepresentante')?.value;
    const REPRESENTANTE_RFC = this.formularioDatosPropietarioNombre.find((campo) => campo.id === 'td_rfc_representante');
    const CURP_CAMPO = this.formularioDatosPropietarioNombre.find((campo) => campo.id === 'td_curp_representantev');
    const NOMBRE_CAMPO = this.formularioDatosPropietarioNombre.find((campo) => campo.id === 'nombre');
    const APELLIDO_PATERNO_CAMPO = this.formularioDatosPropietarioNombre.find((campo) => campo.id === 'apellidoPaterno');
    const APELLIDO_MATERNO_CAMPO = this.formularioDatosPropietarioNombre.find((campo) => campo.id === 'apellidoMaterno');


    if (REPRESENTANTE_RFC && CURP_CAMPO && NOMBRE_CAMPO && APELLIDO_PATERNO_CAMPO && APELLIDO_MATERNO_CAMPO) {
      REPRESENTANTE_RFC.mostrar = TIPO_REPRESENTANTE_VALOR === '1';
      CURP_CAMPO.mostrar = TIPO_REPRESENTANTE_VALOR === '1';
      NOMBRE_CAMPO.mostrar = TIPO_REPRESENTANTE_VALOR === '1';
      APELLIDO_PATERNO_CAMPO.mostrar = TIPO_REPRESENTANTE_VALOR === '1';
      APELLIDO_MATERNO_CAMPO.mostrar = TIPO_REPRESENTANTE_VALOR === '1';
    }
    this.mostrarFormularioPersonaExtranjera = TIPO_REPRESENTANTE_VALOR;
  }

  /**
   * Cambia la visibilidad de los componentes según el propietario seleccionado.
   */
  cambiarPropietario(): void {
    this.mostrarTipoPropietario = this.datisDelNombre.get('esConsultaRep')?.value === '2';
    this.mostrarSolicitante = this.datisDelNombre.get('esConsultaRep')?.value === '1';
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inicializarFormulario(): void {
    this.datisDelNombre = this.fb.group({
      esConsultaRep: [this.estadoSeleccionado?.['esConsultaRep'] || '', Validators.required],
      datosRepresentante: [this.estadoSeleccionado?.['datosRepresentante'] || '', Validators.required],
      rfc: [this.estadoSeleccionado?.['rfc'] || '', [Validators.required, Validators.pattern(REGEX_NOMBRE)]],

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
        const PAIS_FIELD = this.formularioDatosPropietarioDireccion.find((campo) => campo.id === 'pais');
        if (PAIS_FIELD) {
          PAIS_FIELD.opciones = data;
        }
      });
  }

  /**
   * Establece un cambio de valor en el store basado en un evento.
   *  Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
    this.consultarPorRFCOpcionseleccionada = this.datisDelNombre.get('consultarPorRFC')?.value;
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