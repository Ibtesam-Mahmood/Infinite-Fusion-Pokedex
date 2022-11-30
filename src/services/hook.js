import usePokemonHook from './hooks/usePokemon';
import useLoadPokemonHook from './hooks/useLoadPokemon';
import useMovesHook from './hooks/useMoves';
import useAbilitiesHook from './hooks/useAbilities';
import useEvolutionChainHook from './hooks/useEvolutionChain';
import usePokemonSpeciesHook from './hooks/usePokemonSpecies';
import usePokemonBySpeciesHook from './hooks/usePokemonBySpecies';

export const usePokemon = usePokemonHook;
export const useLoadPokemon = useLoadPokemonHook;
export const useEvolutionChain = useEvolutionChainHook;
export const useSpecies = usePokemonSpeciesHook;
export const usePokemonBySpecies = usePokemonBySpeciesHook;
export const useMoves = useMovesHook;
export const useAbilities = useAbilitiesHook;