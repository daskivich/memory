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
    game
  end

  def select(game, current) do
    cond do
      Enum.member?(game.comp, current) -> game

      Enum.member?(game.sel, current) -> game

      Kernel.length(game.sel) == 2 -> game

      Kernel.length(game.sel) == 1 ->
        prev = Enum.at(game.sel, 0)

        if Enum.at(game.vals, prev) == Enum.at(game.vals, current) do
          %{
            vals: game.vals,
            comp: Enum.concat(game.comp, [prev, current]),
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
