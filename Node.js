-- মেনু আইটেমস টেবিল তৈরি
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(100) NOT NULL,
    menu_icon VARCHAR(50),
    menu_order INT DEFAULT 0,
    command VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    required_balance DECIMAL(10,2) DEFAULT 0,
    min_level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ডেমো মেনু আইটেম যোগ করুন
INSERT INTO menu_items (menu_name, menu_icon, menu_order, command, description, required_balance, min_level) VALUES
('🏠 হোম', '🏠', 1, '/start', 'বটের প্রধান মেনু', 0, 1),
('💼 টাস্ক করুন', '💼', 2, '/tasks', 'টাস্ক সম্পন্ন করে আয় করুন', 0, 1),
('👥 রেফার করুন', '👥', 3, '/refer', 'বন্ধুদের রেফার করুন', 0, 1),
('💰 ব্যালেন্স', '💰', 4, '/balance', 'আপনার ব্যালেন্স চেক করুন', 0, 1),
('💸 উত্তোলন', '💸', 5, '/withdraw', 'টাকা উত্তোলন করুন', 50.00, 1),
('📊 লিডারবোর্ড', '📊', 6, '/leaderboard', 'শীর্ষ উপার্জনকারীরা', 0, 1),
('ℹ️ সাহায্য', 'ℹ️', 7, '/help', 'সাহায্য এবং নির্দেশিকা', 0, 1),
('⚙️ সেটিংস', '⚙️', 8, '/settings', 'আপনার সেটিংস পরিবর্তন করুন', 0, 2);

-- User Menu Access টেবিল তৈরি
CREATE TABLE IF NOT EXISTS user_menu_access (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    access_granted BOOLEAN DEFAULT TRUE,
    last_accessed TIMESTAMP NULL,
    access_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Menu Statistics টেবিল তৈরি
CREATE TABLE IF NOT EXISTS menu_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT NOT NULL,
    total_clicks INT DEFAULT 0,
    unique_users INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
