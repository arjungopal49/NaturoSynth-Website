--insert statements 

-- Populate 'releases' with chronological release data
-- Fix the image urls once they are all in the images folder; for singles in an EP, put the single cover arts
INSERT INTO releases (name, cover_art_url, release_date) VALUES
('Silver Chain', 'http://example.com/covers/silver_chain.jpg', '2019-07-07'), -- 1
('Reality to Another', 'http://example.com/covers/reality_to_another.jpg', '2020-07-01'), -- 2
('Timeless Night', 'http://example.com/covers/timeless_night.jpg', '2021-03-26'), -- 3
('The Image', 'http://example.com/covers/the_image.jpg', '2022-08-11'), -- 4
('Through the Motions', 'http://example.com/covers/through_the_motions.jpg', '2022-08-19'), -- 5
('In Control', 'http://example.com/covers/in_control.jpg', '2022-08-26'), -- 6
('Headphones On', 'http://example.com/covers/headphones_on.jpg', '2023-09-29'), -- 7
('Fear of Regret', 'http://example.com/covers/fear_of_regret.jpg', '2023-12-01'), -- 8
('Dance Destiny', 'http://example.com/covers/dance_destiny.jpg', '2024-05-17'); -- 9

-- Populate 'songs' with unique song data
-- Fix image urls and for singles in an EP, put EP cover art; track number 0-indexed
INSERT INTO songs (title, cover_art_url, length, track_number) VALUES
-- Silver Chain
('Silver Chain', 'http://example.com/songs/silver_chain.jpg', '00:04:22', 0), -- 1
-- RTA
('Find a Way', 'http://example.com/songs/find_a_way.jpg', '00:04:52', 0), -- 2
('My Eyes', 'http://example.com/songs/my_eyes.jpg', '00:05:25', 1), -- 3
('All I Know', 'http://example.com/songs/all_i_know.jpg', '00:04:12', 2), -- 4
('In the Now', 'http://example.com/songs/in_the_now.jpg', '00:04:54', 3), -- 5
('Blossom', 'http://example.com/songs/blossom.jpg', '00:06:38', 4), -- 6
-- In Control
('Through the Motions', 'http://example.com/songs/through_the_motions.jpg', '00:04:34', 0), -- 7
('The Image', 'http://example.com/songs/the_image.jpg', '00:03:50', 1), -- 8
('Telepathic Dream', 'http://example.com/songs/the_image.jpg', '00:03:29', 2), -- 9
('Never Too Far', 'http://example.com/songs/the_image.jpg', '00:05:06', 3), -- 10
('No More Love', 'http://example.com/songs/the_image.jpg', '00:04:20', 4), -- 11
('Timeless Night', 'http://example.com/songs/timeless_night.jpg', '00:04:19', 5), -- 12
-- Rest of new singles
('Headphones On', 'http://example.com/songs/headphones_on.jpg', '00:04:13', 0), -- 13
('Fear of Regret', 'http://example.com/songs/fear_of_regret.jpg', '00:03:55', 0), -- 14
('Dance Destiny', 'http://example.com/songs/dance_destiny.jpg', NULL, 0); -- 15

-- Assuming the above releases were inserted with release_id 1 through 9 in that order, 
-- and songs were inserted with song_id 1 through 8 (with an increment for each unique track of the EP).

-- Link 'Silver Chain' single to its release
INSERT INTO release_songs (release_id, song_id) VALUES
(1, 1);

-- Link all tracks from 'Reality to Another' EP
INSERT INTO release_songs (release_id, song_id) VALUES
(2, 2), -- Find a Way
(2, 3), -- My Eyes
(2, 4), -- All I Know
(2, 5), -- In the Now
(2, 6); -- Blossom

-- 'Timeless Night' as single
INSERT INTO release_songs (release_id, song_id) VALUES
(3, 12);

-- 'The Image' as single
INSERT INTO release_songs (release_id, song_id) VALUES
(4, 8);

-- 'Through the Motions' as single
INSERT INTO release_songs (release_id, song_id) VALUES
(5, 7);

-- Link 'In Control' EP, accounting for songs that were also singles
INSERT INTO release_songs (release_id, song_id) VALUES
(6, 7),  -- Through the Motions (was also release #3)
(6, 8),  -- The Image (also release #4)
(6, 9),  -- Telepathic Dream
(6, 10), -- Never Too Far
(6, 11), -- No More Love
(6, 12); -- Timeless Night (was also release #5)

-- Link singles that are also in 'In Control' EP to their own releases
INSERT INTO release_songs (release_id, song_id) VALUES
(3, 12), -- Timeless Night
(4, 8),  -- The Image
(5, 7);  -- Through the Motions

-- Link other standalone singles to their releases
INSERT INTO release_songs (release_id, song_id) VALUES
-- Headphones On, Fear of Regret, and Dance Destiny are only released as singles
(7, 13), -- Headphones On
(8, 14), -- Fear of Regret
(9, 15); -- Dance Destiny

-- Populate the 'shows' table
INSERT INTO shows (show_date, show_time, venue_name, venue_address, website_url, tickets_url, description, status) VALUES
('2021-09-01', '19:00:00', 'The Music Hall', '123 Rock Ave, Music City, 12345', 'http://example.com/musichall','http://example.com/musichall/tickets', 'An amazing night of music!', 'Scheduled'),
('2021-10-01', '20:00:00', 'The Jazz Bar', '456 Jazz St, Groove Town, 67890', 'http://example.com/jazzbar', 'http://example.com/jazzbar/tickets', 'Enjoy a fusion of jazz and funk!', 'Scheduled');

-- Note: Times are in 24-hour format, and the track_number column is zero-indexed as requested