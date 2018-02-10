defmodule Memory.GameBackup do
  use Agent

# patterened the code for this module
# off of Prof. Tuck's Hangman.GameBackup module
# https://github.com/NatTuck/hangman2/blob/proc-state/lib/hangman/game_backup.ex

  # starts an Agent process to store the current state of various games
  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  # saves the state of the given game to the Agent process for later retrieval
  def save(name, game) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, name, game)
    end
  end

  # loads the saved state for the given game from the Agent process
  def load(name) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, name)
    end
  end
end
