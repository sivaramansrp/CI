import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './Solicitud.component';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pedimentos as an empty array', () => {
    expect(component.pedimentos).toEqual([]);
  });

  it('should initialize nuevaNotificacion as undefined', () => {
    expect(component.nuevaNotificacion).toBeUndefined();
  });

  it('should initialize elementoParaEliminar as undefined', () => {
    expect(component.elementoParaEliminar).toBeUndefined();
  });

  it('should set nuevaNotificacion and elementoParaEliminar in abrirModal', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toEqual({
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        '¿Deseas desistir la solicitud de servicios extraordinarios con el folio 0105700100020252470000001?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Sí',
      txtBtnCancelar: 'No',
    });
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should remove pedimento and navigate to paso tres when eliminarPedimento is called with true', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.pedimentos = [
      {
        patente: 123,
        pedimento: 456,
        aduana: 789,
        idTipoPedimento: 1,
        descTipoPedimento: 'Test Pedimento',
        numero: '12345',
        comprobanteValor: 'Test Valor',
        pedimentoValidado: true,
      },
    ];
    component.elementoParaEliminar = 0;
  
    component.eliminarPedimento(true);
  
    expect(component.pedimentos.length).toBe(0);
    expect(navigateSpy).toHaveBeenCalledWith(['/pasotres']);
  });
  
  it('should not remove pedimento or navigate when eliminarPedimento is called with false', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.pedimentos = [
      {
        patente: 123,
        pedimento: 456,
        aduana: 789,
        idTipoPedimento: 1,
        descTipoPedimento: 'Test Pedimento',
        numero: '12345',
        comprobanteValor: 'Test Valor',
        pedimentoValidado: true,
      },
    ];
    component.elementoParaEliminar = 0;
  
    component.eliminarPedimento(false);
  
    expect(component.pedimentos.length).toBe(1);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should set cargarArchivo to true and call abrirModal in cargaArchivo', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
    expect(abrirModalSpy).toHaveBeenCalled();
  });
});