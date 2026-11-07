import { ItemsProvider } from "@/context/ItemsContext"
import ItemForm from "@/components/ItemForm"
import Search from "@/components/Search"
import ItemTable from "@/components/ItemTable"
import ItemPagination from "@/components/ItemPagination"

export default function App() {
  return (
    <ItemsProvider>
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">CRUD приложение</h1>
        <ItemForm />
        <Search />
        <ItemTable />
        <ItemPagination />
      </div>
    </ItemsProvider>
  )
}
