import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeSolicitusComponent } from './cancelacion-de-solicitus.component';

describe('CancelacionDeSolicitusComponent', () => {
  let component: CancelacionDeSolicitusComponent;
  let fixture: ComponentFixture<CancelacionDeSolicitusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelacionDeSolicitusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeSolicitusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
