import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GepRegisterPageComponent } from './gep-register-page.component';

describe('GepRegisterPageComponent', () => {
  let component: GepRegisterPageComponent;
  let fixture: ComponentFixture<GepRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GepRegisterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GepRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
