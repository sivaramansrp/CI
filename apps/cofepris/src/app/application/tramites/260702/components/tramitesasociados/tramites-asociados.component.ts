import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { TramitesAsociados } from '../../models/destinatario.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-tramites-asociados',
  templateUrl: './tramites-asociados.component.html',
  styleUrls: ['./tramites-asociados.component.css'],
 standalone:true,
 imports:[TablaDinamicaComponent,TituloComponent]
})
export class TramitesAsociadosComponent implements OnInit, OnDestroy {
  tablaFilaDatos: TramitesAsociados[] = [];
  isModalVisible = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  destinatarioConfiguracionTabla: ConfiguracionColumna<TramitesAsociados>[] = [
    {
      encabezado: 'No.',
      clave: (fila) => fila?.No,
      orden: 1,
    },
    {
      encabezado: 'Folio tramite',
      clave: (fila) => fila?.folioTramite,
      orden: 2,
    },
    {
      encabezado: 'Tipo tramite',
      clave: (fila) => fila?.tipoTramite,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (fila) => fila?.estatus,
      orden: 4,
    },
    {
      encabezado: 'Fecha alta de registro',
      clave: (fila) => fila?.fechaaltaderegistro,
      orden: 5,
    },
  ];

  constructor(
    private registrarsolicitudmcp: RegistrarSolicitudMcpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTramitesAsociados();
  }

  getTramitesAsociados(): void {
    this.registrarsolicitudmcp
      .getTramitesAsociados()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tablaFilaDatos = data as TramitesAsociados[];
      });
  }

  // navigateToPagoDeDerechos(): void {
  //   console.log('Navigating to /registro/pagodederechos');
  
  //   this.hideModal(); // Ensure modal is hidden
  //   this.router.navigate(['/registro/pagodederechos']); // Absolute navigation to the route
  // }
  
  navigateToPagoDeDerechos() {
    this.isModalVisible = false; // Hide the modal
    this.router.navigate(['/registro/pagodederechos']); // Use the correct path
  }

 
  showModal(): void {
    this.isModalVisible = true;
  }

  hideModal(): void {
    this.isModalVisible = false;
  }

 
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}