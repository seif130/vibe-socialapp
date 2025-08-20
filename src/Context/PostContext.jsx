import axios from "axios";
import { createContext } from "react";

 export let PostContext = createContext()

 export default function PostContextProvider(props){


    function getallposts(){

     return   axios.get('https://linked-posts.routemisr.com/posts?limit=50' , {
              headers : {
                token : localStorage.getItem('usertoken')
            }
        }
          
        )
        .then((res)=>{
            return res.data.posts;
        })
        .catch((err)=> {
            return err;
        })
    }

return <PostContext.Provider  value={{getallposts}}>
    {props.children}
</PostContext.Provider>
 }