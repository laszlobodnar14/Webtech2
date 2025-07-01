import {Component, OnInit} from '@angular/core';
import {TitleComponent} from '../title/title.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {PasswordMatchValidator} from '../shared/validators/password_match_validator';
import {IUserRegister} from '../shared/interfaces/IUserRegister';
import {TextInputComponent} from '../text-input/text-input.component';
import {DefaultButtonComponent} from '../default-button/default-button.component';

@Component({
  selector: 'app-register-page',
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    DefaultButtonComponent,
    RouterLink
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted =false;
  returnUrl = '';
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }
  ngOnInit() {
   this.registerForm = this.fb.group({
     name:['', [Validators.required,Validators.minLength(4)]],
     ambassador:['', [Validators.required,Validators.minLength(4)]],
     email:['', [Validators.required]],
     password:['', [Validators.required,Validators.minLength(4)]],
     confirmPassword:['', [Validators.required]],
     taxnum:['', [Validators.required,Validators.minLength(4)]],
     address:['', [Validators.required,Validators.minLength(4)]],
   },{
     validators: PasswordMatchValidator('password','confirmPassword'),
   });
   this.returnUrl = this.route.snapshot.params['returnUrl'];
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted=true;
    if(this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user:IUserRegister ={
      name: fv.name,
      ambassador: fv.ambassador,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      taxnum: fv.taxnum,
      address: fv.address,

    };

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl);
    })

  }

}
