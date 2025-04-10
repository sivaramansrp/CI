import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ClavesDeLotes, Destinatario, Fabricante, Mercancia } from '../models/consulta.model';

export interface Catalogo {
  id: number;
  descripcion: string;
}

export interface Solicitud260704State {
  mercanciasDatos: Mercancia[];
  destinatarioDatos: Destinatario[];
  tipoOperacion: string | number;
justificacion: string;
establecimiento: string;
razonSocial: string;
correoElectronico: string;
codigoPostal: string;
estado: string;
municipio: string;
localidad: string;
colonia: string;
calle: string;
lada: string;
telefono: string;
scian: boolean;
claveScian: string;
descripcionScian: string;
avisoDeFuncionamiento: boolean;
licenciaSanitaria: string;
regimen: string;
aduana: string;
immex: string;
ano: string;
mercancia: string;
clasificacionProducto: string;
especificarClasificacionProducto: string;
denominacionProducto: string;
marca: string;
tipoProducto: string;
especifique: string;
fraccionArancelaria: string;
descripcionFraccionArancelaria: string;
cantidadUMT: string;
umt: string;
cantidadUMC: string;
umc: string;
claveLote: string;
listaClave: string;
manfestosYDeclaraciones: boolean;
hacerlosPublicos: string;
rfc: string;
claveDeReferencia: string;
cadenaDependecia: string;
banco: string;
liaveDePago: string;
importeDePago: string;
destinatario: string;
fabricante: string;
tipoPersona: string;
nombre: string;
primerApellido: string;
segundoApellido: string;
denominacion: string;
pais: string;
estados: string;
codigoDeZip: string;
camino: string;
numeroExterior: string;
numeroInterior: string;
ladaDeTerceros: string;
fon: string;
email: string;
fechaPago: string;
}

export function createInitialState(): Solicitud260704State {
  return {
    mercanciasDatos: [],
    destinatarioDatos: [],
    tipoOperacion: '',
    justificacion: '',
    establecimiento: '',
    razonSocial: '',
    correoElectronico: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    lada: '',
    telefono: '',
    scian: false,
    claveScian: '',
    descripcionScian: '',
    avisoDeFuncionamiento: false,
    licenciaSanitaria: '',
    regimen: '',
    aduana: '',
    immex: '',
    ano: '',
    mercancia: '',
    clasificacionProducto: '',
    especificarClasificacionProducto: '',
    denominacionProducto: '',
    marca: '',
    tipoProducto: '',
    especifique: '',
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: '',
    claveLote: '',
    listaClave: '',
    manfestosYDeclaraciones: false,
    hacerlosPublicos: '',
    rfc: '',
    claveDeReferencia: '',
    cadenaDependecia: '',
    banco: '',
    liaveDePago: '',
    importeDePago: '',
    destinatario: '',
    fabricante: '',
    tipoPersona: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    denominacion: '',
    pais: '',
    estados: '',
    codigoDeZip: '',
    camino: '',
    numeroExterior: '',
    numeroInterior: '',
    ladaDeTerceros: '',
    fon: '',
    email: '',
    fechaPago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260704', resettable: true })
export class Tramite260704Store extends Store<Solicitud260704State> {
  constructor() {
    super(createInitialState());
  }
  
  setTipoOperacion(tipoOperacion: string | number): void {
    this.update((state) => ({
      ...state,
      tipoOperacion,
    }));
  }

setClaveDeLosLotes(claveDeLosLotes: string): void {
  this.update((state) => ({
    ...state,
    claveDeLosLotes,
  }));
}
 addMercanciasDatos(newMercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: [...state.mercanciasDatos, newMercancia],
    }));
  }
  removeDestinatarioDato(destinatarioToRemove: Destinatario): void {
      this.update((state) => ({
        ...state,
        destinatarioDatos: state.destinatarioDatos.filter(
          (destinatario) => destinatario.rfc !== destinatarioToRemove.rfc
        ),
      }));
    }

    setJustificacion(justificacion: string): void {
      this.update((state) => ({
        ...state,
        justificacion,
      }));
    }
    
    setEstablecimiento(establecimiento: string): void {
      this.update((state) => ({
        ...state,
        establecimiento,
      }));
    }
    
    setRazonSocial(razonSocial: string): void {
      this.update((state) => ({
        ...state,
        razonSocial,
      }));
    }
    
    setCorreoElectronico(correoElectronico: string): void {
      this.update((state) => ({
        ...state,
        correoElectronico,
      }));
    }
    
    setCodigoPostal(codigoPostal: string): void {
      this.update((state) => ({
        ...state,
        codigoPostal,
      }));
    }
    
    setEstado(estado: string): void {
      this.update((state) => ({
        ...state,
        estado,
      }));
    }
    
    setMunicipio(municipio: string): void {
      this.update((state) => ({
        ...state,
        municipio,
      }));
    }
    
    setLocalidad(localidad: string): void {
      this.update((state) => ({
        ...state,
        localidad,
      }));
    }
    
    setColonia(colonia: string): void {
      this.update((state) => ({
        ...state,
        colonia,
      }));
    }
    
    setCalle(calle: string): void {
      this.update((state) => ({
        ...state,
        calle,
      }));
    }
    
    setLada(lada: string): void {
      this.update((state) => ({
        ...state,
        lada,
      }));
    }
    
    setTelefono(telefono: string): void {
      this.update((state) => ({
        ...state,
        telefono,
      }));
    }
    
    setScian(scian: boolean): void {
      this.update((state) => ({
        ...state,
        scian,
      }));
    }
    
    setClaveScian(claveScian: string): void {
      this.update((state) => ({
        ...state,
        claveScian,
      }));
    }
    
    setDescripcionScian(descripcionScian: string): void {
      this.update((state) => ({
        ...state,
        descripcionScian,
      }));
    }
    
    setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean): void {
      this.update((state) => ({
        ...state,
        avisoDeFuncionamiento,
      }));
    }
    
    setLicenciaSanitaria(licenciaSanitaria: string): void {
      this.update((state) => ({
        ...state,
        licenciaSanitaria,
      }));
    }
    
    setRegimen(regimen: string): void {
      this.update((state) => ({
        ...state,
        regimen,
      }));
    }
    
    setAduana(aduana: string): void {
      this.update((state) => ({
        ...state,
        aduana,
      }));
    }
    
    setImmex(immex: string): void {
      this.update((state) => ({
        ...state,
        immex,
      }));
    }
    
    setAno(ano: string): void {
      this.update((state) => ({
        ...state,
        ano,
      }));
    }
    
    setMercancia(mercancia: string): void {
      this.update((state) => ({
        ...state,
        mercancia,
      }));
    }
    
    setClasificacionProducto(clasificacionProducto: string): void {
      this.update((state) => ({
        ...state,
        clasificacionProducto,
      }));
    }
    
    setEspecificarClasificacionProducto(especificarClasificacionProducto: string): void {
      this.update((state) => ({
        ...state,
        especificarClasificacionProducto,
      }));
    }
    
    setDenominacionProducto(denominacionProducto: string): void {
      this.update((state) => ({
        ...state,
        denominacionProducto,
      }));
    }
    
    setMarca(marca: string): void {
      this.update((state) => ({
        ...state,
        marca,
      }));
    }
    
    setTipoProducto(tipoProducto: string): void {
      this.update((state) => ({
        ...state,
        tipoProducto,
      }));
    }
    
    setEspecifique(especifique: string): void {
      this.update((state) => ({
        ...state,
        especifique,
      }));
    }
    
    setFraccionArancelaria(fraccionArancelaria: string): void {
      this.update((state) => ({
        ...state,
        fraccionArancelaria,
      }));
    }
    
    setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string): void {
      this.update((state) => ({
        ...state,
        descripcionFraccionArancelaria,
      }));
    }
    
    setCantidadUMT(cantidadUMT: string): void {
      this.update((state) => ({
        ...state,
        cantidadUMT,
      }));
    }
    
    setUMT(umt: string): void {
      this.update((state) => ({
        ...state,
        umt,
      }));
    }
    
    setCantidadUMC(cantidadUMC: string): void {
      this.update((state) => ({
        ...state,
        cantidadUMC,
      }));
    }
    
    setUMC(umc: string): void {
      this.update((state) => ({
        ...state,
        umc,
      }));
    }
    
    setClaveLote(claveLote: string): void {
      this.update((state) => ({
        ...state,
        claveLote,
      }));
    }
    
    setListaClave(listaClave: string): void {
      this.update((state) => ({
        ...state,
        listaClave,
      }));
    }
    
    setManfestosYDeclaraciones(manfestosYDeclaraciones: boolean): void {
      this.update((state) => ({
        ...state,
        manfestosYDeclaraciones,
      }));
    }
    
    setHacerlosPublicos(hacerlosPublicos: string): void {
      this.update((state) => ({
        ...state,
        hacerlosPublicos,
      }));
    }
    
    setRFC(rfc: string): void {
      this.update((state) => ({
        ...state,
        rfc,
      }));
    }

    setClaveDeReferencia(claveDeReferencia: string): void {
      this.update((state) => ({
        ...state,
        claveDeReferencia,
      }));
    }
    
    setCadenaDependecia(cadenaDependecia: string): void {
      this.update((state) => ({
        ...state,
        cadenaDependecia,
      }));
    }
    
    setBanco(banco: string): void {
      this.update((state) => ({
        ...state,
        banco,
      }));
    }
    
    setLiaveDePago(liaveDePago: string): void {
      this.update((state) => ({
        ...state,
        liaveDePago,
      }));
    }
    
    setImporteDePago(importeDePago: string): void {
      this.update((state) => ({
        ...state,
        importeDePago,
      }));
    }
    setDestinatario(destinatario: string): void {
      this.update((state) => ({
        ...state,
        destinatario,
      }));
    }
    
    setFabricante(fabricante: string): void {
      this.update((state) => ({
        ...state,
        fabricante,
      }));
    }
    
    setTipoPersona(tipoPersona: string): void {
      this.update((state) => ({
        ...state,
        tipoPersona,
      }));
    }
    
    setNombre(nombre: string): void {
      this.update((state) => ({
        ...state,
        nombre,
      }));
    }
    
    setPrimerApellido(primerApellido: string): void {
      this.update((state) => ({
        ...state,
        primerApellido,
      }));
    }
    
    setSegundoApellido(segundoApellido: string): void {
      this.update((state) => ({
        ...state,
        segundoApellido,
      }));
    }
    
    setDenominacion(denominacion: string): void {
      this.update((state) => ({
        ...state,
        denominacion,
      }));
    }
    
    setPais(pais: string): void {
      this.update((state) => ({
        ...state,
        pais,
      }));
    }
    
    setEstados(estados: string): void {
      this.update((state) => ({
        ...state,
        estados,
      }));
    }
    
    setCodigoDeZip(codigoDeZip: string): void {
      this.update((state) => ({
        ...state,
        codigoDeZip,
      }));
    }
    
    setCamino(camino: string): void {
      this.update((state) => ({
        ...state,
        camino,
      }));
    }
    
    setNumeroExterior(numeroExterior: string): void {
      this.update((state) => ({
        ...state,
        numeroExterior,
      }));
    }
    
    setNumeroInterior(numeroInterior: string): void {
      this.update((state) => ({
        ...state,
        numeroInterior,
      }));
    }
    
    setLadaDeTerceros(ladaDeTerceros: string): void {
      this.update((state) => ({
        ...state,
        ladaDeTerceros,
      }));
    }
    
    setFon(fon: string): void {
      this.update((state) => ({
        ...state,
        fon,
      }));
    }
    
    setEmail(email: string): void {
      this.update((state) => ({
        ...state,
        email,
      }));
    }
    setFechaPago(fechaPago: string): void {
      this.update((state) => ({
        ...state,
        fechaPago,
      }));
    }

}