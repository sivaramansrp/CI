/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
    {
      label: 'Sí',
      value: '1',
    },
    {
      label: 'No',
      value: '0',
    }
  ];

  /** 
 * Constante que define las opciones disponibles para el botón de radio. 
 * Se utiliza para capturar la selección del usuario en el formulario.
 * 
 * - "Animales Vivos" tiene un valor de '1'.
 * - "Productos Subproductos" tiene un valor de '0'.
 */
  export const CAPTURA_OPCIONES_DE_BOTON_DE_RADIO = [
    {
        label: 'Animales Vivos',
        value: '1',
      },
      {
        label: 'Productos Subproductos',
        value: '0',
      }
  ];


  export const MERCANCIA = [
    {
      Partida: 1,
      Tiporequisito: 'Inspección ocular',
      Requisito: 'Requisito',
      Certificado: 'ABC123',
      Fraccion: '01039201',
      Descripcion: 'Con pedigree o certificado de alto registro.',
      Nico: '00',
    },
    {
      Partida: 2,
      Tiporequisito: 'Inspección de oído',
      Requisito: 'Requisito',
      Certificado: 'DEF456',
      Fraccion: '02039402',
      Descripcion: 'Sin pedigree, certificado básico.',
      Nico: '01',
    },
    {
      Partida: 3,
      Tiporequisito: 'Inspección de nariz',
      Requisito: 'Requisito',
      Certificado: 'GHI789',
      Fraccion: '03039503',
      Descripcion: 'Con registro nacional.',
      Nico: '02',
    },
  ];
