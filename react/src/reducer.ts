export type Item = {
  id: number
  title: string
}

export type State = {
  items: Item[]
  text: string
  editId: number | null
  search: string
  selected: number[]
  page: number
  nextId: number
}

export type Action =
  | { type: "SET_TEXT"; text: string }
  | { type: "ADD" }
  | { type: "START_EDIT"; item: Item }
  | { type: "SAVE_EDIT" }
  | { type: "DELETE"; id: number }
  | { type: "SET_SEARCH"; search: string }
  | { type: "TOGGLE"; id: number }
  | { type: "SET_PAGE"; page: number }

export const initialState: State = {
  items: [
    { id: 1, title: "Яблоко" },
    { id: 2, title: "Банан" },
    { id: 3, title: "Апельсин" },
    { id: 4, title: "Груша" },
    { id: 5, title: "Виноград" },
    { id: 6, title: "Киви" },
    { id: 7, title: "Манго" },
    { id: 8, title: "Ананас" },
    { id: 9, title: "Персик" },
    { id: 10, title: "Слива" },
    { id: 11, title: "Вишня" },
    { id: 12, title: "Арбуз" },
  ],
  text: "",
  editId: null,
  search: "",
  selected: [],
  page: 1,
  nextId: 13,
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.text }
    case "ADD":
      return {
        ...state,
        items: [...state.items, { id: state.nextId, title: state.text }],
        nextId: state.nextId + 1,
        text: "",
      }
    case "START_EDIT":
      return { ...state, editId: action.item.id, text: action.item.title }
    case "SAVE_EDIT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.editId ? { ...item, title: state.text } : item
        ),
        editId: null,
        text: "",
      }
    case "DELETE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
        selected: state.selected.filter((id) => id !== action.id),
        editId: state.editId === action.id ? null : state.editId,
        text: state.editId === action.id ? "" : state.text,
      }
    case "SET_SEARCH":
      return { ...state, search: action.search, page: 1 }
    case "TOGGLE":
      return {
        ...state,
        selected: state.selected.includes(action.id)
          ? state.selected.filter((id) => id !== action.id)
          : [...state.selected, action.id],
      }
    case "SET_PAGE":
      return { ...state, page: action.page }
    default:
      return state
  }
}
