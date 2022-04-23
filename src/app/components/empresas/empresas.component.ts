import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { CRUDAdminService } from 'src/app/services/crudadmin.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
  providers: [CRUDAdminService, LoginService],
})
export class EmpresasComponent implements OnInit {
  public getModelo: Entidad;
  public postModelo: Entidad;
  public getIdModelo: Entidad;

  public token;

  constructor(
    private _empresasService: CRUDAdminService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Entidad('', '', '', '', '', '', '', '');
    this.getIdModelo = new Entidad('', '', '', '', '', '', '', '');
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this._empresasService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        this.getModelo = response.Entidades_registradas;
        console.log(this.getModelo);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getEmpresaId(idEmpresa) {
    this._empresasService.obtenerEmpresaId(idEmpresa, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getIdModelo = response.Empresa_encontrada;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postEmpresas() {
    this._empresasService.agregarEmpresa(this.postModelo, this.token).subscribe(
      (response) => {
        this.getEmpresas();

        console.log(response);
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

  putEmpresas() {
    this._empresasService.editarEmpresa(this.getIdModelo, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteEmpresas(idEmpresa) {
    this._empresasService.eliminarEmpresa(idEmpresa, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getEmpresas();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}