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

<<<<<<< HEAD
ActiveRecord::Schema[7.0].define(version: 2022_11_17_032339) do
=======
ActiveRecord::Schema[7.0].define(version: 20_221_115_024_236) do
>>>>>>> eaa3337 (change renter/subletter from has_many to has_one (#16))
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness',
                                                    unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

<<<<<<< HEAD
  create_table "contracts", force: :cascade do |t|
    t.bigint "renter_id"
    t.bigint "subletter_id"
    t.bigint "listing_id"
    t.date "start_date"
    t.date "end_date"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_contracts_on_listing_id"
    t.index ["renter_id"], name: "index_contracts_on_renter_id"
    t.index ["subletter_id"], name: "index_contracts_on_subletter_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer "renter_id"
    t.integer "subletter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "inquiry_id", null: false
    t.index ["inquiry_id"], name: "index_conversations_on_inquiry_id"
  end

  create_table "inquiries", force: :cascade do |t|
    t.bigint "renter_id"
    t.bigint "listing_id"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_inquiries_on_listing_id"
    t.index ["renter_id"], name: "index_inquiries_on_renter_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "listings", force: :cascade do |t|
    t.bigint "subletter_id"
    t.string "title"
    t.string "description"
    t.decimal "price"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "square_feet"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subletter_id"], name: "index_listings_on_subletter_id"
=======
  create_table 'conversations', force: :cascade do |t|
    t.integer 'renter_id'
    t.integer 'subletter_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'jwt_denylists', force: :cascade do |t|
    t.string 'jti', null: false
    t.datetime 'exp', null: false
    t.index ['jti'], name: 'index_jwt_denylists_on_jti'
>>>>>>> eaa3337 (change renter/subletter from has_many to has_one (#16))
  end

  create_table 'listings', force: :cascade do |t|
    t.bigint 'subletter_id'
    t.string 'title'
    t.string 'description'
    t.decimal 'price'
    t.string 'address'
    t.string 'city'
    t.string 'state'
    t.string 'zip_code'
    t.string 'square_feet'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['subletter_id'], name: 'index_listings_on_subletter_id'
  end

<<<<<<< HEAD
  create_table "payments", force: :cascade do |t|
    t.bigint "contract_id"
    t.bigint "subletter_id"
    t.bigint "renter_id"
    t.decimal "amount"
    t.string "payment_type"
    t.string "payment_status", default: "pending"
    t.date "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contract_id"], name: "index_payments_on_contract_id"
    t.index ["renter_id"], name: "index_payments_on_renter_id"
    t.index ["subletter_id"], name: "index_payments_on_subletter_id"
  end

  create_table "renters", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_renters_on_user_id"
=======
  create_table 'messages', force: :cascade do |t|
    t.text 'body'
    t.bigint 'conversation_id'
    t.bigint 'user_id'
    t.boolean 'read', default: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['conversation_id'], name: 'index_messages_on_conversation_id'
    t.index ['user_id'], name: 'index_messages_on_user_id'
>>>>>>> eaa3337 (change renter/subletter from has_many to has_one (#16))
  end

  create_table 'renters', force: :cascade do |t|
    t.bigint 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_renters_on_user_id'
  end

  create_table 'subletters', force: :cascade do |t|
    t.bigint 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_subletters_on_user_id'
  end

<<<<<<< HEAD
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "contracts", "listings"
  add_foreign_key "contracts", "renters"
  add_foreign_key "contracts", "subletters"
  add_foreign_key "conversations", "inquiries"
  add_foreign_key "inquiries", "listings"
  add_foreign_key "inquiries", "renters"
  add_foreign_key "listings", "subletters"
  add_foreign_key "payments", "contracts"
  add_foreign_key "payments", "renters"
  add_foreign_key "payments", "subletters"
  add_foreign_key "renters", "users"
  add_foreign_key "subletters", "users"
=======
  create_table 'users', force: :cascade do |t|
    t.string 'name'
    t.string 'address'
    t.string 'phone_number'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'listings', 'subletters'
  add_foreign_key 'renters', 'users'
  add_foreign_key 'subletters', 'users'
>>>>>>> eaa3337 (change renter/subletter from has_many to has_one (#16))
end
