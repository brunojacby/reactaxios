import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import blogFetch from '../axios/config'

import './NewPost.css'


const NewPost = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({title: '', body: '', userId: 1})
  const [posts, setPosts] = useState([])

  const changeData = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }

  const createPost = async (e) => {
    e.preventDefault();
    setPosts([...posts, data])

    await blogFetch.post("/posts", {
      body: data,
    })      
        
    console.log(posts)
    //navigate("/")
  }


  return (
    <div className='new-post'>
      <h2>Inserir novo post</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className='form-control'>
          <label htmlFor="title">Título:</label>
          <input 
          type="text" 
          name="title"
          id="title"
          placeholder='Digite o título'
          required
          value={data.title}
          onChange={changeData}
          />
          { (!data.title) && <p style={{color: 'yellow', fontWeight: '200', marginTop: '5px'}}>Campo obrigatório</p>}
        </div>  
        <div className='form-control'>
          <label htmlFor="body">Conteúdo:</label>
          <textarea 
          name="body" 
          id="body" 
          value={data.body}
          placeholder='Digite o conteúdo' cols="30" rows="10"
          onChange={changeData}
          required
          ></textarea>
          { (!data.body) && <p style={{color: 'yellow', fontWeight: '200', marginTop: '5px'}}>Campo obrigatório</p>}
        </div>
        <input type="submit" value="Criar Post" className='btn' />
      </form>
    </div>
  )
}

export default NewPost