import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { GepService } from '../services/gep.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gep-register-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './gep-register-page.component.html',
  styleUrl: './gep-register-page.component.css'
})
export class GepRegisterPageComponent {
  gepForm: FormGroup;

  constructor(private gepService: GepService,private toastr: ToastrService, private fb: FormBuilder) {
    this.gepForm = this.fb.group({
      name: ['', Validators.required],
      marka: ['', Validators.required],
      tipus: ['', Validators.required],
      teljesitmeny: ['', [Validators.required, Validators.min(0)]],
      suly: ['', [Validators.required, Validators.min(0)]],
      berletidij: ['', [Validators.required, Validators.min(0)]],
      letet: ['', [Validators.required, Validators.min(0)]]
    });
  }
  onSubmit(): void {
    if (this.gepForm.invalid) {
      this.toastr.error('Hibás űrlap adat');
      return;
    }

    this.gepService.createGep(this.gepForm.value).subscribe(
      (response) => {
        this.toastr.success('Gép sikeresen létrehozva');
      },
      (error) => {
        this.toastr.error('Hiba történt a gép létrehozása során');
        console.error(error);
      }
    );
  }

}
