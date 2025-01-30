import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesAgenciasAduanalesComponent } from './agentes-agencias-aduanales.component';

describe('AgentesAgenciasAduanalesComponent', () => {
  let component: AgentesAgenciasAduanalesComponent;
  let fixture: ComponentFixture<AgentesAgenciasAduanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentesAgenciasAduanalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentesAgenciasAduanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
