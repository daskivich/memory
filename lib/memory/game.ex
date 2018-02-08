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

  def select(game, index) do
    IO.puts("index: " <> Integer.to_string(index))
    
    cond do
      Enum.member?(game.comp, index) -> game
      Enum.member?(game.sel, index) -> game
      Kernel.length(game.sel) == 2 -> game
      Kernel.length(game.sel) == 1 ->
        if game.sel[0] == index do
          %{
            vals: game.vals,
            comp: Enum.concat(game.comp, [game.sel[0], index]),
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
          sel: [index],
          fails: game.fails
        }
    end
  end

end
