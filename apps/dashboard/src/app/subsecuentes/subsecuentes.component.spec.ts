import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubsecuentesComponent } from './subsecuentes.component';

describe('SubsecuentesComponent', () => {
  let component: SubsecuentesComponent;
  let fixture: ComponentFixture<SubsecuentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsecuentesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubsecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
