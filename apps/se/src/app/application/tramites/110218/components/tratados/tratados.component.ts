/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Componente Tratados
 * Este componente maneja los detalles del transporte relacionados con tratados y acuerdos.
 * TratadosComponent
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

/**
 * TratadosComponent
 * OnInit
 * Componente para gestionar los detalles del transporte relacionados con tratados y acuerdos.
 */
@Component({
  selector: 'app-tratados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
})
export class TratadosComponent implements OnInit {

  /**
   * {FormGroup} detallesdeltransporte - Formulario reactivo para los detalles del transporte.
   */
  detallesdeltransporte: FormGroup;

  /**
   * 
   *{FormBuilder} fb - Constructor de formularios reactivos.
   * {CertificadoTecnicoJaponService} service - Servicio para obtener datos de tratados.
   */
  constructor(private fb: FormBuilder, private service: CertificadoTecnicoJaponService) {
    this.detallesdeltransporte = this.fb.group({
      tratadoAcuerdo: [""],
      paísBloque: [""],
      paísdeOrigen: [""],
      paísDestino: [""],
      fechadeExpedición: [""],
      fechadeVencimiento: [""],
    });
  }

  /**
   * ngOnInit
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.getTabledatas();
  }

  /**
   * getTabledatas
   * Obtiene los datos de los tratados y actualiza el formulario.
   */
  getTabledatas(): void {
    this.service.gettratados().subscribe(
      (data: any) => {
        this.detallesdeltransporte.patchValue({
          tratadoAcuerdo: data.tratadoAcuerdo,
          paísBloque: data.paísBloque,
          paísdeOrigen: data.paísdeOrigen,
          paísDestino: data.paísDestino,
          fechadeExpedición: data.fechadeExpedición,
          fechadeVencimiento: data.fechadeVencimiento
        });
      }
    );
  }
}