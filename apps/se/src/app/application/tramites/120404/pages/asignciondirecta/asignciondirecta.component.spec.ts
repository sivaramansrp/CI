import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciondirectaComponent } from './asignciondirecta.component';

describe('AsignciondirectaComponent', () => {
  let component: AsignciondirectaComponent;
  let fixture: ComponentFixture<AsignciondirectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignciondirectaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciondirectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
