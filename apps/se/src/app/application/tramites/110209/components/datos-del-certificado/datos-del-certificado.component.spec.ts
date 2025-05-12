import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { DatosDelCertificadoComponent } from './datos-del-certificado.component';
import { TituloComponent, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { MercanciasService } from '../../services/mercancias/mercancias.service';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';

describe('DatosDelCertificadoComponent', () => {
  let component: DatosDelCertificadoComponent;
  let fixture: ComponentFixture<DatosDelCertificadoComponent>;
  let service: MercanciasService;
  let store: Tramite110209Store;
  let query: Tramite110209Query;

  beforeEach(async () => {
    const serviceMock = {
      getMercancias: jest.fn().mockReturnValue(of(['Mercancia 1', 'Mercancia 2']))
    };

    const storeMock = {
      setObservaciones: jest.fn()
    };

    const queryMock = {
      selectTramite110102$: of({
        medioDeTransporte: '1',
        rutaCompleta: 'Ruta 1',
        puertoDeEmbarque: 'Puerto 1',
        puertoDeDesembarque: 'Puerto 2'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,DatosDelCertificadoComponent, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
      providers: [
        { provide: MercanciasService, useValue: serviceMock },
        { provide: Tramite110209Store, useValue: storeMock },
        { provide: Tramite110209Query, useValue: queryMock }
      ]
    }).compileComponents();

    service = TestBed.inject(MercanciasService);
    store = TestBed.inject(Tramite110209Store);
    query = TestBed.inject(Tramite110209Query);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosDelCertificadoForm).toBeDefined();
    expect(component.datosDelCertificadoForm.get('observaciones')?.value).toBe('');
  });

  it('should fetch and set mercancias on init', () => {
    component.ngOnInit();
    expect(service.getMercancias).toHaveBeenCalled();
    expect(component.datosTabla.length).toBe(2);
    expect(component.datosTabla).toEqual(['Mercancia 1', 'Mercancia 2']);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.datosDelCertificadoForm.get('medioDeTransporte')?.value).toBe('1');
    expect(component.datosDelCertificadoForm.get('rutaCompleta')?.value).toBe('Ruta 1');
    expect(component.datosDelCertificadoForm.get('puertoDeEmbarque')?.value).toBe('Puerto 1');
    expect(component.datosDelCertificadoForm.get('puertoDeDesembarque')?.value).toBe('Puerto 2');
  });

  it('should set values in store when form values change', () => {
    component.datosDelCertificadoForm.get('observaciones')?.setValue('Nueva observación');
    component.setValoresStore(component.datosDelCertificadoForm, 'observaciones', 'setObservaciones');
    expect(store.setObservaciones).toHaveBeenCalledWith('Nueva observación');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});