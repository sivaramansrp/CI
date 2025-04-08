import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsolidacionDeCargasComponent } from './consolidacion-de-cargas.component';

describe('ConsolidacionDeCargasComponent', () => {
  let component: ConsolidacionDeCargasComponent;
  let fixture: ComponentFixture<ConsolidacionDeCargasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolidacionDeCargasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsolidacionDeCargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
