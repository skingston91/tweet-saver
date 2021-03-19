import React, {FC} from 'react';
import Tweet, {TweetProps, DRAG_TYPE} from '../../molecule/Tweet'

import './Tweet-Container.css'
import { useDrop } from 'react-dnd';
export type TweetContainerProps = {
    tweets: TweetProps[];
    handleDrop?: (Tweet: TweetProps) => void;
  }

export const TweetContainer: FC<TweetContainerProps> = ({tweets, ...rest}) => (
    <div className="Tweet-Container">
        {tweets && tweets.map((tweet) => <Tweet key={tweet.id}{...tweet} {...rest}/>)}
    </div>
)

interface DroppableProps {
	allowedDropEffect?: string;
}

type DroppableTweetProps = DroppableProps & TweetContainerProps;

export const DroppableTweetContainer: FC<DroppableTweetProps> = ({ allowedDropEffect, ...rest }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      // The type (or types) to accept - strings or symbols
      accept: DRAG_TYPE,
      drop: () => ({
        name: `${allowedDropEffect} Dustbin`,
        allowedDropEffect,
    }),
      // Props to collect
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    })
    if(!allowedDropEffect) return <TweetContainer {...rest}/>
    const isActive = canDrop && isOver
    return (
      <div
        ref={drop}
        style={{ backgroundColor: isActive ? 'red' : 'white', width: '100%' }}
        className="DroppableTweetContainer"
      >
        <TweetContainer {...rest}/>
      </div>
    )
  }



export default DroppableTweetContainer