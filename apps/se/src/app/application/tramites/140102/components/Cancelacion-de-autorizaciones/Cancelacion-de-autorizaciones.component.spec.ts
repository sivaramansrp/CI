import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeAutorizacionesComponent } from './Cancelacion-de-autorizaciones.component';

describe('CancelacionDeAutorizacionesComponent', () => {
  let component: CancelacionDeAutorizacionesComponent;
  let fixture: ComponentFixture<CancelacionDeAutorizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeAutorizacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeAutorizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
