
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchscategories } from '../services/scategorieservice'
import { addarticle, editarticle, fetcharticleById } from '../services/articleservice'

const Editarticle = () => {
  const navigate = useNavigate()
  const [scategories, setScatgories] = useState([])
  const [article, setArticle] = useState({})
  const { id } = useParams()
  const loadscategories = async () => {
    try {
      const res = await fetchscategories()
      setScatgories(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const loadarticle = async () => {
    try {
      const res = await fetcharticleById(id)
      console.log(res)
      setArticle(res.data)

    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadscategories()
    loadarticle()
  }, [])


  const handleUpdate = async (e) => {
    try {
      e.preventDefault()
      console.log(article)
      await editarticle(article)
        .then(res => {
          navigate("/articles")
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

      Modifier un article
      <Form>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control type="text" placeholder="Référence"
              value={article.reference}
              onChange={(e) => setArticle({ ...article, reference: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Désignation</Form.Label>
            <Form.Control type="text" placeholder="Désignation"

              value={article.designation}
              onChange={(e) => setArticle({ ...article, designation: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control type="text" placeholder="Marque"
              value={article.marque}
              onChange={(e) => setArticle({ ...article, marque: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="text" placeholder="Stock"
              value={article.qtestock}
              onChange={(e) => setArticle({ ...article, qtestock: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="text" placeholder="Prix"
              value={article.prix}
              onChange={(e) => setArticle({ ...article, prix: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} mb="6">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" placeholder="Image"
              value={article.imageart}
              onChange={(e) => setArticle({ ...article, imageart: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} mb="6">
            <Form.Label>Sous Catégorie</Form.Label>
            <Form.Control type="select"
              as={"select"}
              placeholder="Sous Catégorie"
              value={article.scategorieID}
              onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
            >
              {
                scategories.map((scat, index) =>

                  <option key={index} value={scat.id}>{scat.nomscategorie}</option>

                )
              }
            </Form.Control>
          </Form.Group>
        </Row>
      </Form>
      <button className='btn btn-success btn-sm' onClick={(e) => handleUpdate(e)}><i class="fa-solid fa-floppy-disk"></i> Enregistrer</button>
      &nbsp;
      <Link to="/articles" className='btn btn-danger btn-sm'><button className='btn btn-danger btn-sm'><i class="fa-solid fa-arrow-right-from-bracket"></i> Annuler</button></Link>
    </div>
  )
}

export default Editarticle
