class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists, id: false do |t|
      t.primary_key :list_id, :auto_increment => true
      t.integer :user_id
    end
  end
end
