
export const PERMISO_A_DESISTIR = [
  {
    id: 'manifieste',
    label_nombre: 'Manifieste si los proveedores nacionales señalados anteriormente, se encuentran a la fecha de presentación de la solicitud, en las publicaciones a que hace referencia el artículo 69-B, cuarto párrafo del CFF.',
    campo: 'manifieste',
    clase: 'col-md-12',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 5,
    opciones: [
        {
        "label": "Si",
        "value": "Si"
       },
        {
        "label": "No",
        "value": "No"
       }
    ]
  }
];


export const PERMISO_A_DESISTIR_DOS = [
  {
    id: 'manifiesteSi',
    label_nombre: 'Manifieste si se le ha notificado algún crédito fiscal por parte del SAT en los últimos 12 meses anteriores a la fecha de presentación de la solicitud o acrediten que están al amparo del procedimiento previsto en el segundo parrafo, de la presente regla o, en su caso, hayan efectuado el pago del mismo.',
    campo: 'manifiesteSi',
    clase: 'col-md-12',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
    opciones: [
        {
        "label": "Si",
        "value": "Si"
       },
        {
        "label": "No",
        "value": "No"
       }
    ]
  },
  {
    id: 'manifiesteCorrespondiente',
    label_nombre: 'Manifieste si se le ha emitido resolución de improcedencia de las devoluciones del IVA solicitadas en los últimos 6 meses, contados a partir de la fecha de presentación de la solicitud de certificación correspondiente',
    campo: 'manifiesteCorrespondiente',
    clase: 'col-md-12',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
    opciones: [
        {
        "label": "Si",
        "value": "Si"
       },
        {
        "label": "No",
        "value": "No"
       }
    ]
  }
];


export const PERMISO_A_DESISTIR_TRES = [
  {
    id: 'contado',
    label_nombre: 'Ha contado previamente con la Certificación en materia de IVA e IEPS, el Registro en el Esquema de Certificación de Empresas bajo la modalidad IVA e IEPS o Garantía del interés fiscal del IVA e IEPS.',
    campo: 'contado',
    clase: 'col-md-12',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
    opciones: [
        {
        "label": "Si",
        "value": "Si"
       },
        {
        "label": "No",
        "value": "No"
       }
    ]
  },
  {
    id: 'caso',
    label_nombre: 'En caso afirmativo, señale si se encuentra al corriente en el cumplimiento de las obligaciones relativas al Anexo 30 sobre dicho registro:',
    campo: 'caso',
    clase: 'col-md-12',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
    opciones: [
        {
        "label": "Si",
        "value": "Si"
       },
        {
        "label": "No",
        "value": "No"
       }
    ]
  }
];


export const DE_LAS_SIGUIENTES = [
  {
    label_nombre: 'Que durante los últimos cuatro años o más han llevado a cabo operaciones al amparo del régimen para el cual solicitan la certificación en la modalidad de IVA e IEPS.',
    campo: 'durante',
    clase: 'col-md-12',
    tipo_input: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  },
  {
    label_nombre: 'Que durante los últimos 12 meses anteriores en promedio contaron con más de 1,000 empleados registrados ante el IMSS Número de empleados ante el IMSS.',
    campo: 'anteElImss',
    clase: 'col-md-12',
    tipo_input: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  },
  {
    label_nombre: 'Que el valor de su maquinaria y equipo es superior a los 50,000,000 de pesos.',
    campo: 'dePesos',
    clase: 'col-md-12',
    tipo_input: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  }
];

export const PAGO_DE_DERECHOS = [
  {
    id: 'claveDeReferencia',
    label_nombre: 'Clave de referencia',
    campo: 'claveDeReferencia',
    clase: 'col-md-6',
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
    margin_top: 0
  },
  {
    id: 'numeroDeOperacion',
    label_nombre: 'Numero de operación',
    campo: 'numeroDeOperacion',
    clase: 'col-md-6',
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
    margin_top: 0
  },
  {
    id: 'cadenaDependencia',
    label_nombre: 'Cadena de la dependencia',
    campo: 'cadenaDependencia',
    clase: 'col-md-6',
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
    margin_top: 0
  },
  {
    id: 'banco',
    label_nombre: 'Banco',
    campo: 'banco',
    clase: 'col-md-6',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcador_de_posicion: '',
    valor_predeterminado: '',
    margin_top: 0
  },
  {
    id: 'llaveDePago',
    label_nombre: 'Llave de pago',
    campo: 'llaveDePago',
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
    margin_top: 0
  },
  {
    id: 'fechaPago',
    label_nombre: 'Fecha de pago',
    campo: 'fechaPago',
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
    margin_top: 0
  },
  {
    id: 'importePago',
    label_nombre: 'Importe de pago',
    campo: 'importePago',
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
    margin_top: 0
  },
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
