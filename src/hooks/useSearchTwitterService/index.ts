import { useState} from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { Service } from '../../types/Service'
import { Tweet } from '../../types/TwitterPosts'
import { useAsync } from 'react-async-hook';



const useSearchTwitterPosts = (searchString: string) => {
  const [result, setResult] = useState<Service<Tweet[]>>({
    status: 'init'
  });
  const amountToFetch = 10


  const fetchData = async (searchString: string) => {
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

    const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(fetchData, 300));
    useAsync(async () => {
        if (searchString.length === 0) {} 
        else {
          debouncedSearchFunction(searchString);
        }
      },
      [debouncedSearchFunction, searchString]
    )
  return result;
};

export default useSearchTwitterPosts;