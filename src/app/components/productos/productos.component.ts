import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService, LoginService],
})
export class ProductosComponent implements OnInit {
  public getModelo: Productos;
  public postModelo: Productos;
  public getIdModelo: Productos;

  public identidad;
  public token;

  constructor(
    private _loginService: LoginService,
    private _productosService: ProductosService
  ) {
    this.postModelo = new Productos('', '', '', 0, '');
    this.getIdModelo = new Productos('', '', '', 0, '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productosService.obtenerProductos(this.token).subscribe(
      (response) => {
        this.getModelo = response.Mis_productos;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  postProductos() {
    this._productosService
      .agregarProductos(this.postModelo, this.token)
      .subscribe(
        (response) => {
          this.getProductos();
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

  getIdProducto(idProducto) {
    this._productosService.obtenerProductoId(idProducto, this.token).subscribe(
      (response) => {
        this.getIdModelo = response.Producto;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteProductos(idProducto) {
    this._productosService.eliminarProductos(idProducto, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  putProductos() {
    this._productosService
      .editarProducto(this.getIdModelo, this.token)
      .subscribe(
        (response) => {
          console.log(response);
          this.getProductos();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }
}
