import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pruebalink';
  formBasico: FormGroup;
  orden: string;
  cuentas: any[];
  cuentasFiltradas: any[];

  RESPONSE = {
    cuentas:[
      { nroCuenta:1234,
        tipo:'CA$'},
      {nroCuenta:5678,
        tipo:'CC$'},
      {nroCuenta:9012,
        tipo:'CAu$s'}
    ]
  }

  ngOnInit(){
    this.formBasico = new FormGroup({
      'filtroControl': new FormControl(null),
      'ordenControl': new FormControl(null)
    });
    this.cuentas = this.RESPONSE.cuentas;
    this.filtrar();
  }

  filtrar(criterio: string = ''){

    let term = criterio == '' ? this.formBasico.controls.filtroControl.value : criterio;

    if(term != '' && term != null){
      this.cuentasFiltradas = this.cuentas.filter(cta=>{
        return cta.tipo.toLowerCase().includes(term.toLowerCase());
      });
    }else{
      this.cuentasFiltradas = this.cuentas;
    }

    this.ordenar();

  }

  ordenar(){
    let orden = this.formBasico.controls.ordenControl.value;
    this.cuentasFiltradas = this.cuentasFiltradas.sort((a,b)=>{
      return orden == 'desc' ? b.nroCuenta - a.nroCuenta : a.nroCuenta - b.nroCuenta;
    });
  }
}
