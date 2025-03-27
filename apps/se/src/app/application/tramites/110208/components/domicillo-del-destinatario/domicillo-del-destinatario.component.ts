import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

@Component({
  selector: 'app-domicillo-del-destinatario',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './domicillo-del-destinatario.component.html',
  styleUrl: './domicillo-del-destinatario.component.css',
})
export class DomicilloDelDestinatarioComponent implements OnInit,OnDestroy {
  /**
     * Estado de la solicitud obtenido desde el store.
     */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  domicilioDestinatario!:FormGroup

  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: ValidarInicalmenteService,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query
  ) {
    // Dependencia inyectada para uso posterior
  }

  
   /**
   * Lista de catálogos de estados.
   */
   estado: Catalogo[] = [];

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
    this.domicilioDestinatario = this.fb.group({
      ciudad:[this.solicitudState?.ciudad,Validators.required],
      calle:[this.solicitudState?.calle,Validators.required],
      numeroLetra:[this.solicitudState?.numeroLetra,Validators.required],
      lada:[this.solicitudState?.lada],
      telefono:[this.solicitudState?.telefono],
      fax:[this.solicitudState?.fax],
      correoElectronico:[this.solicitudState?.correoElectronico,Validators.required],
      paisDestino:[this.solicitudState?.paisDestino]
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
