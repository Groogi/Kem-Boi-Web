# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_26_072907) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bonus_definitions", force: :cascade do |t|
    t.boolean "active"
    t.text "conditions"
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "display_order"
    t.integer "points_required"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "bonus_transactions", force: :cascade do |t|
    t.integer "assigned_by_admin_id"
    t.integer "bonus_definition_id", null: false
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "points_amount"
    t.string "transaction_type"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["assigned_by_admin_id"], name: "index_bonus_transactions_on_assigned_by_admin_id"
    t.index ["bonus_definition_id"], name: "index_bonus_transactions_on_bonus_definition_id"
    t.index ["user_id"], name: "index_bonus_transactions_on_user_id"
  end

  create_table "giveaway_entries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "giveaway_id", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["giveaway_id"], name: "index_giveaway_entries_on_giveaway_id"
    t.index ["user_id"], name: "index_giveaway_entries_on_user_id"
  end

  create_table "giveaways", force: :cascade do |t|
    t.boolean "active", default: false, null: false
    t.boolean "archived", default: false, null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.date "end_date"
    t.text "participation_conditions"
    t.date "start_date"
    t.string "title"
    t.datetime "updated_at", null: false
  end

  create_table "links", force: :cascade do |t|
    t.boolean "active"
    t.datetime "created_at", null: false
    t.string "label"
    t.string "link_type"
    t.integer "location_id"
    t.datetime "updated_at", null: false
    t.string "url"
    t.index ["location_id"], name: "index_links_on_location_id"
  end

  create_table "locations", force: :cascade do |t|
    t.boolean "active"
    t.string "address_line_1"
    t.datetime "created_at", null: false
    t.string "map_url"
    t.string "name"
    t.string "postcode"
    t.string "state"
    t.string "suburb"
    t.datetime "updated_at", null: false
  end

  create_table "pending_bonus", force: :cascade do |t|
    t.integer "assigned_by_admin_id"
    t.integer "bonus_definition_id", null: false
    t.datetime "claimed_at"
    t.integer "claimed_by_user_id"
    t.datetime "created_at", null: false
    t.string "email"
    t.datetime "expires_at"
    t.integer "points_amount"
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["assigned_by_admin_id"], name: "index_pending_bonus_on_assigned_by_admin_id"
    t.index ["bonus_definition_id"], name: "index_pending_bonus_on_bonus_definition_id"
    t.index ["claimed_by_user_id"], name: "index_pending_bonus_on_claimed_by_user_id"
  end

  create_table "redemptions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "reward_id", null: false
    t.string "status"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "voucher_code"
    t.index ["reward_id"], name: "index_redemptions_on_reward_id"
    t.index ["user_id"], name: "index_redemptions_on_user_id"
    t.index ["voucher_code"], name: "index_redemptions_on_voucher_code", unique: true
  end

  create_table "rewards", force: :cascade do |t|
    t.boolean "active"
    t.boolean "archived", default: false, null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.date "end_date"
    t.integer "fulfilled_count", default: 0
    t.string "images"
    t.integer "limit_per_user"
    t.string "name"
    t.integer "point_cost"
    t.integer "redemptions_count", default: 0
    t.string "reward_type", default: "standard"
    t.date "start_date"
    t.integer "total_limit", default: 0
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "points", null: false
    t.string "transaction_type", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "account_id"
    t.datetime "created_at", null: false
    t.date "date_of_birth"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "member_id"
    t.string "name"
    t.string "password_digest"
    t.string "phone"
    t.integer "points_balance_cache", default: 0, null: false
    t.integer "referred_by_id"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.string "role"
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_users_on_account_id", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
  end

  add_foreign_key "bonus_transactions", "bonus_definitions"
  add_foreign_key "bonus_transactions", "users"
  add_foreign_key "giveaway_entries", "giveaways"
  add_foreign_key "giveaway_entries", "users"
  add_foreign_key "links", "locations"
  add_foreign_key "pending_bonus", "bonus_definitions"
  add_foreign_key "redemptions", "rewards"
  add_foreign_key "redemptions", "users"
  add_foreign_key "transactions", "users"
end
