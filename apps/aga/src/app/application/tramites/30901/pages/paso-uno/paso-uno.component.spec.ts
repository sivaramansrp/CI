import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DatosProrrogaMuestrasMercanciasComponent } from '../../components/datos-prorroga-muestras-mercancias/datos-prorroga-muestras-mercancias.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoLCComponent } from '../../components/pago-lc/pago-lc.component';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroRenovacionesMuestrasMercanciasComponent } from '../../components/registro-renovaciones-muestras-mercancias/registro-renovaciones-muestras-mercancias.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';

fdescribe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PasoUnoComponent,
        CommonModule,
        SolicitanteComponent,
        RegistroRenovacionesMuestrasMercanciasComponent,
        PagoLCComponent,
        DatosProrrogaMuestrasMercanciasComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default indice value as 2', () => {
    expect(component.indice).toBe(2);
  });

  it('should update indice when seleccionaTab is called', () => {
    expect(component.indice).toBe(1);

    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(3);
    expect(component.indice).toBe(3);

    component.seleccionaTab(4);
    expect(component.indice).toBe(4);
  });
});
