export const CROSLISTA_DE_PAISES: string[] = [
    "AFGANISTÁN (EMIRATO ISLÁMICO)",
    "ALBANIA (REPÚBLICA DE)",
    "ALEMANIA (REPÚBLICA FEDERAL DE)",
    "ANDORRA (PRINCIPADO DE)",
    "ANGOLA (REPÚBLICA DE)",
    "ANGUILLA",
    "ANTIGUA Y BARBUDA",
    "ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)",
    "ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)",
    "ARGENTINA (REPÚBLICA)",
    "AUSTRALIA (COMMONWEALTH OF)",
    "AUSTRIA (REPUBLIC OF)",
    "BAHAMAS (COMMONWEALTH OF THE)",
    "BAHRAIN (KINGDOM OF)",
    "BANGLADESH (PEOPLE'S REPUBLIC OF)",
    "BARBADOS",
    "BELGIUM (KINGDOM OF)",
    "BELIZE",
    "BENIN (REPUBLIC OF)",
    "BHUTAN (KINGDOM OF)"
  ];

  export const LISTA_DE_ENTRADA_PERSONALIZADA: string[] = [
    "ACAPULCO, PUERTO Y AEROPUERTO",
    "ADUANA DE PANTACO",
    "AEROPUERTO INT. DE LA CD DE MEXICO",
    "AEROPUERTO INTERNACIONAL FELIPE ANGELES",
    "AGUA PRIETA",
    "AGUASCALIENTES, AGS.",
    "ALTAMIRA",
    "CANCUN, AEROPUERTO",
    "CD. CAMARGO, TAMPS.",
    "CD. DEL CARMEN, CAMP.",
    "CD. JUAREZ, CHIHUAHUA, CHIH."
  ];

/** "t" se utiliza para continuar el botón que se usa globalmente para el procedimiento 230401 */
  export const CONTINUAR: string = "t";

/**
* Secciones a mostrar dentro de cada Paso de acuerdo al trámite
*/
export const SECCIONES_TRAMITE_230401 = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: true,
  },
  PASO_2: {
    VALIDACION_SECCION: true,
  },
  PASO_3: {
    requiereValidacion: true,
  },
};