import { useContext } from "react"
import { ItemsContext } from "@/context/ItemsContext"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ItemPagination() {
  const { state, dispatch } = useContext(ItemsContext)

  const filtered = state.items.filter((item) =>
    item.title.toLowerCase().includes(state.search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / 5))
  const page = Math.min(state.page, totalPages)

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  function goTo(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return
    dispatch({ type: "SET_PAGE", page: newPage })
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Назад"
            onClick={(e) => {
              e.preventDefault()
              goTo(page - 1)
            }}
          />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => {
                e.preventDefault()
                goTo(p)
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            text="Вперёд"
            onClick={(e) => {
              e.preventDefault()
              goTo(page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
