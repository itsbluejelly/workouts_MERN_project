// IMPORTING THE NECESSARY MODULES AND COMPONENTS
import React from "react"
import Workout from '../components/Workout'
import WorkoutForm from "../components/WorkoutForm"

export default function HomePage() {
    // A VARIABLE TO SET THE FETCHED WORKOUTS DATA
    const [fetchedWorkouts, setFetchedWorkouts] = React.useState([])
    const [error, setError] = React.useState('')

    // A VARIABLE OBJECT TO SET INITIAL VALUES OF INPUT FIELDS
    const [formData, setFormData] = React.useState({
        title: "",
        load: 0,
        reps: 0
    })

    // A FUNCTION TO UPDATE CHANGE OF FORM DATA FIELDS
    function handleChange(e){
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))
    }

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

    
    //AN ASYNC FUNCTION TO HANDLE FORM SUBMISSION
    async function handleSubmit(e){
        e.preventDefault()

        const response = await fetch('http://localhost:4000/workouts', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const data = await response.json()

        if(!response.ok){
            setError(data.error)
        }else{
            setError('')
            
            setFormData(prevFormData => ({
                ...prevFormData,
                title: "",
                load: 0,
                reps: 0
            }))
            
            setError(data.success)
        }
    } 

    // A USEEFFECT HOOK TO LOAD THE FETCHEDWORKOUTS DATA ONLY ON THE FIRST LOAD OF THE PAGE
    React.useEffect(() => getWorkouts, [])

    // A FUNCTION TO GENERATE A LIST OF COMPONENTS
    function generateListOfWorkoutComponents(){
        return(
            fetchedWorkouts.map(
                fetchedWorkout => (
                    <Workout
                        key={fetchedWorkout._id}
                        workout={fetchedWorkout}
                    />
                )
            )
        )
    }
    
    return (
        <div className="pages">
            {generateListOfWorkoutComponents()}
            
            <WorkoutForm
                error={error}
                formData={formData}
                handleChange={(e) => handleChange(e)}
                handleSubmit={(e) => handleSubmit(e)}
            />
            
        </div>
    );
}