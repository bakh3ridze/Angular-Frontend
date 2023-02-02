import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

constructor(private http: HttpClient) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  error: string = '';

  submit(): void{
    const body = { "email": this.form.value.email, "password": this.form.value.password};
    this.http.post<any>("https://localhost:7121/Account/Auth", body).subscribe(response => {
      console.log(response);
      this.error = response.errorMessage;
    });
  }
}
