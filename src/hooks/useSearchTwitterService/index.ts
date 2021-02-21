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
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response.errors)
        if(response.errors) throw new Error(response.errors[0] || 'Error making the api request')
        if(response.statuses) setResult({ status: 'loaded', payload: response.statuses })
        else setResult({ status: 'loaded', payload: response })
      })
      .catch(error => setResult({ status: 'error', error }));
    }
  }, [searchString]);
  return result;
};

export default useSearchTwitterPosts;