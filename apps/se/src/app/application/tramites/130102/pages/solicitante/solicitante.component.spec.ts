import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solicitante130102Component } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: Solicitante130102Component;
  let fixture: ComponentFixture<Solicitante130102Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Solicitante130102Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Solicitante130102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
