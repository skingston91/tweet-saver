import React, {SFC, ReactNode} from 'react';
import Tweet, {TweetProps} from '../../molecule/Tweet'
import {Tweet as TweetType} from '../../../types/TwitterPosts'
import './Tweet-Container.css'
export type TweetContainerProps = {
    tweets?: TweetType[] | undefined
  }

export const Page: SFC<TweetContainerProps> = ({tweets}) => {
    const reformattedTweets = tweets && tweets.map((tweet: TweetType)  => {
        return {
            name: tweet.user.name,
            twitterHandle: tweet.user.screen_name,
            date: tweet.created_at,
            tweetContent: tweet.text,
        }
    });
    return (
        <div className="Tweet-Container">
            {reformattedTweets && reformattedTweets.map((tweet) => {
                return <Tweet {...tweet}/>
            })}
        </div>
    )
}

export default Page