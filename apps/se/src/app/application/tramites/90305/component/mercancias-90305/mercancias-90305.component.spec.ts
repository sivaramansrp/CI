import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mercancias90305Component } from './mercancias-90305.component';

describe('Mercancias90305Component', () => {
  let component: Mercancias90305Component;
  let fixture: ComponentFixture<Mercancias90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mercancias90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Mercancias90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
