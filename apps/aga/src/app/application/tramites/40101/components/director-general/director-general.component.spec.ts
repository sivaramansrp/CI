import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorGeneralComponent } from './director-general.component';

describe('DirectorGeneralComponent', () => {
  let component: DirectorGeneralComponent;
  let fixture: ComponentFixture<DirectorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
