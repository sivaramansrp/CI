import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup , ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DATOS_DEL_TRAMITE } from '../../constantes/datos-de-la-solicitud.enum';
import { DatosDeLaMercanciaComponent } from '../Datos-de-la-mercancia/Datos-de-la-mercancia.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PaisProcedenciaComponent } from '../Pais-procedencia/Pais-procedencia.component';
import { PartidasDeLaMercanciaComponent } from '../Partidas-de-la-mercancia/Partidas-de-la-mercancia.component';
import { RepresentacionFederalComponent } from '../Representacion-federal/Representacion-federal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,FormasDinamicasComponent, ReactiveFormsModule, DatosDeLaMercanciaComponent, PartidasDeLaMercanciaComponent, PaisProcedenciaComponent, RepresentacionFederalComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit,OnDestroy{
   /**
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
   private destroy$ = new Subject<void>();
  /**
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos de los insumos.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * Getter para acceder al grupo de formularios de insumos.
   * Retorna el grupo de formularios correspondiente.
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  public datosDelTramite = DATOS_DEL_TRAMITE;

  constructor
  () {
    // Lógica de inicialización si es necesario
  }
  ngOnInit(): void {
    // Lógica de inicialización si es necesario
  }
    /**
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
