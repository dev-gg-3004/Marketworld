import React from 'react'
import { getSession } from '../../../utils/Session'

export default function PrivateRoute(props,{navigation}) {
    return (
        <>
            { getSession() ? (props.component ): ( navigation.navigate('loginNew'))}
        </>
    )
}
