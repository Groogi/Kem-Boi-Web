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

ActiveRecord::Schema[8.1].define(version: 2026_03_28_130455) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_enum "bonus_transaction_type", ["manual_credit", "pending_claim", "admin_adjustment", "giveaway_reward"]
  create_enum "pending_bonus_status", ["pending", "claimed", "expired", "cancelled"]
  create_enum "user_role", ["customer", "admin"]

  create_table "bonus_definitions", force: :cascade do |t|
    t.boolean "active", null: false
    t.text "conditions"
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "display_order"
    t.integer "points_required", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bonus_transactions", force: :cascade do |t|
    t.integer "assigned_by_admin_id"
    t.integer "bonus_definition_id", null: false
    t.datetime "created_at", null: false
    t.text "notes"
    t.integer "points_amount", null: false
    t.enum "transaction_type", enum_type: "bonus_transaction_type", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["assigned_by_admin_id"], name: "index_bonus_transactions_on_assigned_by_admin_id"
    t.index ["bonus_definition_id"], name: "index_bonus_transactions_on_bonus_definition_id"
    t.index ["user_id"], name: "index_bonus_transactions_on_user_id"
  end

  create_table "giveaways", force: :cascade do |t|
    t.boolean "active", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.date "end_date"
    t.text "participation_conditions"
    t.date "start_date", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
  end

  create_table "links", force: :cascade do |t|
    t.boolean "active", null: false
    t.datetime "created_at", null: false
    t.string "label", null: false
    t.string "link_type"
    t.integer "location_id"
    t.datetime "updated_at", null: false
    t.string "url", null: false
    t.index ["location_id"], name: "index_links_on_location_id"
  end

  create_table "locations", force: :cascade do |t|
    t.boolean "active", null: false
    t.string "address_line_1", null: false
    t.datetime "created_at", null: false
    t.string "map_url"
    t.string "name", null: false
    t.string "postcode", null: false
    t.string "state", null: false
    t.string "suburb", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pending_bonuses", force: :cascade do |t|
    t.integer "assigned_by_admin_id"
    t.integer "bonus_definition_id", null: false
    t.datetime "claimed_at"
    t.integer "claimed_by_user_id"
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "expires_at"
    t.integer "points_amount", null: false
    t.enum "status", enum_type: "pending_bonus_status", null: false
    t.datetime "updated_at", null: false
    t.index ["assigned_by_admin_id"], name: "index_pending_bonuses_on_assigned_by_admin_id"
    t.index ["bonus_definition_id"], name: "index_pending_bonuses_on_bonus_definition_id"
    t.index ["claimed_by_user_id"], name: "index_pending_bonuses_on_claimed_by_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.enum "role", enum_type: "user_role", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "bonus_transactions", "bonus_definitions"
  add_foreign_key "bonus_transactions", "users", column: "assigned_by_admin_id"
  add_foreign_key "bonus_transactions", "users"
  add_foreign_key "links", "locations"
  add_foreign_key "pending_bonuses", "bonus_definitions"
  add_foreign_key "pending_bonuses", "users", column: "assigned_by_admin_id"
  add_foreign_key "pending_bonuses", "users", column: "claimed_by_user_id"
end
