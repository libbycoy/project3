class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.boolean :answer

      t.timestamps null: false
    end
  end
end
