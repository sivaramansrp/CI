import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DatosTerritorioComponent } from './datos-territorio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

describe('DatosTerritorioComponent', () => {
  let component: DatosTerritorioComponent;
  let fixture: ComponentFixture<DatosTerritorioComponent>;
  let solicitud260401ServiceMock: any;


  beforeEach(async () => {

    solicitud260401ServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      getPagoDerechos: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
      actualizarPagoDerechosFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosTerritorioComponent],
      imports: [HttpClientTestingModule, SolicitanteComponent],
       providers: [
        { provide: 'Solicitud260401Service', useValue: solicitud260401ServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(DatosTerritorioComponent);
    component = fixture.componentInstance;
    (component as any).destroyNotifier$ = new Subject<void>();
    fixture.detectChanges();
  });

   afterEach(() => {
    (component as any).destroyNotifier$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should have "indice" initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change "indice" when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

  it('should call actualizarEstadoFormulario and actualizarPagoDerechosFormulario with correct data', fakeAsync(() => {
    const registroMock = { foo: 'bar' };
    const permisoMock = { baz: 'qux' };
    solicitud260401ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(registroMock));
    solicitud260401ServiceMock.getPagoDerechos.mockReturnValue(of(permisoMock));

    component.guardarDatosFormulario();
    tick();
    fixture.detectChanges();
    fixture.detectChanges();


    expect(solicitud260401ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(registroMock);
    expect(solicitud260401ServiceMock.actualizarPagoDerechosFormulario).toHaveBeenCalledWith(permisoMock);
    expect(component.esDatosRespuesta).toBe(true);
  }));

});
