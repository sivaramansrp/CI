import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientModule } from '@angular/common/http';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let avisoServiceMock: any;

  beforeEach(async () => {
    avisoServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent,HttpClientModule],
      providers: [
        { provide: 'AvisoDatosService', useValue: avisoServiceMock }
      ]
    }).overrideComponent(PasoUnoComponent, {
      set: {
        providers: [
          { provide: 'AvisoDatosService', useValue: avisoServiceMock }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    (component as any).avisoService = avisoServiceMock;
    fixture.detectChanges();
  });

  it('should set esDatosRespuesta and call actualizarEstadoFormulario if resp exists', () => {
    const respMock = { foo: 'bar' };
    avisoServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(respMock));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(avisoServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(respMock);
  });

  it('should not call actualizarEstadoFormulario if resp is falsy', () => {
    avisoServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.esDatosRespuesta = false;
    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(false);
    expect(avisoServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });
});
