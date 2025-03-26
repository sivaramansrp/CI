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