import React, {SFC, useState} from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Page from '../../components/molecule/Page'
import Input from '../../components/atom/Input'
import TweetContainer from '../../components/organism/Tweet-Container'
import {STORAGE_KEY} from '../../components/molecule/Tweet'
import useSearchTwitterPosts from '../../hooks/useSearchTwitterService'
import {getLocalKey, setLocalKey} from '../../utils/localStorage'
import {BiSearchAlt2} from 'react-icons/bi'
import {CgArrowRight} from 'react-icons/cg'
import './SaverPage.css'
import { Tweet } from '../../types/TwitterPosts';

export const SaverPage: SFC<{}> = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [localStorageTweets, setLocalStorageTweets] = useState(getLocalKey(STORAGE_KEY) || [] )
    const service = useSearchTwitterPosts(searchTerm);
    service.status === 'loaded' ? console.log(service.payload) : console.log(service)
    const tweets = service.status === 'loaded' && searchTerm ? service.payload : []
    const reformattedTweets = tweets && tweets.map((tweet: Tweet)  => {
        return {
            name: tweet.user.name,
            twitterHandle: tweet.user.screen_name,
            date: tweet.created_at,
            tweetContent: tweet.text,
            id: tweet.id,
        }
    });
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="Saver-Page">
                <Page headerText="Tweet Saver">
                    <div className="Saver-Page--Top-Bar">
                        <div className="Saver-Page--Search-Container">
                            <Input className="Saver-Page--Search-Container-Input" type="input" name="Tweet-Search" 
                                placeholder="Search Twitter"
                                onChange={(e) => {
                                    const value = e.target.value
                                    // debounce the request 
                                    setSearchTerm(value)
                                }} 
                            />
                            <div className="Saver-Page--Search-Container-Icon">
                                <BiSearchAlt2/>
                            </div>
                        </div>
                        <h2 className="Saver-Page--Saved-Header">Saved Tweets</h2>
                    </div>
                    <div className="Saver-Page--Search-Status">
                        {service && service.status === 'init' && <p>Please enter some text to start</p> }
                        {service && service.status === 'loading' && <div>Loading...</div>}
                        {service && service.status === 'loaded' && <div>Loaded </div>}
                        {service && service.status === 'error' && (
                                <div>Error loading the request, sorry!</div>
                            )}
                    </div>
                    <div className="Saver-Page--Tweet-Container-Wrapper">
                            <TweetContainer
                                tweets={reformattedTweets}
                                handleDrop={(tweet) => {
                                    console.log(tweet)
                                    setLocalKey(STORAGE_KEY, [tweet])
                                    // Could be a merge and retrive new value
                                    setLocalStorageTweets(getLocalKey(STORAGE_KEY))
                                }}
                            />
                            <div className="Saver-Page--Tweet-Container-Wrapper-Guidence">
                                    <p> Drag Tweets</p>
                                    <CgArrowRight/>
                                    <p>to save</p>
                                </div>
                            <TweetContainer 
                                tweets={localStorageTweets}
                                allowedDropEffect="move"
                            />
                        </div>
                    </Page>
            </div>
        </DndProvider>
    )
}

export default SaverPage