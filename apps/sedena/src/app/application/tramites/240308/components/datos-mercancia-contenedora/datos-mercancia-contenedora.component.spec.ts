import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { Tramite240308Store } from '../../estados/tramite240308Store.store';
import { ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;
  let mockTramiteStore: jest.Mocked<Tramite240308Store>;

  beforeEach(async () => {
    mockTramiteStore = {
      updateMercanciaTablaDatos: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [DatosMercanciaContenedoraComponent],
      providers: [
        { provide: Tramite240308Store, useValue: mockTramiteStore },
        { provide: ActivatedRoute, useValue: {} },
        { 
          provide: DatosSolicitudService, 
          useValue: { 
            obtenerFraccionesCatalogo: jest.fn().mockReturnValue({ pipe: () => ({ subscribe: jest.fn() }) }) 
          } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
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

  it('debe llamar tramiteStore.updateMercanciaTablaDatos al ejecutar updateMercanciaDetalle', () => {
    const mockData = [{ id: 1, nombre: 'Mercancia' }] as any;
    component.updateMercanciaDetalle(mockData);
    expect(mockTramiteStore.updateMercanciaTablaDatos).toHaveBeenCalledWith(mockData);
  });
});