defmodule Memory.Game do
  # game state:
  #   vals: a list of 16 values in random order, 8 pairs from A-H
  #   comp: a list of indexes representing tiles that have been completed
  #   sel: a list of indexes representing tiles that have been selected
  #   fails: the number of failed match attempts, used to calculate game score

  # creates a new game state
  def new() do
    %{
      vals: resetValues(),
      comp: [],
      sel: [],
      fails: 0
    }
  end

  # returns a list of 8 pairs from A-H
  def resetValues() do
    ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
    |> Enum.shuffle()
  end

  # converts a game state into a view state
  # hides all but the selected values
  # calculates the tile color based on completion/selections
  # calculates the score based on the number of completions and fails
  def client_view(game) do
    %{
      vals: hideVals(game),
      colors: getColors(game),
      score: getScore(game)
    }
  end

  # returns a list of display values, hiding letter values
  # for tiles that are not selected
  def hideVals(game) do
    range = 0..(Kernel.length(game.vals) - 1)
    Stream.map(range, fn (i) ->
      if Enum.member?(game.sel, i) do
        Enum.at(game.vals, i)
      else
        ""
      end
    end)
  end

  # returns a list of tile colors based on completion/selection status
  def getColors(game) do
    range = 0..(Kernel.length(game.vals) - 1)
    Stream.map(range, fn (i) ->
      cond do
        Enum.member?(game.comp, i) -> "success"
        Enum.member?(game.sel, i) -> "primary"
        true -> "secondary"
      end
    end)
  end

  # determines the current game score: (matches * 8) - fails
  def getScore(game) do
    (Kernel.length(game.comp) / 2) * 8 - game.fails
  end

  # determines if the two selected tiles from the given game are a match
  # returns the appropriately updated game state
  def match(game) do
    # if the values at the selected indexes match,
    # add the selected indexes to the list of completions
    # and empty the list of selections
    if Enum.at(game.vals, Enum.at(game.sel, 0)) ==
      Enum.at(game.vals, Enum.at(game.sel, 1)) do
      %{
        vals: game.vals,
        comp: Enum.concat(game.comp, game.sel),
        sel: [],
        fails: game.fails
      }
    else # otherwise, empty the list of selections and increment fails
      %{
        vals: game.vals,
        comp: game.comp,
        sel: [],
        fails: game.fails + 1
      }
    end
  end

  # returns an updated game state given the index of a tile just clicked
  def select(game, current) do
    cond do
      # if the user clicked an already completed tile,
      # make no changes to the game state
      Enum.member?(game.comp, current) -> game

      # if the user clicked an already selected tile,
      # make no changes to the game state
      Enum.member?(game.sel, current) -> game

      # if the user clicked to select a third tile,
      # make no changes to the game state
      Kernel.length(game.sel) == 2 -> game

      # otherwise, return an updated game state by adding the selected indexe
      # to the list of selected indexes
      Kernel.length(game.sel) == 1 or Kernel.length(game.sel) == 0 ->
        %{
          vals: game.vals,
          comp: game.comp,
          sel: Enum.concat(game.sel, [current]),
          fails: game.fails
        }
    end
  end
end
