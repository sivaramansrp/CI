/**
 * PERMISO_A_DESISTIR es una constante que define la estructura de los campos
 * utilizados en el formulario para gestionar el desistimiento de un permiso.
 * 
 * Cada objeto dentro del arreglo representa un campo del formulario, con las siguientes propiedades:
 * - `labelNombre`: Etiqueta que describe el campo.
 * - `campo`: Nombre del campo utilizado como identificador.
 * - `class`: Clase CSS aplicada al campo para definir su diseño.
 * - `tipo_input`: Tipo de entrada del campo (por ejemplo, número, texto, área de texto).
 * - `disabled`: Indica si el campo está deshabilitado.
 * - `validators`: Validaciones aplicadas al campo (por ejemplo, requerido).
 * - `placeholder`: Texto de marcador de posición para el campo.
 * - `tooltip`: Información adicional que se muestra como un tooltip (opcional).
 */
export const PERMISO_A_DESISTIR = [
  {
    id: 'acuseResolucion.folio',
    label_nombre: 'Folio',
    campo: 'folio',
    clase: 'col-md-12',
    tipo_input: 'number',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      {
        tipo: '', mensaje: ''
      }
    ],
    marcador_de_posicion: '',
    valor_predeterminado: '0402600201020254006000001',
    margin_top: 0
  },
  {
    id: 'tipoDeSolicitud',
    label_nombre: 'Tipo de solicitud',
    campo: 'tipoDeSolicitud',
    clase: 'col-md-12',
    tipo_input: 'textarea',
    desactivado: true,
    solo_lectura: false,
    validadores:[
      {
        tipo: '', mensaje: ''
      }
    ],
    marcador_de_posicion: '',
    valor_predeterminado: 'Permiso Sanitario de Importación de Medicamentos y Materias Primas Destinados a Pruebas de Laboratorio',
    margin_top: 3
  },
  {
    id: 'motivo',
    label_nombre: 'Motivo de desistimiento',
    campo: 'motivoDesistimiento',
    clase: 'col-md-12',
    tipo_input: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  }
];

/**
 * REPRESENTANTE_LEGAL es una constante que define la estructura de los campos
 * utilizados en el formulario para gestionar el desistimiento de un permiso.
 * 
 * Cada objeto dentro del arreglo representa un campo del formulario, con las siguientes propiedades:
 * - `labelNombre`: Etiqueta que describe el campo.
 * - `campo`: Nombre del campo utilizado como identificador.
 * - `class`: Clase CSS aplicada al campo para definir su diseño.
 * - `tipo_input`: Tipo de entrada del campo (por ejemplo, número, texto, área de texto).
 * - `disabled`: Indica si el campo está deshabilitado.
 * - `validators`: Validaciones aplicadas al campo (por ejemplo, requerido).
 * - `placeholder`: Texto de marcador de posición para el campo.
 * - `tooltip`: Información adicional que se muestra como un tooltip (opcional).
 */
export const REPRESENTANTE_LEGAL = [
  {
    id: 'representanteLegalRFC',
    label_nombre: 'RFC',
    campo: 'rfc',
    clase: 'col-md-4',
    tipo_input: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcador_de_posicion: '',
    valor_predeterminado: '',
    margin_top: 0,
    nino: [
      {
        label_nombre: 'Nombre o Razón Social',
        campo: 'nombre',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores: [
          { tipo: 'required' }
        ],
        marcador_de_posicion: '',
        margin_top: 5,
        valor_predeterminado: '47875'
      },
      {
        label_nombre: 'Apellido paterno',
        campo: 'apellidoPaterno',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores: [
          { tipo: 'required' }
        ],
        marcador_de_posicion: '',
        margin_top: 5,
        valor_predeterminado: 'Paterno'
      },
      {
        label_nombre: 'Apellido materno',
        campo: 'apellidoMaterno',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores:[
          { tipo: '' }
        ],
        marcador_de_posicion:'',
        margin_top: 5,
        valor_predeterminado: 'Materno'
      }
    ]
  },
  {
    id: 'consultarIDC',
    label_nombre: 'Buscar',
    campo: 'buscar',
    clase: 'col-md-8',
    tipo_input: 'button',
    desactivado: false,
    margin_top: 5,
    vinculado_a: 'rfc',
  },
  {
    id: 'representanteLegalNombre',
    label_nombre: 'Nombre o Razón Social',
    campo: 'nombre',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: true,
    solo_lectura: false,
    validadores:[
      {
        tipo: 'required'
      }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
  {
    id: 'representanteLegalApPaterno',
    label_nombre: 'Apellido paterno',
    campo: 'apellidoPaterno',
    clase: 'col-md-4',
    tipo_input: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
  {
    id: 'representanteLegalApMaterno',
    label_nombre: 'Apellido materno',
    campo: 'apellidoMaterno',
    clase: 'col-md-4',
    tipo_input: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  }
];



/**
 * MANIFIESTOS_ALERT:
 * Contiene un mensaje de alerta que se muestra al usuario.
 *
 * - message: Mensaje en formato HTML que indica al usuario que debe capturar
 *   la descripción de la mercancía en los mismos términos de la carta de donación.
 */
export const MANIFIESTOS_ALERT = {
  message: `
    <div class="row">
      <div class="col-md-2 d-flex justify-content-center align-items-center">
        <form>
          <label>
            <input type="checkbox" id="manifiestos" name="manifiestos" required>
            <span class="ml-5" style="color: #31708f;">*</span>
          </label>
        </form>
      </div>
      <div class="col-md-10">
        <p>Cumplo con los requisitos y la normatividad aplicable, sin que ello me exima de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en las que pueda incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo, acepto que la notificación de este trámite sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.</p>
      </div>
    </div>
    `,
};
