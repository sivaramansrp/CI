
export const INDIQUE_SI_REALIZA = [
    {
      id: 'indiqueSiRealiza',
      label_nombre: 'Indique si realiza o realizará importaciones temporales de mercancías de las fracciones arancelarias listadas en el Anexo II del Decreto IMMEX y/o de las fracciones arancelarias listadas en el Anexo 28.',
      campo: 'indiqueSiRealiza',
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


export const IMPORTACION_TEMPORAL = [
    {
      id: 'indique',
      label_nombre: 'Indique si durante los últimos doce meses, el valor de la mercancía transformada y retornada, retornada en su mismo estado, o a la que se le prestó un servicio, durante dicho periodo representa al menos el 80% del valor de las importaciones temporales de insumos durante el mismo periodo. (Declare solo aquellos conceptos que le apliquen).',
      campo: 'indique',
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
    },
    {
      id: 'empresaSolicitante',
      label_nombre: '¿La empresa solicitante ha realizado operaciones al amparo del Programa IMMEX en al menos los 12 meses previos a la solicitud?',
      campo: 'empresaSolicitante',
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
    },
    {
      id: 'captureElValorTotal',
      label_nombre: 'Capture el valor total en moneda nacional de sus importaciones temporales de materiales directos e insumos del periodo requerido conforme al párrafo anterior',
      campo: 'captureElValorTotal',
      clase: 'col-md-12',
      tipo_input: 'text',
      desactivado: false,
      solo_lectura: false,
      marcador_de_posicion: '',
      valor_predeterminado: '',
      margin_top: 0
    }
];