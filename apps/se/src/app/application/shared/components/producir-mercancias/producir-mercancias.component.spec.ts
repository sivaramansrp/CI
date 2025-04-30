import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducirMercanciasComponent } from './producir-mercancias.component';

describe('ProducirMercanciasComponent', () => {
  let component: ProducirMercanciasComponent;
  let fixture: ComponentFixture<ProducirMercanciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducirMercanciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducirMercanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
