DROP TABLE IF EXISTS release_songs;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS releases;
DROP TABLE IF EXISTS shows;

CREATE TABLE releases (
    release_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cover_art_url VARCHAR(255),
    release_date DATE NOT NULL
);

CREATE TABLE songs (
    song_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    cover_art_url VARCHAR(255),
    length TIME,
    track_number INT -- 0 index this pls
);

CREATE TABLE release_songs (
    release_id INTEGER NOT NULL,
    song_id INTEGER NOT NULL,
    PRIMARY KEY (release_id, song_id),
    FOREIGN KEY (release_id) REFERENCES releases(release_id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(song_id) ON DELETE CASCADE
);

CREATE TABLE shows (
    show_id SERIAL PRIMARY KEY,
    show_date DATE NOT NULL,
    show_time TIME,
    venue_name VARCHAR(255) NOT NULL,
    venue_address VARCHAR(255) NOT NULL,
    website_url VARCHAR(255),
    tickets_url VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'Scheduled' -- value can be scheduled, canceled, postponed, whatever else
    -- could be helpful if we need to only show scheduled shows
);