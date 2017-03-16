defmodule Chat.RoomChannel do
  use Chat.Web, :channel
  def join("rooms:general", message, socket) do
    Process.flag(:trap_exit, true)
    send(self, {:after_join, message})
    {:ok, socket}
  end

  def join("rooms:" <> _something_else, _msg, _socket) do
    {:error, %{reason: "can't do this"}}
  end

  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{user: msg["user"]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def terminate(_reason, _socket) do
    :ok
  end

  def handle_in("new:msg", msg, socket) do
    broadcast! socket, "new:msg", %{user: msg["user"], body: msg["body"]}
    {:reply, {:ok, %{msg: msg["body"]}}, assign(socket, :user, msg["user"])}
  end
end
