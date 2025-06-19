import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let seccionStoreMock: any;
  let servicioDeMensajesServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    seccionStoreMock = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    };

    servicioDeMensajesServiceMock = {
      mensaje$: of(false),
      devolverFacturasMensaje$: of(false),
      enviarMensaje: jest.fn(),
      enviarDevolverFacturasMensaje: jest.fn(),
      establecerDatosDePermiso: jest.fn(),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ datos: [] })),
      actualizarEstadoFormulario: jest.fn(),
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: SeccionLibStore, useValue: seccionStoreMock },
        { provide: ServicioDeMensajesService, useValue: servicioDeMensajesServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should update indice when seleccionaPestana is called', () => {
    component.seleccionaPestana(2);
    expect(component.indice).toBe(2);
  });

  it('should call enviarMensaje and enviarDevolverFacturasMensaje on destroy', () => {
    component.ngOnDestroy();
    expect(servicioDeMensajesServiceMock.enviarMensaje).toHaveBeenCalledWith(false);
    expect(servicioDeMensajesServiceMock.enviarDevolverFacturasMensaje).toHaveBeenCalledWith(false);
  });

  it('should call actualizarEstadoFormulario in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(servicioDeMensajesServiceMock.actualizarEstadoFormulario).toHaveBeenCalled();
  });
  });
