import { ConfiguracionColumna } from "@libs/shared/data-access-user/src"
import { Plantas } from "../modelos/registro-solicitud-immex.model"

export const CONFIGURACION_TABLA_PLANTAS: ConfiguracionColumna<Plantas>[] = [
{encabezado:'Calle', clave: (item: Plantas):string=>item.calle, orden:1 },
{encabezado:'Número exterio', clave: (item: Plantas):string=>item.numeroExterio, orden:2 },
{encabezado:'Número interio', clave: (item: Plantas):string=>item.numeroInterio, orden:3 },
{encabezado:'Código postal', clave: (item: Plantas):string=>item.codiogoPostal, orden:4 },
{encabezado:'Colonia', clave: (item: Plantas):string=>item.colonia, orden:5 },
{encabezado:'Municipio o delegación', clave: (item: Plantas):string=>item.municipio, orden:6 },
{encabezado:'Entidad federativa', clave: (item: Plantas):string=>item.entidadFederativa, orden:7 },
{encabezado:'País', clave: (item: Plantas):string=>item.pais, orden:8 },
{encabezado:'Registro federal de contribuyen', clave: (item: Plantas):string=>item.registroFederal, orden:9 },
{encabezado:'Domicilio fiscal del solicitante', clave: (item: Plantas):string=>item.domicilio, orden:10 },
{encabezado:'Razón social', clave: (item: Plantas):string=>item.razon, orden:11 }
]