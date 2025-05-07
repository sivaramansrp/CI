import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Subject,map,takeUntil } from 'rxjs';
import { Tramite5601State, Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { CommonModule } from '@angular/common';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule,TituloComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;

  formularioMercancia!: FormGroup;

  formularioLogistica!: FormGroup;

  formularioUbicacionMercancia!: FormGroup;

  aduanas!: Catalogo[];

  seccionAduanera!: Catalogo[];

  tipoOperacion!: Catalogo[];

  tipoMoneda!: Catalogo[];

  mostrarFechaOperacion: boolean = false;

  public DatosSolicitudState!: Tramite5601State;
  
      /**
     * Un Subject que emite un valor `void` cuando el componente es destruido.
     * Se utiliza para gestionar y limpiar suscripciones, evitando fugas de memoria.
     */
   private destroyed$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,private tramite5601Store: Tramite5601Store,private tramite5601Query: Tramite5601Query) {
    this.aduanas = seleccionarOpciones?.aduanas;
    this.seccionAduanera = seleccionarOpciones?.seccionAduanera;
    this.tipoOperacion = seleccionarOpciones?.tipoOperacion;
    this.tipoMoneda = seleccionarOpciones?.tipoMoneda;
  }

  ngOnInit(): void {

     this.tramite5601Query.selectCertificacion$
        .pipe(
          takeUntil(this.destroyed$),
          map((datosSolicitudState) => {
            this.DatosSolicitudState = datosSolicitudState;
          })
        )
        .subscribe();
    this.formulario = this.fb.group({
      aduana: [this.DatosSolicitudState.aduana, Validators.required],
      seccionAduanera: [this.DatosSolicitudState.seccionAduanera],
      tipoOperacion: [this.DatosSolicitudState.tipoOperacion, Validators.required],
      fechaOperacion: [this.DatosSolicitudState.fechaOperacion, Validators.required],
      motivoDespachoDomicilio: [this.DatosSolicitudState.motivoDespachoDomicilio, Validators.required],
      observaciones: [this.DatosSolicitudState.observaciones]
    });

    this.formularioMercancia = this.fb.group({
      especificacionesMercancia: [this.DatosSolicitudState.especificacionesMercancia, Validators.required],
      descripcionMercancia: [this.DatosSolicitudState.descripcionMercancia, Validators.required],
      tipoMoneda: [this.DatosSolicitudState.tipoMoneda, Validators.required],
      valorMercancia: [this.DatosSolicitudState.valorMercancia, Validators.required],
    });

    this.formularioLogistica = this.fb.group({
      esquemasControlSeguridad: [this.DatosSolicitudState.esquemasControlSeguridad, Validators.required],
      distanciaRutaTiempos: [this.DatosSolicitudState.distanciaRutaTiempos, Validators.required],
    });

    this.formularioUbicacionMercancia = this.fb.group({
      direccion: [this.DatosSolicitudState.direccion, Validators.required],
      telefono: [this.DatosSolicitudState.telefono, Validators.required],
      distanciaAduana: [this.DatosSolicitudState.distanciaAduana, Validators.required],
      referencias: [this.DatosSolicitudState.referencias, Validators.required],
    });
  }

  alCambiarTipoOperacion(): void {
    this.mostrarFechaOperacion=true
    this.setValoresStore(this.formulario, 'tipoOperacion', 'setTipoOperacion')
  }

    public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5601Store): void {
      const VALOR = form.get(campo)?.value;
      (this.tramite5601Store[metodoNombre] as (value: unknown) => void)(VALOR);
    }

        /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyed$ para cancelar las suscripciones activas.
   */
        ngOnDestroy(): void {
          this.destroyed$.next();
          this.destroyed$.complete();
        }
    

}
