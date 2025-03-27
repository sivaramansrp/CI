import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css',
})
export class DetallesComponent implements OnInit,OnDestroy{
  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  estado: Catalogo[] = [];

  private destroyed$ = new Subject<void>();

  detallas!:FormGroup

    constructor(
      private fb: FormBuilder,
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
      this.detallas = this.fb.group({
        medioTransporte:[this.solicitudState?.medioTransporte],
        rutaCompleta:[this.solicitudState?.rutaCompleta],
        puertoDeEmbarque:[this.solicitudState?.puertoDeEmbarque],
        puertoDeDesembarque:[this.solicitudState?.puertoDeDesembarque]
      })
      this.obtenerEstadoList()
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
