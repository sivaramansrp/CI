import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosDeclaracionesComponent } from './manifiestosDeclaraciones.component';

describe('ManifiestosDeclaracionesComponent', () => {
  let component: ManifiestosDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosDeclaracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifiestosDeclaracionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
