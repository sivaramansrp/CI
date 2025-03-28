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
    fraccionArancelaria: string;
    nombreComercialMercancia: string;
    nombreTecnico: string;
    nombreIngles: string;
    criterioClasificacion: string;
    cantidad: string;
    umc: Catalogo[];
    valorMercancia: string;
    complementoClasificacion: string;
    numeroFactura: string,
    tipoFactura: Catalogo[],
    lugar: string,
    exportador: string,
    empresa: string,
    cargo: string,
    lada: string,
    telfono: string,
    fax: string,
    correo: string,
    formaValida: { [key: string]: boolean },
    formDestinatario: { [key: string]: undefined | boolean | string | number | object };
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
          fraccionArancelaria: '',
          nombreComercialMercancia: '',
          nombreTecnico: '',
          nombreIngles: '',
          criterioClasificacion: '',
          cantidad: '',
          umc: [],
          valorMercancia: '',
          complementoClasificacion: '',
          numeroFactura: '',
          tipoFactura: [],
          lugar: '',
          exportador: '',
          empresa: '',
          cargo: '',
          lada: '',
          telfono: '',
          fax: '',
          correo: '',
          formaValida: {
            certificado: false,
            datos: false,
            destinatrio: false,
            datosDestinatario: false,
          },
          formDestinatario: {
            paisDestin: '',
            ciudad: '',
            celle: '',
            numeroLetra: '',
            lada: '',
            telefono: '',
            fax: '',
            correoElectronico: ''
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

      setFraccionArancelaria(fraccionArancelaria: string) {
        this.update((state) => ({
            ...state,
            fraccionArancelaria,
        }));
      }

      setNombreComercialMercancia(nombreComercialMercancia: string){
        this.update((state) => ({
            ...state,
            nombreComercialMercancia
        }))
      }

      setNombreTecnico(nombreTecnico: string){
        this.update((state) => ({
            ...state,
            nombreTecnico
        }))
      }

      setNombreIngles(nombreIngles: string){
        this.update((state) => ({
            ...state,
            nombreIngles
        }))
      }

      setCriterioClasificacion(criterioClasificacion: string){
        this.update((state) => ({
            ...state,
            criterioClasificacion,
        }))
      }

      setCantidad(cantidad: string){
        this.update((state) => ({
            ...state,
            cantidad,
        }))
      }

      setUmc(umc: Catalogo[]){
        this.update((state) => ({
            ...state,
            umc,
        }))
      }

      setValorMercancia(valorMercancia: string){
        this.update((state) => ({
            ...state,
            valorMercancia,
        }))
      }

      setComplementoClasificacion(complementoClasificacion: string){
        this.update((state) => ({
            ...state,
            complementoClasificacion,
        }))
      }

      setNumeroFactura(numeroFactura: string){
        this.update((state) => ({
            ...state,
            numeroFactura,
        }))
      }

      setTipoFactura(tipoFactura: Catalogo[]){
        this.update((state) => ({
            ...state,
            tipoFactura,
        }))
      }

      setLugar(lugar: string){
        this.update((state) => ({
            ...state,
            lugar,
        }))
      }

      setExportador(exportador: string){
        this.update((state) => ({
            ...state,
            exportador,
        }))
      }

      setEmpresa(empresa: string){
        this.update((state) => ({
            ...state,
            empresa,
        }))
      }

      setCargo(cargo: string){
        this.update((state) => ({
            ...state,
            cargo
        }))
      }

      setLada(lada: string){
        this.update((state) => ({
            ...state,
            lada
        }))
      }

      setTelfono(telfono: string){
        this.update((state) => ({
            ...state,
            telfono,
        }))
      }

      setFax(fax: string){
        this.update((state) => ({
            ...state,
            fax,
        }))
      }

      setCorreo(correo: string){
        this.update((state) => ({
            ...state,
            correo,
        }))
      }

      setFormValida(formaValida: { [key: string]: boolean }): void {
        this.update((state) => {
          const IS_VALID = { ...state.formaValida, ...formaValida };
          return {
            ...state,
            formaValida: IS_VALID,
          };
        });
      }

      setFormDestinatario(values: { [key: string]: undefined | boolean | string | number | object }): void {
        this.update((state) => ({
          formDestinatario: {
            ...state.formDestinatario,
            ...values,
          },
        }));
      }
}