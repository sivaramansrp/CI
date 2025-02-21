import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitanteAsigncionComponent } from './solicitante-asigncion.component';

describe('SolicitanteAsigncionComponent', () => {
  let component: SolicitanteAsigncionComponent;
  let fixture: ComponentFixture<SolicitanteAsigncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteAsigncionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteAsigncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
