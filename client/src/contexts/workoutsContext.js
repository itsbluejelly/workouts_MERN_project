// IMPORTING NECESSARY MODULES
import React from 'react'

// CREATE A SHARABLE CONTEXT
export const WorkoutsContext = React.createContext()

//CREATING A FUNCTION TO KEEP TRACK OF CHANGES WITHIN THE STATE VALUE
export function workoutsReducer(state, action){
    switch(action.type){
        case "SET_WORKOUTS":
            return { workouts: action.payload }
        case "CREATE_WORKOUT":
            return { workouts: [action.payload, ...state.workouts]}
        case "DELETE_WORKOUT":
            const actionId = action.payload._id
            
            return { workouts: state.workouts.filter(
                workout => workout._id !== actionId
            )}
        default:
            return state
    }
} 

// CREATE A FUNCTION TO EXPORT THE CONTEXT
export default function WorkoutsContextProvider({children}){
    const [state, dispatch] = React.useReducer(workoutsReducer, { workouts: null })

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}