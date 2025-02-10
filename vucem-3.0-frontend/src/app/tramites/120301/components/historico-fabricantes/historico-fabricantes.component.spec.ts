import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFabricantesComponent } from './historico-fabricantes.component';

describe('HistoricoFabricantesComponent', () => {
  let component: HistoricoFabricantesComponent;
  let fixture: ComponentFixture<HistoricoFabricantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoFabricantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoFabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
