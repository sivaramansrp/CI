import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplementarPlantaComponent } from './complementar-planta.component';

describe('ComplementarPlantaComponent', () => {
  let component: ComplementarPlantaComponent;
  let fixture: ComponentFixture<ComplementarPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementarPlantaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementarPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
