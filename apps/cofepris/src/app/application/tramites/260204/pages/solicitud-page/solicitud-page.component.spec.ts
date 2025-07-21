import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPageComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial title message', () => {
    expect(component.tituloMensaje).toBe(
      'Permiso sanitario de importación de medicamentos con registro sanitario'
    );
  });

  it('should update the title message when getValorIndice is called', () => {
    const accionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(component.tituloMensaje).toBe('Anexar requisitos');
  });

  it('should change the indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should call wizardComponent.siguiente when getValorIndice is called with "cont" action', () => {
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    const accionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    expect(spy).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when getValorIndice is called with "ant" action', () => {
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    const accionBoton = { valor: 2, accion: 'ant' };
    component.getValorIndice(accionBoton);
    expect(spy).toHaveBeenCalled();
  });

  it('should return the correct title for each step using obtenerNombreDelTítulo', () => {
    expect(SolicitudPageComponent.obtenerNombreDelTítulo(1)).toBe(
      'Permiso sanitario de importación de medicamentos con registro sanitario'
    );
    expect(SolicitudPageComponent.obtenerNombreDelTítulo(2)).toBe(
      'Anexar requisitos'
    );
    expect(SolicitudPageComponent.obtenerNombreDelTítulo(3)).toBe(
      'Firmar solicitud'
    );
    expect(SolicitudPageComponent.obtenerNombreDelTítulo(4)).toBe(
      'Permiso sanitario de importación de medicamentos con registro sanitario'
    );
  });
});
