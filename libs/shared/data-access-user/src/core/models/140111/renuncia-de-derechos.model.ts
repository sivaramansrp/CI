export interface PermisoFormInterface {
    folioTrámite: string;
    tipoDeSolicitud: string;
    régimen: string;
    clasificaciónDelRégimen: string;
    periodoDeVigencia: string;
    unidadDeMedida: string;
    fracciónArancelaria: string | number;
    cantidadAutorizada: string | number;
    valorAutorizado: string | number;
    nico: string | number;
    descripciónNico: string;
    acotación: string;
    permisoVálidoDesde: string;
    permisoVálidoHasta: string;
    motivoRenunciaDeDerechos: string;
    controlar: boolean;
}