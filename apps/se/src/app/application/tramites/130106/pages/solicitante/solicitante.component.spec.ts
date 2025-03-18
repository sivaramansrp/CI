import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Solicitante130106Component } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: Solicitante130106Component;
  let fixture: ComponentFixture<Solicitante130106Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solicitante130106Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Solicitante130106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
