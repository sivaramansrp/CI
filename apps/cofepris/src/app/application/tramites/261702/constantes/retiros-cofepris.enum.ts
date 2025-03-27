export const PERMISO_A_DESISTIR = [
  {
    labelNombre: 'Folio',
    campo: 'aduana',
    class: 'col-md-12',
    tipo_input: 'number',
    disabled: true,
    validators: [''],
    placeholder: '',
  },
  {
    labelNombre: 'Tipo de solicitud',
    campo: 'tipoDeSolicitud',
    class: 'col-md-12',
    tipo_input: 'textarea',
    disabled: true,
    validators: [''],
    placeholder: '',
  },
  {
    labelNombre: 'Motivo de desistimiento',
    campo: 'motivoDesistimiento',
    class: 'col-md-12',
    tipo_input: 'textarea',
    disabled: false,
    tooltip: '',
    validators: ['required'],
    placeholder: '',
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

export const AVISO_DE_PRIVACIDAD_SIMPLIFICADO = {
  message: `
    <div class="row">
      <div class="col-md-12">
        <h4>Aviso de privacidad simplificado</h4>
        <p>El Servicio de Administración Tributaria (SAT) es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM). 
        Los datos personales podrán ser utilizados y transferidos a las autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de 
        comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sean exigidas por las autoridades competentes en materia de comercio exterior y/o consultar 
        información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos 
        trámites. Serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM. Asimismo, podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana 
        de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales 
        para finalidades y transferencias de los mismos que requieran consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p>
        <p>Aviso de privacidad integral</p>
      </div>
    </div>
    `,
};
