
import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

import { EXPEDICION } from '../../constants/certificado-tecnico-japon.enum';
import { VENCIMIENTO } from '../../constants/certificado-tecnico-japon.enum';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * TratadosComponent
 * OnInit
 * Componente para gestionar los detalles del transporte relacionados con tratados y acuerdos.
 */
@Component({
  selector: 'app-tratados',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputFechaComponent],
  templateUrl: './tratados.component.html',
  styleUrl: './tratados.component.scss',
})
export class TratadosComponent implements OnInit, OnDestroy {

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
    this.detallesdeltransporte = this.crearFormularioDetallesDelTransporte();
  }
  private crearFormularioDetallesDelTransporte(): FormGroup {
    return this.fb.group({
      tratadoAcuerdo: [{ value: '', disabled: true }],
      paisBloque: [{ value: '', disabled: true }],
      paisdeOrigen: [{ value: '', disabled: true }],
      paisDestino: [{ value: '', disabled: true }],
      fechadeExpedicion: [{ value: '', disabled: true }],
      fechadeVencimiento: [{ value: '', disabled: true }],
    });
  }

  /**
   * ngOnInit
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  private destroyed$ = new Subject<void>();
  ngOnInit(): void {
    this.obtenerDatosDeTabla();
   
  }
  
  fechaFinalInput: InputFecha = EXPEDICION;
  fechaFinalInputs: InputFecha = VENCIMIENTO;
  cambioFechaFinal(nuevo_valor: string): void {
    this.detallesdeltransporte.patchValue({
      fechaExpedicionFactura: nuevo_valor,
    });
  

  }
  
  /**
   * obtenerDatosDeTabla
   * Obtiene los datos de los tratados y actualiza el formulario.
   */
  obtenerDatosDeTabla(): void {
    this.service.gettratados().pipe(takeUntil(this.destroyed$)).subscribe(
      (data: { tratadoAcuerdo: string; paisBloque: string; paisdeOrigen: string; paisDestino: string; fechadeExpedicion: string; fechadeVencimiento: string }) => {
        this.detallesdeltransporte.patchValue({
          tratadoAcuerdo: data.tratadoAcuerdo,
          paisBloque: data.paisBloque,
          paisdeOrigen: data.paisdeOrigen,
          paisDestino: data.paisDestino,
          fechadeExpedicion: data.fechadeExpedicion,
          fechadeVencimiento: data.fechadeVencimiento
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}