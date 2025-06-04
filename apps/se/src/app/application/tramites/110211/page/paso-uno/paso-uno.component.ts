/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 * 
 * @import { Component } from '@angular/core';
 */

import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CamDatosCertificadoComponent } from '../../components/cam-datos-certificado/cam-datos-certificado.component';
import { CamDestinatarioComponent } from '../../components/cam-destinatario/cam-destinatario.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone:true,
  imports: [SolicitanteComponent,CertificadoOrigenComponent,CamDestinatarioComponent,CamDatosCertificadoComponent,CommonModule


  ]
})
export class PasoUnoComponent implements OnInit {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;

   /**
   * Estado actual de la consulta.
   *
   * @type {ConsultaioState}
   * @memberof NombreDelComponente
   * @description
   * Esta propiedad almacena el estado relacionado con la funcionalidad de consulta,
   * el cual puede ser utilizado para mostrar u operar sobre los datos actuales del store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * @type {Subject<void>}
   * @memberof NombreDelComponente
   * @description
   * Esta propiedad se utiliza junto con operadores de RxJS (como `takeUntil`)
   * para cancelar automáticamente las suscripciones cuando el componente es destruido.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @desc Indica si los datos de la respuesta están presentes o disponibles.
   * @type {boolean}
   * @memberof PasoUnoComponent
   * @compodoc
   * @description
   * [español] Bandera booleana que determina si se muestran o procesan los datos de respuesta en el componente.
   */
   public esDatosRespuesta: boolean = false;

  /**
   * Constructor de la clase.
   * 
   * @param consultaQuery Servicio para realizar consultas relacionadas con la entidad Consultaio.
   * @param camCertificadoService Servicio para gestionar certificados CAM.
   */
  constructor(private consultaQuery: ConsultaioQuery,private camCertificadoService: CamCertificadoService){}
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en el estado de la consulta y guarda los datos del formulario si es necesario.
   */
ngOnInit():void {
 this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
}

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.camCertificadoService.obtenerTodosDatosCamCertificado('cam-certificado.json').pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        // this.solocitud301Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}