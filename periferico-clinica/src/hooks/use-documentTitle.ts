import { useEffect } from "react";
import { setDocumentTitle } from "../utils";


export function useDocumentTitle(title:string, suffix='Periférico'){
 useEffect(()=>{
    setDocumentTitle(title,suffix)
 },[title,suffix])
}