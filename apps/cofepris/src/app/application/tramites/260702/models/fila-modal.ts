export interface FilaData{
    id: number;
    claveScianG: {
    claveScian: string,
    descripcionDelScian: string,
}

}
export interface FilaData2{

clasificaionProductos: string,
especificarProducto: string,
denominacionEspecifica: string,
marca: string,
tipoProducto: string,
fraccionArancelaria: string,
descripcionFraccionArancelaria: string,
cantidadUMT: string,
UMT: string,
cantidadUMC: string,
UMC: string,
paisDeOrigen: string,
paisDeProcedencia: string,
usoEspecifico: string,

}
export interface ListaClave{
    id: number;
    claveDeLosLotes: string,
    fechaDeFabricacion: string,
    fechaDeCaducidad: string

}