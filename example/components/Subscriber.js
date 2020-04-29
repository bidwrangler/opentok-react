import React from 'react';

import { SubscriberConsumer} from './SubscriberContext'

export default function Subscriber({ label, play }) {
  return (
    <div>
      <button onClick={play}>Play now</button>
      { label }
    </div>
  )
}