
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Feed from './Feed'



const InstaFeeds = (props) => {
    const [feeds, setFeedsData] = useState([])
    //use useRef to store the latest value of the prop without firing the effect
    // const tokenProp = useRef(token);
    // tokenProp.current = token;
    const token = props.token;
    const igid= "715217239638739";
    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchInstagramPost () {
          try{
            axios
                .get(`https://graph.facebook.com/v13.0/${igid}?fields=id,username,media_type,media_url,caption&access_token=${token}`)
                .then((resp) => {
                    setFeedsData(resp.data.data);
                    console.log(resp.data.username);
                })
          } catch (err) {
              console.log('error', err)
          }
        }
        
        // manually call the fecth function 
        fetchInstagramPost();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [])

    return (
        <div className="container">
            {feeds.map((feed) => (
                <Feed key={feed.id} feed={feed} />
            ))}
        </div>
    );
}

export default InstaFeeds;