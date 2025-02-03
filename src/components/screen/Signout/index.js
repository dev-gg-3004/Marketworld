import React from 'react'
import { removeItemValue } from '../../../utils/Session'

export default function index({navigation}) {
  return (
    removeItemValue("memberData")
    {()=> navigation.navigate('signup')}
  )
}

