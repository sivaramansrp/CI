import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectoImmexComponent } from './proyecto-immex.component';

describe('ProyectoImmexComponent', () => {
  let component: ProyectoImmexComponent;
  let fixture: ComponentFixture<ProyectoImmexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoImmexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoImmexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
