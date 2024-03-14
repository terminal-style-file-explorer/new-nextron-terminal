import { termContext } from "../Terminal";
import { useContext } from "react";
export function Mail(){
    const { arg ,CmdHistory} = useContext(termContext);
    return (
        <h1>mail</h1>
    )
}
