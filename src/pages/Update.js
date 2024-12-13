import { useParams,useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const [title,setTitle]=useState('')
  const [method,setMethod]=useState('')
  const [rating,setRating]=useState('')
  const [formError,setFormError]=useState('')
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchSmoothie=async()=>{
      const {data,error}= await supabase
      .from('Smoothies')
      .select()
      .eq('id',id)
      .single()

      if(error){
        navigate('/',{replace:true})
      }
      if(data){
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        console.log(data)
      }
    }
    fetchSmoothie()
  },[id,navigate])

  const handleUpdate=async(e)=>{
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    const { data, error } = await supabase
      .from('Smoothies')
      .update([{ title, method, rating }])
      .eq('id',id)
      .select()
      
      console.log("Supabase response:", { data, error });
    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if(data){
      console.log(data)
      setFormError('')
      navigate('/')
    }
  }
  return (
    <div className="page update">
        <form onSubmit={handleUpdate}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

      
      </form>
    </div>
  )
}

export default Update