import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManejoComponent } from './manejo.component';

describe('ManejoComponent', () => {
  let component: ManejoComponent;
  let fixture: ComponentFixture<ManejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManejoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
