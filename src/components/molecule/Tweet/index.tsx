import React, {SFC} from 'react';
import { CgProfile } from 'react-icons/cg'
import './Tweet.css'
import { useDrag, DragSourceMonitor } from 'react-dnd'

export const DRAG_TYPE = 'TWEET';
export const STORAGE_KEY = 'TWEETS'

export type TweetProps = {
    profilePicture?: string;
    name: string;
    twitterHandle: string;
    date: string;
    tweetContent: string;
    id: number;
}

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
                    {date && <p className="Tweet-date">{new Date(date).toLocaleDateString() }</p>}
                </div>
                <p className="Tweet-tweetContent">{tweetContent}</p>
            </div>
        </div>
    )
}
interface DropResult { // TODO Make a generic component wrapper for drag and drop
	allowedDropEffect: string
	dropEffect: string
	name: string
}

interface DragItem {
	name: string
	type: string
}
interface DraggableProps {
	handleDrop?: (Tweet: TweetProps) => void;
}

export type DraggableTweetProps = DraggableProps & TweetProps;

/* Handle muliple Drags and drops of same element */
const DraggableTweet: SFC<DraggableTweetProps> = (props) => {
    const {handleDrop, ...rest} = props
    const item = { name: rest.name, type: DRAG_TYPE }
    const [{ opacity }, drag] = useDrag({
        item,
        end(item: DragItem | undefined, monitor: DragSourceMonitor) {
            const dropResult: DropResult = monitor.getDropResult()
            if (item && dropResult) {
                const isDropAllowed =
                    dropResult.allowedDropEffect === 'any' ||
                    dropResult.allowedDropEffect === dropResult.dropEffect

                if (isDropAllowed) {
                    handleDrop && handleDrop(rest)
                    alert(`You moved ${item.name} into Local Storage!`)
                } else {
                    alert(`You cannot ${dropResult.dropEffect} an item into the loaded Tweets`)
                }
            }
        },
        collect: (monitor: any) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    return (
        <div ref={drag} style={{ opacity }}>
             <Tweet {...rest}/>
        </div>
    )
}

export default DraggableTweet

