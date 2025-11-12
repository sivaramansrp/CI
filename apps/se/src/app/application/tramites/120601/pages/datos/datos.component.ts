import { Component, ViewChild } from '@angular/core';
import { Subject, firstValueFrom, take, takeUntil } from 'rxjs';
import { Tramite120601Store, Tramites120601State } from '../../estados/tramite-120601.store';
import {doDeepCopy, esValidObject } from '@ng-mf/data-access-user';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT } from '../../constantes/definiciones.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RepresentacionFederalComponent } from '../../component/representacion-federal/representacion-federal.component';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa la acción de un botón.
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent {
  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente PasoUno.
   * 
   * @viewChild pasoUnoRef
   * @description Permite acceder a las propiedades y métodos públicos del componente PasoUnoComponent desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUno!: PasoUnoComponent;

  /**
   * @description Referencia al componente `RepresentacionFederalComponent` dentro de la vista actual.
   * Permite acceder a las propiedades y métodos públicos del componente hijo para interactuar desde el componente padre.
   * 
   * @type {RepresentacionFederalComponent}
   * @memberof DatosComponent
   */
  @ViewChild(RepresentacionFederalComponent) representacionFederal!: RepresentacionFederalComponent;

   /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Datos para los pasos en el asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   * }
   */
  esFormaValido: boolean = false;

  destroyNotifier$: Subject<void> = new Subject();

  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  guardarIdSolicitud: number = 0;

  /** Mensaje de confirmación al guardar la solicitud.
   * Se inicializa como una cadena vacía y se actualiza cuando se guarda la solicitud.
   */
  guardarMensaje: string = '';

  constructor( private servicio120601: DatosEmpresaService,
    private tramite120601Store: Tramite120601Store

  ) {}

  /**
   * Valida los formularios del paso actual y marca los campos inválidos como tocados para mostrar errores de validación.
   */
  public validarFormularios(): boolean {
    let isValid = true;

    // Validar formulario de solicitante (pestaña 1) a través del componente paso-uno
    if (this.pasoUno) {
      isValid = this.pasoUno.validarFormularios();
    } else {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public async getValorIndice(e: AccionBoton): Promise<void> {
    this.esFormaValido = false;
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarFormularios();
      if (!ISVALID) {
        this.esFormaValido = true;
        // Scroll to top to show error message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; // Detener ejecución si los formularios son inválidos
      }
    try {
      await this.obtenerDatosDelStore();
    } catch (err) {
      console.error('Error saving data before continuing', err);
      return;
    }
    }

    // Calcular el nuevo índice basado en la acción
    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {

      // Actualizar el índice y datosPasos
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Obtiene los datos almacenados en el estado (store) mediante el servicio correspondiente.
   * Realiza una única suscripción al observable usando 'take(1)'.
   * Al recibir los datos, los guarda mediante el método 'guardar'.
   */
    // obtenerDatosDelStore(): void {
    //   this.servicio120601.getAllState()
    //     .pipe(take(1))
    //     .subscribe(data => {
    //       this.guardar(data);
    //     });
    // }

    obtenerDatosDelStore(): Promise<void> {
      return firstValueFrom(this.servicio120601.getAllState().pipe(take(1)))
      .then(data => {
      return this.guardar(data);
      });
    }

  guardar(data: Tramites120601State):Promise<void>{
    const DATOS_EMPRESA = this.servicio120601.buildDatosEmpresa(data);
    const PAYLOAD = {
     "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "ACEROS ALVARADO S.A. DE C.V.",
        "actividad_economica": "Fabricación de productos de hierro y acero",
        "correo_electronico": "contacto@acerosalvarado.com",
        "razonSocial": "INTEGRADORA",
        "domicilio": {
            "pais": "México",
            "codigoPostal": "03100",
            "estado": "26",
            "delegacionMunicipio": "Benito Juárez",
            "localidad": "REGION ARROYO SECO",
            "colonia": "Del Valle",
            "calle": "Av. Insurgentes Sur",
            "numeroExterior": "1234",
            "numeroInterior": "A",
            "lada": "1234",
            "telefono": "12345678"
        }
    },
    "datosEmpresa": DATOS_EMPRESA
    }
    return new Promise((resolve, reject) => {
      this.servicio120601.guardarDatosPost(PAYLOAD).pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        if(esValidObject(response)) {
          const RESPONSE = doDeepCopy(response);
          this.tramite120601Store.setIdSolicitud(RESPONSE?.datos?.idSolicitud ?? 0);
          this.guardarIdSolicitud = RESPONSE?.datos?.idSolicitud ?? 0;
          this.guardarMensaje = RESPONSE?.datos?.mensaje ?? '';
          this.wizardComponent.siguiente();
          resolve();
        }
      },error=>{
        reject(error);
      });
    });
  }
}
