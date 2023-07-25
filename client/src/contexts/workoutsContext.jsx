// IMPORTING NECESSARY MODULES
import React from 'react'

// CREATE A SHARABLE CONTEXT
export const WorkoutsContext = React.createContext()

//CREATING A FUNCTION TO KEEP TRACK OF CHANGES WITHIN THE STATE VALUE
export function workoutsReducer(state, action){
    switch(action.type){
        case "SET_WORKOUTS":
            return { fetchedWorkouts: action.payload }
        case "CREATE_WORKOUT":
            return { fetchedWorkouts: [action.payload, ...state.fetchedWorkouts]}
        case "DELETE_WORKOUT":
            return { fetchedWorkouts: state.fetchedWorkouts.filter(
                workout => workout._id !== action.payload._id
            )}
        default:
            return state
    }
} 

// CREATE A FUNCTION TO EXPORT THE CONTEXT
export default function WorkoutsContextProvider({children}){
    const [state, dispatch] = React.useReducer(workoutsReducer, { fetchedWorkouts: null })

    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}