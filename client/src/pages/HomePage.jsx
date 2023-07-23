// IMPORTING THE NECESSARY MODULES AND COMPONENTS
import React from "react"
import Workout from '../components/Workout'

export default function HomePage() {
    // A VARIABLE TO SET THE FETCHED WORKOUTS DATA
    const [fetchedWorkouts, setFetchedWorkouts] = React.useState([])

    // AN ASYNC FUNCTION TO GET WORKOUTS FROM REST API SERVER
    async function getWorkouts(){
        const response = await fetch('http://localhost:4000/workouts')
        const obtainedWorkouts = await response.json()

        try{
            if(response.ok){
                setFetchedWorkouts(obtainedWorkouts)
            }else{
                throw new Error("Cannot fetch data")
            }
        }catch(error){
            console.log({[error.name]: error.message})
        }
    }

    // A USEEFFECT HOOK TO LOAD THE FETCHEDWORKOUTS DATA ONLY ON THE FIRST LOAD OF THE PAGE
    React.useEffect(() => getWorkouts, [])
    
    return (
        <div className="homePage pages">
            {fetchedWorkouts && fetchedWorkouts.map(
                fetchedWorkout => (
                    <Workout
                        key={fetchedWorkout._id}
                        workout={fetchedWorkout}
                    />
                )
            )}
        </div>
    );
}