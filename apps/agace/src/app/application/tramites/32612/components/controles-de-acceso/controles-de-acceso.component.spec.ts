import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlesDeAccesoComponent } from './controles-de-acceso.component';

describe('ControlesDeAccesoComponent', () => {
  let component: ControlesDeAccesoComponent;
  let fixture: ComponentFixture<ControlesDeAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlesDeAccesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlesDeAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
