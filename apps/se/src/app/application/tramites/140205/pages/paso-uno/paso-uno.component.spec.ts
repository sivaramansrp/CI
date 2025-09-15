import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SolicitanteComponent, PasoUnoComponent, HttpClientTestingModule],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the active tab to 1 when seleccionaTab(1) is called', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should set the active tab to 3 when seleccionaTab(3) is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should set esDatosRespuesta to true and call store methods when fetchGetDatosConsulta receives a successful response', () => {
    const mockRespuesta = {
      success: true,
      datos: {
        GrupoEmpresa: 'Empresa',
        GrupoFolio: 'Folio',
        GrupoCupo: 'Cupo',
        GrupoDatalleCupo: 'DetalleCupo'
      }
    };
    const cancelacionCertificadosService = {
      getDatosConsulta: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
        subscribe: (fn: (resp: any) => void) => fn(mockRespuesta)
      })
    };
    const store = {
      setGrupoEmpresa: jest.fn(),
      setGrupoFolio: jest.fn(),
      setGrupoCupo: jest.fn(),
      setGrupoDatalleCupo: jest.fn()
    };
    // @ts-ignore
    component.cancelacionCertificadosService = cancelacionCertificadosService;
    // @ts-ignore
    component.store = store;
    component.fetchGetDatosConsulta();
    expect(component.esDatosRespuesta).toBe(true);
    expect(store.setGrupoEmpresa).toHaveBeenCalledWith('Empresa');
    expect(store.setGrupoFolio).toHaveBeenCalledWith('Folio');
    expect(store.setGrupoCupo).toHaveBeenCalledWith('Cupo');
    expect(store.setGrupoDatalleCupo).toHaveBeenCalledWith('DetalleCupo');
  });

  it('should not set esDatosRespuesta to true or call store methods when fetchGetDatosConsulta receives an unsuccessful response', () => {
    const mockRespuesta = { success: false, datos: {} };
    const cancelacionCertificadosService = {
      getDatosConsulta: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnThis(),
        subscribe: (fn: (resp: any) => void) => fn(mockRespuesta)
      })
    };
    const store = {
      setGrupoEmpresa: jest.fn(),
      setGrupoFolio: jest.fn(),
      setGrupoCupo: jest.fn(),
      setGrupoDatalleCupo: jest.fn()
    };
    // @ts-ignore
    component.cancelacionCertificadosService = cancelacionCertificadosService;
    // @ts-ignore
    component.store = store;
    component.fetchGetDatosConsulta();
    expect(component.esDatosRespuesta).toBe(true);
    expect(store.setGrupoEmpresa).not.toHaveBeenCalled();
    expect(store.setGrupoFolio).not.toHaveBeenCalled();
    expect(store.setGrupoCupo).not.toHaveBeenCalled();
    expect(store.setGrupoDatalleCupo).not.toHaveBeenCalled();
  });


});
