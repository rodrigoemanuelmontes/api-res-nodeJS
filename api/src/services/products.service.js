// src/services/products.service.js
import { collection, getDocs, doc, getDoc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebaseApp } from '../firebase/firebase.config.js'; 


const getFirestoreDb = () => {
  return initializeFirebaseApp();
};


export const getAllProducts = async () => {
  const db = getFirestoreDb();
  const productsCol = collection(db, 'products');
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getById = async (id) => {
  if (!id || typeof id !== 'string') {
    const error = new Error('ID de producto inválido');
    error.status = 400; 
    throw error;
  }

  const db = getFirestoreDb(); 
  const ref = doc(db, 'products', id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    const error = new Error('Producto no encontrado');
    error.status = 404; 
    throw error;
  }

  return { id: snapshot.id, ...snapshot.data() };
};


export const create = async (data) => {
  console.log('📦 Datos recibidos para crear producto (service):', data);


  if (!data || typeof data !== 'object' || !data.nombre || !data.precio) {
    const error = new Error('Los datos del producto (nombre y precio) son requeridos.');
    error.status = 400;
    throw error;
  }

  const db = getFirestoreDb(); 
  const productsCol = collection(db, 'products');
  const docRef = await addDoc(productsCol, data);
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};


export const remove = async (id) => {
  if (!id || typeof id !== 'string') {
    const error = new Error('ID de producto inválido para eliminar');
    error.status = 400;
    throw error;
  }

  const db = getFirestoreDb(); 
  const ref = doc(db, 'products', id);

  const productSnapshot = await getDoc(ref);

  if (!productSnapshot.exists()) {
    const error = new Error('Producto no encontrado para eliminar');
    error.status = 404;
    throw error;
  }


  await deleteDoc(ref);
  return true;
};


export const update = async (id, data) => {
  if (!id || typeof id !== 'string') {
    const error = new Error('ID de producto inválido para actualizar');
    error.status = 400;
    throw error;
  }
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    const error = new Error('Datos de actualización de producto inválidos');
    error.status = 400;
    throw error;
  }

  const db = getFirestoreDb(); 
  const ref = doc(db, 'products', id);

  const productSnapshot = await getDoc(ref);

  if (!productSnapshot.exists()) {
    const error = new Error('Producto no encontrado para actualizar');
    error.status = 404;
    throw error;
  }


  await updateDoc(ref, data);
  const updatedSnapshot = await getDoc(ref); 
  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
};