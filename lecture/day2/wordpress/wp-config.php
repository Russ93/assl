<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'G!ZY,.S(M~`nY~TJWN*4SRw9[P:ayyF71iCT&F{drL:1`>RR4f[Apd2FG0=e_O1K');
define('SECURE_AUTH_KEY',  '^IY9JR*}3)38X@ Xhj@yV,p%9NQV)gZ48q0t]E`uD7$}+]SbCEc%SoeY4G]n%rw[');
define('LOGGED_IN_KEY',    '|Dh6eVZat,zK-jWLa3$YL8v:6h;}(a|f5WFIJZDn.-7_IUEW(c9vUYh|I{QfqvFJ');
define('NONCE_KEY',        '|0$4A9f.-DH%E(0:t<ZT&QoL@4WycOsOq4anL__[lrh*Un`J%k*SS_;FyA}yo@vF');
define('AUTH_SALT',        '6|kgc5t(dSUb`Qm-p]-zwSypmE#{~1Nsk1OK{L)|+pWk7;xOSQ6WLHXXAz=2t5`8');
define('SECURE_AUTH_SALT', '4|QNG-wHt9~*[UjNH)!=d_[sVgW86NUXRbhQcdF*?<H]YZZ7uVf67P+b3:O3woSY');
define('LOGGED_IN_SALT',   ';llk:/ZN4S66I*Ww.,+rLv^6 O_*d+);bI`+SB@m6S1X-}hlz~3U7]^d),<x&9?z');
define('NONCE_SALT',       '*v&-dA=}-+<HHa08$:xf-Lv-5lsDfQ^|XurNl v-{.wLCGZBx^q 9Cx)/obLV8^w');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
