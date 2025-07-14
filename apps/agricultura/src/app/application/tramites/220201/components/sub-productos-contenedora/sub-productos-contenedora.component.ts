import { ProductoDetallaEventos, ProductosCatalogosDatos} from '../../../../shared/models/datos-de-la-solicitue.model';
import { AgriculturaApiService } from '../../services/220201/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilaSolicitud } from '../../models/220201/capturar-solicitud.model';
import { SubProductosComponent } from '../../../../shared/components/sub-productos/sub-productos.component';
import { Subject } from 'rxjs';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';

@Component({
  selector: 'app-sub-productos-contenedora',
  standalone: true,
imports: [CommonModule, SubProductosComponent],
  templateUrl: './sub-productos-contenedora.component.html',
  styleUrl: './sub-productos-contenedora.component.css',
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
  
  
    /**
     * Constructor de la clase `SubProductosContenedoraComponent`.
     * 
     * Este constructor inicializa los servicios necesarios para la funcionalidad del componente.
     * 
     * @param agriculturaApiService - Servicio para interactuar con la API de Agricultura.
     * @param fitosanitarioQuery - Servicio para realizar consultas relacionadas con fitosanitarios.
     * @param fitosanitarioStore - Servicio para gestionar el estado de fitosanitarios.
     * 
     * Dentro del constructor, se realiza una solicitud a la API para obtener los datos de productos
     * desde el archivo `productos.json`. La respuesta de esta solicitud se asigna a la propiedad 
     * `catalogosDatos` del componente.
     */
    constructor(public agriculturaApiService: AgriculturaApiService,
      public fitosanitarioQuery: ZoosanitarioQuery,
       public fitosanitarioStore: ZoosanitarioStore
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
