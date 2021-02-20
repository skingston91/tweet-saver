import React, {SFC, useState} from 'react';
import Page from '../../components/molecule/Page'
import Input from '../../components/atom/Input'
import TweetContainer from '../../components/organism/Tweet-Container'
import useSearchTwitterPosts from '../../hooks/useSearchTwitterService'
import {BiSearchAlt2} from 'react-icons/bi'
import {CgArrowRight} from 'react-icons/cg'
import './SaverPage.css'

export const SaverPage: SFC<{}> = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const service = useSearchTwitterPosts(searchTerm);
    service.status === 'loaded' ? console.log(service.payload) : console.log(service)
    const tweets = service.status === 'loaded' && searchTerm ? service.payload : []
    return (
        <div className="Saver-Page">
            <Page headerText="Tweet Saver">
                <div className="Saver-Page--Top-Bar">
                    <div className="Saver-Page--Search-Container">
                        <Input className="Saver-Page--Search-Container-Input"type="input" name="Tweet-Search" onChange={(e) => {
                            const value = e.target.value
                            // debounce the request 
                            setSearchTerm(value)
                        }} />
                        <div className="Saver-Page--Search-Container-Icon">
                            <BiSearchAlt2/>
                        </div>
                    </div>
                    <h2 className="Saver-Page--Saved-Header">Saved Tweets</h2>
                </div>
                {service && service.status === 'init' && <p>Please enter some text to start</p> }
                {service && service.status === 'loading' && <div>Loading...</div>}
                <div className="Saver-Page--Tweet-Container-Wrapper">
                        {service && service.status === 'error' && (
                            <div>Error loading the request, sorry!</div>
                        )}
                        <TweetContainer tweets={tweets}/>
                        <div className="Saver-Page--Tweet-Container-Wrapper-Guidence">
                                <p> Drag Tweets</p>
                                <CgArrowRight/>
                                <p>to save</p>
                            </div>
                        <TweetContainer tweets={tweets}/>
                    </div>
                </Page>
        </div>
    )
}

export default SaverPage