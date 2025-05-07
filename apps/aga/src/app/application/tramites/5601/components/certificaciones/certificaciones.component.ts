import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCheckComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { MENSAJE_MODAL, TITULO_MODAL } from '../../constantes/tramite5601.enum';
import {Subject,map,takeUntil } from 'rxjs';
import { Tramite5601State, Tramite5601Store } from '../../estados/stores/tramite5601.store';
import { CommonModule } from '@angular/common';
import { Tramite5601Query } from '../../estados/queries/tramite5601.query';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule,TituloComponent,InputCheckComponent,ReactiveFormsModule],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.scss',
})
export class CertificacionesComponent implements OnInit, OnDestroy {

  formularioCertificacion!: FormGroup;
  modal: string = '';

  tituloModal!: string;

  mensajeModal!: string;

  public certificacionState!: Tramite5601State;

    /**
   * Un Subject que emite un valor `void` cuando el componente es destruido.
   * Se utiliza para gestionar y limpiar suscripciones, evitando fugas de memoria.
   */
  private destroyed$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private tramite5601Store: Tramite5601Store,
    private tramite5601Query: Tramite5601Query) {
    // Inicializa el formulario de certificación
  }

  ngOnInit(): void {
    this.tramite5601Query.selectCertificacion$
    .pipe(
      takeUntil(this.destroyed$),
      map((certificacionState) => {
        this.certificacionState = certificacionState;
      })
    )
    .subscribe();

    this.formularioCertificacion = this.fb.group({
      tieneCertificacion: [this.certificacionState.tieneCertificacion],
      certificacionEmpresa: [this.certificacionState.certificacionEmpresa], 
      otraCertificacion: [this.certificacionState.otraCertificacion], 
    });
  }
  

  mostrarModalSiSeleccionado(event: Event): void {
    const CHECKBOX = event.target as HTMLInputElement;
    if (CHECKBOX.checked) {
      this.tituloModal = TITULO_MODAL
      this.mensajeModal = MENSAJE_MODAL;
      this.abrirModal();
    }
  }

  abrirModal(): void {
    this.modal = 'show';
  }

  cerrarModal(): void {
    this.modal = '';
    this.tituloModal = '';
    this.mensajeModal = '';
  }

  confirmarAccion(): void {
    this.cerrarModal();
  }

  cancelarAccion(): void {
    this.cerrarModal();
  }

  onTieneCertificacionChange(event: Event): void {
    this.mostrarModalSiSeleccionado(event);
    this.setValoresStore(this.formularioCertificacion, 'tieneCertificacion', 'setTieneCertificacion');
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
