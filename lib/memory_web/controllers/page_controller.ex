defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  # renders the index page
  def index(conn, _params) do
    render conn, "index.html"
  end

  # renders a game page
  def game(conn, params) do
    render conn, "game.html", game: params["game"]
  end
end
