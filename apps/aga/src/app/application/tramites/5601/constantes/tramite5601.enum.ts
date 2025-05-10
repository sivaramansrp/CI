/**
 * Título que se mostrará en el modal de aviso.
 */
export const TITULO_MODAL = 'Aviso';

/**
 * Mensaje que se mostrará en el modal, preguntando por la existencia de un documento
 * que acredite la autorización y vigencia del esquema de certificación.
 */
export const MENSAJE_MODAL = '¿Cuenta con algún documento que acredite la autorización y A vigencia de su esquema de certificación?';


export const FORMULARIO_CERTIFICACION_DETALLES = [
    {
        id: 'tieneCertificacion',
        labelNombre: '',
        campo: 'tieneCertificacion',
        clase: 'col-md-1',
        tipoInput: 'checkbox',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop:0
    },
    {
        id: 'certificacionEmpresa',
        labelNombre: '',
        campo: 'certificacionEmpresa',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'otraCertificacion',
        labelNombre: 'Especifique otra certificación',
        campo: 'otraCertificacion',
        clase: 'col-md-7',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    }

]
