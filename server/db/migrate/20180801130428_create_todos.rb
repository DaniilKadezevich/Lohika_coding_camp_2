class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos, id: false do |t|
      t.primary_key :todo_id, :auto_increment => true
      t.integer :list_id
      t.text :todo_text
      t.boolean :todo_done
    end
  end
end
