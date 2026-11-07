import { createContext, useReducer } from "react"
import type { ReactNode, Dispatch } from "react"
import { reducer, initialState } from "@/reducer"
import type { State, Action } from "@/reducer"

type ContextType = {
  state: State
  dispatch: Dispatch<Action>
}

export const ItemsContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
})

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  )
}
