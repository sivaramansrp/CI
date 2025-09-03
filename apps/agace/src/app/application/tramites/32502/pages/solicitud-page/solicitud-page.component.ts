import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];
/**
 * Constante que contiene el aviso de privacidad simplificado utilizado en la Ventanilla Digital Mexicana de Comercio Exterior (VUCE).
 *
 * @constant
 * @property {string} Aviso - Texto en formato HTML que describe el aviso de privacidad simplificado.
 * Este aviso informa sobre el tratamiento de los datos personales recabados por el Servicio de Administración Tributaria (SAT),
 * su uso, transferencia a autoridades competentes y su protección conforme a la legislación aplicable.
 */
export const AVISO = {
  Aviso: `<p style="text-align: center; font-weight: bold;">Aviso de privacidad simplificado</p>
    <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal. </p>
    <br>
    <div class="row"><div class="col-md-12 text-center"><a href="">Aviso de privacidad integral</a></div>`,
};

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;
  
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
esFormaValido: boolean = false;
  
  /**
 * Constante que almacena el valor de la nota de privacidad.
 * 
 * @constant AVISO_PRIVACIDAD_ADJUNTAR - Almacena el valor definido en `NOTA.AVISO_PRIVACIDAD_ADJUNTAR`.
 * Se utiliza para adjuntar o gestionar el aviso de privacidad dentro del sistema.
 */
  AVISO_PRIVACIDAD_ADJUNTAR = AVISO.Aviso;

   /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
   public formErrorAlert =`<div class="d-flex justify-content-center text-center">
     <div>
       <div class="col-md-12">
         Faltan campos por capturar.
       </div>
     </div>
   </div>
   `

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;


  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;
      
        if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarTodosLosFormularios();
      }
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }
      
      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
    
      this.wizardComponent.siguiente();
      return;
    }

      this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();
    
       
  }
  /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
  alCambiarPestana(): void {
    this.esFormaValido = false;
  }
        
}
