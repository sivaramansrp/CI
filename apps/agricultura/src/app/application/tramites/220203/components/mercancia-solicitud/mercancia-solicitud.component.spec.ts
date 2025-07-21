import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercanciaSolicitudComponent } from './mercancia-solicitud.component';

describe('MercanciaSolicitudComponent', () => {
  let component: MercanciaSolicitudComponent;
  let fixture: ComponentFixture<MercanciaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercanciaSolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MercanciaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
