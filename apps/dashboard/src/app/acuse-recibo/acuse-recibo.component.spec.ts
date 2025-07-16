import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcuseReciboComponent } from './acuse-recibo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TablaAcciones } from '@libs/shared/data-access-user/src';
import { ConfirmarNotificacionService } from '../services/confirmar-notificacion.service';
import { of, Subject } from 'rxjs';

describe('AcuseReciboComponent', () => {
  let component: AcuseReciboComponent;
  let fixture: ComponentFixture<AcuseReciboComponent>;
  let confirmarNotificacionService: ConfirmarNotificacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcuseReciboComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ConfirmarNotificacionService,
          useValue: {
            getAcuseReciboDatos: jest.fn(() => of([{ id: 1, nombre: 'doc.pdf', numero: '001', documento: 'file-content' }])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AcuseReciboComponent);
    component = fixture.componentInstance;
    confirmarNotificacionService = TestBed.inject(ConfirmarNotificacionService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar acciones con valores correctos', () => {
    expect(component.acciones).toEqual([
      TablaAcciones.VER,
      TablaAcciones.DESCARGAR,
    ]);
  });

  it('debería inicializar acuseReciboTablaDatos como un array vacío', () => {
    const comp = new AcuseReciboComponent(confirmarNotificacionService);
    expect(comp.acuseReciboTablaDatos).toEqual([]);
  });

  it('debería establecer acuseReciboTablaDatos desde el servicio en ngOnInit', () => {
    component.acuseReciboTablaDatos = [];
    jest.spyOn(confirmarNotificacionService, 'getAcuseReciboDatos').mockReturnValue(
      of([{ id: 2, nombre: 'otro.pdf', numero: '123', documento: 'file-content' }])
    );
    component.ngOnInit();
    expect(component.acuseReciboTablaDatos).toEqual([
      { id: 2, nombre: 'otro.pdf', numero: '123', documento: 'file-content' }
    ]);
  });

  it('debería desuscribirse en ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).unsubscribe$, 'next');
    const completeSpy = jest.spyOn((component as any).unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería tener acuseReciboTablaConfiguracion con estructura correcta', () => {
    expect(component.acuseReciboTablaConfiguracion).toHaveProperty('configuracionTabla');
    expect(component.acuseReciboTablaConfiguracion).toHaveProperty('acciones', component.acciones);
  });

  it('no debería actualizar acuseReciboTablaDatos después de ngOnDestroy', () => {
    const testSubject = new Subject<any>();
    jest.spyOn(confirmarNotificacionService, 'getAcuseReciboDatos').mockReturnValue(testSubject.asObservable());
    component.ngOnInit();
    component.ngOnDestroy();
    testSubject.next([{ id: 3, nombre: 'test.pdf' }]);
    expect(component.acuseReciboTablaDatos).not.toEqual([{ id: 3, nombre: 'test.pdf' }]);
  });
});
