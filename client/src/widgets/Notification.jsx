import React, { useState } from 'react'

import { BiError, BiCheck } from 'react-icons/bi'

const Notification = ({ notification }) => {
    

    if(notification.content === null) {
        return null;
    }
    return (
        <>
            <div className={notification.type === 'success' ? 'notification success' : 'notification error'}>
                { notification.type === 'success' ? <BiCheck /> : <BiError /> }
                { notification.content }
            </div>
        </>
    )
}

export default Notification
