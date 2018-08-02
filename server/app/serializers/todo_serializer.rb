class TodoSerializer < ActiveModel::Serializer
  attributes :id, :todo_id, :list_id, :todo_text, :todo_done
end
