import { useContext } from "react"
import { ItemsContext } from "@/context/ItemsContext"
import { Input } from "@/components/ui/input"

export default function Search() {
  const { state, dispatch } = useContext(ItemsContext)

  return (
    <Input
      placeholder="Поиск..."
      value={state.search}
      onChange={(e) => dispatch({ type: "SET_SEARCH", search: e.target.value })}
    />
  )
}
