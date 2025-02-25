import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modification90305Component } from './modification-90305.component';

describe('Modification90305Component', () => {
  let component: Modification90305Component;
  let fixture: ComponentFixture<Modification90305Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modification90305Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Modification90305Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
