import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.css',
})
export class DatosDelDestinatarioComponent implements OnInit,OnDestroy{
  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  datosDestinatario!:FormGroup

  constructor(
        private fb: FormBuilder,
        private tramite110208Store: Tramite110208Store,
        private tramite110208Query: Tramite110208Query
      ) {
        // Dependencia inyectada para uso posterior
      }

  ngOnInit(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.datosDestinatario = this.fb.group({
      nombres:[this.solicitudState?.nombres],
      primerApellido:[this.solicitudState?.primerApellido],
      segundoApellido:[this.solicitudState?.segundoApellido],
      numeroFiscal:[this.solicitudState?.numeroFiscal,Validators.required],
      razonSocial:[{value:this.solicitudState?.razonSocial,disabled:true}]
    })
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
