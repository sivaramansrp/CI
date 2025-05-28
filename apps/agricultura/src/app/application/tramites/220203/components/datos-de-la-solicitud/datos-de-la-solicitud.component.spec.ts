import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent, CatalogoSelectComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDeLaSolicitudComponent],
      imports: [HttpClientTestingModule, TituloComponent, AlertComponent, CatalogoSelectComponent, TablaDinamicaComponent, ReactiveFormsModule, TableComponent],

      providers: [
        FormBuilder,
        ImportacionDeAcuiculturaService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpClient); // Inject the HttpClient
    httpTestingController = TestBed.inject(HttpTestingController); // Inject HttpTestingController
  });
  xit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should create datosMercanciaFormGroup on ngOnInit', () => {
    expect(component.datosMercanciaFormGroup).toBeDefined();
    expect(component.datosMercanciaFormGroup.contains('realizarGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('mercanciaGroup')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.contains('detalles')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('aduanaIngreso')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('oficinaInspeccion')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('realizarGroup')?.get('puntoInspeccion')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('tipoRequisito')).toBeTruthy();
    expect(component.datosMercanciaFormGroup.get('mercanciaGroup')?.get('requisito')).toBeTruthy();
  });
});
