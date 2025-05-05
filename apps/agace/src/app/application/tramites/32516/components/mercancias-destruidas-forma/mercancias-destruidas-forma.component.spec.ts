import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercanciasDestruidasFormaComponent } from './mercancias-destruidas-forma.component';

describe('MercanciasDestruidasFormaComponent', () => {
  let component: MercanciasDestruidasFormaComponent;
  let fixture: ComponentFixture<MercanciasDestruidasFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercanciasDestruidasFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercanciasDestruidasFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
