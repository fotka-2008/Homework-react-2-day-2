import { useContext } from "react"
import { ItemsContext } from "@/context/ItemsContext"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ItemTable() {
  const { state, dispatch } = useContext(ItemsContext)

  const filtered = state.items.filter((item) =>
    item.title.toLowerCase().includes(state.search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / 5))
  const page = Math.min(state.page, totalPages)
  const pageItems = filtered.slice((page - 1) * 5, page * 5)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Название</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pageItems.map((item) => (
          <TableRow
            key={item.id}
            className={state.selected.includes(item.id) ? "bg-blue-100 hover:bg-blue-100" : ""}
          >
            <TableCell>
              <Checkbox
                checked={state.selected.includes(item.id)}
                onCheckedChange={() => dispatch({ type: "TOGGLE", id: item.id })}
              />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch({ type: "START_EDIT", item: item })}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => dispatch({ type: "DELETE", id: item.id })}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {pageItems.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Ничего не найдено
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
