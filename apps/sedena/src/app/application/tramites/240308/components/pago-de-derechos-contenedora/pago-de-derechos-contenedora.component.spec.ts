import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagoDeDerechosContenedoraComponent', () => {
  let component: PagoDeDerechosContenedoraComponent;
  let fixture: ComponentFixture<PagoDeDerechosContenedoraComponent>;
  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaQuery: any;

  beforeEach(async () => {
    mockTramiteQuery = {
      getPagoDerechos$: of({ pago: 123 })
    };
    mockTramiteStore = {
      updatePagoDerechosFormState: jest.fn()
    };
    mockConsultaQuery = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, PagoDeDerechosContenedoraComponent],
      providers: [
        { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
        { provide: 'Tramite240308Store', useValue: mockTramiteStore },
        { provide: 'ConsultaioQuery', useValue: mockConsultaQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(PagoDeDerechosContenedoraComponent, {
        set: {
          providers: [
            { provide: 'Tramite240308Query', useValue: mockTramiteQuery },
            { provide: 'Tramite240308Store', useValue: mockTramiteStore },
            { provide: 'ConsultaioQuery', useValue: mockConsultaQuery }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to consultaQuery and set esSoloLectura', () => {
    expect(component.esSoloLectura).toBe(true);
  });

  it('should subscribe to getPagoDerechos$ and set pagoDerechoFormState', () => {
    expect(component.pagoDerechoFormState).toEqual({ pago: 123 });
  });

  it('should clean up unsubscribe$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).unsubscribe$, 'next');
    const completeSpy = jest.spyOn((component as any).unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
