class CleanupExpiredRewardsJob < ApplicationJob
  queue_as :default

  def perform
    # Archive rewards whose end_date has passed
    expired_rewards = Reward.where("end_date < ? AND archived = ?", Date.today, false)
    count = expired_rewards.count
    
    if count > 0
      expired_rewards.update_all(archived: true, active: false)
      Rails.logger.info "CleanupExpiredRewardsJob: Archived #{count} expired rewards."
    end
    
  end
end
