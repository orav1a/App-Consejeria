import { Component, OnInit } from '@angular/core';
import { FirestorageService } from '../services/firestorage.service';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page  {

  data: any = [];
  disponibles: any = [];
  contador: number = 0;

  constructor(private fireService: FirestorageService) { }

  ngOnInit() {
    this.fireService.obtenerDoc().subscribe(doc => {
      console.log(doc);
      this.data = doc;
      this.data.id.forEach((element: any) => {this.contador += 1;});
    });
  }

  obtenerDisponibles() {
    this.fireService.obtenerDoc().subscribe(doc => {
      console.log(doc);
      // Filtra los documentos con 'disponible' igual a true
      this.disponibles = doc.filter(item => item.disponible === true);
      console.log(this.disponibles);
    });
  }



}
