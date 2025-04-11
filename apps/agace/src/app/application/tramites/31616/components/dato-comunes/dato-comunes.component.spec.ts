import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatoComunesComponent } from './dato-comunes.component';

describe('DatoComunesComponent', () => {
  let component: DatoComunesComponent;
  let fixture: ComponentFixture<DatoComunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatoComunesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatoComunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
