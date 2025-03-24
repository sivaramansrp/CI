import { TablaScianConfig } from "../models/datos-solicitud.model";

export const SCIAN_TABLA = [
    {
      encabezado: 'Clave S.C.I.A.N.',
      clave: (ele: TablaScianConfig): string => ele.clave,
      orden: 1,
    },
    {
        encabezado: 'Descripcion del S.C.I.A.N.',
        clave: (ele: TablaScianConfig): string => ele.descripcion,
        orden: 1,
      }
]

export const ALERTA_DE_MANIFESTO_Y_DECLARACIONES = `<div class="row">
    <div class="col-md-1 mt-4">
        <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" value="" id="manifiestosCasillaDeVerificacion">
            <label class="form-check-label" for="manifiestosCasillaDeVerificacion" (click)="manifestoSellecionado()">*
            </label>
        </div>
    </div>
    <div class="col-md-11">
        <p>Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su
            cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una
            autoridad. Asimismo acepto que la notificación de este tramite, sea a través de la Ventanilla Única de Comercio
            Exterior por los mecanismos de la misma.</p>
    </div>
</div>`;



