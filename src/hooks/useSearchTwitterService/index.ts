import { useEffect, useState } from 'react'
import { Service } from '../../types/Service'
import { Tweet } from '../../types/TwitterPosts'

const useSearchTwitterPosts = (searchString: string) => {
  const [result, setResult] = useState<Service<Tweet[]>>({
    status: 'init'
  });

  
const amountToFetch = 10
  useEffect(() => {
    const fetchData = async () => {
      // You can await here
        setResult({ status: 'loading' });
        try{
          const response = await fetch(`http://localhost:8080/twitter-search?q=${searchString}&count=${amountToFetch}'`, {
            // fetch(`https://yiy212fb2d.execute-api.us-east-1.amazonaws.com/Live/twitter-search?q=${searchString}&count=${amountToFetch}'`, {
              headers: {
                'Content-Type': 'application/json',
              }
            })
          const responseJson = await response.json()

          if(responseJson.errors) throw new Error(responseJson.errors[0] || 'Error making the api request')
          if(responseJson.statuses) setResult({ status: 'loaded', payload: responseJson.statuses })
          else setResult({ status: 'loaded', payload: responseJson })
        } catch(error) {
          setResult({ status: 'error', error })
        }
      }
    if(searchString) {
      fetchData();
    }
  }, [searchString]);

  return result;
};

export default useSearchTwitterPosts;