import React, {SFC} from 'react';

export type TweetProps = {
    profilePicture?: string;
    name: string;
    twitterHandle: string;
    date: string;
    tweetContent: string;
}

export const Tweet: SFC<TweetProps> = ({profilePicture="defaultPicture", name, twitterHandle, date, tweetContent}) => {
    return (
        <div className="Tweet">
            <img className="Tweet-profilePicture" alt={`${name}'s profile`}/>
            <h3 className="Tweet-name">{name}</h3>
            <p className="Tweet-name">{name}</p>
            <p className="Tweet-twitterHandle">{name}</p>
            <p className="Tweet-date">{name}</p>
            <p className="Tweet-tweetContent">{tweetContent}</p>
        </div>
    )
}

export default Tweet