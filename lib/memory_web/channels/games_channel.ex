defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  alias Memory.Game

  # creates/loads and sends the appropriate view state when channel is joined
  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.GameBackup.load(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # returns an updated view state when a "select" message is received
  def handle_in("select", %{"index" => ii}, socket) do
    game = Game.select(socket.assigns[:game], ii)
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # returns an updated view state when a "match" message is received
  def handle_in("match", %{}, socket) do
    game = Game.match(socket.assigns[:game])
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # returns an updated view state when a "reset" message is received
  def handle_in("reset", %{}, socket) do
    game = Game.new()
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
