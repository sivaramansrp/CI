import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/exportacion-sustancias-quimicas.enum';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { TipoNotificacionEnum, CategoriaMensaje, Notificacion } from '@libs/shared/data-access-user/src';
import { AvisoDeExportacionModule } from '../../aviso-de-exportacion.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AvisoDeExportacionModule, ToastrModule.forRoot()], 
      declarations: [SolicitudPageComponent], 
      providers: [
        { provide: ToastrService, useClass: ToastrService }, // Mock ToastrService if needed
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el mensaje de título por defecto establecido en TITULOMENSAJE', () => {
    expect(component.tituloMensaje).toBe('Solicitud Aviso de exportación de sustancias químicas');
  });

  it('debe inicializar correctamente el arreglo de pasos', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('debe actualizar el índice y el mensaje de título cuando se llame a getValorIndice con la acción "cont"', () => {
    const accionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.tituloMensaje).toBe('Anexar requisitos');
  });

  it('debe actualizar el índice y el mensaje de título cuando se llame a getValorIndice con la acción "atras"', () => {
    const accionBoton = { valor: 3, accion: 'atras' };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(3);
    expect(component.tituloMensaje).toBe('Firmar');
  });

  it('debe llamar a wizardComponent.siguiente() cuando se active la acción "cont"', () => {
    const accionBoton = { valor: 2, accion: 'cont' };
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice(accionBoton);
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a wizardComponent.atras() cuando se active la acción "atras"', () => {
    const accionBoton = { valor: 2, accion: 'atras' };
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice(accionBoton);
    expect(spy).toHaveBeenCalled();
  });

  it('debe inicializar la notificación de privacidad correctamente', () => {
    const expectedNotification: Notificacion = {
      tipoNotificacion: TipoNotificacionEnum.BANNER,
      categoria: CategoriaMensaje.INFORMACION,
      modo: '',
      titulo: '',
      mensaje: "<p style=\"text-align: center; font-weight: bold;\">Aviso de privacidad simplificado</p> <p>El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal. </p><a href=\"\">Aviso de privacidad integral</a>",
      cerrar: false,
      txtBtnAceptar: '',
      txtBtnCancelar: ''
    };
  
    const ACTUALMENSAGE = (component.notificacionPrivacidad.mensaje as any).changingThisBreaksApplicationSecurity;
   
    expect(ACTUALMENSAGE.replace(/\s+/g, ' ').trim()).toEqual(expectedNotification.mensaje.replace(/\s+/g, ' ').trim());
  });
  
});
