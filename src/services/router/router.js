import { createBrowserRouter } from "react-router-dom"
import PokemonDetailsPage from "../../pages/PokemonDetailsPage";
import PokemonListPage from "../../pages/PokemonListPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <PokemonListPage />,
    },
    {
        path: "/pokemon/:id",
        element: <PokemonDetailsPage />,
    },
])

export default router;