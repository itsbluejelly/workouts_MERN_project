// IMPORT NECESSARY MODULES
import React from "react";
import { WorkoutsContext } from "../contexts/workoutsContext";

// CREATING A FUNCTION THAT ALLOWS ONE TO USE CONTEXT
export default function workoutsContextHook(){
    const context = React.useContext(WorkoutsContext)
    
    try{
        if(!context){
            throw new Error("Sry, context out of reach")
        }else{
            return context
        }
    }catch(error){
        console.log({[error.name]: error.message })
    }
}