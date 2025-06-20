import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('EmpresasSubfabricanteComponent', () => {
  let component: EmpresasSubfabricanteComponent;
  let fixture: ComponentFixture<EmpresasSubfabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasSubfabricanteComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerDatosDelAlmacen and obtenerListaEstado on ngOnInit', () => {
    const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosDelAlmacen');
    const obtenerListaSpy = jest.spyOn(component, 'obtenerListaEstado');
    component.ngOnInit();
    expect(obtenerDatosSpy).toHaveBeenCalled();
    expect(obtenerListaSpy).toHaveBeenCalled();
  });

   it('should clean up destroy$ on ngOnDestroy', () => {
    const destroy$Spy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
