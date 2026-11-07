import { useContext } from "react"
import type { FormEvent } from "react"
import { ItemsContext } from "@/context/ItemsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ItemForm() {
  const { state, dispatch } = useContext(ItemsContext)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (state.text.trim() === "") return
    if (state.editId === null) {
      dispatch({ type: "ADD" })
    } else {
      dispatch({ type: "SAVE_EDIT" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Название"
        value={state.text}
        onChange={(e) => dispatch({ type: "SET_TEXT", text: e.target.value })}
      />
      <Button type="submit">
        {state.editId === null ? "Добавить" : "Сохранить"}
      </Button>
    </form>
  )
}
