namespace :db do
  desc "Migrate SQLite data to PostgreSQL"
  task migrate_to_pg: :environment do
    require 'sqlite3'
    
    # 1. Provide paths to old SQLite DB
    sqlite_db_path = Rails.root.join("storage", "development.sqlite3").to_s
    unless File.exist?(sqlite_db_path)
      puts "SQLite database not found at #{sqlite_db_path}"
      exit
    end

    # 2. Connect to SQLite directly
    sqlite = SQLite3::Database.new(sqlite_db_path)
    sqlite.results_as_hash = true
    
    # 3. Get all tables except system/framework specific ones you may want fresh
    tables = sqlite.execute("SELECT name FROM sqlite_master WHERE type='table';").map { |row| row['name'] }
    excluded_tables = ['ar_internal_metadata', 'sqlite_sequence']
    # Solid tables should be re-created fresh, skip them
    excluded_tables += sqlite.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'solid_%';").map { |row| row['name'] }
    tables -= excluded_tables
    
    ActiveRecord::Base.transaction do
      tables.each do |table_name|
        puts "Migrating data for #{table_name}..."
        
        klass = Class.new(ActiveRecord::Base) do
          self.table_name = table_name
        end
        
        records = sqlite.execute("SELECT * FROM #{table_name}")
        records.each do |row|
          # Remove duplicate string/symbol keys that SQLite3 returns in results_as_hash
          clean_row = row.reject { |k, _v| k.is_a?(Integer) }
          
          # We use insert_all for faster insertion if needed, but for small DB, iterating might be simpler
          # Disable timestamps and callbacks
          klass.insert(clean_row)
        end
      end
    end
    
    puts "Data migration completed successfully!"
  end
end
