class AddIndexToBugsUsers < ActiveRecord::Migration[5.2]
  def change
  	add_index :bugs_users, [ :bug_id, :user_id ], :unique => true
  end
end
