import React from "react";
import { useContext } from "react";
import { termContext } from "./Terminal";


export function SetResult(input:string,resultHistory:string[],setResuleHistory:React.Dispatch<React.SetStateAction<string[]>>){
    setResuleHistory([...resultHistory,input])

}