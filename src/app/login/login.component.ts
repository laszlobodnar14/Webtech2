import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TitleComponent} from '../title/title.component';
import {NgIf} from '@angular/common';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {User} from '../shared/models/User';
import {TextInputComponent} from '../text-input/text-input.component';
import {DefaultButtonComponent} from '../default-button/default-button.component';


@Component({
  selector: 'app-login',
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    DefaultButtonComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl ='';

  constructor(private formBuilder: FormBuilder, private userService:UserService, private  activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
     this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];

  }
  get fc(){
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }



    this.userService.login({email: this.fc['email'].value, password: this.fc['password'].value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })

  }


}
