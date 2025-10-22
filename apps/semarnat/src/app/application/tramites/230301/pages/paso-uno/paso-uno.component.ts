import {
  AVISO,
  AlertComponent,
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { SolicitudComponent } from '../../component/solicitud/solicitud.component';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AlertComponent],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  TEXTOS = AVISO.Aviso;
  public consultaState!: ConsultaioState;
  public esDatosRespuesta: boolean = false;
  public formularioDeshabilitado: boolean = false;
  public destroyNotifier$: Subject<void> = new Subject();
  public isSolicitudActive = false;
  public isSolicitanteActive = false;
  private solicitudComponent: SolicitudComponent | undefined;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(private consultaQuery: ConsultaioQuery) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.formularioDeshabilitado = seccionState.readonly;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.router.navigate(['solicitud'], { relativeTo: this.route });
  }

  onActivate(
    componentInstance: SolicitudComponent | SolicitanteComponent
  ): void {
    if (componentInstance instanceof SolicitudComponent) {
      this.solicitudComponent = componentInstance;
      this.isSolicitanteActive = false;
      this.isSolicitudActive = true;
    } else {
      this.isSolicitanteActive = true;
      this.isSolicitudActive = false;
    }
  }

  public validarFormularios(): boolean {
    if (this.solicitudComponent) {
      return this.solicitudComponent.validarFormulario();
    }
    // If the solicitud tab hasn't been visited, the form is considered invalid.
    return false;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
