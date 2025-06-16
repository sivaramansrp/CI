import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosComponent } from './datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitanteOctavaTemporalComponent } from '../../component/solicitante-octava-temporal/solicitante-octava-temporal.component';
import { Solicitante130102Component } from '../solicitante/solicitante.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent, Solicitante130102Component],
      imports: [HttpClientTestingModule, SolicitanteOctavaTemporalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      update: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
