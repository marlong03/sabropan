//FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,deleteDoc,doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyAQE-F1ZNQKx9dOa9jaf72SrlpYdVIix6w",
 authDomain: "sabropan-62913.firebaseapp.com",
 projectId: "sabropan-62913",
 storageBucket: "sabropan-62913.appspot.com",
 messagingSenderId: "857210420053",
 appId: "1:857210420053:web:03eb6f523f8b920b264ddc",
 measurementId: "G-YJKR13DE7B"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore()
 function guardarAnuncio(data){
   
   addDoc(collection(db,'anuncios'),data)
 }
 /* guardarAnuncio() */
  async function obtenerAnuncios(){
   let listaAnuncios = []
   const querySnapshot = await getDocs(collection(db,'anuncios'))
   querySnapshot.forEach(doc =>{
    let anuncio = doc.data()
    anuncio.id = doc.id
     listaAnuncios.push(anuncio)

   })  
   /* console.log(listaAnuncios); */
   return listaAnuncios

 }
 function eliminarAnuncio(id){
   deleteDoc(doc(db,'anuncios',id)) 
 }


 export {
    onSnapshot,
    collection,
    db,
    obtenerAnuncios,
    eliminarAnuncio,
    guardarAnuncio
 }  
 



//FIREBASE