/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Este componente maneja el registro de la mercancía del comercializador.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TituloComponent } from "@ng-mf/data-access-user";

import { MercanciaasociadaService } from '@ng-mf/data-access-user';

import { DatosTratadosAcuerdosComponent } from "../datos-tratados-acuerdos/datos-tratados-acuerdos.component";
/**
 * Este componente maneja el registro de la mercancía del comercializador.
 */
@Component({
  selector: 'app-registro-mercancia-comercializador',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, DatosTratadosAcuerdosComponent],
  templateUrl: './registro-mercancia-comercializador.component.html',
  styleUrl: './registro-mercancia-comercializador.component.scss',
})
export class RegistroMercanciaComercializadorComponent implements OnInit, OnDestroy {
  
/**
   * FormGroup que contiene los datos de la mercancía asociada.
   */
registroMercanciaComercializadorFrom: FormGroup;

/**
 * Subject que emite un evento cuando el componente es destruido,
 * permitiendo la desuscripción de observables.
 */
private destroyed$ = new Subject<void>();

/**
 * Indica si se deben mostrar los datos de la mercancía del productor.
 */
mostrarDatosMercanciaProductor: boolean = false;

/**
 * Indica si se debe mostrar el nombre en inglés de la mercancía.
 */
mostrarNombreIngles: boolean = false;

/**
 * Indica si se debe mostrar la clasificación Naladi de la mercancía.
 */
mostrarClasificacionNaladi: boolean = false;

/**
 * Indica si se debe mostrar la clasificación Naladisa93 de la mercancía.
 */
mostrarClasificacionNaladisa93: boolean = false;

/**
 * Indica si se debe mostrar la clasificación Naladisa96 de la mercancía.
 */
mostrarClasificacionNaladisa96: boolean = false;

/**
 * Indica si se debe mostrar la clasificación Naladisa02 de la mercancía.
 */
mostrarClasificacionNaladisa02: boolean = false;

/**
 * Indica si se deben mostrar los datos de juegos surtidos de la mercancía.
 */
mostrarJuegosSurtidos: boolean = false;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de la mercancía asociada.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {MercanciaasociadaService} service - Servicio para obtener datos de la mercancía asociada.
   */
  constructor(private fb: FormBuilder, private service: MercanciaasociadaService) {
    this.registroMercanciaComercializadorFrom = this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      nombreTecnico: [{ value: '', disabled: true }],
      fraccionArancelaria: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADI: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA93: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA96: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      fraccionNALADISA02: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
      descripcionJuego: [{ value: '', disabled: true }, Validators.maxLength(256)],
      unidadAdministrativaRepresentacionFederal: this.fb.group({
        clave: ['']
      })
    });
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Recupera los valores de la mercancía asociada.
   */
  ngOnInit(): void {
    this.recuperaValores();
  }

  /**
   * Recupera los valores de la mercancía asociada desde el servicio y los asigna al formulario.
   */
  recuperaValores(): void {
    this.service.getMercanciaAsociada().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: any) => {
        this.registroMercanciaComercializadorFrom.patchValue({
          nombreComercial: data.Formdata.nombreComercial,
          nombreIngles: data.Formdata.nombreIngles,
          nombreTecnico: data.Formdata.nombreTecnico,
          fraccionArancelaria: {
            clave: data.Formdata.fraccionArancelaria.clave,
            descripcion: data.Formdata.fraccionArancelaria.descripcion
          },
          fraccionNALADI: {
            clave: data.Formdata.fraccionNALADI.clave,
            descripcion: data.Formdata.fraccionNALADI.descripcion
          },
          fraccionNALADISA93: {
            clave: data.Formdata.fraccionNALADISA93.clave,
            descripcion: data.Formdata.fraccionNALADISA93.descripcion
          },
          fraccionNALADISA96: {
            clave: data.Formdata.fraccionNALADISA96.clave,
            descripcion: data.Formdata.fraccionNALADISA96.descripcion
          },
          fraccionNALADISA02: {
            clave: data.Formdata.fraccionNALADISA02.clave,
            descripcion: data.Formdata.fraccionNALADISA02.descripcion
          },
          descripcionJuego: data.Formdata.descripcionJuego,
          unidadAdministrativaRepresentacionFederal: {
            clave: data.Formdata.unidadAdministrativaRepresentacionFederal.clave
          }
        });
        this.configurarVisibilidadCampos(data.Formvisiblity);
      }
    );
  }

  /**
   * Configura la visibilidad de los campos del formulario basado en los datos recibidos.
   * @param {any} data - Datos de visibilidad de los campos.
   */
  private configurarVisibilidadCampos(data: any): void {
    this.mostrarDatosMercanciaProductor = data.mostrarDatosMercanciaProductor;
    this.mostrarNombreIngles = data.mostrarNombreIngles;
    this.mostrarClasificacionNaladi = data.mostrarClasificacionNaladi;
    this.mostrarClasificacionNaladisa93 = data.mostrarClasificacionNaladisa93;
    this.mostrarClasificacionNaladisa96 = data.mostrarClasificacionNaladisa96;
    this.mostrarClasificacionNaladisa02 = data.mostrarClasificacionNaladisa02;
    this.mostrarJuegosSurtidos = data.mostrarJuegosSurtidos;
  }
}