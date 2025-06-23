import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { of, Subject } from 'rxjs';
import {
  NotificacionesComponent,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { DESTINATARIO_CONFIGURACION_TABLA2 } from '../../constants/column-config.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export interface Pedimento {
  id: number;
}
describe('TramitesAsociadosComponent', () => {
  let component: TramitesAsociadosComponent;
  let fixture: ComponentFixture<TramitesAsociadosComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getTramitesAsociados: jest
        .fn()
        .mockReturnValue(of([{ id: 1, nombre: 'Trámite 1' }])),
    };

    await TestBed.configureTestingModule({
      imports: [
        TramitesAsociadosComponent,
        TablaDinamicaComponent,
        TituloComponent,
        NotificacionesComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: RegistrarSolicitudMcpService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesAsociadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTramitesAsociados on init', () => {
    const spy = jest.spyOn(component, 'getTramitesAsociados');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set tablaFilaDatos when getTramitesAsociados is called', () => {
    component.getTramitesAsociados();
    expect(component.tablaFilaDatos).toEqual([{ id: 1, nombre: 'Trámite 1' }]);
  });

  it('should show modal and call abrirModal', () => {
    const abrirModalSpy = jest.spyOn(component, 'abrirModal');
    component.mostrarModal();
    expect(component.esModalVisible).toBe(true);
    expect(abrirModalSpy).toHaveBeenCalled();
  });

  it('should hide modal', () => {
    component.esModalVisible = true;
    component.ocultarModal();
    expect(component.esModalVisible).toBe(false);
  });

  it('should remove pedimento when eliminarPedimento is called with true', () => {
    component.pedimentos = [{ id: 1 } as any, { id: 2 } as any];
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(1);
    // expect(component.pedimentos[0].id).toBe(2);
  });

  it('should not remove pedimento when eliminarPedimento is called with false', () => {
    component.pedimentos = [{ id: 1 } as any, { id: 2 } as any];
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(false);
    expect(component.pedimentos.length).toBe(2);
  });

  it('should set nuevaNotificacion and elementoParaEliminar when abrirModal is called', () => {
    component.abrirModal(3);
    expect(component.nuevaNotificacion).not.toBeNull();
    expect(component.elementoParaEliminar).toBe(3);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyed$ = new Subject<boolean>();
    (component as any).destroyed$ = destroyed$;
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct destinatarioConfiguracionTabla', () => {
    expect(component.destinatarioConfiguracionTabla).toBe(
      DESTINATARIO_CONFIGURACION_TABLA2
    );
  });
});
