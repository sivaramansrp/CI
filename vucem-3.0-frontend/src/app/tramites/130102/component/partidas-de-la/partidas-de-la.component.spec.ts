import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidasDeLaComponent } from './partidas-de-la.component';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidasDeLaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
