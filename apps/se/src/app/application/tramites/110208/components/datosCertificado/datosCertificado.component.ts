import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './datosCertificado.component.html',
  styleUrl: './datosCertificado.component.css',
})
export class DatosCertificadoComponent implements OnInit,OnDestroy{
  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  formDatosCertificado!: FormGroup

  private destroyed$ = new Subject<void>();

  /**
 * Lista de catálogos de estados.
 */
  estado: Catalogo[] = [];
  constructor(
      private readonly fb: FormBuilder,
      private service: ValidarInicalmenteService,
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
      this.obtenerEstadoList()
      this.formDatosCertificado = this.fb.group({
        observaciones:[this.solicitudState?.observaciones],
        idioma:[this.solicitudState?.idioma,Validators.required],
        entidadFederativa:[this.solicitudState?.entidadFederativaCertificado,Validators.required],
        representacionFederal:[this.solicitudState?.representacionFederal,Validators.required]
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

    /**
     * Obtiene la lista de estados desde un archivo JSON.
     */
    obtenerEstadoList(): void {
      this.service.obtenerEstadoList()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          const DATOS = data?.data;
          this.estado = DATOS;
        });
    }

    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
