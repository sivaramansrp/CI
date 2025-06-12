
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PantallasFormData } from 'libs/shared/data-access-user/src/core/models/220401/servicios-pantallas.model';
import { ServiciosPantallasService } from 'libs/shared/data-access-user/src/core/services/220471/servicios-pantallas.service';

interface Solicitude {
  fechaCreacion: string;
  mercancia: string;
  cantidad: number;
  proovedor: string;
}
/**
 * Este componente se utiliza para mostrar el formulario de solicitud.- 220401
 * pantallasFormData: Form data of the screens
 */
@Component({
  selector: 'app-220401solicitud',
  templateUrl: './solicitud.component.html',
  standalone: true,
  imports: [CommonModule],
  providers : [ ],
  styleUrl: './solicitud.component.scss'
})

export class SolicitudPantallasComponent implements OnInit, OnDestroy {

  /**
   * Esta variable se utiliza para destruir la suscripción.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Esta variable se utiliza para crear los datos del formulario de las pantallas.
   */
  public pantallasFormData!: PantallasFormData;
  /**
   * constructor de la clase
   * @param serviciosPantallasService: Servicios de tienda de las pantallas.
   */
  solicitudes: Solicitude[] = [];
  displayedColumns: string[] = ['fechaCreacion', 'mercancia', 'cantidad', 'proovedor'];
  showContent = false;

/**
   * @property {boolean} formFormaceuticaColapsable
   * Controla la visibilidad del listado de forma farmacéutica.
   */
  public formFormaceuticaColapsable = false;

  /**
 * Carga los datos de las solicitudes desde un archivo JSON ubicado en la carpeta de assets.
 * 
 * Este método realiza una solicitud HTTP GET para obtener los datos de 'assets/json/220401/solicitude.json'.
 * Al recuperar los datos exitosamente, los asigna a la propiedad `solicitudes`.
 * Si ocurre un error durante la solicitud, registra un mensaje de error en la consola.
 */


  
  loadSolicitudesData():void {
   
    this.http.get<Solicitude[]>('assets/json/220401/solicitude.json').subscribe(
      (data) => {
        this.solicitudes = data;
        
      },
      (error) => {
        console.error('Error loading solicitudes data', error);
      }
    );
  }
  toggleContent():void {
    this.showContent = !this.showContent;
  }
 
  constructor(private serviciosPantallasService: ServiciosPantallasService, private http: HttpClient) {
    //
   }
    /**
   * Este método se utiliza para inicializar los datos del formulario de las pantallas.
   * Suscríbete/escucha los datos del formulario
   * Establecer los datos del formulario
   * Darse de baja de la suscripción
   */

  public ngOnInit(): void {
    this.serviciosPantallasService.pantallasFormObservable$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((formData: PantallasFormData) => {
        this.pantallasFormData = formData;
      });
      // Set the form data
      this.pantallasFormData['solict'] = [];
      this.serviciosPantallasService.setPantallasFormDataSubject(this.pantallasFormData);
    this.loadSolicitudesData();
  }

  /**
   * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
   *
   * @param orden - Número que indica la sección a modificar:
   *   - 1: Alterna el estado de `paisDeOriginColapsable`.
   *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
   *   - 3: Alterna el estado de `usoEspesificoColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.formFormaceuticaColapsable = !this.formFormaceuticaColapsable;
    }
  }

   /**
   * Este método se utiliza para destruir la suscripción. - 220401
   */
   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
   }
                  
}
