import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import {deletearticle, fetcharticles} from '../services/articleservice';

const Listarticles = () => {
  const[articles,setArticles]=useState([])
  const[isLoading,setIsloading]=useState(true)

  const loadarticles=async()=>{
    try {
      // const res=await axios.get("https://backendecomgs1.vercel.app/api/api/articles")
      // const res=await axios.get("https://ecommerce2024-glsi-ii.vercel.app/api/api/articles")
      const res = await fetcharticles();
      setArticles(res.data)
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    loadarticles()
  },[])
const handleDelete=async(id)=>{
  if(window.confirm("êtes vous sure de vouloir supprimer")){
  try {
    await deletearticle(id)
    .then(res=>{
      setArticles(articles.filter(art=>art.id!=id))
    })
  } catch (error) {
    console.log(error)
  }
}
}
if (isLoading) {
  return <center><ReactLoading type='balls' color='red' height={400} width={200} /></center>
}
  return (
    <div>
      <Link to="/articles/add"> <button className='btn btn-success btn-sm'><i class="fa-solid fa-square-plus"></i> Ajouter</button></Link>
    <center> <h1> Liste des articles</h1></center>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Sous catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {
          articles.map((art,index)=>
            <tr key={index}>
              <td>{art.reference}</td>
              <td>{art.designation}</td>
              <td>{art.marque}</td>
              <td>{art.qtestock}</td>
              <td>{art.prix}</td>
              <td><img src={art.imageart} width={100} height={100}/></td>
              <td>{art.scategorieID}</td>
              <td><Link to={`/articles/edit/${art.id}`}><button className='btn btn-warning btn-sm'><i class="fa-solid fa-pen-to-square"></i> Update</button></Link></td>
              <td><button className='btn btn-danger btn-sm' onClick={()=>handleDelete(art.id)}><i class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
          
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default Listarticles