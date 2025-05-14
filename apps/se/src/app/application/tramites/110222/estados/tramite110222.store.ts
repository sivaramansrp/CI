import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

/**
 * @descripcion
 * Interfaz que define el estado del certificado Tramite110222Store.
 */
export interface Tramite110222State {
  formCertificado: { [key: string]: unknown};
  estado: Catalogo;
  paisBloques: Catalogo[];
  mercanciaForm: { [key: string]: unknown};
  mercanciaTabla: Mercancia[];
  formDatosCertificado: { [key: string]: unknown};
  idiomaDatosSeleccion: Catalogo;
  entidadFederativaSeleccion: Catalogo;
  representacionFederalSeleccion: Catalogo;
  formDatosDelDestinatario: { [key: string]: unknown};
  formExportor: { [key: string]: unknown};
  fraccionArancelaria: string;
  nombreComercialMercancia: string;
  nombreTecnico: string;
  nombreIngles: string;
  complementoDescripcion: string;
  criterioParaTratoPreferencial: string;
  valorDeContenidoRegional: string;
  numeroDeSerie: string;
  cantidad: string;
  umc: Catalogo[];
  valorMercancia: string;
  complementoClasificacion: string;
  numeroFactura: string;
  tipoFactura: Catalogo[];
  formaValida: { [key: string]: boolean };
  formDestinatario: { [key: string]: unknown};
  datosConfidencialesProductor?: boolean;
  si?: boolean;
  productorMismoExportador?: boolean;
  agregarDatosProductorFormulario: { [key: string]: unknown};
  formulario: { [key: string]: unknown};
}

/**
 * @descripcion
 * Función que crea el estado inicial del certificado Tramite110222Store.
 */
export function createInitialState(): Tramite110222State {
  return {
    formCertificado: {
      si: false,
      entidadFederativa: '',
      bloque: '',
      nombreComercialForm: '',
      registroProductoForm: '',
      fraccionArancelariaForm: '',
      fechaInicioInput: '',
      fechaFinalInput: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDeRegistroFiscal: '',
      razonSocial: '',
    },
    estado: {
      id: -1,
      descripcion: '',
    },
    paisBloques: [],
    mercanciaForm: {
      fraccionArancelaria: '',
      nombreComercialMercancia: '',
      nombreTecnico: '',
      nombreIngles: '',
      complementoDescripcion: '',
      criterioParaTratoPreferencial: '',
      valorDeContenidoRegional: '',
      numeroDeSerie: '',
      marca: '',
      cantidad: '',
      umc: '',
      valorMercancia: '',
      complementoClasificacion: '',
      masaBruta: '',
      unidadMedidaMasaBruta: '',
      numeroFactura: '',
      tipoFactura: '',
      fechaFinal: '',
      normaOrigen: '',
      id: '',
      fechaFinalInput: '',
      nalad: '',
    },
    mercanciaTabla: [],
    formDatosCertificado: {
      observacionesDates: '',
      idiomaDates: '',
      precisaDates: '',
      EntidadFederativaDates: '',
      representacionFederalDates: '',
    },
    idiomaDatosSeleccion: { id: -1, descripcion: '' },
    entidadFederativaSeleccion: { id: -1, descripcion: '' },
    representacionFederalSeleccion: { id: -1, descripcion: '' },
    formDatosDelDestinatario: {
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDeRegistroFiscal: '',
      razonSocial: '',
    },
    fraccionArancelaria: '',
    nombreComercialMercancia: '',
    nombreTecnico: '',
    nombreIngles: '',
    complementoDescripcion: '',
    criterioParaTratoPreferencial: '',
    valorDeContenidoRegional: '',
    numeroDeSerie: '',
    cantidad: '',
    umc: [],
    valorMercancia: '',
    complementoClasificacion: '',
    numeroFactura: '',
    tipoFactura: [],
    formExportor: {
      lugar: '',
      exportador: '',
      empresa: '',
      cargo: '',
      lada: '',
      telfono: '',
      fax: '',
      correo: '',
    },
    formaValida: {
      certificado: false,
      datos: false,
      destinatrio: false,
      datosDestinatario: false,
      exportador: false,
    },
    formDestinatario: {
      paisDestin: '',
      ciudad: '',
      celle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    formulario:{
      datosConfidencialesProductor: '',
      productorMismoExportador: '',
    },
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',      
    }
  };
}

/**
 * @descripcion
 * Clase que representa el almacén del certificado Tramite110222Store.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite110222Store', resettable: true })
export class Tramite110222Store extends Store<Tramite110222State> {
  /**
   * @descripcion
   * Constructor que inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de certificado.
   * @param values - Valores a actualizar en el formulario.
   */
  setFormCertificado(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      formCertificado: {
        ...state.formCertificado,
        ...values,
      },
    }));
  }


    /**
   * @descripcion
   * Actualiza los datos del formulario de formulario.
   * @param values - Valores a actualizar en el formulario.
   */
    setFormHistorico(values: { [key: string]: unknown}): void {
      this.update((state) => ({
        formulario: {
          ...state.formulario,
          ...values,
        },
      }));
    }

    /**
     * @descripcion
     * Actualiza los datos del formulario de productor.
     * @param values - Valores a actualizar en el formulario.
     * */
    setAgregarFormDatosProductor(values: { [key: string]: unknown}): void {
      this.update((state) => ({
        agregarDatosProductorFormulario: {
          ...state.agregarDatosProductorFormulario,
          ...values,
        },
      }));
    }
      /**
     * @descripcion
     * Actualiza el estado seleccionado en el almacén.
     * @param estado - Objeto de tipo `Catalogo` que contiene la información del estado a actualizar.
     */
      setEstado(estado: Catalogo): void {
        this.update((state) => ({
          ...state,
          estado,
        }));
      }

      /**
       * @descripcion
       * Actualiza los bloques de países en el almacén.
       * @param paisBloques - Array de objetos `Catalogo` que representa los bloques de países.
       */
      setBloque(paisBloques: Catalogo[]): void {
        this.update((state) => ({
          ...state,
          paisBloques,
        }));
      }

      /**
       * @descripcion
       * Actualiza los datos del formulario de mercancía en el almacén.
       * @param values - Objeto que contiene los valores a actualizar en el formulario de mercancía.
       */
      setFormMercancia(values: { [key: string]: unknown}): void {
        this.update((state) => ({
          mercanciaForm: {
            ...state.mercanciaForm,
            ...values,
          },
        }));
      }

      /**
       * @descripcion
       * Actualiza la tabla de mercancías en el almacén.
       * @param mercanciaTabla - Array de objetos `Mercancia` que representa la tabla de mercancías.
       */
      setmercanciaTabla(mercanciaTabla: Mercancia[]): void {
        this.update((state) => ({
          ...state,
          mercanciaTabla,
        }));
      }

      /**
       * @descripcion
       * Actualiza los datos del formulario de certificado en el almacén.
       * @param values - Objeto que contiene los valores a actualizar en el formulario de certificado.
       */
      setFormDatosCertificado(values: { [key: string]: unknown}): void {
        this.update((state) => ({
          formDatosCertificado: {
            ...state.formDatosCertificado,
            ...values,
          },
        }));
      }

      /**
       * @descripcion
       * Actualiza el idioma seleccionado en el almacén.
       * @param idiomaDatosSeleccion - Objeto de tipo `Catalogo` que contiene la información del idioma seleccionado.
       */
      setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          idiomaDatosSeleccion,
        }));
      }

      /**
       * @descripcion
       * Actualiza la entidad federativa seleccionada en el almacén.
       * @param entidadFederativaSeleccion - Objeto de tipo `Catalogo` que contiene la información de la entidad federativa seleccionada.
       */
      setEntidadFederativaSeleccion(entidadFederativaSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          entidadFederativaSeleccion,
        }));
      }

      /**
       * @descripcion
       * Actualiza la representación federal seleccionada en el almacén.
       * @param representacionFederalSeleccion - Objeto de tipo `Catalogo` que contiene la información de la representación federal seleccionada.
       */
      setRepresentacionFederalDatosSeleccion(representacionFederalSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          representacionFederalSeleccion,
        }));
      }

      /**
       * @descripcion
       * Actualiza los datos del formulario de destinatario en el almacén.
       * @param values - Objeto que contiene los valores a actualizar en el formulario de destinatario.
       */
      setFormDatosDelDestinatario(values: { [key: string]: unknown}): void {
        this.update((state) => ({
          formDatosDelDestinatario: {
            ...state.formDatosDelDestinatario,
            ...values,
          },
        }));
      }

      /**
       * @descripcion
       * Actualiza los datos del formulario de exportador en el almacén.
       * @param values - Objeto que contiene los valores a actualizar en el formulario de exportador.
       */
      setFormExportador(values: { [key: string]: unknown}): void {
        this.update((state) => ({
          formExportor: {
            ...state.formExportor,
            ...values,
          },
        }));
      }

      /**
       * @descripcion
       * Actualiza el número de fraccionArancelaria en el almacén.
       * @param telfono - Cadena que representa el número de fraccionArancelaria a actualizar.
       */
      setFraccionArancelaria(fraccionArancelaria: string): void {
        this.update((state) => ({
            ...state,
            fraccionArancelaria,
        }));
      }

      /**
       * @descripcion
       * Actualiza el número de nombreComercialMercancia en el almacén.
       * @param telfono - Cadena que representa el número de nombreComercialMercancia a actualizar.
       */
      setNombreComercialMercancia(nombreComercialMercancia: string): void {
        this.update((state) => ({
            ...state,
            nombreComercialMercancia
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de nombreTecnico en el almacén.
       * @param telfono - Cadena que representa el número de nombreTecnico a actualizar.
       */
      setNombreTecnico(nombreTecnico: string): void {
        this.update((state) => ({
            ...state,
            nombreTecnico
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de nombreIngles en el almacén.
       * @param telfono - Cadena que representa el número de nombreIngles a actualizar.
       */
      setNombreIngles(nombreIngles: string): void {
        this.update((state) => ({
            ...state,
            nombreIngles
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de nombreIngles en el almacén.
       * @param telfono - Cadena que representa el número de nombreIngles a actualizar.
       */
      setCriterioParaTratoPreferencial(criterioParaTratoPreferencial: string): void {
        this.update((state) => ({
            ...state,
            criterioParaTratoPreferencial
        }))
      }

      /**
       * @descripcion
       * Actualiza el valor de `otrasInstancias` en el almacén.
       * @param otrasInstancias - Cadena que representa el nuevo valor de `otrasInstancias`.
       */
      setOtrasInstancias(otrasInstancias: string): void {
        this.update((state) => ({
            ...state,
            otrasInstancias
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de criterioParaConferirOrigen en el almacén.
       * @param criterioParaConferirOrigen - Cadena que representa el número de criterioParaConferirOrigen a actualizar.
       */
      setCriterioParaConferirOrigen(criterioParaConferirOrigen: string): void {
        this.update((state) => ({
            ...state,
            criterioParaConferirOrigen,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de valorDeContenidoRegional en el almacén.
       * @param valorDeContenidoRegional - Cadena que representa el número de valorDeContenidoRegional a actualizar.
       */
      setValorDeContenidoRegional(valorDeContenidoRegional: string): void {
        this.update((state) => ({
            ...state,
            valorDeContenidoRegional,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de numeroDeSerie en el almacén.
       * @param numeroDeSerie - Cadena que representa el número de numeroDeSerie a actualizar.
       */
      setNumeroDeSerie(numeroDeSerie: string): void {
        this.update((state) => ({
            ...state,
            numeroDeSerie,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de cantidad en el almacén.
       * @param telfono - Cadena que representa el número de cantidad a actualizar.
       */
      setCantidad(cantidad: string): void {
        this.update((state) => ({
            ...state,
            cantidad,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de umc en el almacén.
       * @param telfono - Cadena que representa el número de umc a actualizar.
       */
      setUmc(umc: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            umc,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de valorMercancia en el almacén.
       * @param telfono - Cadena que representa el número de valorMercancia a actualizar.
       */
      setValorMercancia(valorMercancia: string): void {
        this.update((state) => ({
            ...state,
            valorMercancia,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de complementoDescripcion en el almacén.
       * @param telfono - Cadena que representa el número de complementoDescripcion a actualizar.
       */
      setComplementoDescripcion(complementoDescripcion: string): void {
        this.update((state) => ({
            ...state,
            complementoDescripcion,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de numeroFactura en el almacén.
       * @param telfono - Cadena que representa el número de numeroFactura a actualizar.
       */
      setNumeroFactura(numeroFactura: string): void {
        this.update((state) => ({
            ...state,
            numeroFactura,
        }))
      }

      /**
       * @descripcion
       * Actualiza el número de tipoFactura en el almacén.
       * @param telfono - Cadena que representa el número de tipoFactura a actualizar.
       */
      setTipoFactura(tipoFactura: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            tipoFactura,
        }))
      }
      /**
       * @descripcion
       * Actualiza el estado de validación de los formularios en el almacén.
       * @param formaValida - Objeto que contiene los valores de validación para los formularios.
       */
      setFormValida(formaValida: { [key: string]: boolean }): void {
        this.update((state) => {
          const IS_VALID = { ...state.formaValida, ...formaValida };
          return {
            ...state,
            formaValida: IS_VALID,
          };
        });
      }

      /**
     * @descripcion
     * Actualiza los datos del formulario de destinatario en el almacén.
     * @param values - Objeto que contiene los valores a actualizar en el formulario de destinatario.
     */
      setFormDestinatario(values: { [key: string]: unknown}): void {
        this.update((state) => ({
          formDestinatario: {
            ...state.formDestinatario,
            ...values,
          },
        }));
      }

      /**
       * @descripcion
       * Actualiza los datos del formulario de certificado en el almacén.
       * @param values - Objeto que contiene los valores a actualizar en el formulario de certificado.
       */
      setFormCertificadoGenric(values: { [key: string]: unknown}): void {    
        this.update((state) => ({
          formCertificado: {
            ...state.formCertificado,
            ...values,
          },
        }));
      }
}