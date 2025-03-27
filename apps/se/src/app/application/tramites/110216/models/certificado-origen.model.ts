export interface HistoricoColumnas {
  id: number;
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fax: string;
}

export interface ProductorExportador {
  datos: HistoricoColumnas[];
}

export interface Catalogo {
  id: number;
  descripcion: string;
}
export interface CatalogoLista {
  datos: Catalogo[];
}
export interface AgregarDatosProductorFormulario {
  numeroRegistroFiscal: string;
  fax: string;
}
export interface GrupoReceptor {
  nombre: string;
  apellidoPrimer: string;
  apellidoSegundo: string;
  numeroFiscal: string;
  razonSocial: string;
}
export interface GrupoDeDirecciones {
  ciudad: string,
  calle: string,
  numeroLetra: string,
  lada: string,
  telefono: string,
  fax: string,
  correoElectronico: string,
}
export interface GrupoRepresentativo {
  lugar: string;
  nombreExportador: string;
  empresa: string;
  cargo: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
}
export interface GrupoDeTransporte {
  puertoEmbarque: string;
  puertoDesembarque: string;
  puertoTransito: string;
  nombreEmbarcacion: string;
  numeroVuelo: string;
}
export interface AccionBoton {
  accion: string;
  valor: number;
}