import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitantePageComponent } from './solicitante-page.component';

describe('SolicitantePageComponent', () => {
  let component: SolicitantePageComponent;
  let fixture: ComponentFixture<SolicitantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitantePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
