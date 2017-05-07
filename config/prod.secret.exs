use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :chat, Chat.Endpoint,
  secret_key_base: "eklgKSepWwTD5kNexRvbqMZMBKQVHdIDJR7K66rgDumC2kNF5X5leLFecfPfvpvD"

# Configure your database
config :chat, Chat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "chat_prod",
  pool_size: 20
