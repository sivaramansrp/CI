import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AnimalesVivoDetallesComponent } from '../../../../shared/components/animales-vivo-detalles/animales-vivo-detalles.component';
import { AnimalesEventos, DatosDeLaSolicitud } from '../../../../shared/models/datos-de-la-solicitue.model';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { FilaSolicitud } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';

@Component({
  selector: 'app-animales-vivo-contenedora',
  standalone: true,
  imports: [CommonModule, AnimalesVivoDetallesComponent],
  templateUrl: './animales-vivo-contenedora.component.html',
  styleUrl: './animales-vivo-contenedora.component.scss',
})
export class AnimalesVivoContenedoraComponent implements OnDestroy {
  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * @type {DatosDeLaSolicitud}
   */
  public catalogosDatos: DatosDeLaSolicitud = {
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
    sexoList: []
  }


  /**
   * @description Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es true, los campos del formulario no serán editables por el usuario.
   */
  public formularioSolicitud!: FilaSolicitud;

  /**
   * @description Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];



  constructor(public agriculturaApiService: CertificadoZoosanitarioServiceService,
    public fitosanitarioQuery: ZoosanitarioQuery,
    public fitosanitarioStore: ZoosanitarioStore
  ) {
    this.agriculturaApiService.obtenerRespuestaPorUrl('animales-vivo.json').subscribe((resp) => {
      this.catalogosDatos = resp;
    });
    this.fitosanitarioQuery.seleccionarState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((estado) => {
          this.cuerpoTabla = estado?.tablaDatos;
          const VALOR = estado?.selectedDatos[0];
          if (VALOR) {
            this.formularioSolicitud = {
              id: VALOR.id || Math.floor(Math.random() * 1000000),
              tipoRequisito: VALOR.tipoRequisito || '',
              requisito: VALOR.requisito || '',
              numeroCertificadoInternacional: VALOR.numeroCertificadoInternacional || '',
              fraccionArancelaria: VALOR.fraccionArancelaria || '',
              descripcionFraccion: VALOR.descripcionFraccion || '',
              nico: VALOR.nico || '',
              descripcionNico: VALOR.descripcionNico || '',
              descripcion: VALOR.descripcion || '',
              cantidadUMT: String(VALOR.cantidadUMT || ''),
              umt: VALOR.umt || '',
              cantidadUMC: String(VALOR.cantidadUMC || ''),
              umc: VALOR.umc || '',
              especie: '',
              uso: VALOR.uso || '',
              paisDeOrigen: VALOR.paisDeOrigen || '',
              paisDeProcedencia: VALOR.paisDeProcedencia || '',
              noPartida: VALOR.noPartida || '',
              tipoDeProducto: VALOR.tipoDeProducto || '',
              numeroDeLote: VALOR.numeroDeLote || '',
              certificadoInternacionalElectronico: VALOR.certificadoInternacionalElectronico || ''
            };
          }
        })
      )
      .subscribe();
  }

  /**
   * @description Método que se ejecuta al enviar el formulario de solicitud de animales vivos.
   * @param valor Datos del formulario de solicitud de animales vivos.
   */
  agregarDatosFormulario(valor: AnimalesEventos): void {
    const DATOS: FilaSolicitud = {
      id: valor.formulario.id || Math.floor(Math.random() * 1000000),
      noPartida: '',
      tipoRequisito: valor.formulario.tipoRequisito || '',
      requisito: valor.formulario.requisito || '',
      numeroCertificadoInternacional: valor.formulario.numeroCertificadoInternacional || '',
      fraccionArancelaria: valor.formulario.fraccionArancelaria || '',
      descripcionFraccion: valor.formulario.descripcionFraccion || '',
      nico: valor.formulario.nico || '',
      descripcionNico: valor.formulario.descripcionNico || '',
      descripcion: valor.formulario.descripcion || '',
      umt: valor.formulario.umt || '',
      cantidadUMT: valor.formulario.cantidadUMT || '',
      umc: valor.formulario.umc || '',
      cantidadUMC: valor.formulario.cantidadUMC || '',
      uso: valor.formulario.uso || '',
      tipoDeProducto: valor.formulario.tipoDeProducto || '',
      numeroDeLote: valor.formulario.numeroDeLote || '',
      paisDeOrigen: valor.formulario.paisDeOrigen || '',
      paisDeProcedencia: valor.formulario.paisDeProcedencia || '',
      certificadoInternacionalElectronico: ''
    }
    this.fitosanitarioStore.update(state => {
      const index = state.tablaDatos.findIndex(item => item.id === DATOS.id);

      const updatedTablaDatos =
        index !== -1
          ? state.tablaDatos.map((item, i) => (i === index ? DATOS : item))
          : [...state.tablaDatos, DATOS];
      return {
        ...state,
        tablaDatos: updatedTablaDatos,
        selectedDatos: []
      };
    });

  }



  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
