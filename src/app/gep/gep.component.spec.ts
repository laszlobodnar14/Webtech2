import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GepComponent } from './gep.component';

describe('GepComponent', () => {
  let component: GepComponent;
  let fixture: ComponentFixture<GepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
