/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Este componente maneja el registro de la mercancía del comercializador.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de la mercancía asociada.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {MercanciaasociadaService} service - Servicio para obtener datos de la mercancía asociada.
   */
  constructor(private fb: FormBuilder, private service: MercanciaasociadaService) {
    this.registroMercanciaComercializadorFrom = this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreTecnico: [{ value: '', disabled: true }],
      fraccionArancelaria: this.fb.group({
        clave: [{ value: '', disabled: true }],
        descripcion: [{ value: '', disabled: true }]
      }),
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
          nombreTecnico: data.Formdata.nombreTecnico,
          fraccionArancelaria: {
            clave: data.Formdata.fraccionArancelaria.clave,
            descripcion: data.Formdata.fraccionArancelaria.descripcion
          },
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
  }
}