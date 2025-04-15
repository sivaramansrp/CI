import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosYDeclaracionesComponent } from './manifiestos-y-declaraciones.component';

describe('ManifiestosYDeclaracionesComponent', () => {
  let component: ManifiestosYDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosYDeclaracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestosYDeclaracionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosYDeclaracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
