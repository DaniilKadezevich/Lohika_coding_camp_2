class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: false do |t|
      t.primary_key :user_id, :auto_increment => true
      t.text :firstName
      t.text :lastName
      t.binary :avatar
      t.integer :list_id
    end
  end
end
