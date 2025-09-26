/**
 * @descripcion
 * Constante que define los pasos del proceso de solicitud en el módulo CAM.
 */
export const PASOS = [
  {
    /**
     * @descripcion
     * Índice del paso en el proceso.
     */
    indice: 1,

    /**
     * @descripcion
     * Título descriptivo del paso.
     */
    titulo: 'Capturar solicitud',

    /**
     * @descripcion
     * Indica si el paso está activo.
     */
    activo: true,

    /**
     * @descripcion
     * Indica si el paso ha sido completado.
     */
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * @descripcion
 * Constante que define las propiedades de la fecha de pago en el formulario.
 */
export const FECHA = {
  /**
   * @descripcion
   * Etiqueta asociada al campo de fecha.
   */
  labelNombre: 'Fecha de pago',

  /**
   * @descripcion
   * Indica si el campo de fecha es obligatorio.
   */
  required: true,

  /**
   * @descripcion
   * Indica si el campo de fecha está habilitado.
   */
  habilitado: false,
};


/**
 * Fecha de pago por defecto (formato DD/MM/YYYY).
 * @const
 * @type {string}
 */
export const ERROR_FORMA_ALERT =
  `
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`



/**
 * @constante PRIVACY_NOTICE_CONTENT
 * @tipo {string}
 * @exportado
 * @descripcion
 * Contenido HTML completo del aviso de privacidad simplificado para el sistema VUCEM.
 * Contiene información legal requerida sobre el tratamiento de datos personales.
 * 
 * @estructura_legal
 * **Encabezado**: "Aviso de privacidad simplificado"
 * - Identifica claramente el tipo de documento
 * - Cumple con nomenclatura legal estándar
 * - Diferencia del aviso integral
 * 
 * **Responsable**: Servicio de Administración Tributaria (SAT)
 * - Sujeto obligado según la ley
 * - Responsable del tratamiento de datos
 * - Autoridad competente identificada
 * 
 * **Medio de recolección**: Ventanilla Digital Mexicana de Comercio Exterior (VUCEM)
 * - Plataforma oficial de recolección
 * - Sistema autorizado gubernamental
 * - Canal digital oficial
 * 
 * @finalidades_tratamiento
 * Los datos personales se utilizan para:
 * - **Trámites de comercio exterior**: Importaciones, exportaciones, tránsito
 * - **Regulaciones no arancelarias**: Cumplimiento de restricciones específicas
 * - **Consultas de información**: Procedimientos y requisitos
 * - **Notificaciones**: Comunicaciones derivadas de trámites
 * 
 * @transferencias_datos
 * - **Autoridades competentes**: Según Decreto del 14 de enero de 2011
 * - **Titular de la información**: El propio usuario
 * - **Base legal**: Decreto de establecimiento de VUCEM
 * - **Publicación**: Diario Oficial de la Federación
 * 
 * @derechos_titular
 * - **Manifestar negativa**: Para tratamientos que requieren consentimiento
 * - **Consulta de aviso integral**: Disponible en el portal oficial
 * - **Acceso a información completa**: Derechos ARCO implícitos
 * 
 * @estructura_html
 * Utiliza elementos semánticos:
 * - **div.my-4**: Márgenes verticales para espaciado
 * - **h4.mb-4**: Encabezado principal con margen inferior
 * - **p.text-justify**: Párrafos justificados para mejor legibilidad
 * - **div.text-center**: Centrado para enlaces importantes
 * - **a.text-primary**: Enlaces estilizados con color primario
 * 
 * @cumplimiento_normativo
 * - **Ley Federal de Protección de Datos Personales**
 * - **Lineamientos del IFAI/INAI**
 * - **Decretos presidenciales sobre VUCEM**
 * - **Normatividad de comercio exterior**
 * 
 * @interaccion_usuario
 * ```html
 * <!-- Enlace para aviso integral -->
 * <a (click)="seccionStore.establecerSeccion([false])">
 *   Aviso de privacidad integral
 * </a>
 * ```
 * 
 * @consideraciones_implementacion
 * - **innerHTML seguro**: Validar contenido antes del renderizado
 * - **Event binding**: Configurar correctamente clicks en enlaces
 * - **Responsive**: Asegurar legibilidad en dispositivos móviles
 * - **Accesibilidad**: Considerar lectores de pantalla
 * 
 * @actualizaciones_legales
 * Este contenido debe revisarse cuando:
 * - Cambien las leyes de protección de datos
 * - Se modifiquen decretos relacionados con VUCEM
 * - Actualicen las finalidades del tratamiento
 * - Cambien las autoridades responsables
 */
export const PRIVACY_NOTICE_CONTENT = `
  <div class="my-4">
  <div class="text-center">
    <h4 class="mb-4">Aviso de privacidad simplificado</h4>
    </div>
    <div>
    <p class="text-justify">
      El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.
    </p>
    </div>
    <div class="text-center">
      <a class="text-primary" style="cursor: pointer;" (click)="seccionStore.establecerSeccion([false])">
        Aviso de privacidad integral
      </a>
    </div>
  </div>
`;
