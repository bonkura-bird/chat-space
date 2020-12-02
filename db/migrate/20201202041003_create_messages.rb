class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :body
      t.string :image
      t.refernces :user, foreign_key: true
      t.refernces :group, foreign_key: true
      t.timestamps
    end
  end
end
