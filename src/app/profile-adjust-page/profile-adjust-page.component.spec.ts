import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdjustPageComponent } from './profile-adjust-page.component';

describe('ProfileAdjustPageComponent', () => {
  let component: ProfileAdjustPageComponent;
  let fixture: ComponentFixture<ProfileAdjustPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAdjustPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAdjustPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
