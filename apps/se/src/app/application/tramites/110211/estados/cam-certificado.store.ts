import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Mercancia } from '../../../shared/models/modificacion.enum';


export interface camState {
    formCertificado: { [key: string]: undefined | boolean | string | number | object };
    estado: Catalogo;
    paisBloques: Catalogo[];
    mercanciaForm:{ [key: string]: undefined | boolean | string | number | object};
    mercanciaTabla: Mercancia[];
    formDatosCertificado: { [key: string]: undefined | boolean | string | number | object };
    idiomaDatosSeleccion: Catalogo;
    entidadFederativaSeleccion: Catalogo;
    representacionFederalSeleccion: Catalogo;
    formDatosDelDestinatario: { [key: string]: undefined | boolean | string | number | object };
}

export function createInitialState(): camState {
    return {
        formCertificado: {
            entidadFederativa: '',
            bloque: '',
            nombreComercialForm: '',
            registroProductoForm: '',
            fraccionArancelariaForm: '',
            fechaInicioInput:'',
            fechaFinalInput:'',
          },
          estado: {
            id: -1,
            descripcion: '',
          },
          paisBloques: [],
          mercanciaForm:{
            fraccionArancelaria: '',
            nombreComercialMercancia: '',
            nombreTecnico: '',
            nombreIngles: '',
            criterioClasificacion: '',
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
            nalad: ''    
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
            razonSocial: ''
          },
    }
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class camCertificadoStore extends Store<camState> {
    constructor() {
        super(createInitialState());
    }

    setFormCertificado(values: { [key: string]: undefined | boolean | string | number | object }): void {
        this.update((state) => ({
          formCertificado: {
            ...state.formCertificado,
            ...values,
          },
        }));
      }

      setEstado(estado: Catalogo): void {
        this.update((state) => ({
          ...state,
          estado,
        }));
      }

      setBloque(paisBloques: Catalogo[]): void {
        this.update((state) => ({
          ...state,
          paisBloques,
        }));
      }

      setFormMercancia(values: { [key: string]: undefined | boolean | string | number | object }): void {
        this.update((state) => ({
          mercanciaForm: {
            ...state.mercanciaForm,
            ...values,
          },
        }));
      }

      setmercanciaTabla(mercanciaTabla: Mercancia[]): void {
        this.update((state) => ({
          ...state,
          mercanciaTabla,
        }));
      }

      setFormDatosCertificado(values: { [key: string]: undefined | boolean | string | number | object }): void {
        this.update((state) => ({
          formDatosCertificado: {
            ...state.formDatosCertificado,
            ...values,
          },
        }));
      }

      setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          idiomaDatosSeleccion,
        }));
      }

      setEntidadFederativaSeleccion(entidadFederativaSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          entidadFederativaSeleccion,
        }));
      }

      setRepresentacionFederalDatosSeleccion(representacionFederalSeleccion: Catalogo): void {
        this.update((state) => ({
          ...state,
          representacionFederalSeleccion,
        }));
      }
      
      setFormDatosDelDestinatario(values: { [key: string]: undefined | boolean | string | number | object }): void {
        this.update((state) => ({
          formDatosDelDestinatario: {
            ...state.formDatosDelDestinatario,
            ...values,
          },
        }));
      }
}