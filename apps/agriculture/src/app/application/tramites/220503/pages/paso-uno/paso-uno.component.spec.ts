import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { RevisionDocumentalComponent } from '../../components/revision-documental/revision-documental.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudDatosComponent } from '../../components/SolicitudDatos/SolicitudDatos.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SolicitanteComponent,
        SolicitudDatosComponent,
        RevisionDocumentalComponent,
        PasoUnoComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have default tab index as 1', () => {
    expect(component.indice).toBe(1);
  });

  test('should update the tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(0);
    expect(component.indice).toBe(0);
  });
});