import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Solicitante140103Component } from './solicitante.component';

describe('SolicitanteComponent', () => {
  let component: Solicitante140103Component;
  let fixture: ComponentFixture<Solicitante140103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Solicitante140103Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Solicitante140103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
