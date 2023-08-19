import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios";
import './Design.css';

////Making My interface
interface Pic {
    id: number
    category: string
    url:string
    photographer: string
    alt: string
    page_url: string
    width: number
    height: number
    path: string
}


export default function Pic() {


  const [pics,setPics] =useState<Pic[]>([]);
  const [categories,setCategories] =useState<string[]>([]);
  const [selectedCategory,setselectedCategory] =useState<string>("All");
  const[searchquery,setsearchquery] =useState<string>("")
  const [searchResult,setsearchResult] =useState<Pic[]>([]);
  const [error,seterror] =useState();

////////
useEffect(()=>{
axios.get<Pic[]>("https://frontend-gallery.darkube.app/api/photos").then((res)=>setPics(res.data)).catch((error)=>{seterror(error.massage);})
},[]);

/////////
useEffect(()=>{
  axios.get<string[]>("https://frontend-gallery.darkube.app/api/categories").then((result)=>setCategories(result.data)).catch((error)=>{seterror(error.massage);})
  },[]);




    useEffect(()=>{
      axios.get<Pic[]>("https://frontend-gallery.darkube.app/api/photos",{
        params:{
          search:searchquery,
        }
      }).then((result)=>setsearchResult(result.data)).catch((error)=>{seterror(error.massage);})
      },[searchquery]);


//set serch handle
    /*  const searchHandle=(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filterPics =pics.filter((pic)=>{
          pic.category.includes(searchquery)||pic.photographer.includes(searchquery)||pic.alt.includes(searchquery);
        });*/

 //setsearchResult(filterPics)

      //
  return (
<div>

  {categories.map(category=>(
    <button key={category}
    onClick={()=>setselectedCategory(category)}
    className={selectedCategory===category ? "selected" : ""}>
      {category}
      
    </button>
  ))}

<form>
<input type="text" name="seacrh-input" id="seacrh-input" value={searchquery} onChange={(x)=>setsearchquery(x.target.value)}/>
<button  >submit</button>
</form>


  <ul className='ulDesign'>
  {searchResult.map((pic)=>(
  <li key={pic.id} ><img src={pic.url} alt={pic.alt}  /></li>))}

{pics.filter(pics=>!selectedCategory||pics.category===selectedCategory  ).map(pics=>(
  <li key={pics.id} ><img src={pics.url} alt={pics.alt}  /></li>
))}
</ul>


</div>  )
}


