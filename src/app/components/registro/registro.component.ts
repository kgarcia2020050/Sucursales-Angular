import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [LoginService],
})
export class RegistroComponent implements OnInit {
  public postModelo: Entidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.postModelo = new Entidad('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  postEmpresas() {
    this._loginService.registroEmpresa(this.postModelo).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/login']);
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.Error,
        });
      }
    );
  }
}
