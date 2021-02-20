import React, {SFC} from 'react';
import Page from '../../components/molecule/Page'
import Input from '../../components/atom/Input'
import Tweet from '../../components/molecule/Tweet'

export const SaverPage: SFC<{}> = () => {
    return (
        <div className="Saver-Page">
            <Page headerText="Tweet Saver">
                <Input type="input" name="Tweet-Search" onChange={(e) => {
                    console.log(e.target.value)
                }} />
                <div className="Tweet-Container">
                    <Tweet name="Full Name" twitterHandle="@twitterHandle"  date="date" tweetContent="this is a tweet"/>
                </div>
            </Page>
        </div>
    )
}

export default SaverPage