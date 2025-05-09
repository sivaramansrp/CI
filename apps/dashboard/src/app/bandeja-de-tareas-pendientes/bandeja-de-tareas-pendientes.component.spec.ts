import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BandejaDeTareasPendientesComponent } from './bandeja-de-tareas-pendientes.component';

describe('BandejaDeTareasPendientesComponent', () => {
  let component: BandejaDeTareasPendientesComponent;
  let fixture: ComponentFixture<BandejaDeTareasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejaDeTareasPendientesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BandejaDeTareasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
