import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignciondirectaPageComponent } from './asignciondirecta-page.component';

describe('AsignciondirectaPageComponent', () => {
  let component: AsignciondirectaPageComponent;
  let fixture: ComponentFixture<AsignciondirectaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignciondirectaPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignciondirectaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
