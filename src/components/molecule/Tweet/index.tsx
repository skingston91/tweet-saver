import React, {SFC} from 'react';
import { CgProfile } from 'react-icons/cg'
import './Tweet.css'

export type TweetProps = {
    profilePicture?: string;
    name: string;
    twitterHandle: string;
    date: string;
    tweetContent: string;
} | undefined

export const Tweet: SFC<TweetProps> = ({profilePicture, name, twitterHandle, date, tweetContent}) => {
    return (
        <div className="Tweet">
            {profilePicture && <img className="Tweet-profilePicture" alt={`${name}'s profile`}/>}
            {!profilePicture && <div className="Tweet-profilePicture"><CgProfile/></div>}
            <div className="Tweet-content-right">
                <div className="Tweet-TopBar">
                    <div className="Tweet-TopBar-names">
                        <h3 className="Tweet-name">{name}</h3>
                        <p className="Tweet-twitterHandle">{twitterHandle}</p>
                    </div>
                    <p className="Tweet-date">{new Date(date).toLocaleDateString() }</p>
                </div>
                <p className="Tweet-tweetContent">{tweetContent}</p>
            </div>
        </div>
    )
}

export default Tweet