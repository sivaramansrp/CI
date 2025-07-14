import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AnimalesVivoDetallesComponent } from '../../../../shared/components/animales-vivo-detalles/animales-vivo-detalles.component';
import { AnimalesEventos, AnimalesFormularioSolicitud, DatosDeLaSolicitud } from '../../../../shared/models/datos-de-la-solicitue.model';
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
  public formularioSolicitud!: AnimalesFormularioSolicitud;

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
              tipoRequisito: VALOR.tipoRequisito || '',
              requisito: VALOR.requisito || '',
              numeroCertificado: '',
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
              paisOrigen: '',
              paisDeProcedencia: VALOR.paisDeProcedencia || ''
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
      id: Math.floor(Math.random() * 1000000),
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



  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
