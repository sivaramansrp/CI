import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioDeComponent } from '../../components/destinatario-de/destinatario-de.component';
import { RegistroService } from '../../services/registro.service';


/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: false,
})
export class PasoUnoComponent implements OnInit,OnDestroy {
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: { data: string } | null;
 /**
 * Notificador para destruir observables al destruir el componente.
 * Se utiliza para gestionar la cancelación de suscripciones activas y evitar fugas de memoria.
 */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Estado de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;
  
  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente DestinatarioComponent dentro de la vista.
   * 
   * Esta propiedad permite acceder a los métodos y propiedades públicos del componente
   * hijo DestinatarioComponent desde el componente padre, facilitando la interacción
   * y manipulación directa del mismo.
   * 
   * @see DestinatarioDeComponent
   */
  @ViewChild(DestinatarioDeComponent) destinatarioComponent!: DestinatarioDeComponent;

  // Decorador ViewChild para acceder a la instancia del componente CertificadoDeOrigenComponent
  @ViewChild(CertificadoDeOrigenComponent) certificadoDeOrigenComponent!: CertificadoDeOrigenComponent;

  /**
   * Referencia al componente `DatosCertificadoComponent` dentro de la vista.
   * 
   * Esta propiedad permite acceder a los métodos y propiedades públicas del componente
   * hijo `DatosCertificadoComponent` desde el componente padre, facilitando la interacción
   * y manipulación de sus datos o comportamientos.
   * 
   * @see DatosCertificadoComponent
   */
  @ViewChild(DatosCertificadoComponent) datosCertificadoComponent!: DatosCertificadoComponent;
  
  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos.
   */
  constructor(private registro: RegistroService,private consultaQuery: ConsultaioQuery) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el catálogo de entidades federativas y lo procesa.
   */
  ngOnInit(): void {
 this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }

    this.registro.getCatalogoById(21).pipe(takeUntil(this.destroyed$)).subscribe((resp) => {
      this.entidadFederativa = resp;
      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });
  }
/**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormularios(): void {
    this.registro
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.registro.actualizarEstadoFormulario(resp);
        }
      });
  }
   /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /** Método público para validar todos los formularios del paso uno */
  public validateAll(): boolean {
    let isValid = true;
    if (this.certificadoDeOrigenComponent?.formCertificado) {
      if (this.certificadoDeOrigenComponent.formCertificado.invalid) {
        this.certificadoDeOrigenComponent.formCertificado.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }
    if (this.datosCertificadoComponent) {
      if (!this.datosCertificadoComponent.validateAll()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    if (this.destinatarioComponent) {
      if (!this.destinatarioComponent.validateAll()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    return isValid;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
