class MakeBonusDefinitionOptionalOnPendingBonuses < ActiveRecord::Migration[8.1]
  def change
    change_column_null :pending_bonuses, :bonus_definition_id, true
  end
end
