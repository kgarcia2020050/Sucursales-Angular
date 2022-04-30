import { Component, OnInit } from '@angular/core';
import { Sucursales } from 'src/app/models/sucursales.model';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
  providers: [SucursalesService, LoginService],
})
export class SucursalesComponent implements OnInit {
  public identidad;
  public getModelo: Sucursales;
  public postModelo: Sucursales;
  public getIdModelo: Sucursales;
  public token;



  constructor(
    private _sucursalesService: SucursalesService,
    private _loginService: LoginService
  ) {
    this.postModelo = new Sucursales('', '', '', '');
    this.getIdModelo = new Sucursales('', '', '', '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }
  ngOnInit(): void {
    this.getSucursales();
  }

  getSucursales() {
    this._sucursalesService.obtenerSucursales(this.token).subscribe(
      (response) => {
        this.getModelo = response.Mis_sucursales;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postSucursales() {
    this._sucursalesService
      .agregarSucursal(this.postModelo, this.token)
      .subscribe(
        (response) => {
          this.getSucursales();
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

  getSucursalId(idSucursal) {
    this._sucursalesService.obtenerSucursalId(idSucursal, this.token).subscribe(
      (response) => {
        this.getIdModelo = response.Sucursal_encontrada;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putSucursales() {
    this._sucursalesService
      .editarSucursal(this.getIdModelo, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.getSucursales();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }


  deleteSucursales(idSucursal) {
    this._sucursalesService.eliminarSucursal(idSucursal, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getSucursales();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
