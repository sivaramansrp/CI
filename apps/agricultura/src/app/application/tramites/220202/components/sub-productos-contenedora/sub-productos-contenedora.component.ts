import { ProductoDetallaEventos, ProductosCatalogosDatos } from '../../../../shared/models/datos-de-la-solicitue.model';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilaSolicitud } from '../../models/220202/fitosanitario.model';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';
import { SubProductosComponent } from '../../../../shared/components/sub-productos/sub-productos.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sub-productos-contenedora',
  standalone: true,
  imports: [CommonModule, SubProductosComponent],
  templateUrl: './sub-productos-contenedora.component.html',
  styleUrl: './sub-productos-contenedora.component.scss',
})
export class SubProductosContenedoraComponent {

  /**
   * @description Datos de la solicitud que se recibirán como entrada en el componente.
   * @type {ProductosCatalogosDatos}
   * */
    public catalogosDatos: ProductosCatalogosDatos ={
      tipoRequisitoList: [],
      requisitoList: [],
      fraccionArancelariaList: [],
      nicoList: [],
      umtList: [],
      umcList: [],
      especieList: [],
      usoList: [],
      paisOrigenList: [],
      paisDeProcedenciaList: [],
      sexoList: [],
      presentacionList: [],
      cantidadPresentacionList: [],
      tipoPresentacionList: [],
      tipoPlantaList: [],
      plantaAutorizadaOrigenList: []
    }

      /**
       * @description Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
       * @type {Subject<void>}
       */
      public destroyNotifier$ = new Subject<void>();

        constructor(public agriculturaApiService: AgriculturaApiService,
          public fitosanitarioQuery: FitosanitarioQuery,
          public fitosanitarioStore: FitosanitarioStore
        ) {
          this.agriculturaApiService.obtenerProductoRespuestaPorUrl('productos.json').subscribe((resp) => {
            this.catalogosDatos = resp;
          });
        }

          /**
           * @description Método que se ejecuta al enviar el formulario de solicitud de animales vivos.
           * @param valor Datos del formulario de solicitud de animales vivos.
           */
          agregarDatosFormulario(valor: ProductoDetallaEventos): void {
            const DATOS: FilaSolicitud = {
              noPartida: '',
              tipoRequisito: valor.formulario.tipoRequisito || '',
              requisito: valor.formulario.requisito || '',
              numeroCertificadoInternacional: '',
              fraccionArancelaria: valor.formulario.fraccionArancelaria || '',
              descripcionFraccion: valor.formulario.descripcionFraccion || '',
              nico: valor.formulario.nico || '',
              descripcionNico: valor.formulario.descripcionNico || '',
              descripcion: valor.formulario.descripcion || '',
              umt: '',
              cantidadUMT: valor.formulario.cantidadUMT || '',
              umc: valor.formulario.umc || '',
              cantidadUMC: valor.formulario.cantidadUMC || '',
              uso: valor.formulario.uso || '',
              tipoDeProducto: '',
              numeroDeLote: '',
              paisDeOrigen: '',
              paisDeProcedencia: valor.formulario.paisDeProcedencia || '',
              certificadoInternacionalElectronico: ''
            }
            this.fitosanitarioStore.update(state => ({
              ...state,
              tablaDatos: [...state.tablaDatos, DATOS],
              selectedDatos: []
            }));
          }
        
}
