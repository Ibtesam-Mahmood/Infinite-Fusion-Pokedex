import { createBrowserRouter, Navigate } from "react-router-dom"
import PokemonDetailsPage from "../../pages/PokemonDetailsPage";
import PokemonListPage from "../../pages/PokemonListPage"

const router = createBrowserRouter([
    {
        path: "/poke-fusion-dex",
        element: <PokemonListPage />,
    },
    {
        path: "/poke-fusion-dex/pokemon/:id",
        element: <PokemonDetailsPage />,
    },
    {
        path: "*",
        element: <Navigate to="/poke-fusion-dex" replace />,
    },
])

export default router;