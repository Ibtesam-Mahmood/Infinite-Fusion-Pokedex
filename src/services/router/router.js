import { createBrowserRouter } from "react-router-dom"
import PokemonListPage from "../../pages/PokemonListPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <PokemonListPage />,
    },
    {
        path: "/pokemon/:id",
        element: <PokemonListPage />,
    },
])

export default router;