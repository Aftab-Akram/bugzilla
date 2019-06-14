class AddDeadlineToBug < ActiveRecord::Migration[5.2]
  def change
    add_column :bugs, :deadline, :date
    add_column :bugs, :feature_type, :integer
  end
end
