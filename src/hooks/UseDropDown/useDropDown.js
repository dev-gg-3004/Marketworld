import React, { useState } from 'react'

function useDropdown(defaultValue) {

    const [value, setValue] = useState(defaultValue);
    const [errorMessage, setErrorMessage]=useState("");
  
    const onSelectDropdown=(item)=>{
      // setErrorMessage(!text && "")
      setValue(item.value)
    }
  
    return {
      value,
      onChange:(item)=>onSelectDropdown(item),
      errorMessage,
      setErrorMessage,
      setValue
    }
  }
  
  export default useDropdown