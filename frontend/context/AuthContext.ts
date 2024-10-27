import { createContext,useContext } from "react";
import {RecoilRoot ,atom,useSetRecoilState } from 'recoil'

export type GlobalContent = {
    status: boolean
    setStatus:(c: boolean) => void
  }
  export const MyGlobalContext = createContext<GlobalContent>({
    status: false, // set a default value
    setStatus: () => {},
    })

export const useGlobalContext = () => useContext(MyGlobalContext)