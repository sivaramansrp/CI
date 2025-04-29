import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplementariaComponent } from './complementaria.component';

describe('ComplementariaComponent', () => {
  let component: ComplementariaComponent;
  let fixture: ComponentFixture<ComplementariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementariaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplementariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
