import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioFinalContenedoraComponent } from './agregar-destinatario-final-contenedora.component';
import { Tramite240308Store } from '../../../240308/estados/tramite240308Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
describe('AgregarDestinatarioFinalContenedoraComponent', () => {
  let component: AgregarDestinatarioFinalContenedoraComponent;
  let fixture: ComponentFixture<AgregarDestinatarioFinalContenedoraComponent>;
  let mockTramiteStore: jest.Mocked<Tramite240308Store>;

  beforeEach(async () => {
    mockTramiteStore = {
      updateDestinatarioFinalTablaDatos: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [AgregarDestinatarioFinalContenedoraComponent],
      providers: [
        { provide: Tramite240308Store, useValue: mockTramiteStore },
        DatosSolicitudService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioFinalContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir el evento cerrar', () => {
    jest.spyOn(component.cerrar, 'emit');
    component.cerrar.emit();
    expect(component.cerrar.emit).toHaveBeenCalled();
  });

  it('debe llamar a tramiteStore.updateDestinatarioFinalTablaDatos al ejecutar updateDestinatarioFinalTablaDatos', () => {
    const mockDestinatarios = [{ id: 1, nombre: 'Destinatario' }] as any;
    component.updateDestinatarioFinalTablaDatos(mockDestinatarios);
    expect(mockTramiteStore.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(mockDestinatarios);
  });
});