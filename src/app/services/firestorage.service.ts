import { Injectable } from '@angular/core';
import{Firestore,collection,addDoc, collectionData, query, orderBy, limit, collectionChanges } from '@angular/fire/firestore' 
import { Estacionamiento } from '../interfaces/estacionamiento';
import { Observable, map, from } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private firestore: Firestore) {}

  createDoc(estacionamiento: Estacionamiento){
    const est = collection(this.firestore, 'estacionamiento');
    return addDoc(est, estacionamiento);
  }
  obtenerDoc(): Observable<Estacionamiento[]> {
    const est = collection(this.firestore, 'estacionamiento');
    const sortedquery = query(est, orderBy('disponible', 'desc'));
    return collectionData(est, { idField: 'id' }) as Observable<Estacionamiento[]>;
    
  }
}