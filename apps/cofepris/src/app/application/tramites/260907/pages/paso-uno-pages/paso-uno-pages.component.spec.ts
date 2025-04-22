import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoPagesComponent } from './paso-uno-pages.component';

describe('PasoUnoPagesComponent', () => {
  let component: PasoUnoPagesComponent;
  let fixture: ComponentFixture<PasoUnoPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoPagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
