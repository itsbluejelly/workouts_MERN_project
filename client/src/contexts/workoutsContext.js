// IMPORTING NECESSARY MODULES
import React from 'react'

// CREATE A SHARABLE CONTEXT
export const WorkoutsContext = React.createContext()

// CREATE A FUNCTION TO EXPORT THE CONTEXT
export default function WorkoutsContextProvider({children}){
    return(
        <WorkoutsContext.Provider>
            {children}
        </WorkoutsContext.Provider>
    )
}