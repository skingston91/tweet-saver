import { useEffect, useState } from 'react'
import { Service } from '../../types/Service'
import { Tweet } from '../../types/TwitterPosts'

const useSearchTwitterPosts = (searchString: string) => {
  const [result, setResult] = useState<Service<Tweet[]>>({
    status: 'init'
  });

  
const amountToFetch = 10
  useEffect(() => {
    if(searchString) {
      setResult({ status: 'loading' });
      fetch(`http://localhost:8080/twitter-search?q=${searchString}&count=${amountToFetch}'`, {
      // fetch(`https://yiy212fb2d.execute-api.us-east-1.amazonaws.com/Live/twitter-search?q=${searchString}&count=${amountToFetch}'`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANTMMwEAAAAALkgzd3eXE95jcu3G2GXwLu%2FWGbU%3DiDwNE6K9fcUjH6zNcmRZeUsPmb0KfGutb38SCIbbNxJHOMH4t0",
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response.statuses) setResult({ status: 'loaded', payload: response.statuses })
        else setResult({ status: 'loaded', payload: response })
      })
      .catch(error => setResult({ status: 'error', error }));
    }
  }, [searchString]);
  return result;
};

export default useSearchTwitterPosts;