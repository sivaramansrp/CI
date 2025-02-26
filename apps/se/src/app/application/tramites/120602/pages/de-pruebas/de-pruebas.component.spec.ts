import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DePruebasComponent } from './de-pruebas.component';

describe('DePruebasComponent', () => {
  let component: DePruebasComponent;
  let fixture: ComponentFixture<DePruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DePruebasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DePruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
