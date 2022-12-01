import { createBrowserRouter, Navigate } from "react-router-dom"
import PokemonDetailsPage from "../../pages/PokemonDetailsPage";
import PokemonListPage from "../../pages/PokemonListPage"
import PokemonFusionPage from "../../pages/PokemonFusionPage"
import AboutPage from "../../pages/AboutPage"

const router = createBrowserRouter([
    {
        path: "/poke-fusion-dex",
        element: <PokemonListPage />,
    },
    {
        path: "/poke-fusion-dex/fuse",
        element: <PokemonFusionPage />,
    },
    {
        path: "/poke-fusion-dex/about",
        element: <AboutPage />,
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