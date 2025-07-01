import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/User';
import {USER_ADJUST_URL} from '../shared/constants/urls';

@Component({
  selector: 'app-profile-adjust-page',
  templateUrl: './profile-adjust-page.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./profile-adjust-page.component.css']
})
export class ProfileAdjustPageComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;

    this.profileForm = this.fb.group({
      name: [this.currentUser.name, [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      ambassador: [this.currentUser.ambassador, [Validators.required]],
      taxnum: [this.currentUser.taxnum, [Validators.required]],
      address: [this.currentUser.address, [Validators.required]],
      password: [''] // Új jelszó opcionálisan
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.toastr.error('Hibás űrlap adatok');
      return;
    }

    const updatedData = this.profileForm.value;

    if (!updatedData.password) {
      delete updatedData.password;
    }

    const userId = this.currentUser.id;

    this.http.put<User>(`${USER_ADJUST_URL}${userId}`, updatedData).subscribe({
      next: (updatedUser) => {
        this.toastr.success('Profil sikeresen frissítve');
        this.userService['userSubject'].next(updatedUser);
        localStorage.setItem('User', JSON.stringify(updatedUser));
      },
      error: (err) => {
        this.toastr.error('Hiba történt a mentés során');
        console.error(err);
      }
    });
  }
}
