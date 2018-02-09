defmodule Memory.Game do
  def new() do
    %{
      vals: resetValues(),
      comp: [],
      sel: [],
      fails: 0
    }
  end

  def resetValues() do
    ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
    |> Enum.shuffle()
  end

  def client_view(game) do
    %{
      vals: hideVals(game),
      comp: game.comp,
      sel: game.sel,
      score: getScore(game)
    }
  end

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

  def getScore(game) do
    (Kernel.length(game.comp) / 2) * 8 - game.fails
  end

  def match(game) do
    if Enum.at(game.vals, Enum.at(game.sel, 0)) ==
      Enum.at(game.vals, Enum.at(game.sel, 1)) do
      %{
        vals: game.vals,
        comp: Enum.concat(game.comp, game.sel),
        sel: [],
        fails: game.fails
      }
    else
      %{
        vals: game.vals,
        comp: game.comp,
        sel: [],
        fails: game.fails + 1
      }
    end
  end

  def select(game, current) do
    cond do
      Enum.member?(game.comp, current) -> game

      Enum.member?(game.sel, current) -> game

      Kernel.length(game.sel) == 2 -> game

      Kernel.length(game.sel) == 1 ->
        %{
          vals: game.vals,
          comp: game.comp,
          sel: Enum.concat(game.sel, [current]),
          fails: game.fails
        }

      Kernel.length(game.sel) == 0 ->
        %{
          vals: game.vals,
          comp: game.comp,
          sel: [current],
          fails: game.fails
        }
    end
  end

end
